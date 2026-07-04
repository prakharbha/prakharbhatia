import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error("[contact] RESEND_API_KEY is not set")
      return NextResponse.json({ error: "Email service is not configured." }, { status: 500 })
    }
    const resend = new Resend(apiKey)

    const { name, email, subject, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 })
    }

    await resend.emails.send({
      from: "CV Contact Form <noreply@nandann.com>",
      to: "prakhar@nandann.com",
      replyTo: email,
      subject: subject ? `[CV] ${subject}` : `[CV] New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nSubject: ${subject || "—"}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#111">
          <h2 style="margin-bottom:4px">New message from your CV</h2>
          <hr style="border:none;border-top:1px solid #eee;margin:12px 0"/>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject || "—"}</p>
          <hr style="border:none;border-top:1px solid #eee;margin:12px 0"/>
          <p style="white-space:pre-wrap">${message}</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[contact]", err)
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 })
  }
}
