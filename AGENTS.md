# AGENTS.md — Instrucciones operativas para agentes de código

## 1. Alcance del repo

- Este repo contiene la web pública de Vorello.
- El objetivo del agente es implementar, refactorizar y mantener código del proyecto.
- No definir estrategia de marca dentro de este archivo.
- Para decisiones de UI, tono visual o copy, leer obligatoriamente:
  - `docs/brand-brief.md`
- Si una decisión visual o de texto no está clara, mantener consistencia con `docs/brand-brief.md`.

## 2. Stack real del proyecto

- Framework: Next.js
- Lenguaje: TypeScript
- UI: React
- Estilos: Tailwind CSS
- Componentes visuales avanzados: Aceternity UI
- Deploy esperado: Vercel
- Arquitectura: componentes reutilizables, secciones modulares y datos separados cuando aplique.

### Fuentes de diseño y copy

- `docs/brand-brief.md` (fuente de verdad para dirección visual, tono y contenido)
- Figma (si existe diseño activo para la tarea)

### Regla Next.js breaking changes

- Antes de asumir APIs, convenciones o comportamiento de Next.js, revisar la documentación local instalada.
- Para cambios relacionados con routing, metadata, layouts, server/client components, imágenes, fonts, cache, actions o config, consultar:
  - `node_modules/next/dist/docs/`
- No implementar usando conocimiento desactualizado si la versión instalada del proyecto indica otra cosa.

## 3. Estructura de carpetas y convenciones

### `app/`

- Contiene rutas, layouts y páginas del App Router.
- Mantener las páginas lo más limpias posible.
- Las páginas deben componer secciones, no contener toda la UI inline.
- Usar `layout.tsx`, `page.tsx`, `metadata` y archivos del App Router según corresponda.

### Componentes

- Ubicar componentes reutilizables en una carpeta clara, por ejemplo:
  - `src/components/ui/`
  - `src/components/layout/`
  - `src/components/sections/`
  - `src/components/aceternity/` para componentes importados o adaptados desde Aceternity UI, si aplica.

Convención sugerida:

```txt
src/
  app/
  components/
    ui/
    layout/
    sections/
    aceternity/
  styles/
  data/
  lib/
  types/
```

- `ui/`: piezas base reutilizables.
  - Button
  - Badge
  - Container
  - Section
  - SectionHeading
  - Card
- `layout/`: estructura general.
  - Navbar
  - Footer
  - Header
- `sections/`: bloques específicos de páginas.
  - Hero
  - Services
  - Process
  - CTA
  - Fit
- `aceternity/`: componentes visuales avanzados basados en Aceternity UI.
- Evitar componentes gigantes.
- Extraer lógica repetida.
- Nombrar componentes en PascalCase.
- Mantener props tipadas con TypeScript.

### Estilos

- Usar Tailwind CSS como sistema principal de estilos.
- Evitar CSS global salvo para:
  - tokens base
  - reset mínimo
  - variables CSS
  - estilos realmente globales
- No duplicar clases complejas si pueden extraerse a componentes o utilidades.
- Mantener consistencia de spacing, radios, sombras, tipografía y colores.

### Datos

- Si una sección tiene contenido repetible, moverlo a:
  - `src/data/`
- Ejemplos:
  - servicios
  - pasos del proceso
  - navegación
  - FAQs
  - beneficios
- Evitar hardcodear arrays grandes dentro de componentes visuales.

## 4. Reglas de implementación UI

### Dirección visual

- El diseño debe ser moderno, oscuro, premium y tecnológico.
- Priorizar una estética sobria, elegante y cuidada.
- Usar Aceternity UI como apoyo para componentes visuales avanzados, efectos, fondos, cards, grids o microinteracciones cuando aporte valor.
- Adaptar los componentes de Aceternity UI al sistema visual de Vorello; no usarlos como plantilla genérica sin criterio.
- Evitar diseños claros, coloridos o con estética de agencia genérica.

### Tokens visuales

- Usar los tokens definidos en el proyecto y alineados con `docs/brand-brief.md`.
- No introducir colores arbitrarios sin justificación.
- Mantener consistencia en:
  - colores
  - tipografía
  - espaciados
  - border radius
  - sombras
  - bordes
  - gradientes
  - estados hover/focus

### Responsive

- Todo componente debe funcionar correctamente en:
  - mobile
  - tablet
  - desktop
- Diseñar mobile-first cuando sea razonable.
- Evitar layouts que dependan de tamaños fijos frágiles.
- Verificar overflow horizontal.
- Cuidar jerarquía visual en pantallas pequeñas.

### Accesibilidad

- Usar HTML semántico.
- Mantener jerarquía correcta de headings.
- Todo botón o link debe tener propósito claro.
- Elementos interactivos deben tener estados:
  - hover
  - focus-visible
  - disabled cuando aplique
- No usar `div` como botón si corresponde `button` o `a`.
- Imágenes relevantes deben tener `alt` útil.
- Imágenes decorativas pueden usar `alt=""`.
- Mantener contraste suficiente.
- No depender solo del color para comunicar estado.

### Motion

