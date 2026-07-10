/**
 * Services Data Module for Vorello Agency
 * Central source of truth for Services Section in Home and dedicated /services page.
 */

export interface ServiceCategory {
  num: string;
  title: string;
  description: string;
  iconName: "Globe" | "Cpu" | "ShoppingBag";
  features: string[];
}

export interface ServiceDetail {
  id: string;
  num: string;
  title: string;
  category: string;
  headline: string;
  description: string;
  longDescription: string;
  audience: string;
  benefits: string[];
  ctaText: string;
  ctaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  trustSignals: string[];
  caseStudy: string;
  visualConcept: string;
}

export const servicesCategories: ServiceCategory[] = [
  {
    num: "01",
    title: "Experiencias web premium",
    description:
      "Sitios corporativos y landing pages con estándares altos de performance, accesibilidad y SEO técnico.",
    iconName: "Globe",
    features: [
      "Sitios corporativos premium",
      "Landing pages de alto rendimiento",
      "Optimización de Core Web Vitals",
      "SEO técnico y accesibilidad",
    ],
  },
  {
    num: "02",
    title: "Productos digitales a medida",
    description:
      "Web apps, portales, sistemas internos y flujos automatizados diseñados para operar, escalar e integrarse con tu stack existente.",
    iconName: "Cpu",
    features: [
      "Web apps y dashboards avanzados",
      "Sistemas internos y portales privados",
      "Automatización de procesos operativos",
      "Integraciones entre plataformas y APIs",
    ],
  },
  {
    num: "03",
    title: "Ecommerce premium",
    description:
      "Comercio electrónico con arquitectura headless, UX optimizada y rendimiento técnico cuidado.",
    iconName: "ShoppingBag",
    features: [
      "Arquitecturas headless",
      "Experiencia UX optimizada",
      "Integraciones con pasarelas",
      "Performance y SEO técnico",
    ],
  },
];

