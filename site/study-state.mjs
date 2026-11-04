/** Resume autoevaluaciones explícitas de unidades disponibles, sin mutar estados. */
export function summarizeProgress(units, states) {
  const reinforcement = units.filter((unit) => states.get(unit.id) === "reinforce");
  const explain = units.filter((unit) => states.get(unit.id) === "explain").length;
  return {
    total: units.length,
    reviewed: reinforcement.length + explain,
    reinforce: reinforcement.length,
    explain,
    reinforcement,
  };
}

/** Puntúa opciones válidas; no califica explicaciones ni atribuye comprensión. */
export function gradeChoices(questions, choices) {
  let correct = 0;
  let answered = 0;
  for (const question of questions) {
    const raw = choices[question.id];
    if (!(typeof raw === "number" || (typeof raw === "string" && /^\d+$/.test(raw)))) continue;
    const selected = Number(raw);
    if (!Number.isInteger(selected) || selected < 0 || selected >= question.options.length) continue;
    answered += 1;
    if (selected === question.correctIndex) correct += 1;
  }
  return { correct, total: questions.length, answered };
}
