import nodemailer from "nodemailer";

const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    },
    port: 587,
    secure: false,
  });
  const info = await transporter.sendMail({
    from: `"CareerConnect" <${process.env.SENDER_EMAIL}>`,
    to,
    subject,
    html,
  });
};
export default sendEmail;