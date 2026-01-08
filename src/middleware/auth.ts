import { NextFunction, Request, Response } from "express"
import { auth as betterAuth } from '../lib/auth'

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string,
                email: string,
                role: string,
                name: string,
                emailVerified: boolean
            }
        }
    }
}

// * added userRole as enum
export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN"
}

// * middleware added also call the user role here
const auth = (...roles: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const session = await betterAuth.api.getSession({
                headers: req.headers as any
            })
            if (!session) {
                return res.json(401).json({
                    success: false,
                    message: "You are not authorized"
                })
            }
            if (!session.user.emailVerified) {
                return res.json(403).json({
                    success: false,
                    message: "Email Verfication required"
                })
            }
            req.user = {
                id: session.user.id,
                email: session.user.email,
                name: session.user.name,
                role: session.user.role as string,
                emailVerified: session.user.emailVerified
            }
            if (roles.length && !roles.includes(req.user.role as UserRole)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden ! you dont have access"
                })
            }
            // next()
        }
        catch (err) {
            next(err)
        }
    }
}

export default auth