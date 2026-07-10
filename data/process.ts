import { Compass, Route, PanelsTopLeft, Code2, Gauge, Rocket, Orbit } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ProcessStep {
  num: string;
  name: string;
  desc: string;
  icon: LucideIcon;
  area: string;
}

export const processSteps: ProcessStep[] = [
  {
    num: "01",
    name: "Descubrimiento",
    desc: "Entendemos objetivos, usuarios y restricciones técnicas para definir una base clara.",
    icon: Compass,
    area: "md:[grid-area:1/1/2/7] lg:[grid-area:1/1/2/5]",
  },
  {
    num: "02",
    name: "Estrategia y definición",
    desc: "Definimos arquitectura, alcance funcional y roadmap de ejecución.",
    icon: Route,
    area: "md:[grid-area:1/7/2/13] lg:[grid-area:2/1/3/5]",
  },
  {
    num: "03",
    name: "UX/UI",
    desc: "Diseñamos interfaces claras, refinadas y validadas antes del desarrollo.",
    icon: PanelsTopLeft,
    area: "md:[grid-area:2/1/3/7] lg:[grid-area:1/5/3/8]",
  },
  {
    num: "04",
    name: "Desarrollo",
    desc: "Construimos con código limpio, arquitectura escalable y foco en rendimiento.",
    icon: Code2,
    area: "md:[grid-area:2/7/3/13] lg:[grid-area:1/8/2/13]",
  },
  {
    num: "05",
    name: "Optimización",
    desc: "Validamos accesibilidad, performance, SEO técnico y comportamiento responsive.",
    icon: Gauge,
    area: "md:[grid-area:3/1/4/13] lg:[grid-area:2/8/3/13]",
  },
  {
    num: "06",
    name: "Lanzamiento",
    desc: "Desplegamos el producto en un entorno stable, seguro y preparado para operar.",
    icon: Rocket,
    area: "md:col-span-6 lg:col-span-6",
  },
  {
    num: "07",
    name: "Evolución",
    desc: "Acompañamos el crecimiento con mejoras continuas basadas en métricas, uso real y objetivos en evolución.",
    icon: Orbit,
    area: "md:col-span-6 lg:col-span-6",
  },
];
