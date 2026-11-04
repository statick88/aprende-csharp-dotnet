async (page) => {
  const base = page.url().split('#')[0];
  const context = await page.context().browser().newContext();
  page = await context.newPage();
  try {
  const check = (ok, message) => { if (!ok) throw new Error(message); };
  await page.goto(base);
  await page.locator('.hero h1').waitFor();
  check((await page.locator('.hero h1').innerText()).includes('Aprende C# y .NET'), 'Bienvenida conservada');
  check((await page.locator('.progress-count').innerText()).startsWith('0 de 67'), 'Sin avance inventado');
  await page.getByRole('link', {name:'Continuar: abrir y cerrar archivos con using'}).click();
  await page.locator('.assessment-form').waitFor();
  const unitId = 'archivos/02-open-close-files-safely-with-using';
  const content = await (await page.request.get(new URL('course.json', base).href)).json();
  const unit = content.modules.flatMap(module => module.units).find(unit => unit.id === unitId);
  let form = page.locator('.assessment-form');
  check(await form.locator('fieldset').count() === 2, 'Dos escenarios en la unidad');
  check(await form.locator('.assessment-answer[hidden]').count() === 2, 'Retroalimentación oculta al empezar');
  check(await form.evaluate(form => form.checkValidity()) === false, 'Opciones y explicaciones obligatorias');
  check(await page.locator('.self-review select').inputValue() === 'pending', 'Visitar no marca comprensión');
  for (const question of unit.assessment) {
    await form.locator(`input[name="${question.id}"][value="${(question.correctIndex + 1) % 3}"]`).check();
    await form.locator(`textarea[name="reason-${question.id}"]`).fill('Explicación de prueba que contrastaré con la causa y la rúbrica.');
  }
  await form.getByRole('button', {name:'Revisar mis decisiones'}).click();
  check((await page.locator('.assessment-result').innerText()).startsWith('0 de 2'), 'Puntaje de opciones incorrectas');
  check((await page.locator('.progress-count').innerText()).startsWith('0 de 67'), 'El puntaje no modifica el progreso');
  check(await form.locator('.assessment-answer:not([hidden])').count() === 2, 'Retroalimentación disponible');
  await form.locator('.assessment-answer summary').first().click();
  check(await form.locator('.assessment-answer').first().getAttribute('open') !== null, 'Explicación y rúbrica desplegables');
  await page.locator('.self-review select').selectOption('reinforce');
  check((await page.locator('.progress-count').innerText()).includes('1 por reforzar'), 'Registrar refuerzo');
  check(await page.locator('.reinforcement-list a').count() === 1, 'Próximo repaso sin duplicados');
  await page.getByRole('link', {name:'Siguiente lección →'}).click();
  await page.getByRole('heading', {name:'Leer datos de archivos', exact:true}).waitFor();
  check((await page.locator('.progress-count').innerText()).includes('1 por reforzar'), 'Estado conservado al navegar');
  await page.getByRole('link', {name:'← Lección anterior'}).click();
  await page.getByRole('heading', {name:'Abrir y cerrar con using', exact:true}).waitFor();
  check((await page.locator('.assessment-result').innerText()).startsWith('0 de 2'), 'Resultado del borrador conservado');
  for (const question of unit.assessment) {
    await form.locator(`input[name="${question.id}"][value="${question.correctIndex}"]`).check();
  }
  check(await page.locator('.assessment-result').isHidden(), 'Editar invalida retroalimentación anterior');
  await form.getByRole('button', {name:'Revisar mis decisiones'}).click();
  check((await page.locator('.assessment-result').innerText()).startsWith('2 de 2'), 'Puntaje de opciones correctas');
  check(await page.locator('.self-review select').inputValue() === 'reinforce', 'Acertar no atribuye comprensión');
  await page.locator('.self-review select').selectOption('explain');
  check((await page.locator('.progress-count').innerText()).includes('0 por reforzar · 1 que puedes explicar'), 'Autoevaluación reversible');
  check(await page.locator('.reinforcement-list a').count() === 0, 'Lista de refuerzo actualizada');
  await page.getByRole('link', {name:'Ir al inicio de Aprende C# y .NET'}).click();
  await page.locator('.hero h1').waitFor();
  check((await page.locator('.progress-count').innerText()).startsWith('1 de 67'), 'La portada comparte el progreso');
  await page.getByRole('link', {name:'Continuar: abrir y cerrar archivos con using'}).click();
  await page.locator('.assessment-form').waitFor();
  await page.reload();
  await page.locator('.assessment-form').waitFor();
  check((await page.locator('.progress-count').innerText()).startsWith('1 de 67'), 'Recargar conserva el progreso');
  check(await page.locator('.self-review select').inputValue() === 'explain', 'Autoevaluación restaurada');
  check(await form.locator('textarea').first().inputValue() === '', 'Las justificaciones no se almacenan');
  const lessonUrl = page.url();
  await page.close();
  page = await context.newPage();
  await page.goto(lessonUrl);
  await page.locator('.assessment-form').waitFor();
  form = page.locator('.assessment-form');
  check(await page.locator('.self-review select').inputValue() === 'explain', 'Reabrir la página conserva el progreso');
  await form.locator('textarea').first().fill('   ');
  check(await form.locator('textarea').first().evaluate(el => el.checkValidity()) === false, 'Espacios no son una justificación');
  await page.setViewportSize({width:375,height:812});
  check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Lector sin desborde móvil');
  await page.goto(base);
  await page.locator('.hero h1').waitFor();
  check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Portada sin desborde móvil');
  await page.setViewportSize({width:1440,height:1000});
  return {passed:true,base,questions:134,checks:['bienvenida','autoevaluación','refuerzo','borradores','justificación','puntaje','retroalimentación','progreso persistente','reabrir página','móvil']};
  } finally {
    await context.close();
  }
}
