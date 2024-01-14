import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OBJECT_NOT_FOUND, SOMETHING_WENT_WRONG } from "../config";



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
            case SOMETHING_WENT_WRONG:
                status = 400
                message = "Something went wrong"
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




