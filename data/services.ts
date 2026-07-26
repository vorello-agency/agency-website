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
      "Posicionamiento de marca enterprise",
      "Velocidad de carga de sub-segundo",
      "SEO técnico y semántica estructurada",
      "Autonomía editorial para tu equipo",
    ],
  },
  {
    num: "02",
    title: "Productos digitales a medida",
    description:
      "Web apps, portales, sistemas internos y flujos automatizados diseñados para operar, escalar e integrarse con tu stack existente.",
    iconName: "Cpu",
    features: [
      "Reemplazo de planillas por software propio",
      "Control estricto de roles y seguridad",
      "Automatización de procesos repetitivos",
      "Ownership total de código e infraestructura",
    ],
  },
  {
    num: "03",
    title: "Ecommerce premium",
    description:
      "Comercio electrónico con arquitectura headless, UX optimizada y rendimiento técnico cuidado.",
    iconName: "ShoppingBag",
    features: [
      "Arquitectura Headless a prueba de picos",
      "Checkout optimizado en 1-click",
      "Sincronización en tiempo real con ERP",
      "Búsqueda inteligente con IA",
    ],
  },
];

export const servicesDetail: ServiceDetail[] = [
  {
    id: "websites",
    num: "01",
    title: "Sitios web",
    category: "Experiencias web premium",
    headline: "Tu web debe abrir conversaciones y vender, no solo verse bien",
    description:
      "Convertir la web corporativa en un activo comercial y reputacional, no en un folleto.",
    longDescription:
      "Tu sitio web es la primera conversación que una empresa tiene con tu marca. Si esa experiencia es confusa, lenta o genérica, estás perdiendo oportunidades antes incluso de que alguien te contacte. En Vorello diseñamos sitios web pensados para explicar con claridad tu propuesta de valor, transmitir confianza desde el primer scroll y facilitar decisiones.\n\nNo construimos pantallas aisladas, sino un sistema digital vivo: estructura de mensajes, diseño visual sobrio, rendimiento extremo y SEO técnico preparado para responder tanto ante clientes exigentes como ante los nuevos motores de búsqueda e inteligencia artificial.",
    audience:
      "Compañías B2B, firmas de servicios profesionales y marcas consolidadas que buscan justificar precios más altos y diferenciarse de competidores genéricos.",
    benefits: [
      "Percepción de marca enterprise que justifica precios más altos",
      "Estructura de mensajes para agendar llamadas calificadas",
      "Carga en sub-segundo para minimizar la tasa de rebote",
      "Autonomía editorial total para tu equipo sin depender de devs",
    ],
    ctaText: "Diseñar mi sitio web",
    ctaLink: "/start",
    secondaryCtaText: "Ver estructura ideal",
    secondaryCtaLink: "/contact",
    trustSignals: [
      "LCP < 1.8s verificable en Google PageSpeed",
      "Código Next.js limpio sin plugins ni librerías pesadas",
      "Diseño visual a medida alineado a tu marca",
      "Marcado semántico avanzado y accesibilidad WCAG 2.2",
    ],
    caseStudy:
      "Rediseño estratégico B2B: Reducción del 45% en tasa de rebote y duplicación de consultas calificadas en los primeros 60 días.",
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
      "Cuando una página tiene demasiados mensajes, demasiados caminos y demasiadas dudas, convierte peor. Una buena landing page hace justo lo contrario: concentra la atención en una sola propuesta, elimina fricción y guía a la persona hacia una acción concreta. En Vorello diseñamos landing pages para campañas, lanzamientos, generación de leads, validación de ofertas y acciones comerciales donde el foco importa más que el volumen de contenido.\n\nEl trabajo no empieza en la interfaz. Empieza en la intención.\nAntes de diseñar, definimos qué tráfico va a llegar, qué expectativa trae, qué objeciones necesita resolver y qué señal nos dirá si la página está funcionando.\n Con esa base, estructuramos el contenido para que el mensaje principal aparezca rápido, las ventajas sean fáciles de escanear y el CTA esté respaldado por pruebas suficientes: contexto, confianza, claridad y fricción mínima.",
    audience:
      "Equipos de marketing, founders y direcciones comerciales que ejecutan campañas de inversión alta en anuncios y necesitan maximizar el retorno de cada clic.",
    benefits: [
      "Alineación 1:1 entre anuncio y propuesta de valor",
      "Cero fricción cognitiva para acelerar la conversión",
      "Integración instantánea con tu CRM y equipo comercial",
      "Arquitectura lista para pruebas A/B de mensajes",
    ],
    ctaText: "Crear landing de campaña",
    ctaLink: "/start",
    secondaryCtaText: "Diseñar versión A/B",
    secondaryCtaLink: "/contact",
    trustSignals: [
      "Respuesta ultrarrápida optimizada para tráfico de pago",
      "Tracking de eventos avanzado y medición de comportamiento",
      "Formularios inteligentes con validación en tiempo real",
      "Despliegue responsivo sin fallas en ningún dispositivo",
    ],
    caseStudy:
      "Optimización de campaña: Reordenamiento de propuesta de valor y formulario que incrementó un 38% la tasa de leads cualificados.",
    visualConcept: "Equipo analizando métricas de conversión en pantalla.",
  },
  {
    id: "ecommerce",
    num: "03",
    title: "E‑commerce",
    category: "Ecommerce premium",
    headline: "Tu tienda online no solo debe vender: debe facilitar la compra",
    description:
      "Construir o rediseñar experiencias de compra orientadas a conversión, gestión eficiente del catálogo y escalabilidad comercial.",
    longDescription:
      "Un e‑commerce ya no compite solo por precio o producto, sino por la velocidad y facilidad con la que permite descubrir, entender y comprar. Si la navegación confunde, la búsqueda no interpreta la intención del usuario o el checkout genera fricción, la tienda pierde ventas en segundos. En Vorello diseñamos experiencias de compra donde la usabilidad y la estructura comercial trabajan juntas para maximizar la conversión.\n\nConstruimos sobre arquitecturas modernas (como Headless E‑commerce) para lograr cargas instantáneas en móvil, búsquedas inteligentes que entienden intenciones de compra e integraciones en tiempo real con tus sistemas de ERP e inventario. El resultado es una tienda ultraveloz, preparada para responder ante picos masivos de tráfico y ágil de operar para tu equipo.",
    audience:
      "Marcas DTC premium, distribuidores B2B y tiendas de volumen que buscan superar limitaciones de velocidad, caídas por tráfico y checkout de baja conversión.",
    benefits: [
      "Checkout en 1-click para reducir el abandono de carrito",
      "Búsqueda contextual inteligente que interpreta intenciones",
      "Sincronización en tiempo real de catálogo y stock con tu ERP",
      "Arquitectura Headless a prueba de picos masivos de tráfico",
    ],
    ctaText: "Optimizar mi e‑commerce",
    ctaLink: "/start",
    secondaryCtaText: "Revisar puntos de fricción",
    secondaryCtaLink: "/contact",
    trustSignals: [
      "Navegación móvil ultraveloz bajo estándares UX mundiales",
      "Pasarelas de pago seguras con flujo de compra impecable",
      "Administración de catálogo simplificada para tu equipo",
      "Base técnica SEO sólida para escalar en tráfico orgánico",
    ],
    caseStudy:
      "Migración a Headless E-commerce: Cero caídas durante eventos de alto tráfico y aumento del 22% en el ticket promedio de compra.",
    visualConcept: "Interfaz móvil y de escritorio de un catálogo interactivo de producto.",
  },
  {
    id: "platforms",
    num: "04",
    title: "Plataformas web",
    category: "Productos digitales a medida",
    headline: "Cuando una herramienta estándar ya no alcanza, toca construir mejor",
    description:
      "Diseñar y desarrollar productos o sistemas web que organizan operaciones, servicios, usuarios, datos o flujos internos/externos.",
    longDescription:
      "Hay un punto en el que improvisar con hojas de cálculo, herramientas desconectadas y procesos manuales deja de ser práctico y empieza a frenar el negocio.\n Ahí es donde una plataforma web propia deja de ser 'algo para más adelante' y se convierte en una decisión estratégica. En Vorello diseñamos y desarrollamos plataformas web para empresas que necesitan organizar operaciones, centralizar información y dar a usuarios internos o externos una experiencia más clara, más rápida y más fiable.\n\nNo entendemos una plataforma como una colección de funcionalidades.\nLa entendemos como una herramienta de trabajo.\nPor eso empezamos por el flujo real: qué personas intervienen, qué decisiones se toman, qué datos se consultan, dónde se pierde tiempo y qué partes conviene automatizar, simplificar o conectar.\n\nFrente al auge de herramientas no-code e inteligencia artificial, ayudamos a definir con criterio cuándo un prototipo modular es suficiente y cuándo una plataforma propia a medida es la decisión correcta para garantizar seguridad, velocidad y escalabilidad sin sorpresas.",
    audience:
      "Empresas operativas y equipos de producto que necesitan reemplazar procesos manuales en Excel por portales privados, dashboards y software a medida.",
    benefits: [
      "Centralización operativa para eliminar planillas dispersas",
      "Control de accesos y seguridad para proteger datos internos",
      "Reducción drástica del tiempo de capacitación a usuarios",
      "Propiedad 100% de tu software sin pagar licencias por usuario",
    ],
    ctaText: "Evaluar mi plataforma web",
    ctaLink: "/start",
    secondaryCtaText: "Mapear caso de uso",
    secondaryCtaLink: "/contact",
    trustSignals: [
      "Ownership total del código (transferencia directa a tu GitHub)",
      "Base de datos con arquitectura cifrada y escalable",
      "APIs REST / GraphQL preparadas para futuras integraciones",
      "Diseño UI/UX orientado a la productividad operativa",
    ],
    caseStudy:
      "Plataforma operativa a medida: Centralización de 5 procesos manuales en un dashboard único con ahorro de 15 horas semanales por usuario.",
    visualConcept: "Product manager revisando un panel o dashboard complejo.",
  },
  {
    id: "automation",
    num: "05",
    title: "Automatizaciones e Integraciones",
    category: "Productos digitales a medida",
    headline: "La automatización que funciona es la que entiende tu operación",
    description:
      "Diseñamos la lógica de negocio y conectamos tus herramientas, bases de datos y CRM para eliminar la fricción manual y potenciar el rendimiento del equipo.",
    longDescription:
      "La automatización no consiste simplemente en conectar aplicaciones con Zapier o Make. Una automatización sin lógica de negocio robusta se rompe al primer cambio de formato o pico de datos.\n En Vorello diseñamos e implementamos flujos automáticos e integraciones de software a medida para que tus sistemas se comporten como una operación unificada.\n\nMapeamos tu flujo operativo real: desde cómo se origina un dato (formulario web, pasarela de pago o CRM) hasta dónde debe procesarse. Construimos integraciones estables y seguras utilizando APIs robustas y flujos observables con alertas automáticas ante fallas.\n\nEn un contexto donde la inteligencia artificial permite procesar grandes volúmenes de datos, integramos modelos de IA en flujos existentes para clasificar consultas, estructurar información y automatizar respuestas sin perder el control ni la trazabilidad.",
    audience:
      "Direcciones de operaciones, finanzas y ventas que buscan eliminar la fricción manual, evitar errores de transcripción y conectar sistemas desconectados.",
    benefits: [
      "Eliminación del copiado y pegado manual entre sistemas",
      "Cero errores humanos en facturación, CRM y registros",
      "Modelos de IA integrados para clasificar y estructurar datos",
      "Alertas automáticas en tiempo real ante cualquier excepción",
    ],
    ctaText: "Optimizar mis procesos",
    ctaLink: "/start",
    secondaryCtaText: "Mapear flujos de trabajo",
    secondaryCtaLink: "/contact",
    trustSignals: [
      "Manejador de fallas con reintentos sin pérdida de datos",
      "Logs de auditoría para monitorear cada transacción",
      "Conexiones cifradas mediante claves API y webhooks seguros",
      "Documentación visual de flujos para tu equipo",
    ],
    caseStudy:
      "Automatización de backend: Conexión entre pasarela de cobros, CRM y facturación electrónica con cero errores de sincronización en 12 meses.",
    visualConcept: "Diagrama conceptual de un flujo de información automatizado con APIs conectadas.",
  },
  {
    id: "support",
    num: "06",
    title: "Soporte y evolución",
    category: "Soporte y evolución",
    headline: "Tu producto digital debe evolucionar al ritmo de tu negocio",
    description:
      "Monitoreo continuo de rendimiento, actualizaciones de seguridad y mejoras iterativas para que tus activos web nunca queden obsoletos.",
    longDescription:
      "El lanzamiento de una web, e-commerce o aplicación a medida es solo el inicio del ciclo de vida del producto digital. Para seguir convirtiendo visitas en clientes y operar sin riesgos, cada plataforma requiere optimización de velocidad continua, parches de seguridad y mejoras en la experiencia de usuario basadas en datos reales.\n En Vorello te acompañamos tras el despliegue con soporte técnico especializado.\n\nMonitoreamos constantemente métricas clave de Google (Core Web Vitals), resolvemos dependencias de librerías, implementamos mejoras iterativas en el diseño y en los flujos de conversión, y estamos a un mensaje de distancia para resolver cualquier eventualidad.\n Te damos la tranquilidad de contar con un equipo técnico de confianza y criterio para evolucionar tu negocio sin parches ni caídas.",
    audience:
      "Empresas consolidadas y líderes de tecnología que buscan delegar la estabilidad, la optimización de rendimiento y el mantenimiento continuo de sus plataformas en un partner especializado con criterio.",
    benefits: [
      "Tranquilidad de contar con ingenieros resolviendo imprevistos",
      "Tu plataforma nunca queda obsoleta frente a cambios técnicos",
      "Mejoras continuas en usabilidad y conversión según datos reales",
      "Atención prioritaria y directa sin pasar por tickets lentos",
    ],
    ctaText: "Ver planes de soporte",
    ctaLink: "/start",
    secondaryCtaText: "Consultar planes de soporte",
    secondaryCtaLink: "/contact",
    trustSignals: [
      "Garantía de respuesta rápida ante emergencias técnicas",
      "Monitoreo de estabilidad 24/7 y alertas de caída",
      "Auditorías periódicas de rendimiento y parches de seguridad",
      "Reporte mensual transparente con métricas de salud técnica",
    ],
    caseStudy:
      "Evolución técnica continua: Mantenimiento proactivo que previno 3 caídas críticas en campañas y mantuvo la velocidad LCP < 1.5s.",
    visualConcept: "Panel de control de uptime, seguridad y rendimiento técnico en tiempo real.",
  },
];
