# Análisis profundo del Home de Vorello

> Análisis como Director Creativo Senior, UX Strategist, Copywriter Premium y Motion Designer.
> Revisión completa de estructura, copy, diseño, motion, conversión y mobile.

---

## A. Diagnóstico general del home

### ✅ Qué funciona

1. **Sistema de diseño sólido.** Tokens, paleta de colores, tipografía y componentes reutilizables bien estructurados. La base técnica es fuerte.
2. **Paleta oscura coherente.** El uso de `carbon-black`, `graphite-metal` y los acentos violeta/azul genera una atmósfera premium consistente.
3. **GSAP bien implementado.** ScrollTrigger, matchMedia para reduced-motion, timelines limpios. El código de animación es profesional.
4. **Navegación y accesibilidad.** Roles ARIA en sliders, `focus-visible`, semántica HTML correcta. Buena base.
5. **Sección de Proceso.** Bento grid en desktop, slider con snap en mobile, dot indicators — bien resuelto funcionalmente.
6. **Fit / Cliente ideal.** Concepto acertado. Pocas agencias se atreven a decir "no encajamos si…". Genera confianza y filtra.
7. **Copy general.** Evita las frases cliché que el brand-brief prohíbe. El tono es correcto en un 70%.

### ❌ Qué no funciona

1. **El Hero no tiene presencia visual.** El lado derecho es un isotipo flotando con órbitas de partículas transparentes. Un visitante nuevo no ve producto, no ve interfaz, no ve capacidad técnica. Ve un logo animado. **Eso no comunica "estudio que construye productos digitales".**
2. **Headline demasiado abstracto.** "Diseño. Tecnología. Producto." son tres sustantivos sueltos. No hay verbo, no hay propuesta, no hay tensión. Es un eslogan, no una declaración de valor. Funciona como tagline auxiliar, no como pieza central del hero.
3. **Falta una sección de "Por qué Vorello" / Diferencial.** El Statement lo intenta, pero es solo un párrafo. No hay una sección que expanda los pilares diferenciales con suficiente peso visual y argumentativo.
4. **No hay casos de estudio ni prueba social.** Cero screenshots de producto, cero resultados, cero testimonios, cero logos de clientes. Para un estudio que cobra premium, la ausencia de work es un agujero de credibilidad enorme.
5. **MidCTA interrumpe la narrativa.** Aparece entre Technologies y Fit sin conexión contextual. Es un banner publicitario dentro del propio sitio. Rompe el ritmo.
6. **TechScaleDividers son decorativos sin función.** `+ REG_01 // SEC_DIV` y `+ SCALE_X_10 // SEC_DIV` son ornamentos que imitan dashboards pero no comunican nada. En un estudio que valora "diseño con propósito", este tipo de adornos son contraproductorios — dan aspecto de template.
7. **TracingBeam de Aceternity.** Un beam lateral siguiendo el scroll es un efecto visto en cientos de sitios que usan Aceternity. Le quita identidad propia a Vorello.
8. **Tecnologías como lista plana.** 4 cards con chips de nombres (Next.js, React, etc.) es un formato que cualquier freelance pone en su portfolio. No comunica criterio técnico, solo herramientas.
9. **CTA final débil.** "Diseñemos y desarrollemos tu próximo sistema digital" es correcto pero no potente. No hay urgencia, no hay escasez, no hay gancho emocional.
10. **Dos CTAs redundantes.** "Iniciar proyecto" aparece en Hero, en cada card de servicio, en MidCTA y en CTA final. Sin variación ni progresión. Se siente repetitivo.

### 🟡 Qué falta

| Ausencia | Impacto |
|---|---|
| **Casos de estudio / Work** | Sin prueba social, la promesa de calidad queda vacía |
| **Sección de Diferencial expandida** | El Statement es muy breve para anclar el posicionamiento |
| **Métricas o resultados** | Nada cuantificable que respalde la promesa técnica |
| **Elemento visual de producto en el hero** | Sin UI/mockup, el hero podría ser de cualquier agencia |
| **Transición narrativa entre secciones** | Las secciones están yuxtapuestas, no enlazadas |

