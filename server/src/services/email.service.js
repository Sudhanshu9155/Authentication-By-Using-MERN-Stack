import nodemailer from "nodemailer";
import config from "../config/config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: config.GOOGLE_USER,
    clientId: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    refreshToken: config.GOOGLE_REFRESH_TOKEN,
  },
});

// Verify connection on startup
transporter.verify((error) => {
  if (error) {
    console.error("Email server connection error:", error.message);
  } else {
    console.log("Email server is ready to send messages");
  }
});

/**
 * Sends an email.
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string|null} text - Plain text body (optional)
 * @param {string|null} html - HTML body (optional)
 */
export const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Auth Service" <${config.GOOGLE_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error.message);
    // Re-throw so the caller knows the email failed
    throw new Error("Failed to send email. Please try again later.");
  }
};