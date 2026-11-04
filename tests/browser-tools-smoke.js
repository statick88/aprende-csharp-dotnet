async (page) => {
  const base = page.url().split('#')[0];
  const check = (ok, message) => { if (!ok) throw new Error(message); };
  await page.goto(base);
  await page.locator('.hero h1').waitFor();
  check(await page.locator('.module').count() === 9, 'No cambia el catálogo de insignias');
  check(await page.locator('.lesson-list a').count() === 67, 'Se conservan las 67 unidades');
  await page.getByRole('link', {name:'Herramientas .NET', exact:true}).click();
  await page.locator('.tools-reference h1').waitFor();
  check((await page.locator('.tools-reference').innerText()).includes('.NET no es un plugin'), 'SDK y extensiones son conceptos distintos');
  const commands = await page.locator('.tools-reference pre code').allTextContents();
  check(commands.includes('dotnet --info'), 'Diagnóstico de SDK');
  check(commands.includes('code --install-extension ms-dotnettools.csdevkit'), 'Identificador oficial de extensión');
  check(commands.some(text => text.startsWith('dotnet build')), 'Comando build');
  check(commands.some(text => text.startsWith('dotnet run')), 'Comando run');
  await page.reload();
  await page.locator('.tools-reference h1').waitFor();
  check(page.url().endsWith('#/herramientas-dotnet'), 'La sección sobrevive a recarga');
  await page.setViewportSize({width:375,height:812});
  check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Sin desborde móvil');
  await page.locator('#search').fill('using');
  await page.getByRole('heading', {name:'Resultados de búsqueda'}).waitFor();
  check(await page.locator('.lesson-list a').count() > 0, 'Buscar desde herramientas');
  await page.setViewportSize({width:1440,height:1000});
  return {passed:true,base,checks:['herramientas','SDK','VS Code','comandos','recarga','móvil','búsqueda']};
}
