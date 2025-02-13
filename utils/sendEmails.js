import nodemailer from "nodemailer";
import { google } from "googleapis";
import { activateEmailTemplate } from "../email/activateEmailTemplate";

const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const {
  NEXT_PUBLIC_MAILING_SERVICE_CLIENT_ID,
  NEXT_PUBLIC_MAILING_SERVICE_CLIENT_SECRET,
  NEXT_PUBLIC_MAILING_SERVICE_CLIENT_REFRESH_TOKEN,
  NEXT_PUBLIC_SENDER_EMAIL_ADDRESS,
} = process.env;

const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_CLIENT_REFRESH_TOKEN,
  OAUTH_PLAYGROUND
);



export const sendEmail = async (to, url, txt, subject,template) => {


  oauth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_CLIENT_REFRESH_TOKEN,
  });



  const accessToken = await oauth2Client.getAccessToken();


  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: SENDER_EMAIL_ADDRESS,
      clientId: MAILING_SERVICE_CLIENT_ID,
      clientSecret: MAILING_SERVICE_CLIENT_SECRET,
      refreshToken: MAILING_SERVICE_CLIENT_REFRESH_TOKEN,
      accessToken: accessToken.token,
    },
  });



  const mailOptions = {
    from: SENDER_EMAIL_ADDRESS,
    to: to,
    subject: subject,
    html: template(to, url),
  };



  smtpTransport.sendMail(mailOptions, (err, info) => {
    if (err) return err;
    return info;
  });
  
};
export const sendNewsletter = async (recipientEmail) => {
  const emailSubject = "Confirm Your Subscription to Our Newsletter";

  // Template-ul de confirmare
  const confirmationTemplate = (email) => `
    <h1>Thank you for subscribing to our newsletter!</h1>
    <p>We have received your request to subscribe to our newsletter.</p>
    <p>You're now subscribed, and we will keep you updated with the latest news!</p>
    <p>If you did not subscribe, please ignore this email.</p>
  `;

  try {
    // Trimite emailul de confirmare
    await sendEmail(recipientEmail, "", "", emailSubject, confirmationTemplate);
    console.log("Confirmation email sent to:", recipientEmail);
  } catch (err) {
    console.error("Error sending confirmation email:", err);
  }}