import { NextFunction, Request, Response } from "express";
const mongoose = require('mongoose');


declare module 'express-serve-static-core' {
    interface Response {
        sendSuccess: (data?: any, status?: number) => Response<any, Record<string, any>>;
        sendError: (details?: any, status?: number, message?: string,) => Response<any, Record<string, any>>;
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

    res.sendError = (details = null, status = 500, message = "Internal Server Error",) => {
        return res.status(status).json({
            status,
            message,
            ...details,
        });
    };

    next();
}




