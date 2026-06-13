const nodemailer =
  require("nodemailer");

const transporter =
  nodemailer.createTransport({
    host:
      process.env.BREVO_SMTP_HOST,

    port: Number(
      process.env.BREVO_SMTP_PORT
    ),

    secure: false,

    auth: {
      user:
        process.env.BREVO_SMTP_USER,

      pass:
        process.env.BREVO_SMTP_PASS,
    },
  });

// 🔥 Verify SMTP connection on startup
transporter.verify(
  (error, success) => {
    if (error) {
      console.error(
        "SMTP VERIFY ERROR:",
        error
      );
    } else {
      console.log(
        "✅ SMTP READY"
      );
    }
  }
);

const sendEmail =
  async ({
    to,
    subject,
    html,
  }) => {
    try {
      const info =
        await transporter.sendMail({
          from:
            process.env.EMAIL_FROM,

          to,

          subject,

          html,
        });

      console.log(
        "📧 Email sent:",
        info.messageId
      );

      return info;
    } catch (error) {
      console.error(
        "❌ Email sending failed:",
        error
      );

      throw error;
    }
  };

module.exports = {
  sendEmail,
};