### ⚠️ Qué debilita la percepción premium

- Los TechScaleDividers con micro-texto de código decorativo.
- El TracingBeam lateral (grita "template Aceternity").
- Cards de servicios con estructura idéntica a miles de sitios genéricos.
- Ausencia total de work real o mockups de producto.
- Hero con isotipo y partículas CSS — parece un ejercicio de motion, no una declaración de marca.
- Copy del MidCTA ("Buscamos proyectos que demanden diseño riguroso…") suena a filtro exclusivista sin estar respaldado por evidencia de capacidad.

---

## B. Orden ideal de secciones

### Estructura propuesta

| # | Sección | Objetivo | Justificación |
|---|---|---|---|
| 1 | **Navbar** | Navegación + CTA rápido | Constante |
| 2 | **Hero** | Impacto + claridad inmediata | Primera impresión. Debe responder qué, cómo y por qué en 5 segundos |
| 3 | **Statement / Manifiesto** | Anclar posicionamiento | Después del impacto visual, profundizar con una declaración de principios que genere resonancia |
| 4 | **Servicios** | Claridad comercial | El visitante ya sabe qué eres y qué piensas. Ahora necesita saber qué puedes hacer por él |
| 5 | **Work / Casos seleccionados** | Prueba social | Inmediatamente después de prometer capacidad, demostrarla con evidencia visual |
| 6 | **Diferencial / Por qué Vorello** | Diferenciación + confianza | Explicar por qué la ejecución de Vorello es diferente. Anclar los pilares |
| 7 | **Proceso** | Metodología + confianza | Mostrar que hay un sistema detrás. Reduce incertidumbre |
| 8 | **Tecnologías** | Solidez técnica | Complemento del proceso. Muestra las herramientas elegidas con criterio |
| 9 | **Fit / Cliente ideal** | Filtro + calificación | Cerca del final, para que solo quien resuene llegue al CTA |
| 10 | **CTA final** | Conversión | Cierre con claridad sobre el siguiente paso |
| 11 | **Footer** | Cierre + navegación auxiliar | Constante |

### Cambios clave respecto al actual

- **Se agrega Work** entre Servicios y Diferencial (sección crítica ausente).
- **Se agrega Diferencial expandido** como sección propia con peso visual.
- **Se elimina MidCTA.** Su función se absorbe en el Diferencial y el CTA final.
- **Espaciado y Padding-X**:
  - Se reestructuró `Container.tsx` para no mezclar `max-w` y `mx-auto` en anchos de pantalla que no lo requieren (es decir, en viewports menores a `2xl`). El contenedor ahora ocupa el `w-full` responsivo en móvil, tablet y laptops medianas/grandes, y aplica `2xl:max-w-7xl` y `2xl:mx-auto` de forma limpia y exclusiva a partir del breakpoint de pantallas ultra anchas (`2xl`, ≥1536px).
  - Se configuró una escala de padding horizontal gradual y responsiva (`px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-8`) para que el contenido no quede pegado a los bordes laterales y respire de forma óptima a través de todas las resoluciones de pantalla.
  - Se implementó la prop `spacing` en `Container.tsx` (con soporte para `"default"`, `"roomy"` y `"none"`) y se asignó `spacing="roomy"` en el Hero (`Hero.tsx`) para aumentar de manera responsiva los márgenes horizontales de esa sección (`px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 2xl:px-12`), dándole un aspecto visual premium e impecable.
  - Se alineó de forma pixel perfect el componente `tracing-beam.tsx` configurando su div contenedor interno con la escala de padding-x `"default"` de igual forma (`w-full` responsivo con sus correspondientes padding-x y aplicando `2xl:max-w-7xl 2xl:mx-auto` solo en `2xl`). Esto previene cualquier desvío de la línea respecto a los bordes izquierdos de las secciones de contenido.
