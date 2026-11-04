"""Public build checks for the static review site and unit projects."""

import json
from pathlib import Path
import subprocess
import tempfile
import unittest
import xml.etree.ElementTree as ET
import zipfile

ROOT = Path(__file__).resolve().parents[1]


class CourseBuildTests(unittest.TestCase):
    def test_each_official_unit_has_its_own_project_and_guide(self):
        result = subprocess.run(
            ["python3", "tools/build_course.py"], cwd=ROOT,
            text=True, capture_output=True, check=False,
        )
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stderr, "")
        catalog = json.loads((ROOT / "course/catalog.json").read_text())
        units = [u for m in catalog["modules"] for u in m["units"]]
        self.assertEqual(len(units), 67)
        projects = list((ROOT / "curso").rglob("Unidad.csproj"))
        self.assertEqual(len(projects), len(units))
        for project in projects:
            self.assertTrue(project.with_name("README.md").is_file())
            self.assertTrue(project.with_name("Program.cs").is_file())
            self.assertIn("/// <summary>", project.with_name("Program.cs").read_text())
        solution = ET.parse(ROOT / "aprende-csharp-dotnet.slnx").getroot()
        self.assertEqual(solution.findall("Project"), [])
        self.assertEqual(len(solution.findall("Folder/Project")), len(units))

    def test_static_output_contains_only_public_course_material(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "public"
            result = subprocess.run(
                ["python3", "tools/build_course.py", "--output", str(output)],
                cwd=ROOT, text=True, capture_output=True, check=False,
            )
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertEqual(result.stderr, "")
            self.assertIn("67 unidades", result.stdout)
            for file in ["index.html", "app.mjs", "styles.css", "course-utils.mjs", "course.json", ".nojekyll"]:
                self.assertTrue((output / file).is_file(), file)
            data = json.loads((output / "course.json").read_text())
            self.assertEqual(data["schemaVersion"], 1)
            self.assertEqual(len(data["modules"]), 9)
            for module in data["modules"]:
                for unit in module["units"]:
                    for key in ["projectUrl", "guideUrl", "sourceCodeUrl"]:
                        resource = unit[key]
                        self.assertFalse(resource.startswith("/"))
                        self.assertNotIn("..", resource.split("/"))
                        self.assertTrue((output / resource).is_file(), resource)
                    self.assertTrue(unit["projectUrl"].endswith(".zip"))
                    with zipfile.ZipFile(output / unit["projectUrl"]) as archive:
                        self.assertEqual(set(archive.namelist()), {"Unidad.csproj", "Program.cs", "README.md"})
                    for original in unit["originals"]:
                        self.assertTrue((output / original).is_file(), original)
            self.assertFalse((output / ".git").exists())
            self.assertFalse((output / ".checks").exists())
            self.assertFalse((output / "odd").exists())
            self.assertFalse((output / "course-utils.test.mjs").exists())
            self.assertEqual(list(output.rglob("*.env")), [])


if __name__ == "__main__":
    unittest.main()
