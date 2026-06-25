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
    "Describe el objetivo de tu landing, público objetivo y si hay referentes visuales que te inspiren...",
  "sitio-corporativo":
    "Cuéntanos sobre tu empresa, secciones que necesitas (equipo, servicios, portfolio) y si hay una web actual a rediseñar...",
  ecommerce:
    "Describe tu catálogo, volumen de productos, pasarela de pagos preferida y si necesitas migración de datos...",
  "producto-sistema":
    "Describe la problemática que resuelve tu producto, usuarios esperados y si hay integraciones con sistemas existentes...",
  "portal-clientes":
    "Cuéntanos qué podrán autogestionar tus clientes (facturas, soporte, archivos) y cuántos usuarios activos esperas...",
  automatizacion:
    "Describe los sistemas a conectar (CRM, ERP, APIs), las tareas a automatizar y el volumen de datos esperado...",
  "no-estoy-seguro":
    "Cuéntanos tu situación actual, qué problema buscas resolver y cualquier idea o referencia que tengas en mente...",
  default:
    "Ej. Buscamos desarrollar una plataforma web para que nuestros clientes puedan gestionar sus pedidos de forma autónoma. Necesitamos que se integre con nuestro ERP actual y tenga una UX excelente...",
};

export const START_MESSAGE_MIN_LENGTH = 20;

export const PROJECT_TYPES = [
  {
    id: "landing-premium",
    label: "Landing page premium",
    description: "Sitio de una sola página enfocado en vender o captar clientes con alto impacto visual.",
    icon: Layers,
  },
  {
    id: "sitio-corporativo",
    label: "Sitio web corporativo",
    description: "Múltiples páginas a medida para presentar tu marca, equipo y catálogo de servicios.",
    icon: Sparkles,
  },
  {
    id: "ecommerce",
    label: "E-commerce premium",
    description: "Tienda online moderna y rápida con carrito de compras, pasarela de pago y autogestión.",
    icon: ShoppingBag,
  },
  {
    id: "producto-sistema",
    label: "Producto digital a medida",
    description: "Aplicación web, plataforma interna o sistema personalizado para optimizar tu negocio.",
    icon: Database,
  },
  {
    id: "portal-clientes",
    label: "Portal de gestión",
    description: "Espacio privado y seguro para que tus usuarios autogestionen facturas, archivos o soporte.",
    icon: UserCheck,
  },
  {
    id: "automatizacion",
    label: "Automatización / Integración",
    description: "Conectar sistemas existentes, sincronizar datos o automatizar tareas repetitivas.",
    icon: Terminal,
  },
  {
    id: "no-estoy-seguro",
    label: "No sé, necesito orientación",
    description: "Analizaremos tus necesidades juntos para definir la solución técnica adecuada.",
    icon: QuestionIcon,
  },
] as const;

export const BUDGET_RANGES = [
  { value: "less-than-1000", label: "Menos de USD 1.000", hint: "Adecuado para landing pages ágiles.", icon: Sparkles },
  { value: "1000-2500", label: "USD 1.000 – 2.500", hint: "Sitios web estándar y landing pages premium.", icon: Layers },
  { value: "2500-5000", label: "USD 2.500 – 5.000", hint: "E-commerce estándar o corporativos completos.", icon: ShoppingBag },
  { value: "5000-10000", label: "USD 5.000 – 10.000", hint: "Plataformas web, integraciones avanzadas y SaaS.", icon: Database },
  { value: "more-than-10000", label: "Más de USD 10.000", hint: "Sistemas web complejos a gran escala y medida.", icon: Terminal },
  { value: "not-defined", label: "Sin presupuesto definido", hint: "Te ayudaremos a estimar según tus metas.", icon: QuestionIcon },
] as const;

export const DEADLINES = [
  { value: "asap", label: "Lo antes posible", hint: "Urgente, requiere priorizar recursos.", icon: Zap },
  { value: "2-4-weeks", label: "Entre 2 y 4 semanas", hint: "Plazo ideal para landings y webs rápidas.", icon: Clock },
  { value: "1-2-months", label: "Entre 1 y 2 meses", hint: "Recomendado para desarrollos a medida.", icon: Calendar },
  { value: "more-than-3-months", label: "Más de 3 meses", hint: "Para plataformas por fases complejas.", icon: Hourglass },
  { value: "not-defined", label: "Sin fecha definida", hint: "Nos adaptamos al ritmo del alcance.", icon: QuestionIcon },
] as const;

export const STEP_LABELS = ["Contacto", "Proyecto", "Presupuesto", "Mensaje"] as const;
