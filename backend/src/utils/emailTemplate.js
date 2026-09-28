import escapeHtml from "./htmlSymbol.js";

const emailTemplate = ({
  title,
  eyebrow = "BookMe",
  intro,
  rows,
  accent = "#7D57F5",
  notes,
  calendarUrl,
  footer,
}) => {
  const detailRows = rows
    .filter(
      (row) =>
        row.value !== undefined && row.value !== null && row.value !== "",
    )
    .map(
      (row) => `
      <tr>
        <td style="padding: 14px 0; color: #94a3b8; font-size: 13px; width: 36%; vertical-align: top;">${escapeHtml(row.label)}</td>
        <td style="padding: 14px 0; color: #1e293b; font-size: 14px; font-weight: 700;">${escapeHtml(row.value)}</td>
      </tr>
    `,
    )
    .join("");

  return `
    <!doctype html>
    <html>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
      </head>
      <body style="margin:0; padding:0; background:#f1f0f5; font-family:'Inter', Arial, Helvetica, sans-serif; color:#1e293b;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f1f0f5; padding:40px 16px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px; background:#ffffff; border-radius:24px; overflow:hidden; box-shadow: 0 4px 24px rgba(125,87,245,0.08);">
                <!-- Header with brand gradient -->
                <tr>
                  <td style="background: linear-gradient(180deg, #CBB8FF 0%, #9B7BFF 50%, #7D57F5 100%); padding:36px 36px 32px; text-align:center;">
                    <div style="font-size:11px; letter-spacing:2.5px; text-transform:uppercase; font-weight:800; color:rgba(255,255,255,0.8); margin-bottom:12px;">${escapeHtml(eyebrow)}</div>
                    <h1 style="margin:0; font-size:28px; line-height:1.25; color:#ffffff; font-weight:800;">${escapeHtml(title)}</h1>
                  </td>
                </tr>
                <!-- Body -->
                <tr>
                  <td style="padding:32px 36px 36px;">
                    <p style="margin:0 0 24px; font-size:15px; line-height:1.7; color:#475569;">${escapeHtml(intro)}</p>
                    <!-- Details table -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:2px solid #EBE4FF; border-bottom:2px solid #EBE4FF;">
                      ${detailRows}
                    </table>
                    ${notes ? `<div style="margin:24px 0 0; padding:16px 18px; background:#F4F0FF; border:1px solid #EBE4FF; border-radius:14px; color:#475569; font-size:14px; line-height:1.6;"><strong style="color:#7D57F5;">Notes:</strong> ${escapeHtml(notes)}</div>` : ""}
                    ${calendarUrl ? `<p style="margin:28px 0 0; text-align:center;"><a href="${escapeHtml(calendarUrl)}" style="display:inline-block; background:linear-gradient(180deg, #9B7BFF 0%, #7D57F5 100%); color:#ffffff; text-decoration:none; padding:14px 28px; border-radius:14px; font-size:14px; font-weight:700; letter-spacing:0.3px;">Add to Google Calendar</a></p>` : ""}
                    <p style="margin:28px 0 0; color:#94a3b8; font-size:13px; line-height:1.6;">${escapeHtml(footer)}</p>
                  </td>
                </tr>
                <!-- Footer bar -->
                <tr>
                  <td style="padding:0 36px 28px; text-align:center;">
                    <div style="border-top:1px solid #f1f5f9; padding-top:20px;">
                      <span style="font-size:12px; font-weight:700; color:#CBB8FF; letter-spacing:1.5px; text-transform:uppercase;">Powered by BookMe</span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};
export default emailTemplate;
