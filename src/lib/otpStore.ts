// Global in-memory OTP cache for real-time verification
interface OTPRecord {
  code: string;
  expiresAt: number;
}

const otpStore: Record<string, OTPRecord> = {};

export function saveOTP(identifier: string, code: string, durationMinutes = 10) {
  const cleanId = identifier.toLowerCase().trim();
  otpStore[cleanId] = {
    code,
    expiresAt: Date.now() + durationMinutes * 60 * 1000,
  };
}

export function verifyOTP(identifier: string, inputCode: string): boolean {
  const cleanId = identifier.toLowerCase().trim();
  const record = otpStore[cleanId];

  if (!record) return false;
  if (Date.now() > record.expiresAt) {
    delete otpStore[cleanId];
    return false;
  }

  if (record.code === inputCode.trim()) {
    delete otpStore[cleanId]; // Consume single-use OTP
    return true;
  }

  return false;
}
