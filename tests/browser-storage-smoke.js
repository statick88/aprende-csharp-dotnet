async (page) => {
  const base = page.url().split('#')[0];
  const context = await page.context().browser().newContext();
  try {
    await context.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', {
        get() { throw new DOMException('Almacenamiento bloqueado para esta prueba', 'SecurityError'); },
      });
    });
    const isolated = await context.newPage();
    await isolated.goto(base);
    await isolated.locator('.hero h1').waitFor();
    const check = (ok, message) => { if (!ok) throw new Error(message); };
    check((await isolated.locator('.study-note').innerText()).includes('no permite guardar'), 'Aviso de almacenamiento bloqueado');
    await isolated.getByRole('link', {name:'Continuar: abrir y cerrar archivos con using'}).click();
    await isolated.locator('.self-review select').selectOption('reinforce');
    check((await isolated.locator('.progress-count').innerText()).includes('1 por reforzar'), 'Se puede seguir estudiando en memoria');
    check((await isolated.locator('.study-note').innerText()).includes('no permite guardar'), 'El fallo de escritura es visible');
    await isolated.reload();
    await isolated.locator('.assessment-form').waitFor();
    check((await isolated.locator('.progress-count').innerText()).startsWith('0 de 67'), 'Sin almacenamiento no se promete persistencia');
    return {passed:true,checks:['almacenamiento bloqueado','aviso visible','seguimiento en memoria','recarga sin bloqueo de aplicación']};
  } finally {
    await context.close();
  }
}
