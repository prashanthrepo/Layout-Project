import dotenv from "dotenv";

dotenv.config()


type userDetailsType = {
    name: string
    otp: string
}


export default class MSG91Service {


    public static sendSMS = async (userDetails: userDetailsType) => {
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authkey: process.env.MSG91_AUTH_KEY as string
            },
            body: JSON.stringify({
                template_id: '65bd0001d6fc0544600f28a3',
                short_url: '1',
                // recipients: [{ mobiles: process.env.DUMMY_PHONE_NO as string, name: 'sachin', otp: '0111' }]
                recipients: [{ mobiles: process.env.DUMMY_PHONE_NO as string, ...userDetails }]
            })
        };

        fetch('https://control.msg91.com/api/v5/flow/', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));







    }



}


