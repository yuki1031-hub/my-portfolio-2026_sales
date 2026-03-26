import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { email, subject, message } = await req.json();

  try {
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // 独自ドメイン取得後は変更
      to: 'hishikawa1031@gmail.com',            // 受け取りたいアドレス
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${email}\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}