#!/usr/bin/env python3
"""Build a dependency-free review site and commented C# unit projects."""

import argparse
import copy
import json
from pathlib import Path
import shutil
import xml.etree.ElementTree as ET
import zipfile

ROOT = Path(__file__).resolve().parents[1]
SITE_FILES = ("index.html", "styles.css", "app.mjs", "course-utils.mjs", "study-state.mjs", "study-ui.mjs")
PROJECT = """<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
    <GenerateDocumentationFile>true</GenerateDocumentationFile>
  </PropertyGroup>
</Project>
"""


def load_course():
    """Keep official ordering and reject incomplete, mismatched material."""
    catalog = json.loads((ROOT / "course/catalog.json").read_text())
    modules = []
    for part in (1, 2):
        material = json.loads((ROOT / f"course/parte-{part:02}.json").read_text())
        assert material["schemaVersion"] == 1, "Versión de contenido no compatible"
        assessment = json.loads((ROOT / f"course/evaluaciones-{part:02}.json").read_text())
        assert assessment["schemaVersion"] == 1
        expected_ids = [u["id"] for m in material["modules"] for u in m["units"]]
        assert [u["id"] for u in assessment["units"]] == expected_ids
        indexed = {u["id"]: u["questions"] for u in assessment["units"]}
        for module in material["modules"]:
            for unit in module["units"]:
                questions = indexed[unit["id"]]
                assert len(questions) == 2
                assert len({q["id"] for q in questions}) == len(questions)
                for question in questions:
                    assert question["prompt"] and question["explanation"] and question["reasonPrompt"]
                    assert len(question["options"]) == 3
                    assert type(question["correctIndex"]) is int and 0 <= question["correctIndex"] < 3
                    assert len(question["rubric"]) == 2
                unit["assessment"] = questions
        modules.extend(material["modules"])
    expected = catalog["modules"]
    assert [m["id"] for m in modules] == [m["id"] for m in expected]
    for module, official in zip(modules, expected):
        assert module["part"] == official["part"]
        assert module["sourceUrl"] == official["sourceUrl"]
        assert [u["id"] for u in module["units"]] == [u["id"] for u in official["units"]]
        for unit, reference in zip(module["units"], official["units"]):
            assert unit["sourceUrl"] == reference["sourceUrl"]
            assert unit["title"] == reference["title"]
            assert unit["objective"] and unit["practice"]
            assert len(unit["steps"]) >= 2 and len(unit["review"]) >= 2
            for step in unit["steps"]:
                assert step["title"] and step["text"]
                step.setdefault("code", "")
                step.setdefault("expected", "")
    return {"schemaVersion": 1, "title": catalog["title"], "modules": modules}


def relative_path(path):
    """Accept only literal repository-relative resource locations."""
    value = Path(path)
    if value.is_absolute() or ".." in value.parts or not value.parts:
        raise ValueError(f"Ruta no relativa: {path}")
    return value


def unit_directory(module, unit):
    return relative_path(f"curso/parte-{module['part']:02}/{unit['id']}")


def program_text(unit):
    lines = [
        "// Material de estudio: los ejemplos permanecen comentados a propósito.",
        "// Active un solo ejemplo completo por vez en una copia de esta unidad.",
        f"// Fuente oficial: {unit['sourceUrl']}",
        "",
        "/// <summary>",
        "/// Punto de entrada del cuaderno de estudio; no ejecuta los ejemplos.",
        "/// </summary>",
        "internal static class Program",
        "{",
        "    /// <summary>Muestra cómo comenzar a repasar esta unidad.</summary>",
        "    private static void Main()",
        "    {",
        '        Console.WriteLine("Unidad de estudio: lea README.md y active un ejemplo a la vez.");',
        "    }",
        "}",
        "",
    ]
    for number, step in enumerate(unit["steps"], 1):
        lines.append(f"// PASO {number}: {step['title']}")
        if step["code"]:
            lines.extend("// " + line for line in step["code"].splitlines())
        else:
            lines.append("// Unidad conceptual: siga la actividad descrita en README.md.")
        if step["expected"]:
            lines.extend("// Resultado esperado: " + line for line in step["expected"].splitlines())
        lines.append("")
    return "\n".join(lines)


