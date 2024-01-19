import dotenv from "dotenv";
import twilio from "twilio";


dotenv.config()

export default class TwilioService {

    static messageContent = {
        loginOTP: "is the OTP to complete your login. Please do not share with anyone. \nTeam paypersqft"
    }

    public static sendMessage(phone_number: string, otp: string) {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = twilio(accountSid, authToken);
        client.messages
            .create({
                body: `\n\nHi ${phone_number}, \n${otp} ${TwilioService.messageContent.loginOTP}`,
                from: process.env.TWILIO_PHONE_NO,
                to: process.env.DUMMY_PHONE_NO as string // phone_number 
            })
            .then((message: any) => {
                console.log("message:", message)

            }).catch((error) => {
                console.log("twilio error ===", error)

            })
    }

}