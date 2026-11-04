# Guía de estudio C# y .NET
Objetivo: documentar el curso con evidencia local y fuentes oficiales. Rama: no disponible (carpeta sin Git).
Entrega: documentación local, sin publicación ni inicialización de Git. Verificación: dotnet build y ejecución de consola.

## Specs
- S1: "Analiza este repositorio" y "verifica la organizacoin de mis proyectos".
- S2: "esta pensado en seguir la ruta de https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/create-and-run-simple-c-sharp-console-applications/read-and-write-files-in-c-sharp para obtener la certificacion".
- S3: "esta pensado en ir aprendiendo https://learn.microsoft.com/en-us/training/modules/csharp-read-write-files/2-open-close-files-safely-with-using".
- S4: "analiza mi usuario https://learn.microsoft.com/en-us/users/diegomedardosaavedragarcia-3950/".
- S5: "documenta en español latino de ecuador cada seccion para mesclar en el repositorio tanto la teorica como /// documentacion oficial del proyecto y la practica".
- S6: "incluye los test que estan implementados para poder repasar de todo lo que tiene que ver a csharp y .net necesario para la certificacion".

## Tasks
- T1 | S1-S4,S6 | inline + consulta de fuentes delegada | done | Sin commit: no hay Git. Inventario de ocho proyectos; no hay suite de pruebas; build inicial falla con CS5001 en 6 y 8. Perfil verificado después del aviso de sesión iniciada: 7 insignias, 1 trofeo, nivel 4 y archivos al 18 %.
- T2 | S2-S3,S5-S6 | inline | done | Escritos y leídos de vuelta: índice, ocho guías, ruta, XML y pruebas. Agregados solo comentarios XML a BillingCalculator; sin cambio de lógica.
- T3 | S1-S6 | inline | done | Verificación documental completada: 12 documentos con enlaces/bloques correctos, XML compilado y seis programas con stdout exacto, stderr vacío y exit 0. Build global fallido registrado, no corregido. Sin veredicto nativo.

## Log
L1: Analiza este repositorio, esta pensado en seguir la ruta de https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/create-and-run-simple-c-sharp-console-applications/read-and-write-files-in-c-sharp para obtener la certificacion, esta pensado en ir aprendiendo https://learn.microsoft.com/en-us/training/modules/csharp-read-write-files/2-open-close-files-safely-with-using, analiza mi usuario https://learn.microsoft.com/en-us/users/diegomedardosaavedragarcia-3950/ verifica la organizacoin de mis proyectos, documenta en español latino de ecuador cada seccion para mesclar en el repositorio tanto la teorica como /// documentacion oficial del proyecto y la practica, incluye los test que estan implementados para poder repasar de todo lo que tiene que ver a csharp y .net necesario para la certificacion

L2: Inspeccionados todos los .cs, .csproj y .slnx. .NET SDK 10.0.403. Sin Git ni pruebas automatizadas existentes. Se conserva el comportamiento y la estructura; reorganización y nuevas pruebas de framework no se presuponen autorizadas. Documentación pasiva: no corresponde RED/GREEN de comportamiento.
L3: dotnet build curso_net.slnx falla: CS5001 en 6-functions y 8-files porque sus programas solo contienen comentarios. Resultado en .checks/build-inicial.log. No se marca la solución como compilable.
L4: Microsoft Learn confirma seis rutas y el módulo de archivos dentro de la parte 2 actual. freeCodeCamp requiere JavaScript; fetch del perfil devolvió solo la plantilla. La consulta delegada no entregó evidencia utilizable, por lo que no se usa como fuente.
L5: Pronóstico: unas 650 líneas de documentación, sin PR ni entrega remota; no hay commits posibles en esta carpeta sin inicializar Git, acción fuera del alcance.

L6: Usuario: “ahora estas login”. El navegador muestra el perfil solicitado: 7 insignias, 1 trofeo, nivel 4; parte 1 y módulos de bucles, listas y código reutilizable completados; archivos al 18 %. Se actualizan las conclusiones; no se copia el correo ni se realizan acciones de progreso en la cuenta.

L7: Verificación final: 12 documentos con enlaces locales y bloques correctos; build individual de facturación con XML correcto (clase, método, tres parámetros y retorno); seis prácticas activas con stdout completo, stderr vacío y exit 0; notes.txt conservado. Evidencia: .checks/verificacion.log. No se probaron código comentado, casos futuros ni todas las ramas aleatorias. Build global falló inicialmente por CS5001 preexistente en 6 y 8 y no se corrigió: este trabajo documenta, no activa prácticas.
L8: ASSESS nativo devolvió nativeRisk=unassessable por requerir declaración explícita de archivos no rastreados. Plan: autoverificación, sin verificador independiente. Sin candidato, revisión ni aprobación nativa; no se inició otro ciclo. Risk: none: el único cambio C# son comentarios XML; no se cambian lógica, dependencias, contratos ni helpers compartidos.
L9: Entrega local terminada. Siguiente mejora propuesta, no implementada: completar puntos de entrada de 6 y 8 y definir una suite de pruebas. La confirmación de certificación final y requisitos dinámicos vigentes de freeCodeCamp no se obtuvo.