def guide_text(module, unit):
    directory = unit_directory(module, unit).as_posix()
    lines = [
        f"# {unit['title']}", "",
        f"Parte {module['part']} · {module['title']}", "",
        f"[Fuente oficial]({unit['sourceUrl']}) · [Índice del curso](../../../../README.md)", "",
        "## Objetivo", "", unit["objective"], "",
        "## Antes de empezar", "",
        *[f"- {item}" for item in unit["prerequisites"]], "",
        "## Cómo usar este proyecto", "",
        "Los ejemplos están comentados intencionalmente. Ejecutar el proyecto sin editarlos solo muestra una instrucción de estudio; no significa que haya completado esta unidad.", "",
        "1. Lea la explicación y prediga el resultado del ejemplo.",
        "2. En una copia de trabajo, reemplace el contenido de Program.cs por un único ejemplo completo de esta guía, retirando su prefijo de comentario si lo copia de Program.cs.",
        "3. Ejecute el comando desde la raíz del repositorio y compare el resultado.",
        "4. Revise las preguntas y vuelva al código para explicar cada línea.", "",
        "Si descargó el proyecto ZIP del sitio, extraiga sus tres archivos juntos y ejecute `dotnet run --project Unidad.csproj` dentro de esa carpeta.", "",
        "```bash", f"dotnet run --project {directory}/Unidad.csproj", "```", "",
        "## Paso a paso", "",
    ]
    for number, step in enumerate(unit["steps"], 1):
        lines.extend([f"### {number}. {step['title']}", "", step["text"], ""])
        if step["code"]:
            lines.extend(["```csharp", step["code"], "```", ""])
        if step["expected"]:
            lines.extend(["**Resultado esperado:** " + step["expected"], ""])
    lines.extend(["## Práctica", "", unit["practice"], "", "## Preguntas de repaso", ""])
    for item in unit["review"]:
        lines.extend(["### " + item["question"], "", item["answer"], ""])
    lines.extend(["## Evaluación crítica", "", "Elija una opción y justifique la causa antes de consultar la retroalimentación. El puntaje de opciones no califica su explicación ni demuestra comprensión por sí solo.", ""])
    for number, question in enumerate(unit["assessment"], 1):
        lines.extend([f"### Escenario {number}: {question['prompt']}", ""])
        if question.get("code"):
            lines.extend(["```csharp", question["code"], "```", ""])
        lines.extend([f"- {index + 1}. {option}" for index, option in enumerate(question["options"])])
        lines.extend(["", "**Justifique:** " + question["reasonPrompt"], "", "<details>", "<summary>Contrastar mi razonamiento</summary>", "", f"Opción esperada: {question['correctIndex'] + 1}. {question['explanation']}", ""])
        lines.extend([f"- {criterion}" for criterion in question["rubric"]])
        lines.extend(["", "</details>", ""])
    lines.extend([
        "## Alcance de este repaso", "",
        "Estas preguntas son material propio, no respuestas de la evaluación oficial. El proyecto no otorga insignias ni envía progreso a Microsoft Learn o freeCodeCamp.", "",
    ])
    return "\n".join(lines)


def materialize(course):
    solution = ET.Element("Solution")
    for module in course["modules"]:
        for unit in module["units"]:
            relative = unit_directory(module, unit)
            directory = ROOT / relative
            directory.mkdir(parents=True, exist_ok=True)
            (directory / "Unidad.csproj").write_text(PROJECT)
            (directory / "Program.cs").write_text(program_text(unit))
            (directory / "README.md").write_text(guide_text(module, unit))
            # Identical project filenames need distinct virtual solution folders.
            folder_name = f"/parte-{module['part']:02}-{unit['id'].replace('/', '-')}/"
            folder = ET.SubElement(solution, "Folder", Name=folder_name)
            ET.SubElement(folder, "Project", Path=f"{relative.as_posix()}/Unidad.csproj")
    ET.indent(solution, space="  ")
    (ROOT / "aprende-csharp-dotnet.slnx").write_text(ET.tostring(solution, encoding="unicode") + "\n")


def publish(course, output):
    output.mkdir(parents=True, exist_ok=True)
    for filename in SITE_FILES:
        shutil.copyfile(ROOT / "site" / filename, output / filename)
    data = copy.deepcopy(course)
    for module in data["modules"]:
        for unit in module["units"]:
            relative = unit_directory(module, unit)
            for filename, key in (("Unidad.csproj", "projectUrl"), ("README.md", "guideUrl"), ("Program.cs", "sourceCodeUrl")):
                destination = Path("resources") / relative / filename
                (output / destination).parent.mkdir(parents=True, exist_ok=True)
                shutil.copyfile(ROOT / relative / filename, output / destination)
                unit[key] = destination.as_posix()
            archive_path = Path("resources") / relative / "proyecto.zip"
            with zipfile.ZipFile(output / archive_path, "w", compression=zipfile.ZIP_DEFLATED) as archive:
                for filename in ("Unidad.csproj", "Program.cs", "README.md"):
                    archive.write(ROOT / relative / filename, arcname=filename)
            unit["projectUrl"] = archive_path.as_posix()
            # Only explicit original C# source paths are exposed, never the repository.
            originals = []
            for source in unit["originals"]:
                source = relative_path(source)
                if source.suffix != ".cs":
                    raise ValueError(f"Solo se publican referencias originales C#: {source}")
                destination = Path("resources/originales") / source
                (output / destination).parent.mkdir(parents=True, exist_ok=True)
                shutil.copyfile(ROOT / source, output / destination)
                originals.append(destination.as_posix())
            unit["originals"] = originals
    (output / "course.json").write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n")
    (output / ".nojekyll").write_text("")


def main():
    parser = argparse.ArgumentParser(description="Genera el sitio estático y los proyectos de repaso por unidad.")
    parser.add_argument("--output", type=Path, default=ROOT / "_site", help="Directorio de salida del sitio (predeterminado: _site).")
    args = parser.parse_args()
    course = load_course()
    materialize(course)
    publish(course, args.output)
    count = sum(len(module["units"]) for module in course["modules"])
    print(f"Sitio generado: {count} unidades, {len(course['modules'])} módulos. Salida: {args.output}")


if __name__ == "__main__":
    main()
