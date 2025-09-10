import nodemailer from 'nodemailer';

export async function sendVerificationEmail({
  to,
  name,
  verificationUrl
}: {
  to: string;
  name: string;
  verificationUrl: string;
}) {
  // Konfigurasi transporter (gunakan SMTP provider, misal Gmail, Mailgun, dll)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const mailOptions = {
    from: `Akademi Pengentasan Kemiskinan <${process.env.SMTP_USER}>`,
    to,
    subject: 'Verifikasi Akun Cloud Campus',
    html: `
      <div style="font-family: Poppins, Arial, sans-serif;">
        <h2>Halo ${name},</h2>
        <p>Terima kasih telah mendaftar di Cloud Campus.</p>
        <p>Silakan klik tombol di bawah ini untuk verifikasi akun Anda:</p>
        <p style="margin: 24px 0;">
          <a href="${verificationUrl}" style="background: #2563eb; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Verifikasi Akun</a>
        </p>
        <p>Jika Anda tidak mendaftar, abaikan email ini.</p>
        <hr style="margin: 32px 0;" />
        <small>Cloud Campus &copy; ${new Date().getFullYear()}</small>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
}
