// TODO: wire these to your real provider (Resend, Cloudflare Email, ...).
export async function sendNewsletterConfirmation(email: string, confirmationToken: string) {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/newsletter/confirm?token=${confirmationToken}`;
  console.log("[newsletter] confirm", email, url);
}
export async function sendContactNotification(msg: { name: string; email: string; subject?: string | null; message: string }) {
  console.log("[contact] new message from", msg.email);
}
