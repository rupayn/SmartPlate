import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

class ApiErrorHandler extends Error {
  statusCode: number;
  data: any = null;
  errors: any[];
  success: boolean;

  constructor(
    statusCode: number,
    message = "Somethings went wrong",
    errors = [],
    stack = "",
    success: boolean = false
  ) {
    super(message);
    this.statusCode = statusCode;
    this.success = success;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiErrorHandler };

type asFuncType = (req: Request, res: Response, next: NextFunction) => any;

export const asyncHandler = function (asFunc: asFuncType) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(asFunc(req, res, next)).catch((err) => next(err));
  };
};

export class customError extends Error {
  statusCode: number;
  data: Record<string, any>;
  constructor(msg = "Something went Wrong", statusCode = 400, data = {}) {
    super(msg);
    this.statusCode = statusCode;
    this.data = data;
  }
}
export interface userInterface {
  name: string;
  id: number;
  email: string;
  enrollment: number;
  created_at: object;
  updated_at: object;
  avatar: string;
  isAdmin: boolean;
}
export async function jwtEncryptUser(user: userInterface, secret: string) {
  const userEnc =  String( jwt.sign(user, secret));
  return userEnc; 
}

export async function jwtVerifyUser(token:string,secret:string) {
  try {
    const decoded = jwt.decode(token);
    
    
    return decoded ;
  } catch (error) {
    
  }
}

export async function objectFilter<
  T extends Record<string, unknown>,
  U extends string,
>(obj: T, Key: U):Promise<Omit<T,U>> {
  const objEntries = Object.entries(obj).filter(([k]) => k !== Key);
  return Object.fromEntries(objEntries) as Omit<T,U> ;
}

/*
: Promise<Partial<T>>
as Partial<T>
*/