- Librería principal obligatoria: `GSAP` + `ScrollTrigger`.
- No usar Motion/Framer Motion salvo razón técnica clara y justificada.
- Usar animaciones sutiles, fluidas y con propósito.
- Aceternity UI puede utilizarse para motion, efectos visuales y microinteracciones, siempre que no afecten legibilidad ni performance.
- Evitar motion excesivo o decorativo sin función.
- Respetar `prefers-reduced-motion` cuando aplique.
- Las animaciones no deben afectar performance ni legibilidad.
- Priorizar:
  - fades suaves
  - transforms ligeros
  - transiciones de hover
  - entradas discretas
  - scroll-driven animations con criterio narrativo

## 5. Reglas de copy

- Todo copy debe ser consistente con `docs/brand-brief.md`.
- No inventar posicionamiento nuevo.
- No agregar claims exagerados, genéricos o poco verificables.
- Evitar frases cliché de agencias digitales.
- Mantener tono:
  - claro
  - directo
  - premium
  - sobrio
  - técnico cuando aporte valor
- Antes de modificar titulares, CTAs o secciones principales, revisar `docs/brand-brief.md`.
- Si el copy no está definido, crear una versión mínima coherente y fácil de ajustar.

## 6. Checklist / Definition of Done

Antes de dar una tarea por terminada:

- El código compila sin errores.
- TypeScript no presenta errores relevantes.
- La UI es responsive.
- No hay overflow horizontal.
- Los componentes están correctamente separados.
- El diseño mantiene una estética moderna, oscura y premium.
- Los componentes de Aceternity UI, si se usan, están adaptados al sistema visual de Vorello.
- El copy respeta `docs/brand-brief.md`.
- No se duplicó lógica o markup innecesariamente.
- Los estilos usan tokens y convenciones existentes.
- La accesibilidad básica está cubierta.
- Se revisaron posibles breaking changes de Next.js cuando la tarea toca APIs del framework.
- Si corresponde, se ejecutó:

```bash
npm run build
```

- Si corresponde, se ejecutó también:

```bash
npm run lint
```

- Si existe script, se ejecutó también:

```bash
npm run typecheck
```

## 7. Uso de Skills del repo

- Las skills de `skills/` son guías operativas activas, no documentación decorativa.
- Antes de implementar, elegir explícitamente la skill principal según el tipo de tarea.
- Priorizar pocas skills por tarea (1 a 3) para evitar conflictos de criterio.

Orden recomendado por tipo de trabajo:

- UI completa / secciones nuevas:
  - `skills/frontend-design/SKILL.md` (principal)
  - `skills/tailwind-design-system/SKILL.md` (si se tocan variantes/tokens)
  - `skills/accessibility-a11y/SKILL.md` (validación de accesibilidad)
- Motion:
  - `skills/gsap/gsap-react/SKILL.md`
  - `skills/gsap/gsap-scrolltrigger/SKILL.md`
  - `skills/gsap/gsap-timeline/SKILL.md` o `skills/gsap/gsap-core/SKILL.md` según complejidad
- Integración de componentes visuales:
  - `skills/aceternity-ui/SKILL.md`
- Arquitectura/patrones Next.js:
  - `skills/next-best-practices/SKILL.md` (reglas)
  - `skills/nextjs-app-router-patterns/SKILL.md` (implementación)
- Performance:
  - `skills/web-performance-optimization/SKILL.md`
- Contenido:
  - `skills/content-research-writer/SKILL.md`

Reglas de consistencia:

- Si dos skills se contradicen, prevalece este `AGENTS.md` y luego `docs/brand-brief.md`.
- Si una skill propone una librería de motion distinta, mantener `GSAP + ScrollTrigger` como estándar del repo.
- Revisar `skills/README.md` para el mapa general y combinaciones recomendadas.

## 8. Reglas de Git y Commits

- **Comportamiento ante la palabra "commit":** Si el usuario dice "commit", el agente **únicamente debe realizar `git add`** de los archivos modificados o creados en la tarea actual, evitando incluir cambios ajenos o no relacionados. No se debe ejecutar `git commit` ni `git push` a menos que el usuario lo solicite de manera explícita y directa.
- **Convención de commits:** Cuando el usuario autorice o solicite explícitamente realizar un commit, se debe seguir estrictamente la especificación de **Conventional Commits** en español:
  - Estructura: `<tipo>(<alcance>): <descripción clara en minúsculas>` (por ejemplo: `feat(ui): agregar sección de hero adaptada`).
  - Tipos válidos:
    - `feat`: Nueva funcionalidad.
    - `fix`: Corrección de un error.
    - `refactor`: Cambios en el código que no añaden funcionalidad ni corrigen errores.
    - `style`: Cambios estéticos, de formato o estilos (CSS/Tailwind) sin alterar lógica.
    - `docs`: Modificaciones en la documentación (como este archivo).
    - `chore`: Tareas de mantenimiento, dependencias o configuración del build.
    - `perf`: Cambios enfocados en mejorar el rendimiento.
- **Confirmación previa:** Mostrar siempre al usuario qué archivos se han agregado (`git status`) y proponer el mensaje de commit sugerido para que el usuario dé su aprobación antes de proceder.
