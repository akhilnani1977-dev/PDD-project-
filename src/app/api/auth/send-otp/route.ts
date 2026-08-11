import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { saveOTP } from "@/lib/otpStore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, recipient } = body;

    const targetEmail = email || recipient || "akhilnani1977@gmail.com";

    // Generate secure random 6-digit OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store in-memory with 10-minute expiry
    saveOTP(targetEmail, generatedOtp, 10);

    // Gmail Transporter Setup using user's App Password
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL || "akhilnani1977@gmail.com",
        pass: process.env.SMTP_PASSWORD || "sopl ngpi htwj fnjg",
      },
    });

    const mailOptions = {
      from: `"Traverse India" <${process.env.SMTP_EMAIL || "akhilnani1977@gmail.com"}>`,
      to: targetEmail,
      subject: `🔑 ${generatedOtp} is your Traverse Verification Code`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f8fafc; padding: 40px 20px; text-align: center;">
          <div style="max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 20px; padding: 36px; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
            <div style="background-color: #059669; color: #ffffff; width: 60px; height: 60px; line-height: 60px; font-size: 24px; font-weight: bold; border-radius: 16px; margin: 0 auto 20px auto;">
              T
            </div>
            <h2 style="color: #0f172a; font-size: 24px; font-weight: 800; margin: 0 0 10px 0;">Verification Code</h2>
            <p style="color: #475569; font-size: 14px; margin-bottom: 24px;">Use the 6-digit OTP code below to sign in to your Traverse account.</p>
            
            <div style="background-color: #ecfdf5; border: 2px dashed #a7f3d0; border-radius: 16px; padding: 18px; margin: 20px 0;">
              <span style="font-size: 36px; font-weight: 900; letter-spacing: 8px; color: #059669; font-family: monospace;">${generatedOtp}</span>
            </div>
            
            <p style="color: #94a3b8; font-size: 12px; margin-top: 20px;">This code will expire in <strong>10 minutes</strong>. Do not share this code with anyone.</p>
            <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 30px 0 20px 0;" />
            <p style="color: #cbd5e1; font-size: 11px;">© Traverse Travel Discovery • All rights reserved</p>
          </div>
        </div>
      `,
    };

    // Send email asynchronously
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: `Real-time OTP sent successfully to ${targetEmail}`,
      otp: generatedOtp, // Included for easy development testing
    });
  } catch (error: unknown) {
    console.error("Error sending OTP email:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to send OTP email";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