- **Resolución y Nitidez del Isotipo**: 
  - Se reemplazó el uso de la imagen rasterizada a baja resolución `/assets/isotipo.webp` por la importación estática del archivo de alta resolución `isotipo.png` en `Logo.tsx`, `HeroProductPreview.tsx` y `MockupDashboard.tsx`.
  - Next.js ahora autogenera srcsets adaptativos de alta densidad (2x/3x para pantallas Retina), manteniendo los logos e isotipos 100% nítidos bajo cualquier nivel de zoom del navegador o en transformaciones 3D.
- **0 imágenes nuevas**: Los mockups usan los assets preexistentes del proyecto de forma más optimizada y renderizada.viders.** Se reemplazan con spacing generoso y transiciones de fondo.
- **Se elimina TracingBeam.** La coherencia visual se logra con ritmo de spacing, no con un efecto lateral genérico.

### Narrativa secuencial

```
IMPACTO → FILOSOFÍA → CAPACIDAD → EVIDENCIA → DIFERENCIA → MÉTODO → HERRAMIENTAS → FILTRO → ACCIÓN
```

Cada sección construye sobre la anterior: el hero captura, el statement ancla, los servicios aclaran, el work demuestra, el diferencial convence, el proceso tranquiliza, las tecnologías respaldan, el fit filtra, y el CTA convierte.

---

## C. Recomendaciones de copy

### Hero

#### Headline actual
> Diseño. Tecnología. Producto.

**Problema:** Son tres sustantivos. No hay verbo, no hay acción, no hay tensión. Es un tagline, no un headline. Funciona como badge decorativo, no como pieza central.

#### Alternativas propuestas

**Opción A — Conceptual / editorial:**
> Productos digitales que funcionan como deberían

**Opción B — Orientado a producto:**
> Diseño. Desarrollo. Producto digital completo.

**Opción C — Más comercial / conversión:**
> Tu próximo producto digital, bien pensado desde el primer pixel

**Recomendación:** Opción A como headline principal. Es sobrio, tiene una idea implícita fuerte ("como deberían" sugiere que la mayoría no lo logra), no exagera y posiciona criterio.

#### Subheadline actual
> Diseñamos y desarrollamos productos bien pensados, visualmente cuidados y técnicamente sólidos.

**Veredicto:** Es sólido. Es la frase core del brand brief. Se puede mantener casi intacta, pero con un ajuste para mayor fluidez:

> Diseñamos y desarrollamos productos digitales con criterio visual, base técnica sólida y capacidad de escalar.

#### CTA principal
- Actual: "Iniciar proyecto" ✅ Correcto, directo.
- Alternativa premium: **"Hablar de mi proyecto"** — más humano, menos transaccional.

#### CTA secundario
- Actual: "Conoce nuestros servicios" — correcto pero genérico.
- Alternativa: **"Ver cómo trabajamos"** — invita a explorar la narrativa del site.

---

### Statement / Manifiesto

#### Actual
> No construimos páginas aisladas, sino sistemas digitales pensados para funcionar, escalar y generar resultados reales.

**Veredicto:** Es bueno. Es la frase core del diferencial según el brand brief. Se puede mantener como está. El word-split reveal con blur es un buen efecto editorial para esta pieza.

#### Subtexto actual
> Trabajamos con proceso, estándares altos y tecnología moderna. El resultado se nota en cada detalle.

**Mejora:**
> Cada decisión de diseño, cada línea de código y cada interacción están pensadas para generar valor, no solo impresionar.

---

### Servicios

#### Heading actual
> "Productos digitales con criterio y ejecución técnica"

**Mejora:**
> "Tres áreas de enfoque, un mismo estándar"

#### Descripción actual
> "Combinamos estrategia, diseño UX/UI y desarrollo moderno para crear soluciones digitales con base sólida y capacidad de evolución."

