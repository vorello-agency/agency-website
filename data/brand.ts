/**
 * Global Brand & Contact Constants for Vorello Agency
 */

export const BRAND_NAME = "Vorello";
export const BRAND_FULL_NAME = "Vorello Agency";
export const BRAND_DOMAIN = "vorelloagency.com";
export const BRAND_URL = `https://${BRAND_DOMAIN}`;

export const CONTACT_EMAIL = "hello@vorelloagency.com";
export const CALENDAR_URL = "https://cal.com/vorello/intro";

// WhatsApp Configuration
// Raw number for wa.me links (without "+" or spaces, e.g. "59899000000")
export const WHATSAPP_RAW_NUMBER = "59899000000";
export const WHATSAPP_HUMAN_NUMBER = "+598 99 000 000";

// Pre-filled WhatsApp messages
export const WHATSAPP_MSG_GENERAL = "Hola Vorello, quisiera hacer una consulta general.";
export const WHATSAPP_MSG_START = "Hola, estoy interesado en iniciar un proyecto con Vorello.";

// Helper to generate WhatsApp link
export function getWhatsAppLink(message: string = WHATSAPP_MSG_GENERAL, phoneNumber: string = WHATSAPP_RAW_NUMBER): string {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

// Social Media Links
export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/vorelloagency",
  linkedin: "https://linkedin.com/company/vorello",
};
