import {
  Layers,
  Sparkles,
  ShoppingBag,
  Database,
  UserCheck,
  Terminal,
  HelpCircle as QuestionIcon,
  Zap,
  Clock,
  Calendar,
  Hourglass,
} from "lucide-react";

import type { CountryOption } from "@/components/forms/CountrySelect";

export type StartStep = 1 | 2 | 3 | 4;

export type StartSubmitStatus = "idle" | "success" | "error";

export interface StartFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  projectType: string;
  budget: string;
  deadline: string;
  message: string;
}

export type StartFormErrors = Partial<Record<keyof StartFormData, string>>;

export const START_STORAGE_KEY = "vorello-start-draft";

export const INITIAL_START_FORM_DATA: StartFormData = {
  name: "",
  company: "",
  email: "",
  phone: "",
  country: "",
  projectType: "",
  budget: "",
  deadline: "",
  message: "",
};

export const COUNTRY_NAMES_BY_ISO2: Record<string, string> = {
  uy: "Uruguay",
  ar: "Argentina",
  es: "España",
  cl: "Chile",
  co: "Colombia",
  mx: "México",
  us: "Estados Unidos",
  pe: "Perú",
  ec: "Ecuador",
  ve: "Venezuela",
  bo: "Bolivia",
  py: "Paraguay",
  gt: "Guatemala",
  cr: "Costa Rica",
  pa: "Panamá",
  do: "República Dominicana",
  sv: "El Salvador",
  hn: "Honduras",
  ni: "Nicaragua",
  gb: "Reino Unido",
};

export const FALLBACK_COUNTRIES: CountryOption[] = [
  { value: "Uruguay", label: "Uruguay", iso2: "uy" },
  { value: "Argentina", label: "Argentina", iso2: "ar" },
  { value: "España", label: "España", iso2: "es" },
  { value: "Estados Unidos", label: "Estados Unidos", iso2: "us" },
  { value: "Chile", label: "Chile", iso2: "cl" },
  { value: "Colombia", label: "Colombia", iso2: "co" },
  { value: "México", label: "México", iso2: "mx" },
];

export const TOP_COUNTRY_VALUES = [
  "Uruguay",
  "Argentina",
  "España",
  "Estados Unidos",
  "Chile",
  "Colombia",
  "México",
];

export const CONTEXTUAL_PLACEHOLDERS: Record<string, string> = {
  "landing-premium":
    "Cuéntanos el objetivo de la landing, a quién va dirigida y si tienes referencias visuales o marcas que te inspiren...",
  "sitio-corporativo":
    "Cuéntanos sobre tu empresa, qué secciones imaginas necesarias y si ya existe una web actual que quieras mejorar o rediseñar...",
  ecommerce:
    "Cuéntanos qué vendes, cuántos productos tendrías al inicio, si necesitas pagos online, envíos o gestión de stock...",
  "producto-sistema":
    "Describe qué problema quieres resolver, quiénes usarán la plataforma y si debe conectarse con herramientas o sistemas existentes...",
  "portal-clientes":
    "Cuéntanos qué deberían poder hacer tus clientes dentro del portal: ver archivos, gestionar solicitudes, revisar información, acceder a documentos u otras acciones...",
  automatizacion:
    "Cuéntanos qué herramientas usas actualmente, qué tareas quieres automatizar y qué información debería moverse entre sistemas...",
  "no-estoy-seguro":
    "Cuéntanos tu situación actual, qué problema quieres resolver y cualquier idea, referencia o necesidad que tengas en mente...",
  default:
    "Ej. Queremos mejorar nuestra presencia digital y recibir más consultas calificadas. Nos gustaría una web clara, visualmente cuidada y preparada para crecer...",
};

export const START_MESSAGE_MIN_LENGTH = 20;
export const PROJECT_TYPES = [
  {
    id: "landing-premium",
    label: "Landing page premium",
    description:
      "Página enfocada en presentar una oferta, captar consultas o validar una idea con alto impacto visual.",
    icon: Layers,
  },
  {
    id: "sitio-corporativo",
    label: "Sitio web corporativo",
    description:
      "Web institucional a medida para comunicar tu marca, servicios, equipo y propuesta de valor.",
    icon: Sparkles,
  },
  {
    id: "ecommerce",
    label: "Ecommerce premium",
    description:
      "Tienda online moderna, rápida y preparada para vender con una experiencia cuidada.",
    icon: ShoppingBag,
  },
  {
    id: "producto-sistema",
    label: "Producto digital a medida",
    description:
      "Aplicación web, plataforma interna, dashboard o sistema personalizado para resolver procesos reales.",
    icon: Database,
  },
  {
    id: "portal-clientes",
    label: "Portal de clientes",
    description:
      "Espacio privado para centralizar información, documentos, solicitudes o gestiones de tus clientes.",
    icon: UserCheck,
  },
  {
    id: "automatizacion",
    label: "Automatización / integración",
    description:
      "Conexión entre herramientas, sistemas o procesos para reducir tareas manuales y ordenar operaciones.",
    icon: Terminal,
  },
  {
    id: "no-estoy-seguro",
    label: "No estoy seguro, necesito orientación",
    description:
      "Revisaremos tu situación para ayudarte a definir qué tipo de solución tiene más sentido.",
    icon: QuestionIcon,
    muted: true,
  },
] as const;

export const BUDGET_RANGES = [
  /* {
    value: "less-than-1000",
    label: "Menos de USD 1.000",
    hint: "Puede aplicar para ajustes puntuales o alcances muy acotados.",
    icon: Sparkles,
  }, */
  {
    value: "1000-2500",
    label: "USD 1.000 – 2.500",
    hint: "Adecuado para landings premium o sitios simples bien definidos.",
    icon: Layers,
  },
  {
    value: "2500-5000",
    label: "USD 2.500 – 5.000",
    hint: "Ideal para sitios corporativos completos o ecommerce iniciales.",
    icon: ShoppingBag,
  },
  {
    value: "5000-10000",
    label: "USD 5.000 – 10.000",
    hint: "Para proyectos con mayor alcance, integraciones o funcionalidades a medida.",
    icon: Database,
  },
  {
    value: "more-than-10000",
    label: "Más de USD 10.000",
    hint: "Para plataformas, sistemas o soluciones digitales más complejas.",
    icon: Terminal,
  },
  {
    value: "not-defined",
    label: "Sin inversión definida",
    hint: "Podemos orientarte según objetivos, alcance y prioridades.",
    icon: QuestionIcon,
    muted: true,
  },
] as const;

export const DEADLINES = [
  {
    value: "asap",
    label: "Lo antes posible",
    hint: "Buscamos entender la urgencia para evaluar si el alcance es viable.",
    icon: Zap,
  },
  {
    value: "2-4-weeks",
    label: "Entre 2 y 4 semanas",
    hint: "Puede funcionar para landings o proyectos con alcance bien definido.",
    icon: Clock,
  },
  {
    value: "1-2-months",
    label: "Entre 1 y 2 meses",
    hint: "Un plazo razonable para sitios completos o desarrollos iniciales.",
    icon: Calendar,
  },
  {
    value: "more-than-3-months",
    label: "Más de 3 meses",
    hint: "Ideal para soluciones más estratégicas, por fases o con mayor profundidad.",
    icon: Hourglass,
  },
  {
    value: "not-defined",
    label: "Sin fecha definida",
    hint: "Podemos definir un ritmo adecuado según el alcance del proyecto.",
    icon: QuestionIcon,
    muted: true,
  },
] as const;

export const STEP_LABELS = ["Contacto", "Proyecto", "Presupuesto", "Mensaje"] as const;
