# Component Inventory

Estado de componentes para evitar duplicación y mantener consistencia.

## Base UI

| Componente       | Estado | Notas                                               |
| ---------------- | ------ | --------------------------------------------------- |
| `Container`      | todo   | Ancho máximo y paddings responsive estables.        |
| `Section`        | todo   | Wrapper semántico con spacing vertical consistente. |
| `SectionHeading` | todo   | Eyebrow, title, description opcionales.             |
| `Button`         | todo   | Variantes principales + focus visible sólido.       |
| `Badge`          | todo   | Uso en labels y highlights cortos.                  |
| `Card`           | todo   | Base reusable para servicios/casos/bloques.         |

## Layout

| Componente     | Estado | Notas                                            |
| -------------- | ------ | ------------------------------------------------ |
| `Navbar`       | todo   | Variante desktop/mobile, estados activos claros. |
| `Footer`       | todo   | Navegación secundaria + CTA suave de cierre.     |
| `Header shell` | todo   | Solo si se necesita wrapper adicional por ruta.  |

## Secciones Home

| Sección               | Estado | Notas                                   |
| --------------------- | ------ | --------------------------------------- |
| `HeroSection`         | todo   | Foco en titular, subheadline y CTA(s).  |
| `StatementSection`    | todo   | Mensaje diferencial editorial.          |
| `ServicesSection`     | todo   | Cards + microinteracciones sobrias.     |
| `ProcessSection`      | todo   | Etapas del proceso en orden claro.      |
| `FitSection`          | todo   | Calificación de cliente/proyecto ideal. |
| `TechApproachSection` | todo   | Enfoque técnico y calidad de ejecución. |
| `FinalCTASection`     | todo   | Cierre y acción principal.              |

## Motion Wrappers

| Componente      | Estado | Notas                             |
| --------------- | ------ | --------------------------------- |
| `Reveal`        | todo   | Entrada suave on-scroll/viewport. |
| `StaggerGroup`  | todo   | Stagger para listas/cards/textos. |
| `ScrollSection` | todo   | Solo donde haya narrativa real.   |

## Regla de uso

- Antes de crear un componente nuevo: revisar este inventario.
- Si existe uno similar: extender variante en vez de duplicar.
- Actualizar estado a `in-progress` / `done` al avanzar.
