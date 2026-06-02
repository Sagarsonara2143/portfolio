import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    // Read raw text first to debug, then parse
    const text = await req.text();

    if (!text || text.trim() === '') {
      return NextResponse.json({ error: 'Empty request body' }, { status: 400 });
    }

    let body: { name?: string; email?: string; subject?: string; message?: string };
    try {
      body = JSON.parse(text);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASS;

    if (!gmailUser || !gmailPass) {
      console.error('Missing Gmail credentials in environment');
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,       // SSL
      auth: {
        user: gmailUser,
        pass: gmailPass.replace(/\s/g, ''), // strip any spaces from app password
      },
    });

    // Verify connection before sending
    await transporter.verify();

    await transporter.sendMail({
      from: `"Portfolio Contact" <${gmailUser}>`,
      to: 'sagarsonara2143@gmail.com',   // always deliver to Sagar's main inbox
      replyTo: `"${name}" <${email}>`,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;padding:0;border-radius:16px;overflow:hidden">

          <!-- Header -->
          <div style="background:linear-gradient(135deg,#2563eb 0%,#0ea5e9 100%);padding:28px 32px">
            <h1 style="color:#fff;margin:0;font-size:22px;font-weight:800;letter-spacing:-0.02em">📬 New Portfolio Message</h1>
            <p style="color:rgba(255,255,255,0.75);margin:6px 0 0;font-size:14px">From your portfolio website</p>
          </div>

          <!-- Body -->
          <div style="padding:28px 32px;background:#fff">
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;color:#94a3b8;font-size:11px;width:90px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;vertical-align:top">From</td>
                <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;color:#0f172a;font-size:15px;font-weight:600">${name}<br/><a href="mailto:${email}" style="color:#2563eb;font-weight:400;font-size:13px">${email}</a></td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;color:#94a3b8;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;vertical-align:top">Subject</td>
                <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;color:#0f172a;font-size:15px">${subject}</td>
              </tr>
            </table>

            <div style="background:#f8fafc;border-left:3px solid #2563eb;border-radius:0 8px 8px 0;padding:18px 20px">
              <p style="color:#94a3b8;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin:0 0 10px">Message</p>
              <p style="color:#0f172a;font-size:15px;line-height:1.8;margin:0;white-space:pre-wrap">${message}</p>
            </div>
          </div>

          <!-- Footer -->
          <div style="padding:18px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center">
            <p style="color:#94a3b8;font-size:12px;margin:0">
              Hit <strong>Reply</strong> to respond directly to ${name} at ${email}
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('Email send error:', msg);
    return NextResponse.json(
      { error: `Failed to send: ${msg}` },
      { status: 500 }
    );
  }
}