**Mejora:**
> "No ofrecemos catálogo. Trabajamos tres líneas de servicio con profundidad técnica y criterio de producto."

---

### Proceso

#### Heading actual
> "De la idea al producto, con proceso y criterio"

**Veredicto:** Correcto. Se puede mantener.

---

### Tecnologías

#### Heading actual
> "Herramientas elegidas con criterio"

**Veredicto:** Bueno. Comunica intención detrás de la selección.

#### Descripción actual
> "No seguimos tendencias. Seleccionamos tecnologías probadas que garantizan rendimiento, escalabilidad y mantenibilidad a largo plazo."

**Mejora sutil:**
> "Elegimos herramientas probadas, no populares. Cada tecnología en nuestro stack responde a un criterio de rendimiento, mantenibilidad y escala."

---

### Fit / Cliente Ideal

#### Heading actual
> "Criterios de colaboración estratégica"

**Mejora (más directo):**
> "Trabajamos mejor con cierto tipo de proyectos"

---

### CTA Final

#### Heading actual
> "Diseñemos y desarrollemos tu próximo sistema digital"

**Mejora:**
> "¿Tienes un proyecto que merece ser bien construido?"

Más conversacional, menos genérico, genera una pregunta que el visitante se responde internamente.

#### Descripción actual
> "Cuéntanos sobre tus objetivos de negocio. Analizaremos tu caso particular sin compromiso para proponerte una estrategia de producto y tecnología a medida."

**Mejora:**
> "Cuéntanos qué necesitas. En menos de 24 horas hábiles te respondemos con una propuesta de enfoque clara, sin compromiso."

---

### Frases que evitar en todo el sitio

| ❌ Evitar | ✅ Usar en su lugar |
|---|---|
| "Soluciones digitales" | "Productos digitales" |
| "Impulsamos tu negocio" | (No usar) |
| "Transformamos ideas en realidad" | (No usar) |
| "Tu agencia de confianza" | (No usar) |
| "Innovación disruptiva" | (No usar) |
| "Llave en mano" | "De principio a fin" |
| "360 grados" | (No usar) |
| "A medida" (repetido) | Usar con moderación, no más de 2 veces |
| "Criterio" (repetido 8+ veces en el home) | Variar: "intención", "dirección", "enfoque" |

> [!WARNING]
> La palabra "criterio" aparece demasiado en el home actual. Está en Hero, Statement, Services heading, Technologies heading y MidCTA. Pierde fuerza por repetición. Repartirla mejor o usar sinónimos.

---

## D. Recomendaciones visuales

### Composición y layout

| Aspecto | Estado actual | Recomendación |
|---|---|---|
| **Hero visual** | Isotipo con órbitas CSS | Reemplazar con mockup de producto real o composición UI. Un estudio premium debe mostrar producto |
| **Ritmo vertical** | TechScaleDividers artificiales | Eliminar dividers. Usar spacing generoso (py-28 → py-36 en desktop) y cambios sutiles de fondo entre secciones |
| **Cards de servicio** | Tres columnas iguales | Considerar layout asimétrico (card grande + 2 menores) para jerarquía visual |
| **Proceso bento grid** | Funciona bien en desktop | Mantener. Es el componente más sofisticado del home |
| **Tecnologías** | Lista plana vertical | Considerar un layout en 2×2 grid o un diagrama de stack visual (capas apiladas de verdad) |

### Jerarquía tipográfica

- **Headline del Hero:** `font-bebas text-9xl` funciona como tipo display condensado. ✅ Mantener.
- **Section headings:** `text-5xl font-bold` — consistente pero monótono. Considerar usar Bebas Neue para headings de sección principales y Space Grotesk bold para subheadings, creando **dos niveles tipográficos claros**.
- **Body copy:** `text-base / text-lg` Space Grotesk — correcto y legible.
- **Mono/code:** `font-mono` para eyebrows — buen detalle técnico.

