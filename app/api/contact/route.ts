import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, reason, message } = body;

    // Server-side validation
    if (!name?.trim() || !email?.trim() || !reason?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: "Todos los campos del formulario son obligatorios." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "El correo electrónico no tiene un formato válido." },
        { status: 400 }
      );
    }

    // Split name into first and last name for HubSpot mapping
    const nameParts = name.trim().split(/\s+/);
    const firstname = nameParts[0] || "";
    const lastname = nameParts.slice(1).join(" ") || "";

    const combinedDescription = `
[Mensaje de Contacto General - Vorello Web]
- Motivo de Contacto: ${reason}

- Mensaje:
${message}
`.trim();

    // Check environment variables for HubSpot integration
    const portalId = process.env.HUBSPOT_PORTAL_ID;
    const formId = process.env.HUBSPOT_CONTACT_FORM_ID || process.env.HUBSPOT_FORM_ID; // Can use a separate form ID or fall back to primary
    const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;

    if (portalId && formId) {
      // 1. Submit via HubSpot Forms API
      const hubspotFormUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;
      const payload = {
        fields: [
          { name: "email", value: email },
          { name: "firstname", value: firstname },
          { name: "lastname", value: lastname },
          { name: "message", value: combinedDescription }
        ],
        context: {
          pageUri: "https://vorello.agency/contact",
          pageName: "Contacto General - Vorello"
        }
      };

      const response = await fetch(hubspotFormUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error al enviar contacto a HubSpot Forms API:", errorText);
        throw new Error("Error en la API de HubSpot.");
      }

      console.log("Contacto registrado exitosamente en HubSpot Forms API.");
      return NextResponse.json({ success: true, mock: false });

    } else if (accessToken) {
      // 2. Submit via HubSpot CRM Contacts API
      const hubspotContactsUrl = "https://api.hubapi.com/crm/v3/objects/contacts";
      const payload = {
        properties: {
          email,
          firstname,
          lastname,
          message: combinedDescription,
          description: combinedDescription
        }
      };

      const response = await fetch(hubspotContactsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        if (response.status === 409) {
          console.warn("El contacto ya existe en HubSpot CRM. Email:", email);
          return NextResponse.json({ success: true, warning: "Contact already exists, CRM mapping skipped." });
        }
        const errorText = await response.text();
        console.error("Error al enviar contacto a HubSpot CRM Contacts API:", errorText);
        throw new Error("Error en la API de HubSpot CRM.");
      }

      console.log("Contacto registrado exitosamente en HubSpot CRM Contacts API.");
      return NextResponse.json({ success: true, mock: false });
    }

    // 3. Mock/Development Log Mode
    console.log("=== [MOCK CONTACT SUBMISSION] ===");
    console.log("Nombre:", name);
    console.log("Email:", email);
    console.log("Motivo:", reason);
    console.log("Mensaje:", message);
    console.log("================================");

    return NextResponse.json({ success: true, mock: true });

  } catch (error) {
    console.error("Error en /api/contact:", error);
    return NextResponse.json(
      { success: false, error: "Ocurrió un error al procesar tu solicitud. Inténtalo de nuevo más tarde." },
      { status: 500 }
    );
  }
}
