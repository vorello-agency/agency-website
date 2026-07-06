import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, phone, country, projectType, budget, deadline, message } = body;

    // Server-side validation
    if (
      !name?.trim() ||
      !company?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !country?.trim() ||
      !projectType ||
      !budget ||
      !deadline ||
      !message?.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Todos los campos obligatorios deben ser completados.",
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "El correo electrónico no tiene un formato válido.",
        },
        { status: 400 }
      );
    }

    // Split name into first and last name for HubSpot mapping
    const nameParts = name.trim().split(/\s+/);
    const firstname = nameParts[0] || "";
    const lastname = nameParts.slice(1).join(" ") || "";

    const combinedDescription = `
[Lead de Inicio de Proyecto - Vorello Web]
- Empresa/Marca: ${company}
- País: ${country}
- WhatsApp/Teléfono: ${phone}
- Tipo de Proyecto: ${projectType}
- Presupuesto Estimado: ${budget}
- Plazo Deseado: ${deadline}

- Mensaje / Contexto:
${message}
`.trim();

    // Check environment variables for HubSpot integration
    const portalId = process.env.HUBSPOT_PORTAL_ID;
    const formId = process.env.HUBSPOT_FORM_ID;
    const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;

    if (portalId && formId) {
      // 1. Submit via HubSpot Forms API (Recommended for web forms)
      const hubspotFormUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;
      const payload = {
        fields: [
          { name: "email", value: email },
          { name: "firstname", value: firstname },
          { name: "lastname", value: lastname },
          { name: "company", value: company },
          { name: "phone", value: phone },
          { name: "country", value: country },
          { name: "message", value: combinedDescription },
        ],
        context: {
          pageUri: "https://vorello.agency/start",
          pageName: "Iniciar Proyecto - Vorello",
        },
      };

      const response = await fetch(hubspotFormUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error al enviar lead a HubSpot Forms API:", errorText);
        throw new Error("Error en la API de HubSpot.");
      }

      console.log("Lead registrado exitosamente en HubSpot Forms API.");
      return NextResponse.json({ success: true, mock: false });
    } else if (accessToken) {
      // 2. Submit via HubSpot CRM Contacts API (Fallback if Access Token is provided)
      const hubspotContactsUrl = "https://api.hubapi.com/crm/v3/objects/contacts";
      const payload = {
        properties: {
          email,
          firstname,
          lastname,
          company,
          phone,
          country,
          message: combinedDescription,
          description: combinedDescription,
        },
      };

      const response = await fetch(hubspotContactsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // If conflict (409 contact already exists), log but don't fail, or try updating
        if (response.status === 409) {
          console.warn("El contacto ya existe en HubSpot CRM. Email:", email);
          // Standard success return to keep client flow uninterrupted
          return NextResponse.json({
            success: true,
            warning: "Contact already exists, CRM mapping skipped.",
          });
        }
        const errorText = await response.text();
        console.error("Error al enviar lead a HubSpot CRM Contacts API:", errorText);
        throw new Error("Error en la API de HubSpot CRM.");
      }

      console.log("Lead registrado exitosamente en HubSpot CRM Contacts API.");
      return NextResponse.json({ success: true, mock: false });
    }

    // 3. Mock/Development Log Mode
    console.log("=== [MOCK LEAD SUBMISSION] ===");
    console.log("Nombre:", name);
    console.log("Empresa:", company);
    console.log("Email:", email);
    console.log("Teléfono:", phone);
    console.log("País:", country);
    console.log("Tipo de Proyecto:", projectType);
    console.log("Presupuesto:", budget);
    console.log("Plazo Deseado:", deadline);
    console.log("Mensaje:", message);
    console.log("=============================");

    return NextResponse.json({ success: true, mock: true });
  } catch (error) {
    console.error("Error en /api/leads:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Ocurrió un error al procesar tu solicitud. Inténtalo de nuevo más tarde.",
      },
      { status: 500 }
    );
  }
}