### Uso de fondos y profundidad

- Los `radial-gradient` sutiles en Services y Process son correctos.
- **Falta:** una sección con background invertido o un tratamiento visual que rompa la monotonía del `carbon-black` constante. Considerar que la sección de Diferencial o Work use un fondo `graphite-metal` completo con bordes sutiles, creando una "caja" visual que rompa el scroll lineal.

### Ideas para elevar el wow factor

1. **Hero con mockup de UI real.** Una composición de múltiples pantallas/interfaces (dashboard, e-commerce, site corporativo) flotando en perspectiva con parallax en scroll. Esto muestra capacidad, no solo estética.
2. **Sección de Work con hover reveal.** Cards que al hover muestran el antes/después o revelan la interfaz completa con un clip-path animado.
3. **Número estilo counter** en el Diferencial. Grandes números (`300+`, `99%`, `< 2.5s`) que se animan al entrar en viewport. Cuantificar la promesa.
4. **Grid dot pattern** como textura de fondo en una sección, con mask-image radial que la concentre al centro. Ya se usa parcialmente pero sin suficiente protagonismo.
5. **Glassmorphism selectivo.** Una sola card con backdrop-blur y border semi-transparente, no en todas. Highlight visual para el elemento más importante.

---

## E. Sistema de animaciones

### Principios

- **Consistencia de timing:** Base de `0.6s` para entradas principales, `0.4s` para elementos secundarios.
- **Ease principal:** `power2.out` para entradas, `power2.inOut` para exits/hovers.
- **Sin animaciones infinitas** excepto en el hero (floating idle aceptable si es sutil).
- **Scroll-driven animations** con `scrub` solo para elementos editoriales (Statement word reveal). No para contenido funcional.

### Por sección

| Sección | Animación actual | Evaluación | Recomendación |
|---|---|---|---|
| **Hero** | Fade/slide-in secuencial + floating isotipo + órbitas CSS | Correcto en timing, débil en impacto visual | Reemplazar isotipo por mockup con parallax sutil. Mantener stagger de texto. Eliminar órbitas |
| **Statement** | Word-by-word blur reveal con scrub | ✅ Excelente. Es el mejor efecto del home | Mantener tal cual. Posiblemente el momento más editorial del site |
| **Services** | 3D rotationX + stagger inner + hover accent line | Correcto, quizás over-engineered para cards simples | Simplificar. Eliminar el rotationX. Mantener stagger y accent line hover |
| **Process** | Heading stagger + 3D card reveal + inner stagger | Bueno en desktop, bien adaptado en mobile slider | Mantener. Reducir levemente la duración del stagger (0.1 → 0.08) para mayor snappiness |
| **Technologies** | Card stagger + chip stagger + mouse-follow glow | Demasiadas capas de efecto para contenido informativo | Simplificar. Mantener stagger de cards. Eliminar el mouse-follow glow — no aporta valor aquí |
| **MidCTA** | Line scale + glow + text slide + button pop | Over-animated para un banner CTA | **Eliminar la sección entera** |
| **Fit** | 3D rotationY cards + icon pop + item stagger | Correcto y coherente | Mantener |
| **CTA final** | Card scale + glow + stagger text + button spring | Bueno pero el spring bounce es excesivo | Reducir el `back.out(1.2)` a `power2.out`. Más sobrio = más premium |

### Hover states recomendados

| Elemento | Hover actual | Recomendación |
|---|---|---|
| **Service cards** | Border violet + accent line + icon color | ✅ Bueno. Mantener |
| **Process cards** | Mouse-follow glow + border glow SVG | Demasiado complejo. Simplificar a border color + icon color |
| **Tech layer cards** | Mouse-follow glow + theme-color border | Simplificar a border-color change + chip highlight |
| **Fit cards** | Scale + accent line + icon scale | ✅ Correcto |
| **Buttons** | `scale(1.02)` active `scale(0.98)` | ✅ Correcto y sutil |

