import { Request,Response } from "express"
export const createUser=async function(req:Request,res:Response){
    res.json({
        success: true,
        
    })
}