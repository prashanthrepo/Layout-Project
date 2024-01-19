export default class OTPService {
    public static generateOTP(): string {
        // Generate a random 4-digit OTP
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        return otp;
    }
}