### Qué evitar

- ❌ **Animaciones de spin infinitas** (las órbitas del hero).
- ❌ **Mouse-follow glows en todas las cards.** Un efecto se vuelve invisible si está en todas partes.
- ❌ **Bounce/spring en CTAs.** Se siente más lúdico que premium.
- ❌ **Sweep effects en mobile vía ScrollTrigger.** Se siente artificial porque no hay mouse. El touch-start/end es suficiente.
- ❌ **Más de 3 efectos simultáneos en una misma card.** El Process card tiene: ambient glow, mouse-follow glow, border-glow SVG, icon color change, phase label color, title color change. Demasiados estímulos.

---

## F. Versión ideal del home

### Estructura final — Blueprint para diseñador/desarrollador

---

#### 1. Hero

| Aspecto | Especificación |
|---|---|
| **Objetivo** | Impacto, claridad, first impression premium |
| **Headline** | "Productos digitales que funcionan como deberían" |
| **Subheadline** | "Diseñamos y desarrollamos productos digitales con criterio visual, base técnica sólida y capacidad de escalar." |
| **CTA primario** | "Hablar de mi proyecto" → `/start` |
| **CTA secundario** | "Ver cómo trabajamos" → scroll a #proceso |
| **Visual** | Composición de 3-4 pantallas de UI real (dashboard, e-commerce, site corporativo) en perspectiva isométrica con parallax sutil en scroll |
| **Badge** | "ESTUDIO DIGITAL PREMIUM" (mantener) |
| **Background** | Dot grid con radial mask, sin órbitas ni partículas |
| **Animación** | Stagger fade-in de texto (0.5s) → parallax reveal de mockups (0.6s, `power3.out`) → floating idle en mockups (`y: -8`, `3s`, `sine.inOut`) |
| **Mobile** | Stack vertical: texto arriba, una sola pantalla de UI debajo (no ocultar el visual) |

---

#### 2. Statement / Manifiesto

| Aspecto | Especificación |
|---|---|
| **Objetivo** | Anclar filosofía, generar resonancia emocional |
| **Copy principal** | "No construimos páginas aisladas, sino sistemas digitales pensados para funcionar, escalar y generar resultados reales." |
| **Copy secundario** | "Cada decisión de diseño, cada línea de código y cada interacción están pensadas para generar valor, no solo impresionar." |
| **Visual** | Tipografía grande, fondo limpio, sin cards ni elementos decorativos |
| **Animación** | Word-by-word blur reveal con ScrollTrigger scrub (mantener actual) |
| **CTA** | No. Solo editorial |

---

#### 3. Servicios

| Aspecto | Especificación |
|---|---|
| **Objetivo** | Claridad comercial — qué hace Vorello |
| **Eyebrow** | "SERVICIOS" |
| **Heading** | "Tres áreas de enfoque, un mismo estándar" |
| **Cards** | 3 cards (Web, Producto, E-commerce) con icon + título + descripción + features + CTA |
| **Post-launch strip** | Mantener. Es un buen complemento |
| **Visual** | Cards con hover accent line + border glow sutil |
| **Animación** | Stagger fade-in (sin rotationX). Inner content reveal por card |
| **CTA por card** | "Iniciar proyecto →" (mantener) |

---

#### 4. Work / Casos seleccionados (NUEVA)

| Aspecto | Especificación |
|---|---|
| **Objetivo** | Prueba social. Demostrar, no prometer |
| **Eyebrow** | "WORK" |
| **Heading** | "Proyectos seleccionados" |
| **Contenido** | 2-3 casos con: screenshot, tipo de proyecto, resultado clave, link a caso completo (futuro) |
| **Visual** | Cards grandes con imagen a full-width, hover reveal de info, borde sutil |
| **Animación** | Stagger fade-in, image parallax sutil en scroll |
| **CTA** | "Ver caso completo →" por cada proyecto |
| **Nota** | Si no hay casos reales aún, usar mockups de proyectos propios (el propio site de Vorello, o un proyecto ficticio de alta fidelidad). La sección puede lanzarse con placeholder y evolucionar |

