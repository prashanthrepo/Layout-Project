import dotenv from "dotenv"

const OBJECT_NOT_FOUND = "OBJECT_NOT_FOUND"
const INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR"
const BAD_REQUEST = "BAD_REQUEST"
const SOMETHING_WENT_WRONG = "SOMETHING_WENT_WRONG"

dotenv.config()


const redisConnection = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : undefined,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD
}




export { BAD_REQUEST, INTERNAL_SERVER_ERROR, OBJECT_NOT_FOUND, SOMETHING_WENT_WRONG, redisConnection }

