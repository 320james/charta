import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
  const confirmLink = `http://localhost:3000/new-verification?token=${token}`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Confirm your email',
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const confirmLink = `http://localhost:3000/new-password?token=${token}`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${confirmLink}">here</a> to reset your password.</p>`,
  });
}

export async function sendTwoFactorEmail(email: string, token: string) {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Your Two-Factor Token',
    html: `<p>Your two-factor token is: <strong>${token}</strong></p>`,
  });
}
