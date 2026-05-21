import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// RFC 5322 compliant email regex — widely used, handles all real-world cases
const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

// Sanitize: strip HTML tags and trim
function sanitize(str) {
  if (typeof str !== "string") return "";
  return str.replace(/<[^>]*>/g, "").replace(/[<>"'`]/g, "").trim();
}

// Moving services that trigger extra fields
const MOVING_SERVICES = ["Residential Moving", "Commercial Moving", "Packing & Unpacking", "Office Moving", "Moving Services"];
const JUNK_SERVICES   = ["Junk Removal"];

const VALID_SERVICES = [
  "Residential Moving", "Commercial Moving", "Packing & Unpacking",
  "Office Moving", "Moving Services", "Junk Removal", "Jobsite Labour",
  "Investor Relations", "Other",
];

const VALID_PROPERTY_TYPES = ["House", "Apartment", "Condo", "Office"];

const VALID_JUNK_TYPES = [
  "Junk Removal", "Furniture Removal", "Appliance Removal",
  "Construction Waste", "Yard Waste", "Garage Cleanup", "Office Cleanup", "Other",
];

function buildEmailHtml({ name, email, phone, service, message, movingDate, pickupAddress, dropoffAddress, propertyType, junkType }) {
  const isMoving = MOVING_SERVICES.includes(service);
  const isJunk   = JUNK_SERVICES.includes(service);

  const conditionalRows = isMoving ? `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f0ede8;">
        <span style="font-family:'Segoe UI',sans-serif;font-size:12px;color:#9b8f80;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Moving Date</span><br/>
        <span style="font-family:'Segoe UI',sans-serif;font-size:15px;color:#0D1D46;font-weight:600;">${movingDate || "—"}</span>
      </td>
    </tr>
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f0ede8;">
        <span style="font-family:'Segoe UI',sans-serif;font-size:12px;color:#9b8f80;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Pickup Address</span><br/>
        <span style="font-family:'Segoe UI',sans-serif;font-size:15px;color:#0D1D46;font-weight:600;">${pickupAddress || "—"}</span>
      </td>
    </tr>
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f0ede8;">
        <span style="font-family:'Segoe UI',sans-serif;font-size:12px;color:#9b8f80;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Drop-off Address</span><br/>
        <span style="font-family:'Segoe UI',sans-serif;font-size:15px;color:#0D1D46;font-weight:600;">${dropoffAddress || "—"}</span>
      </td>
    </tr>
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f0ede8;">
        <span style="font-family:'Segoe UI',sans-serif;font-size:12px;color:#9b8f80;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Property Type</span><br/>
        <span style="font-family:'Segoe UI',sans-serif;font-size:15px;color:#0D1D46;font-weight:600;">${propertyType || "—"}</span>
      </td>
    </tr>
  ` : isJunk ? `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f0ede8;">
        <span style="font-family:'Segoe UI',sans-serif;font-size:12px;color:#9b8f80;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Moving Date</span><br/>
        <span style="font-family:'Segoe UI',sans-serif;font-size:15px;color:#0D1D46;font-weight:600;">${movingDate || "—"}</span>
      </td>
    </tr>
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f0ede8;">
        <span style="font-family:'Segoe UI',sans-serif;font-size:12px;color:#9b8f80;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Pickup Address</span><br/>
        <span style="font-family:'Segoe UI',sans-serif;font-size:15px;color:#0D1D46;font-weight:600;">${pickupAddress || "—"}</span>
      </td>
    </tr>
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f0ede8;">
        <span style="font-family:'Segoe UI',sans-serif;font-size:12px;color:#9b8f80;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Junk Type</span><br/>
        <span style="font-family:'Segoe UI',sans-serif;font-size:15px;color:#0D1D46;font-weight:600;">${junkType || "—"}</span>
      </td>
    </tr>
  ` : "";

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f8f7f4;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f7f4;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#0D1D46;border-radius:16px 16px 0 0;padding:36px 40px;text-align:center;">
            <div style="display:inline-block;background:#DF5B10;border-radius:10px;padding:10px 20px;margin-bottom:16px;">
              <span style="font-family:'Segoe UI',sans-serif;font-size:18px;font-weight:900;color:#ffffff;letter-spacing:1px;">RDM enterprise</span>
            </div>
            <h1 style="margin:0;font-family:'Segoe UI',sans-serif;font-size:22px;font-weight:700;color:#ffffff;">
              New Quote Request
            </h1>
            <p style="margin:8px 0 0;font-family:'Segoe UI',sans-serif;font-size:13px;color:rgba(255,255,255,0.55);">
              Received ${new Date().toLocaleString("en-CA", { timeZone: "America/Edmonton", dateStyle: "full", timeStyle: "short" })} (MT)
            </p>
          </td>
        </tr>

        <!-- Service badge -->
        <tr>
          <td style="background:#DF5B10;padding:14px 40px;text-align:center;">
            <span style="font-family:'Segoe UI',sans-serif;font-size:13px;font-weight:700;color:#ffffff;text-transform:uppercase;letter-spacing:1.5px;">
              ${service}
            </span>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:36px 40px;border-radius:0 0 16px 16px;border:1px solid #e8e4dd;border-top:none;">

            <!-- Contact info -->
            <p style="margin:0 0 20px;font-family:'Segoe UI',sans-serif;font-size:13px;font-weight:700;color:#DF5B10;text-transform:uppercase;letter-spacing:1px;">Contact Details</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0ede8;">
                  <span style="font-family:'Segoe UI',sans-serif;font-size:12px;color:#9b8f80;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Name</span><br/>
                  <span style="font-family:'Segoe UI',sans-serif;font-size:15px;color:#0D1D46;font-weight:600;">${name}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0ede8;">
                  <span style="font-family:'Segoe UI',sans-serif;font-size:12px;color:#9b8f80;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Email</span><br/>
                  <a href="mailto:${email}" style="font-family:'Segoe UI',sans-serif;font-size:15px;color:#DF5B10;font-weight:600;text-decoration:none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0ede8;">
                  <span style="font-family:'Segoe UI',sans-serif;font-size:12px;color:#9b8f80;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Phone</span><br/>
                  <a href="tel:${phone.replace(/\D/g,"")}" style="font-family:'Segoe UI',sans-serif;font-size:15px;color:#0D1D46;font-weight:600;text-decoration:none;">${phone}</a>
                </td>
              </tr>
            </table>

            <!-- Service-specific fields -->
            ${conditionalRows ? `
            <p style="margin:24px 0 20px;font-family:'Segoe UI',sans-serif;font-size:13px;font-weight:700;color:#DF5B10;text-transform:uppercase;letter-spacing:1px;">Job Details</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0ede8;">
                  <span style="font-family:'Segoe UI',sans-serif;font-size:12px;color:#9b8f80;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Service Type</span><br/>
                  <span style="font-family:'Segoe UI',sans-serif;font-size:15px;color:#0D1D46;font-weight:600;">${isMoving ? "Moving Service" : isJunk ? "Junk Removal Service" : "Other Service"}</span>
                </td>
              </tr>
              ${conditionalRows}
            </table>` : ""}

            <!-- Message -->
            <p style="margin:24px 0 12px;font-family:'Segoe UI',sans-serif;font-size:13px;font-weight:700;color:#DF5B10;text-transform:uppercase;letter-spacing:1px;">Message</p>
            <div style="background:#f8f7f4;border-radius:10px;padding:18px;border-left:3px solid #DF5B10;">
              <p style="margin:0;font-family:'Segoe UI',sans-serif;font-size:14px;color:#0D1D46;line-height:1.7;white-space:pre-wrap;">${message}</p>
            </div>

            <!-- CTA -->
            <div style="margin-top:32px;text-align:center;">
              <a href="mailto:${email}" style="display:inline-block;background:#DF5B10;color:#ffffff;font-family:'Segoe UI',sans-serif;font-size:14px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:50px;letter-spacing:0.5px;">
                Reply to ${name}
              </a>
            </div>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px;text-align:center;">
            <p style="margin:0;font-family:'Segoe UI',sans-serif;font-size:12px;color:#9b8f80;">
              RDM enterprise &nbsp;|&nbsp; Calgary, AB &nbsp;|&nbsp;
              <a href="tel:+18255835070" style="color:#DF5B10;text-decoration:none;">+1 (825) 583-5070</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Sanitize all inputs
    const name           = sanitize(body.name);
    const email          = sanitize(body.email);
    const phone          = sanitize(body.phone);
    const service        = sanitize(body.service);
    const message        = sanitize(body.message);
    const movingDate     = sanitize(body.movingDate     || "");
    const pickupAddress  = sanitize(body.pickupAddress  || "");
    const dropoffAddress = sanitize(body.dropoffAddress || "");
    const propertyType   = sanitize(body.propertyType   || "");
    const junkType       = sanitize(body.junkType       || "");

    // --- Backend validation ---
    const errors = {};

    if (!name || name.length < 2)          errors.name    = "Please enter your full name.";
    if (name.length > 100)                 errors.name    = "Name is too long.";

    if (!email)                            errors.email   = "Email address is required.";
    else if (!EMAIL_RE.test(email))        errors.email   = "Please enter a valid email address.";

    if (!phone || phone.length < 7)        errors.phone   = "Please enter a valid phone number.";
    if (phone.length > 30)                 errors.phone   = "Phone number is too long.";

    if (!service || !VALID_SERVICES.includes(service))
                                           errors.service = "Please select a valid service.";

    if (!message || message.length < 10)   errors.message = "Please provide a brief description (at least 10 characters).";
    if (message.length > 2000)             errors.message = "Message is too long (max 2000 characters).";

    const isMoving = MOVING_SERVICES.includes(service);
    const isJunk   = JUNK_SERVICES.includes(service);

    if (isMoving || isJunk) {
      if (!movingDate)                     errors.movingDate    = "Please provide the date.";
      if (!pickupAddress)                  errors.pickupAddress = "Pickup address is required.";
    }
    if (isMoving) {
      if (!dropoffAddress)                 errors.dropoffAddress = "Drop-off address is required.";
      if (!propertyType || !VALID_PROPERTY_TYPES.includes(propertyType))
                                           errors.propertyType  = "Please select a property type.";
    }
    if (isJunk) {
      if (!junkType || !VALID_JUNK_TYPES.includes(junkType))
                                           errors.junkType      = "Please select a junk type.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 422 });
    }

    // --- Send email ---
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from:    `"RDM enterprise" <${process.env.GMAIL_USER}>`,
      to:      process.env.CONTACT_RECEIVER_EMAIL,
      replyTo: email,
      subject: `New Quote Request — ${service} from ${name}`,
      html:    buildEmailHtml({ name, email, phone, service, message, movingDate, pickupAddress, dropoffAddress, propertyType, junkType }),
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { success: false, errors: { form: "Something went wrong. Please try again or call us directly." } },
      { status: 500 }
    );
  }
}
