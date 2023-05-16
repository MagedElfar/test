import { Request, Response, NextFunction } from "express";
import config from "../config";
import { setError } from "../utils/error-format";

function authorizationMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const { 'x-api-key': apiKey } = req.headers

        if (!apiKey || apiKey !== config.apiKey) throw setError(401, "unauthorized")
        next()
    } catch (error) {
        next(error)
    }

}

export default authorizationMiddleware