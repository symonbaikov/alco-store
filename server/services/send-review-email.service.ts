import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: true,
    minVersion: "TLSv1.2"
  },
  debug: true,
  logger: true
});

export async function sendReviewEmail({ name, email, message, rating, file }: { name: string, email: string, message: string, rating: number, file?: Express.Multer.File }) {
  try {
    const mailOptions: any = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // или другой email для получения отзывов
      subject: 'Новый отзыв на сайте',
      text: `Имя: ${name}\nEmail: ${email}\nОценка: ${rating}\nСообщение: ${message}`
    };
    if (file) {
      mailOptions.attachments = [{
        filename: file.originalname,
        content: file.buffer
      }];
    }
    await transporter.sendMail(mailOptions);
    console.log('[sendReviewEmail] Email sent successfully');
  } catch (mailErr) {
    console.error('[sendReviewEmail] Error sending email:', mailErr);
    throw mailErr;
  }
} 