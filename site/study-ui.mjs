import { summarizeProgress, gradeChoices } from "./study-state.mjs";

let controlId = 0;

function node(tag, className, text) {
  const result = document.createElement(tag);
  if (className) result.className = className;
  if (text !== undefined) result.textContent = text;
  return result;
}

/** Muestra autoevaluaciones explícitas, nunca progreso de certificación. */
export function makeProgressPanel(units, states, lessonHref, storageStatus = 'ready') {
  const summary = summarizeProgress(units, states);
  const panel = node("section", "study-progress");
  const titleId = `study-progress-${controlId++}`;
  panel.setAttribute("aria-labelledby", titleId);
  const title = node("h2", undefined, "Tu aprendizaje");
  title.id = titleId;
  const progress = node("progress");
  progress.max = summary.total;
  progress.value = summary.reviewed;
  progress.setAttribute("aria-label", "Unidades autoevaluadas");
  progress.textContent = `${summary.reviewed} de ${summary.total}`;
  const status = node("p", "progress-count", `${summary.reviewed} de ${summary.total} autoevaluadas · ${summary.reinforce} por reforzar · ${summary.explain} que puedes explicar`);
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  panel.append(title, progress, status);
  const notices = {
    ready: 'Tu progreso se guarda en este navegador. No se sincroniza con tu cuenta ni representa avance oficial. Los borradores se reinician al recargar.',
    unavailable: 'El navegador no permite guardar el progreso. Puedes seguir en esta pestaña, pero los cambios se perderán al recargar. No representa avance oficial.',
    invalid: 'No se pudo recuperar un progreso válido. Las nuevas autoevaluaciones se guardarán en este navegador; no representan avance oficial.',
  };
  panel.append(node('p', 'study-note', notices[storageStatus] || notices.unavailable));
  panel.append(node("h3", undefined, "Tu próximo repaso"));
  if (!summary.reinforcement.length) {
    panel.append(node("p", "study-empty", "Todavía no has marcado temas por reforzar."));
  } else {
    const list = node("ul", "reinforcement-list");
    for (const unit of summary.reinforcement) {
      const item = node("li");
      const anchor = node("a", "text-link", unit.title);
      anchor.href = lessonHref(unit.id);
      item.append(anchor);
      list.append(item);
    }
    panel.append(list);
  }
  return panel;
}

/** Registrar comprensión es una decisión del estudiante, no del puntaje. */
export function makeStateControl(unit, states, onChange) {
  const wrapper = node("div", "unit-study");
  wrapper.dataset.studyId = unit.id;
  wrapper.dataset.state = states.get(unit.id) || "pending";
  const label = node("label", "study-select-label", `Autoevaluación: ${unit.title}`);
  const select = node("select", "study-state-select");
  select.id = `study-unit-${controlId++}`;
  label.htmlFor = select.id;
  for (const [value, title] of [
    ["pending", "Por revisar"],
    ["reinforce", "Necesito reforzar"],
    ["explain", "Puedo explicarlo y aplicarlo"],
  ]) {
    const option = node("option", undefined, title);
    option.value = value;
    select.append(option);
  }
  select.value = states.get(unit.id) || "pending";
  select.addEventListener("change", () => {
    states.set(unit.id, select.value);
    onChange();
  });
  wrapper.append(label, select);
  return wrapper;
}

/** Decisiones críticas y justificaciones manuales, con borradores efímeros. */
export function makeAssessment(unit, drafts) {
  const section = node("section", "assessment");
  const title = node("h2", undefined, "Comprueba tu comprensión");
  section.append(title, node("p", undefined, "Antes de continuar, analiza cada escenario, elige una decisión y explica sus causas. Son preguntas de repaso propias, no el examen oficial."));
  const questions = unit.assessment;
  const draft = drafts.get(unit.id) || { values: {}, reviewed: false };
  drafts.set(unit.id, draft);
  const form = node("form", "assessment-form");
  const answers = [];

  for (const [index, question] of questions.entries()) {
    const fieldset = node("fieldset");
    fieldset.append(node("legend", undefined, `${index + 1}. ${question.prompt}`));
    if (question.code) {
      const pre = node("pre");
      pre.append(node("code", undefined, question.code));
      fieldset.append(pre);
    }
    for (const [optionIndex, option] of question.options.entries()) {
      const label = node("label", "assessment-choice");
      const radio = node("input");
      radio.type = "radio";
      radio.name = question.id;
      radio.value = String(optionIndex);
      radio.required = true;
      radio.checked = draft.values[question.id] === String(optionIndex);
      label.append(radio, node("span", undefined, option));
      fieldset.append(label);
    }
    const reasonId = `reason-${controlId++}`;
    const reason = node("textarea");
    reason.id = reasonId;
    reason.name = `reason-${question.id}`;
    reason.required = true;
    reason.rows = 3;
    reason.value = draft.values[reason.name] || "";
    const validateReason = () => reason.setCustomValidity(reason.value.trim() ? '' : 'Escribe una justificación antes de revisar tus decisiones.');
    reason.addEventListener('input', validateReason);
    validateReason();
    const reasonLabel = node("label", undefined, question.reasonPrompt);
    reasonLabel.htmlFor = reasonId;
    fieldset.append(reasonLabel, reason);
    const details = node("details", "assessment-answer");
    details.append(node("summary", undefined, "Contrasta tu razonamiento"));
    details.append(node("p", undefined, `Decisión esperada: ${question.options[question.correctIndex]}`));
    details.append(node("p", undefined, question.explanation));
    const rubric = node("ul");
    for (const criterion of question.rubric) rubric.append(node("li", undefined, criterion));
    details.append(rubric);
    details.hidden = !draft.reviewed;
    answers.push(details);
    fieldset.append(details);
    form.append(fieldset);
  }

  const button = node("button", "cta", "Revisar mis decisiones");
  button.type = "submit";
  const result = node("p", "assessment-result");
  result.setAttribute("role", "status");
  result.setAttribute("aria-live", "polite");
  const manual = node("div", "reasoning-guide");
  manual.append(node("h3", undefined, "El acierto es solo una parte"));
  manual.append(node("p", undefined, "El resultado automático comprueba tus opciones, no la calidad de tus explicaciones. Contrasta tus razones con la retroalimentación. Acertar no cambia tu autoevaluación ni otorga una insignia."));
  manual.append(node("p", undefined, "Antes de marcar que puedes explicarlo, verifica que predices el resultado, justificas la causa y puedes aplicar la idea a un caso diferente. Si no, marca Necesito reforzar."));
  const updateFeedback = () => {
    for (const answer of answers) answer.hidden = !draft.reviewed;
    manual.hidden = !draft.reviewed;
    result.hidden = !draft.reviewed;
    if (draft.reviewed) {
      const score = gradeChoices(questions, draft.values);
      result.textContent = `${score.correct} de ${score.total} decisiones coinciden. Revisa tus justificaciones; este puntaje no certifica comprensión ni aprobación del examen.`;
    }
  };
  form.addEventListener("input", () => {
    draft.values = Object.fromEntries(new FormData(form));
    draft.reviewed = false;
    updateFeedback();
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    draft.values = Object.fromEntries(new FormData(form));
    draft.reviewed = true;
    updateFeedback();
  });
  form.append(button, result, manual);
  updateFeedback();
  section.append(form);
  return section;
}