---

#### 5. Diferencial / Por qué Vorello (NUEVA sección expandida)

| Aspecto | Especificación |
|---|---|
| **Objetivo** | Anclar los pilares diferenciales con peso visual |
| **Eyebrow** | "POR QUÉ VORELLO" |
| **Heading** | "Criterio antes que ejecución. Diseño con propósito." |
| **Formato** | 4-6 pilares en grid (2×3 o 3×2) con icono + título corto + descripción de 1-2 líneas |
| **Pilares sugeridos** | 1. Criterio antes que ejecución — 2. Diseño con propósito — 3. Tecnología bien aplicada — 4. Proceso ordenado — 5. Calidad sobre volumen — 6. Atención al detalle |
| **Visual** | Fondo `graphite-metal` para romper el scroll negro. Cards minimalistas con borde `steel-grey/20` |
| **Animación** | Stagger reveal por pilar. Icon scale-in con `back.out` |
| **CTA** | No necesario. El flow sigue hacia Proceso |

---

#### 6. Proceso

| Aspecto | Especificación |
|---|---|
| **Objetivo** | Transparencia, metodología, confianza |
| **Mantener** | Bento grid en desktop, slider en mobile, dot indicators, inner content stagger |
| **Ajustar** | Simplificar las capas de glow. Eliminar mouse-follow glow en mobile |
| **Animación** | Heading stagger + card stagger (sin rotationX) + inner content reveal |

---

#### 7. Tecnologías

| Aspecto | Especificación |
|---|---|
| **Objetivo** | Solidez técnica, criterio de selección |
| **Ajustar** | Considerar reducir a 3 capas (Diseño, Frontend, Backend+Cloud) fusionando "Servicios y datos" con "Infraestructura" |
| **Animación** | Card stagger + chip stagger (mantener). Eliminar mouse-follow glow |

---

#### 8. Fit / Cliente Ideal

| Aspecto | Especificación |
|---|---|
| **Objetivo** | Filtrar y cualificar |
| **Mantener** | Dos cards (ideal / no ideal), hover effects, mobile slider |
| **Heading ajustado** | "Trabajamos mejor con cierto tipo de proyectos" |

---

#### 9. CTA Final

| Aspecto | Especificación |
|---|---|
| **Objetivo** | Conversión |
| **Heading** | "¿Tienes un proyecto que merece ser bien construido?" |
| **Description** | "Cuéntanos qué necesitas. En menos de 24 horas hábiles te respondemos con una propuesta de enfoque clara, sin compromiso." |
| **CTA primario** | "Hablar de mi proyecto" → `/start` |
| **CTA secundario** | "Contacto general" → `/contact` |
| **Footer note** | "Tiempo estimado de respuesta: < 24 horas hábiles" (mantener) |
| **Animación** | Card scale-in + stagger text + button fade (sin spring) |

---

#### 10. Footer

| Aspecto | Especificación |
|---|---|
| **Mantener** | Como está (asumo que funciona correctamente) |

---

## G. Prioridades

### 🔴 Prioridad alta — Impacto inmediato

| Mejora | Razón |
|---|---|
| **Reemplazar visual del Hero** | El isotipo con órbitas no comunica producto. Un mockup de UI es obligatorio para un estudio digital premium |
| **Eliminar TracingBeam** | Efecto genérico de template Aceternity. Le quita identidad propia |
| **Eliminar TechScaleDividers** | Decoración sin función. Debilita la percepción de "diseño con propósito" |
| **Agregar sección Work** (aunque sea con mockups) | Sin prueba social, toda la propuesta de calidad queda sin respaldo |
| **Revisar copy del Hero** | Headline más fuerte, subheadline más fluido |
| **Eliminar MidCTA** | Rompe la narrativa. Su función se absorbe en otras secciones |

