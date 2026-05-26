import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// RFC 5322 compliant email regex
const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

function sanitize(str) {
  if (typeof str !== "string") return "";
  return str.replace(/<[^>]*>/g, "").replace(/[<>"'`]/g, "").trim();
}

const VALID_JOB_IDS = [
  "junk-removal-specialist",
  "moving-helper",
  "lead-mover-driver",
  "packing-specialist",
  "commercial-mover",
  "jobsite-labourer",
];

const JOB_TITLES = {
  "junk-removal-specialist": "Junk Removal Specialist",
  "moving-helper":           "Moving Helper",
  "lead-mover-driver":       "Lead Mover / Driver",
  "packing-specialist":      "Packing & Unpacking Specialist",
  "commercial-mover":        "Commercial Mover",
  "jobsite-labourer":        "Jobsite Labourer",
};

// ─── Email to employer ───────────────────────────────────────────────────────

function buildEmployerEmail({ name, email, phone, address, jobTitle }) {
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
              <span style="font-family:'Segoe UI',sans-serif;font-size:18px;font-weight:900;color:#ffffff;letter-spacing:1px;">RDM ENTERPRISES</span>
            </div>
            <h1 style="margin:0;font-family:'Segoe UI',sans-serif;font-size:22px;font-weight:700;color:#ffffff;">
              New Job Application
            </h1>
            <p style="margin:8px 0 0;font-family:'Segoe UI',sans-serif;font-size:13px;color:rgba(255,255,255,0.55);">
              Received ${new Date().toLocaleString("en-CA", { timeZone: "America/Edmonton", dateStyle: "full", timeStyle: "short" })} (MT)
            </p>
          </td>
        </tr>

        <!-- Position badge -->
        <tr>
          <td style="background:#DF5B10;padding:14px 40px;text-align:center;">
            <span style="font-family:'Segoe UI',sans-serif;font-size:13px;font-weight:700;color:#ffffff;text-transform:uppercase;letter-spacing:1.5px;">
              ${jobTitle}
            </span>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:36px 40px;border-radius:0 0 16px 16px;border:1px solid #e8e4dd;border-top:none;">

            <p style="margin:0 0 20px;font-family:'Segoe UI',sans-serif;font-size:13px;font-weight:700;color:#DF5B10;text-transform:uppercase;letter-spacing:1px;">Applicant Details</p>

            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0ede8;">
                  <span style="font-family:'Segoe UI',sans-serif;font-size:12px;color:#9b8f80;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Full Name</span><br/>
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
                  <a href="tel:${phone.replace(/\D/g, "")}" style="font-family:'Segoe UI',sans-serif;font-size:15px;color:#0D1D46;font-weight:600;text-decoration:none;">${phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;">
                  <span style="font-family:'Segoe UI',sans-serif;font-size:12px;color:#9b8f80;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Address</span><br/>
                  <span style="font-family:'Segoe UI',sans-serif;font-size:15px;color:#0D1D46;font-weight:600;">${address}</span>
                </td>
              </tr>
            </table>

            <div style="margin-top:28px;padding:16px;background:#f8f7f4;border-radius:10px;border-left:3px solid #DF5B10;">
              <p style="margin:0;font-family:'Segoe UI',sans-serif;font-size:13px;color:#0D1D46;">
                Resume attached as PDF below. Review and reply directly to the applicant.
              </p>
            </div>

            <!-- CTA -->
            <div style="margin-top:28px;text-align:center;">
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
              RDM Enterprises &nbsp;|&nbsp; Calgary, AB &nbsp;|&nbsp;
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

// ─── Confirmation email to candidate ─────────────────────────────────────────

function buildCandidateEmail({ name, jobTitle }) {
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
              <span style="font-family:'Segoe UI',sans-serif;font-size:18px;font-weight:900;color:#ffffff;letter-spacing:1px;">RDM ENTERPRISES</span>
            </div>
            <h1 style="margin:0;font-family:'Segoe UI',sans-serif;font-size:22px;font-weight:700;color:#ffffff;">
              We Got Your Application!
            </h1>
            <p style="margin:8px 0 0;font-family:'Segoe UI',sans-serif;font-size:13px;color:rgba(255,255,255,0.55);">
              Application confirmation
            </p>
          </td>
        </tr>

        <!-- Position badge -->
        <tr>
          <td style="background:#DF5B10;padding:14px 40px;text-align:center;">
            <span style="font-family:'Segoe UI',sans-serif;font-size:13px;font-weight:700;color:#ffffff;text-transform:uppercase;letter-spacing:1.5px;">
              ${jobTitle}
            </span>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:36px 40px;border-radius:0 0 16px 16px;border:1px solid #e8e4dd;border-top:none;">

            <p style="margin:0 0 16px;font-family:'Segoe UI',sans-serif;font-size:16px;color:#0D1D46;font-weight:700;">
              Hi ${name},
            </p>
            <p style="margin:0 0 16px;font-family:'Segoe UI',sans-serif;font-size:14px;color:#6b7280;line-height:1.7;">
              Thanks for applying for the <strong style="color:#0D1D46;">${jobTitle}</strong> position at RDM Enterprises.
              We've received your application and resume, and our hiring team will review it shortly.
            </p>
            <p style="margin:0 0 24px;font-family:'Segoe UI',sans-serif;font-size:14px;color:#6b7280;line-height:1.7;">
              We typically get back to candidates within <strong style="color:#0D1D46;">2 business days</strong>.
              If you have any questions in the meantime, feel free to reach out directly.
            </p>

            <!-- What's next -->
            <div style="background:#f8f7f4;border-radius:12px;padding:20px 24px;margin-bottom:28px;">
              <p style="margin:0 0 14px;font-family:'Segoe UI',sans-serif;font-size:12px;font-weight:700;color:#DF5B10;text-transform:uppercase;letter-spacing:1px;">
                What Happens Next
              </p>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:6px 0;">
                    <span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:#DF5B10;color:#fff;font-family:'Segoe UI',sans-serif;font-size:11px;font-weight:700;text-align:center;line-height:22px;margin-right:10px;">1</span>
                    <span style="font-family:'Segoe UI',sans-serif;font-size:13px;color:#0D1D46;">Our team reviews your application and resume</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;">
                    <span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:#DF5B10;color:#fff;font-family:'Segoe UI',sans-serif;font-size:11px;font-weight:700;text-align:center;line-height:22px;margin-right:10px;">2</span>
                    <span style="font-family:'Segoe UI',sans-serif;font-size:13px;color:#0D1D46;">We reach out to schedule a quick phone call</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;">
                    <span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:#DF5B10;color:#fff;font-family:'Segoe UI',sans-serif;font-size:11px;font-weight:700;text-align:center;line-height:22px;margin-right:10px;">3</span>
                    <span style="font-family:'Segoe UI',sans-serif;font-size:13px;color:#0D1D46;">If it's a good fit, we invite you for a meet &amp; greet on-site</span>
                  </td>
                </tr>
              </table>
            </div>

            <p style="margin:0;font-family:'Segoe UI',sans-serif;font-size:14px;color:#6b7280;line-height:1.7;">
              Thanks again for your interest in joining RDM Enterprises. We look forward to connecting with you!
            </p>

            <!-- Divider -->
            <div style="margin:28px 0;border-top:1px solid #f0ede8;"></div>

            <!-- Contact info -->
            <p style="margin:0 0 8px;font-family:'Segoe UI',sans-serif;font-size:12px;color:#9b8f80;">Questions? Reach us at:</p>
            <p style="margin:0;font-family:'Segoe UI',sans-serif;font-size:13px;color:#0D1D46;">
              <a href="mailto:info@rdmenterprise.ca" style="color:#DF5B10;text-decoration:none;font-weight:600;">info@rdmenterprise.ca</a>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <a href="tel:+18255835070" style="color:#DF5B10;text-decoration:none;font-weight:600;">+1 (825) 583-5070</a>
            </p>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px;text-align:center;">
            <p style="margin:0;font-family:'Segoe UI',sans-serif;font-size:12px;color:#9b8f80;">
              RDM Enterprises &nbsp;|&nbsp; Calgary, AB &nbsp;|&nbsp;
              <a href="https://www.rdmenterprise.ca" style="color:#DF5B10;text-decoration:none;">rdmenterprise.ca</a>
            </p>
            <p style="margin:8px 0 0;font-family:'Segoe UI',sans-serif;font-size:11px;color:#c0b8b0;">
              You're receiving this because you submitted a job application on our website.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── POST handler ─────────────────────────────────────────────────────────────

export async function POST(request) {
  try {
    let formData;
    try {
      formData = await request.formData();
    } catch {
      return NextResponse.json(
        { success: false, errors: { form: "Invalid request format. Please try again." } },
        { status: 400 }
      );
    }

    // Extract and sanitize text fields
    const name    = sanitize(formData.get("name")    ?? "");
    const phone   = sanitize(formData.get("phone")   ?? "");
    const email   = sanitize(formData.get("email")   ?? "");
    const address = sanitize(formData.get("address") ?? "");
    const jobId   = sanitize(formData.get("jobId")   ?? "");
    const resume  = formData.get("resume");

    // ─── Validate ───────────────────────────────────────────────────────────
    const errors = {};

    if (!name || name.length < 2)         errors.name    = "Please enter your full name.";
    if (name.length > 100)                errors.name    = "Name is too long.";

    if (!phone || phone.length < 7)       errors.phone   = "Please enter a valid phone number.";
    if (phone.length > 30)                errors.phone   = "Phone number is too long.";

    if (!email)                           errors.email   = "Email address is required.";
    else if (!EMAIL_RE.test(email))       errors.email   = "Please enter a valid email address.";

    if (!address || address.length < 5)   errors.address = "Please enter your address.";
    if (address.length > 200)             errors.address = "Address is too long.";

    if (!jobId || !VALID_JOB_IDS.includes(jobId))
                                          errors.jobId   = "Please select a valid position.";

    // Resume validation
    if (!resume || typeof resume === "string") {
      errors.resume = "Please upload your resume.";
    } else {
      if (resume.type !== "application/pdf") {
        errors.resume = "Only PDF files are accepted.";
      }
      if (resume.size > MAX_FILE_SIZE) {
        errors.resume = "Resume must be under 5 MB.";
      }
      // Extra: reject suspiciously small files (less than 1 KB = likely not a real resume)
      if (resume.size < 1024) {
        errors.resume = "The uploaded file appears to be empty or invalid.";
      }
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 422 });
    }

    // ─── Read file buffer ────────────────────────────────────────────────────
    const resumeBuffer = Buffer.from(await resume.arrayBuffer());
    const jobTitle = JOB_TITLES[jobId] ?? jobId;

    // ─── Send emails ─────────────────────────────────────────────────────────
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Employer notification (with resume attachment)
    await transporter.sendMail({
      from:    `"RDM Enterprises" <${process.env.GMAIL_USER}>`,
      to:      process.env.CONTACT_RECEIVER_EMAIL,
      replyTo: email,
      subject: `New Job Application — ${jobTitle} from ${name}`,
      html:    buildEmployerEmail({ name, email, phone, address, jobTitle }),
      attachments: [
        {
          filename:    `${name.replace(/\s+/g, "_")}_Resume.pdf`,
          content:     resumeBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    // Candidate confirmation
    await transporter.sendMail({
      from:    `"RDM Enterprises" <${process.env.GMAIL_USER}>`,
      to:      email,
      subject: `Application Received — ${jobTitle} at RDM Enterprises`,
      html:    buildCandidateEmail({ name, jobTitle }),
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Career application error:", err);
    return NextResponse.json(
      { success: false, errors: { form: "Something went wrong on our end. Please try again or call us directly at +1 (825) 583-5070." } },
      { status: 500 }
    );
  }
}