export const servicesDetail: ServiceDetail[] = [
  {
    id: "sitios-web",
    num: "01",
    title: "Sitios web",
    category: "Experiencias web premium",
    headline: "Tu web debe abrir conversaciones, no solo verse bien",
    description:
      "Convertir la web corporativa en un activo comercial y reputacional, no en un folleto.",
    longDescription:
      "Tu sitio web es, en muchos casos, la primera conversación que una empresa tiene con tu marca. Si esa conversación es confusa, lenta o genérica, estás perdiendo oportunidades antes incluso de que alguien te escriba. En Vorello diseñamos y desarrollamos sitios web pensados para explicar con claridad lo que haces, transmitir confianza desde el primer scroll y facilitar que la persona adecuada dé el siguiente paso.\n\nNo trabajamos una web como una suma de pantallas bonitas. La trabajamos como un sistema: estructura de mensajes, jerarquía de contenidos, diseño visual, rendimiento, experiencia móvil y base técnica preparada para crecer. Eso significa definir primero qué necesitas comunicar, a qué tipo de cliente le hablas y qué acción quieres provocar. Después, construimos una experiencia clara, rápida y mantenible, con una navegación coherente, secciones orientadas a decisión y una implementación cuidada para que el sitio no se rompa cuando el negocio evolucione.",
    audience:
      "Empresas B2B, estudios profesionales, marcas en crecimiento y compañías que necesitan renovar imagen, rendimiento o claridad comercial.",
    benefits: [
      "Más credibilidad y claridad de marca",
      "Estructura optimizada para captar decisiones",
      "Velocidad extrema y SEO técnico nativo",
      "Control editorial completo y autonomía interna",
    ],
    ctaText: "Quiero una web que convierta",
    ctaLink: "/start",
    secondaryCtaText: "Ver estructura ideal",
    secondaryCtaLink: "/contact",
    trustSignals: [
      "Performance LCP ≤ 2,5 s garantizado",
      "Diseño a medida alineado a tu marca",
      "Arquitectura modular escalable",
      "Estándares modernos de accesibilidad",
    ],
    caseStudy:
      "Cómo una nueva arquitectura de contenidos redujo la fricción comercial y mejoró la calidad de las consultas.",
    visualConcept: "Fotografía editorial de un diseñador y un fundador revisando wireframes.",
  },
  {
    id: "landing-pages",
    num: "02",
    title: "Landing pages",
    category: "Experiencias web premium",
    headline: "Una landing con un solo objetivo y cero ruido",
    description:
      "Crear páginas enfocadas a una única acción: campaña, validación, lead gen, evento o captación de demanda.",
    longDescription:
      "Cuando una página tiene demasiados mensajes, demasiados caminos y demasiadas dudas, convierte peor. Una buena landing page hace justo lo contrario: concentra la atención en una sola propuesta, elimina fricción y guía a la persona hacia una acción concreta. En Vorello diseñamos landing pages para campañas, lanzamientos, generación de leads, validación de ofertas y acciones comerciales donde el foco importa más que el volumen de contenido.\n\nEl trabajo no empieza en la interfaz. Empieza en la intención. Antes de diseñar, definimos qué tráfico va a llegar, qué expectativa trae, qué objeciones necesita resolver y qué señal nos dirá si la página está funcionando. Con esa base, estructuramos el contenido para que el mensaje principal aparezca rápido, las ventajas sean fáciles de escanear y el CTA esté respaldado por pruebas suficientes: contexto, confianza, claridad y fricción mínima.",
    audience:
      "Equipos comerciales, marketing, founders y marcas que ejecutan campañas de publicidad de pago o lanzamientos puntuales.",
    benefits: [
      "Perfecto message match entre anuncio y página",
      "Despliegue rápido para pruebas de mercado",
      "Integración completa con CRM y analítica",
      "Variantes para tests A/B y optimización",
    ],
    ctaText: "Necesito una landing para campaña",
    ctaLink: "/start",
    secondaryCtaText: "Diseñar versión A/B",
    secondaryCtaLink: "/contact",
    trustSignals: [
      "Tiempos de carga optimizados para anuncios",
      "Tracking de eventos avanzado de serie",
      "Diseño responsivo sin lagunas",
      "Integración con HubSpot, ActiveCampaign, etc.",
    ],
    caseStudy:
      "Cómo reordenar un hero, una prueba de valor y un formulario cambió la calidad de los leads.",
    visualConcept: "Equipo analizando métricas de conversión en pantalla.",
  },
  {
    id: "plataformas-web",
    num: "03",
    title: "Plataformas web",
    category: "Productos digitales a medida",
    headline: "Cuando una herramienta estándar ya no alcanza, toca construir mejor",
    description:
      "Diseñar y desarrollar productos o sistemas web que organizan operaciones, servicios, usuarios, datos o flujos internos/externos.",
    longDescription:
      "Hay un punto en el que improvisar con hojas de cálculo, herramientas desconectadas y procesos manuales deja de ser práctico y empieza a frenar el negocio. Ahí es donde una plataforma web propia deja de ser 'algo para más adelante' y se convierte en una decisión estratégica. En Vorello diseñamos y desarrollamos plataformas web para empresas que necesitan organizar operaciones, centralizar información y dar a usuarios internos o externos una experiencia más clara, más rápida y más fiable.\n\nNo entendemos una plataforma como una colección de funcionalidades. La entendemos como una herramienta de trabajo. Por eso empezamos por el flujo real: qué personas intervienen, qué decisiones se toman, qué datos se consultan, dónde se pierde tiempo y qué partes conviene automatizar, simplificar o conectar. A partir de ahí, estructuramos permisos, pantallas, módulos y lógica de negocio para que el sistema responda a la operación real, no al revés.",
    audience:
      "Empresas con procesos de trabajo propios, portales para clientes, dashboards, marketplaces o backoffices que superan las plantillas.",
    benefits: [
      "Operaciones centralizadas y trazables",
      "Sistemas de roles, permisos y seguridad",
      "Interfaces intuitivas para reducir errores",
      "Arquitectura preparada para escalar",
    ],
    ctaText: "Quiero evaluar una plataforma propia",
    ctaLink: "/start",
    secondaryCtaText: "Mapear caso de uso",
    secondaryCtaLink: "/contact",
    trustSignals: [
      "Ownership total de tu código e infraestructura",
      "Seguridad por diseño en el manejo de datos",
      "APIs robustas y extensibles",
      "Diseño UX centrado en la productividad",
    ],
    caseStudy:
      "Cómo pasar de hojas dispersas y procesos manuales a una plataforma centralizada y trazable.",
    visualConcept: "Product manager revisando un panel o dashboard complejo.",
  },
  {
    id: "ecommerce",
    num: "04",
    title: "E‑commerce",
    category: "Ecommerce premium",
    headline: "Tu tienda online no solo debe vender: debe facilitar la compra",
    description:
      "Construir o rediseñar experiencias de compra orientadas a conversión, gestión eficiente del catálogo y escalabilidad comercial.",
    longDescription:
      "Un e‑commerce no compite solo por precio o producto. Compite, sobre todo, por la facilidad con la que permite descubrir, entender y comprar. Cuando la navegación confunde, el catálogo no ayuda, la ficha no resuelve dudas o el checkout genera fricción, la tienda pierde ventas incluso si el producto interesa. En Vorello diseñamos y desarrollamos e‑commerce con una mirada combinada: experiencia de compra, estructura comercial e implementación técnica preparada para operar sin sobresaltos.\n\nNuestro enfoque empieza por la lógica de negocio. Analizamos catálogo, categorías, comportamiento esperado, puntos de decisión y necesidades operativas. Eso nos permite definir una arquitectura que ayude a vender: recorridos claros, fichas útiles, bloques de confianza, búsqueda o filtrado bien resueltos, y una base que también contemple el trabajo del equipo interno. Porque una buena tienda no solo hace la compra más fácil al cliente; también hace más manejable el día a día para quien administra productos, pedidos, contenidos y campañas.",
    audience:
      "Marcas DTC, negocios tradicionales con catálogo, empresas con alto volumen de ventas y marcas B2B que venden online.",
    benefits: [
      "Checkout optimizado y fluido sin fricciones",
      "Arquitectura de catálogo clara y buscable",
      "Integraciones con ERP, CRM y pasarelas de pago",
      "Base SEO sólida para traccionar búsquedas",
    ],
    ctaText: "Quiero mejorar mi e‑commerce",
    ctaLink: "/start",
    secondaryCtaText: "Revisar puntos de fricción",
    secondaryCtaLink: "/contact",
    trustSignals: [
      "Experiencia móvil ultraveloz",
      "Pasarelas de pago seguras y estables",
      "Gestión simplificada de inventario y pedidos",
      "Prácticas UX recomendadas por Baymard",
    ],
    caseStudy:
      "Qué cambia cuando la tienda deja de ser un escaparate y pasa a ser un sistema comercial medible.",
    visualConcept: "Interfaz móvil y de escritorio de un catálogo interactivo de producto.",
  },
  {
    id: "automatizaciones",
    num: "05",
    title: "Automatizaciones",
    category: "Productos digitales a medida",
    headline: "Menos trabajo manual, más foco en lo que sí mueve el negocio",
    description:
      "Eliminar tareas repetitivas y errores manuales mediante flujos automáticos entre herramientas, formularios, bases de datos y CRM.",
    longDescription:
      "Muchos equipos pierden horas cada semana en tareas que nadie debería seguir haciendo a mano: copiar datos entre herramientas, enviar recordatorios, actualizar estados, mover información, validar entradas, avisar a otra persona o generar reportes básicos. El problema no es solo el tiempo. Es también la inconsistencia, el error humano y la dependencia de que alguien recuerde cada paso. En Vorello diseñamos automatizaciones para que esos procesos se vuelvan más fiables, trazables y sostenibles.\n\nNo automatizamos por automatizar. Primero identificamos qué parte del flujo merece la pena intervenir, qué impacto tendría y qué riesgos conviene controlar. Hay procesos donde basta con conectar formularios, CRM, correo y notificaciones; otros requieren reglas, validaciones, enriquecimiento de datos o sincronización con sistemas internos. En todos los casos, la prioridad es la misma: que la automatización reduzca carga operativa sin volver el sistema opaco ni frágil.",
    audience:
      "Equipos comerciales, de operaciones, administración, soporte o marketing con procesos repetitivos.",
    benefits: [
      "Reducción drástica de tareas manuales",
      "Eliminación de errores por transcripción",
      "Sincronización instantánea de información",
      "Alertas y notificaciones automáticas clave",
    ],
    ctaText: "Quiero detectar procesos automatizables",
    ctaLink: "/start",
    secondaryCtaText: "Estimar viabilidad",
    secondaryCtaLink: "/contact",
    trustSignals: [
      "Flujos documentados visualmente",
      "Sistemas de alertas ante fallas operativas",
      "Escalabilidad ante picos de demanda",
      "Conexión de stacks populares (Zapier, Make, custom)",
    ],
    caseStudy:
      "Cómo automatizar aprobaciones, notificaciones y registro de datos redujo tiempos sin añadir complejidad al equipo.",
    visualConcept: "Diagrama conceptual de un flujo de información automatizado.",
  },
  {
    id: "integraciones",
    num: "06",
    title: "Integraciones",
    category: "Productos digitales a medida",
    headline: "Tus herramientas no deberían trabajar aisladas",
    description:
      "Conectar sistemas para que los datos fluyan con consistencia entre web, CRM, ERP, pagos, logística, soporte o bases de datos.",
    longDescription:
      "Cuando cada herramienta guarda una versión distinta de la realidad, la operation se vuelve lenta, confusa y difícil de escalar. Aparecen registros duplicados, estados desincronizados, informes que no cuadran y equipos que pierden tiempo comprobando qué dato es el bueno. En Vorello diseñamos e implementamos integraciones para que tus sistemas dejen de funcionar como islas y empiecen a comportarse como una operación conectada.\n\nEl objetivo no es simplemente 'unir herramientas'. Es definir qué datos se mueven, cuándo, con qué reglas, qué hacer si algo falla y cómo garantizar que la integración no termine creando más problemas de los que resuelve. Por eso empezamos por mapear el flujo real entre plataformas: qué sistema origina cada dato, cuál debe gobernarlo, qué eventos disparan acciones y qué nivel de sincronización necesita el negocio. A partir de ahí, planteamos integraciones claras, sostenibles y observables.",
    audience:
      "Empresas con stacks de software fragmentados o que duplican datos entre distintas plataformas de gestión.",
    benefits: [
      "Dato único y fuente de verdad confiable",
      "Automatización de flujos de inventario y pedidos",
      "Trazabilidad de punta a punta del negocio",
      "Reporting consistente para toma de decisiones",
    ],
    ctaText: "Quiero conectar mis sistemas",
    ctaLink: "/start",
    secondaryCtaText: "Mapear integraciones",
    secondaryCtaLink: "/contact",
    trustSignals: [
      "Manejo avanzado de errores y logs",
      "Sincronización en tiempo real o en lotes",
      "Seguridad y autenticación encriptada",
      "Fallback manual ante caídas de API",
    ],
    caseStudy:
      "Cómo dejar de duplicar datos entre web, CRM y ERP devolvió visibilidad real al negocio.",
    visualConcept: "Especialista analizando integraciones complejas entre sistemas en tiempo real.",
  },
];
