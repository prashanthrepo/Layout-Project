import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OBJECT_NOT_FOUND, UNAUTHORISED } from "../config";
import JWTService from "../services/jwt";



declare module 'express-serve-static-core' {
    interface Response {
        sendSuccess: (data?: any, status?: number) => Response<any, Record<string, any>>;
        sendError: (code?: string, details?: any, status?: number, message?: string,) => Response<any, Record<string, any>>;
    }
}

export const responseHandler = (req: Request, res: Response, next: NextFunction) => {


    res.sendSuccess = (data = [], status = 200) => {
        return res.status(status).json({
            status,
            message: "Success",
            data: data,
        });
    };

    res.sendError = (code = "", details = null, status = 500, message = "Internal Server Error",) => {

        switch (code) {
            case OBJECT_NOT_FOUND:
                status = 404
                message = "Object not found"
                break;
            case INTERNAL_SERVER_ERROR:
                status = 500
                message = "Internal Server Error"
                break;
            case BAD_REQUEST:
                status = 400
                message = "Bad Request"
                break;
            case UNAUTHORISED:
                status = 401
                message = "Unauthorized"
                break;

            default:
                break;
        }

        return res.status(status).json({
            status,
            message,
            ...details,
        });
    };

    next();
}



export const validateId = (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {

        return res.status(404).json({
            "status": 404,
            "message": "Object not found."
        })

    }

    next()


}






export const checkAuth = (req: Request, res: Response, next: NextFunction) => {

    try {
        const token = req.headers.authorization?.split("Bearer ")[1]
        const { userId } = JWTService.verifyToken(token as string) as JwtPayload
        // TODO : Attach userId to request object

    } catch (error) {
        return res.status(403).json({
            "status": 403,
            "error": "Forbidden. Authentication token required."
        })

    }

    next()

}
