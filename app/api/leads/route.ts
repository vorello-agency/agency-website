import { NextResponse } from "next/server";

const PROJECT_TYPE_LABELS: Record<string, string> = {
  "landing-premium": "Landing page premium",
  "sitio-corporativo": "Sitio web corporativo",
  ecommerce: "Ecommerce premium",
  "producto-sistema": "Producto digital a medida",
  "portal-clientes": "Portal de clientes",
  automatizacion: "Automatización / integración",
  "no-estoy-seguro": "No estoy seguro, necesito orientación",
};

const BUDGET_RANGE_LABELS: Record<string, string> = {
  "1000-2500": "USD 1.000 – 2.500",
  "2500-5000": "USD 2.500 – 5.000",
  "5000-10000": "USD 5.000 – 10.000",
  "more-than-10000": "Más de USD 10.000",
  "not-defined": "Sin inversión definida",
};

const DEADLINE_LABELS: Record<string, string> = {
  asap: "Lo antes posible",
  "2-4-weeks": "Entre 2 y 4 semanas",
  "1-2-months": "Entre 1 y 2 meses",
  "more-than-3-months": "Más de 3 meses",
  "not-defined": "Sin fecha definida",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, phone, country, projectType, budget, deadline, message } = body;

    // Server-side validation
    if (
      !name?.trim() ||
      !company?.trim() ||
      !email?.trim() ||
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
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        {
          success: false,
          error: "El correo electrónico no tiene un formato válido.",
        },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();
    const trimmedCompany = company.trim();
    const trimmedPhone = phone ? String(phone).trim() : "";
    const trimmedCountry = country.trim();
    const trimmedMessage = message.trim();

    // Map internal IDs to human-readable labels
    const projectTypeLabel = PROJECT_TYPE_LABELS[projectType] || projectType;
    const budgetLabel = BUDGET_RANGE_LABELS[budget] || budget;
    const deadlineLabel = DEADLINE_LABELS[deadline] || deadline;

    // Internal metadata values
    const leadStatus = "Nuevo lead";
    const source = "Web Vorello";
    const sourcePage = "/start";
    const submittedAt = new Date().toISOString();

    // Split name into first and last name for HubSpot CRM
    const nameParts = trimmedName.split(/\s+/);
    const firstname = nameParts[0] || "";
    const lastname = nameParts.slice(1).join(" ") || "";

    // Structured note body for HubSpot CRM Activity timeline
    const structuredNote = `
[Lead de Inicio de Proyecto - ${source}]
- Estado del Lead: ${leadStatus}
- Fuente: ${source}
- Página de origen: ${sourcePage}
- Fecha de envío: ${submittedAt}

----------------------------------------
DATOS DE CONTACTO:
- Nombre completo: ${trimmedName}
- Empresa / Marca: ${trimmedCompany}
- Email: ${trimmedEmail}
- Teléfono / WhatsApp: ${trimmedPhone || "No especificado"}
- País: ${trimmedCountry}

DETALLES DEL PROYECTO:
- Tipo de Proyecto: ${projectTypeLabel}
- Presupuesto Estimado: ${budgetLabel}
- Plazo Deseado: ${deadlineLabel}

MENSAJE / DESCRIPCIÓN:
${trimmedMessage}
`.trim();

    const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;

    if (accessToken) {
      // Properties object including custom columns for HubSpot CRM
      const fullContactProperties: Record<string, string> = {
        email: trimmedEmail,
        firstname,
        lastname,
        company: trimmedCompany,
        phone: trimmedPhone,
        country: trimmedCountry,
        lifecyclestage: "lead",
        message: trimmedMessage,
        project_type: projectTypeLabel,
        budget_range: budgetLabel,
        deadline: deadlineLabel,
      };

      // Helper function to submit properties with fallback if custom properties don't exist yet
      async function sendContactPayload(url: string, method: "POST" | "PATCH") {
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ properties: fullContactProperties }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          if (response.status === 400 && errorText.includes("PROPERTY_DOESNT_EXIST")) {
            console.warn(
              "Algunas propiedades personalizadas (project_type, budget_range, deadline) no están creadas en HubSpot CRM. Reintentando con propiedades estándar."
            );
            const standardProps = {
              email: trimmedEmail,
              firstname,
              lastname,
              company: trimmedCompany,
              phone: trimmedPhone,
              country: trimmedCountry,
              lifecyclestage: "lead",
              message: trimmedMessage,
            };
            const retryRes = await fetch(url, {
              method,
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
              body: JSON.stringify({ properties: standardProps }),
            });
            return retryRes;
          }
          return response;
        }
        return response;
      }

      let contactId: string | null = null;

      // 1. Search for existing contact by email in HubSpot CRM
      const searchUrl = "https://api.hubapi.com/crm/v3/objects/contacts/search";

      try {
        const searchResponse = await fetch(searchUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            filterGroups: [
              {
                filters: [
                  {
                    propertyName: "email",
                    operator: "EQ",
                    value: trimmedEmail,
                  },
                ],
              },
            ],
            limit: 1,
          }),
        });

        if (searchResponse.ok) {
          const searchData = await searchResponse.json();
          if (searchData.results && searchData.results.length > 0) {
            contactId = searchData.results[0].id;
          }
        } else {
          const searchErrText = await searchResponse.text();
          console.warn("Respuesta no OK al buscar contacto en HubSpot:", searchErrText);
        }
      } catch (searchError) {
        console.warn("Error al buscar contacto en HubSpot CRM:", searchError);
      }

      if (contactId) {
        // 2a. Update existing contact via PATCH
        const updateUrl = `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`;
        const updateResponse = await sendContactPayload(updateUrl, "PATCH");

        if (!updateResponse.ok) {
          const errorText = await updateResponse.text();
          console.error("Error al actualizar contacto en HubSpot CRM:", errorText);
          throw new Error("Error en la actualización de contacto en HubSpot CRM.");
        }
      } else {
        // 2b. Create new contact via POST
        const createUrl = "https://api.hubapi.com/crm/v3/objects/contacts";
        const createResponse = await sendContactPayload(createUrl, "POST");

        if (createResponse.ok) {
          const createData = await createResponse.json();
          contactId = createData.id;
        } else if (createResponse.status === 409) {
          const conflictText = await createResponse.text();
          console.warn("Contacto existente reportado por conflicto 409 en HubSpot:", conflictText);
          const idMatch = conflictText.match(/Existing ID: (\d+)/i) || conflictText.match(/ID: (\d+)/i);
          if (idMatch && idMatch[1]) {
            contactId = idMatch[1];
          }
        } else {
          const errorText = await createResponse.text();
          console.error("Error al crear contacto en HubSpot CRM:", errorText);
          throw new Error("Error en la creación de contacto en HubSpot CRM.");
        }
      }

      // 3. Attach a detailed Note to the Contact activity timeline in HubSpot
      if (contactId) {
        try {
          const noteUrl = "https://api.hubapi.com/crm/v3/objects/notes";
          const noteResponse = await fetch(noteUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              properties: {
                hs_note_body: structuredNote,
                hs_timestamp: submittedAt,
              },
              associations: [
                {
                  to: { id: contactId },
                  types: [
                    {
                      associationCategory: "HUBSPOT_DEFINED",
                      associationTypeId: 202, // Note to Contact association ID
                    },
                  ],
                },
              ],
            }),
          });

          if (!noteResponse.ok) {
            const noteErrText = await noteResponse.text();
            console.warn("No se pudo crear la nota asociada en HubSpot:", noteErrText);
          }
        } catch (noteError) {
          console.warn("Excepción al crear la nota asociada en HubSpot:", noteError);
        }
      }

      return NextResponse.json({ success: true });
    }

    // Fallback: Development / Mock mode when HUBSPOT_ACCESS_TOKEN is not set
    console.log("=== [MOCK LEAD SUBMISSION - HUBSPOT ACCESS TOKEN NOT SET] ===");
    console.log("Email:", trimmedEmail);
    console.log("Nombre:", trimmedName);
    console.log("Empresa:", trimmedCompany);
    console.log("Teléfono:", trimmedPhone);
    console.log("País:", trimmedCountry);
    console.log("Tipo de Proyecto:", projectTypeLabel);
    console.log("Presupuesto:", budgetLabel);
    console.log("Plazo Deseado:", deadlineLabel);
    console.log("Mensaje:", trimmedMessage);
    console.log("=============================================================");

    return NextResponse.json({ success: true, mock: true });
  } catch (error) {
    console.error("Error interno en /api/leads:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Ocurrió un error al procesar tu solicitud. Inténtalo de nuevo más tarde.",
      },
      { status: 500 }
    );
  }
}
