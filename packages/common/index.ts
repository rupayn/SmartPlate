import { Request , Response , NextFunction } from 'express';

class ApiErrorHandler extends Error {
    
    statusCode:number;
    data:any=null;
    errors:any[];
    success:boolean;


    constructor(statusCode: number, message="Somethings went wrong", errors=[],stack="",success: boolean = false) {
        super(message);
        this.statusCode = statusCode;
        this.success = success
        this.errors=errors
        
        if(stack){
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this, this.constructor);
        }
  }
}

export {ApiErrorHandler}



type asFuncType = (req: Request, res:Response, next:NextFunction) => any;

export const asyncHandler=function(asFunc:asFuncType){
    return (req:Request,res:Response,next:NextFunction)=>{
        Promise.resolve(asFunc(req,res,next)).catch(err=>next(err))
    }
}

export class customError extends Error {
  statusCode: number;
  data: Record<string, any>;
  constructor(msg = "Something went Wrong", statusCode = 400, data = {}) {
    super(msg);
    (this.statusCode = statusCode);
    this.data = data;
  }
}