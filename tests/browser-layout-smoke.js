async (page) => {
  const base = page.url().split('#')[0];
  const check = (ok, message) => { if (!ok) throw new Error(message); };
  const measurements = [];
  // Evite reutilizar CSS de una generación anterior del servidor estático local.
  const freshStyles = (route) => route.continue();
  await page.route('**/styles.css', freshStyles);
  for (const width of [1440, 1920]) {
    await page.setViewportSize({width, height:1080});
    await page.goto(base);
    await page.locator('.hero h1').waitFor();
    check(await page.locator('main').evaluate(el => el.getBoundingClientRect().width <= 1201), 'La portada conserva su ancho centrado');
    await page.locator('.lesson-list a').first().click();
    await page.locator('.lesson-layout').waitFor();
    const dimensions = await page.evaluate(() => {
      const main = document.querySelector('main').getBoundingClientRect();
      const lesson = document.querySelector('.lesson').getBoundingClientRect();
      return {viewport:innerWidth, mainLeft:main.left, mainRight:main.right, lessonRight:lesson.right, lessonWidth:lesson.width};
    });
    check(dimensions.mainLeft <= 40 && dimensions.mainRight >= width - 40, 'La lección debe aprovechar ambos lados de la ventana');
    check(dimensions.lessonRight >= width - 64, 'El artículo debe ocupar el espacio a la derecha del recorrido');
    check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Sin desborde horizontal en escritorio');
    measurements.push(dimensions);
    await page.getByRole('link', {name:'Herramientas .NET', exact:true}).click();
    await page.locator('.tools-reference h1').waitFor();
    check(await page.locator('.tools-reference').evaluate(el => el.getBoundingClientRect().width > innerWidth - 100), 'Herramientas también ocupa el ancho disponible');
  }
  await page.setViewportSize({width:375,height:812});
  await page.goto(base);
  await page.locator('.lesson-list a').first().click();
  await page.locator('.lesson-layout').waitFor();
  check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Lector móvil sin desborde');
  await page.getByRole('link', {name:'Herramientas .NET', exact:true}).click();
  await page.locator('.tools-reference h1').waitFor();
  check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Herramientas móvil sin desborde');
  await page.setViewportSize({width:1440,height:1000});
  await page.unroute('**/styles.css', freshStyles);
  return {passed:true,measurements,checks:['portada conservada','lecciones a todo el ancho','herramientas a todo el ancho','móvil']};
}
