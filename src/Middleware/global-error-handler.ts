import { ExpressErrorMiddlewareInterface, Middleware } from "routing-controllers";
import { CustomError } from "../Custom-Errors/custom-erros";
import { Request, Response, NextFunction } from "express";
import { Service } from "typedi";

@Service()
@Middleware({type : "after"})
export class GlobalError implements ExpressErrorMiddlewareInterface 
{
    error(error: any, req: Request, res: Response, next: NextFunction): void 
    {
        if(error instanceof CustomError) 
            {
                res.status(error.status).json(
                    {
                        error : error.message,
                        status : error.status, 
                        path : req.originalUrl,
                        method: req.method,
                    });
            } else 
            {
                res.status(500).json({
                error: "Something went wrong 😢",
                status: 500,
                path: req.originalUrl,
                method: req.method,
                });
            }   
    }
    
}