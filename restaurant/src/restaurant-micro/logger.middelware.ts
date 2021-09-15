import { Request, Response, NextFunction } from 'express';

export function LoggerMiddleware(req: any, res: Response, next: NextFunction) {
    const session = req.session;
    const regex = /(?:[/people/]+(signup|signin|emailsignup|graphql))/
    const url: string = req.originalUrl
    if (session.user || regex.test(url)) {
        next();
    }
    else {
        res.status(401).json({ message: "Not session" })
    }
};