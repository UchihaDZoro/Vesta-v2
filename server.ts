import express from "express";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for Contact Submission
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, organization, message, category } = req.body;

      // Validate fields are present (and non-empty strings)
      if (!name || typeof name !== "string" || !name.trim()) {
        return res.status(400).json({ error: "Name is a required field." });
      }
      if (!email || typeof email !== "string" || !email.trim()) {
        return res.status(400).json({ error: "Email address is a required field." });
      }
      if (!organization || typeof organization !== "string" || !organization.trim()) {
        return res.status(400).json({ error: "Organization is a required field." });
      }
      if (!message || typeof message !== "string" || !message.trim()) {
        return res.status(400).json({ error: "Message details are required." });
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return res.status(400).json({ error: "Please enter a valid email address." });
      }

      const host = process.env.SMTP_HOST;
      const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
      const user = process.env.SMTP_USER;
      const pass = process.env.SMTP_PASS;
      
      let companyEmails = process.env.CONTACT_COMPANY_EMAIL || "pathangulam203@gmail.com,edhas6514@gmail.com";
      // Guarantee pathangulam203@gmail.com is always included
      if (!companyEmails.split(",").map(e => e.trim().toLowerCase()).includes("pathangulam203@gmail.com")) {
        companyEmails = `${companyEmails},pathangulam203@gmail.com`;
      }

      const inquiryCategory = category || "General Inquiry";

      console.log(`[Contact Form] Submission received:
- Name: ${name}
- Email: ${email}
- Organization: ${organization}
- Category: ${inquiryCategory}
- Message: ${message}`);

      if (host && user && pass) {
        // Create real SMTP transport
        const transporter = nodemailer.createTransport({
          host,
          port,
          secure: port === 465, // true for port 465, false for 587 or other
          auth: { user, pass },
        });

        const mailOptions = {
          from: `"${name} via Vesta OS" <${user}>`,
          to: companyEmails,
          replyTo: email,
          subject: `[Vesta OS Inquiry] New ${inquiryCategory} from ${name}`,
          text: `You have received a new dynamic form submission:

Category: ${inquiryCategory}
Name: ${name}
Email: ${email}
Organization: ${organization}

Message details:
${message}

--- Sent securely via Vesta Technologies Pvt. Ltd Portal.`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #EBE9E2; border-radius: 12px; background-color: #FCFAF7;">
              <h2 style="color: #0F8B8D; margin-top: 0; border-bottom: 2px solid #D4A64A; padding-bottom: 10px;">New Form Dispatch Received</h2>
              <p style="font-size: 14px; color: #18181B; line-height: 1.6;">A visitor has submitted a new inquiry via the Vesta Technologies website.</p>
              
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr style="background-color: #FFFFFF;">
                  <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #EBE9E2; width: 140px;">Category</td>
                  <td style="padding: 10px; border-bottom: 1px solid #EBE9E2; color: #D4A64A; font-weight: bold;">${inquiryCategory}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #EBE9E2;">Full Name</td>
                  <td style="padding: 10px; border-bottom: 1px solid #EBE9E2;">${name}</td>
                </tr>
                <tr style="background-color: #FFFFFF;">
                  <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #EBE9E2;">Email Address</td>
                  <td style="padding: 10px; border-bottom: 1px solid #EBE9E2;"><a href="mailto:${email}" style="color: #0F8B8D;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #EBE9E2;">Organization</td>
                  <td style="padding: 10px; border-bottom: 1px solid #EBE9E2;">${organization}</td>
                </tr>
              </table>

              <div style="background-color: #FFFFFF; padding: 15px; border-radius: 8px; border: 1px solid #EBE9E2; margin-top: 20px;">
                <h4 style="margin: 0 0 10px 0; color: #18181B; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Message Details</h4>
                <p style="margin: 0; font-size: 14px; color: #4B5563; line-height: 1.6; white-space: pre-line;">${message}</p>
              </div>

              <p style="font-size: 11px; color: #9CA3AF; margin-top: 30px; text-align: center; border-top: 1px solid #EBE9E2; padding-top: 15px;">
                &copy; ${new Date().getFullYear()} Vesta Technologies Pvt. Ltd. All rights reserved.
              </p>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true, message: "Email transmitted successfully." });
      } else {
        // Sandbox mode: Success is returned but logged server-side
        return res.status(200).json({
          success: true,
          sandbox: true,
          message: "Submission received in development sandbox mode (SMTP servers are not configured).",
        });
      }
    } catch (error: any) {
      console.error("Error sending email via contact API:", error);
      return res.status(500).json({ error: error.message || "Internal server error while processing the dispatch." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start the Express server:", error);
});