### 🟡 Prioridad media — Elevar calidad

| Mejora | Razón |
|---|---|
| **Agregar sección Diferencial expandida** | El Statement solo no ancla suficientemente los pilares |
| **Simplificar animaciones de cards** | Reducir capas de glow/effects. Menos estímulo = más premium |
| **Variación de CTAs** | No repetir "Iniciar proyecto" 4 veces idéntico |
| **Reducir repetición de "criterio"** | Aparece 8+ veces en el home. Variar vocabulario |
| **Ajustar CTA final** | Heading más conversacional, menos genérico |

### 🟢 Prioridad baja — Refinamiento

| Mejora | Razón |
|---|---|
| **Layout asimétrico en Services** | Una card destacada + dos menores. Más editorial |
| **Fusionar capas de Tecnologías** | 4 capas es demasiado detalle para un home. 3 es suficiente |
| **Contadores animados en Diferencial** | Nice-to-have para wow factor |
| **Glassmorphism selectivo** | Un solo elemento con backdrop-blur. Punto focal |

---

## H. Recomendación final

Si tuviera que convertir este home en una web realmente wow y premium para lanzar Vorello con percepción fuerte desde el día uno, haría esto — en este orden:

### 1. Matar los accesorios genéricos

Eliminar TracingBeam, TechScaleDividers y MidCTA. Son tres elementos que gritan "template" y que no aportan valor narrativo. Un sitio premium se diferencia por lo que **no** tiene, no por cuántos efectos acumula.

### 2. Reconstruir el Hero como declaración de producto

El hero es el 80% de la primera impresión. Necesita:
- Un headline con intención (no solo sustantivos).
- Una composición visual que muestre interfaces reales (dashboards, UIs, sites).
- Parallax sutil, no órbitas decorativas.
- El isotipo puede quedar en el Navbar, no necesita protagonismo central.

### 3. Agregar Work aunque no haya clientes todavía

Crear 2-3 mockups de alta fidelidad de proyectos ficticios o del propio site de Vorello. Etiquetarlos como "Proyecto interno" o "Concepto". Un estudio premium sin work visible es como un restaurante sin carta — nadie entra.

### 4. Crear la sección Diferencial con peso visual

No alcanza con un párrafo en el Statement. Los pilares de Vorello (criterio, diseño, tecnología, proceso, calidad, detalle) necesitan una sección propia con cards, iconos y espacio para respirar.

### 5. Limpiar el sistema de animaciones

Reducir el mouse-follow glow a **una sola sección** (Proceso, que es la más compleja). Eliminar springs de CTAs. Mantener el word-reveal del Statement como pieza editorial estrella. La regla: si un efecto está en todas las secciones, no es especial — es ruido.

### 6. Ajustar el copy para evitar monotonía

Variar "criterio", introducir verbos más fuertes, usar preguntas en headings cuando sea natural ("¿Tienes un proyecto que merece ser bien construido?"). El tono debe sentirse seguro sin ser repetitivo.

### 7. Pensar la experiencia mobile como una versión propia, no una reducción

El hero actual oculta completamente el visual en mobile. El slider de Proceso funciona bien, pero las 7 cards son demasiadas para swipear. Considerar agrupar en fases (Estrategia = 01+02, Ejecución = 03+04+05, Post-launch = 06+07) para mobile.

---

> [!IMPORTANT]
> **La diferencia entre un sitio que "se ve bien" y uno que genera percepción premium no está en cuántos efectos tiene, sino en cuántos *no* tiene.** Vorello tiene una base técnica excelente, un sistema de diseño sólido y un copy que evita los errores comunes. Lo que falta es **edición**: quitar lo que sobra, agregar lo que demuestra capacidad (work), y concentrar la atención en menos momentos pero más potentes.

