import dotenv from "dotenv"
import jwt from "jsonwebtoken"
dotenv.config()



const JWT_SECRET = process.env.JWT_SECRET

class JWTService {

    public static generateToken(payload: any) { //TODO: update payload type
        return jwt.sign(payload, JWT_SECRET as string, { expiresIn: "14d" })
    }
    public static verifyToken(token: string) {
        const data = jwt.verify(token, JWT_SECRET as string)
        return data
    }
}
export default JWTService