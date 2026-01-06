import express, { NextFunction, Request, Response } from "express"
import { Postcontroller } from "./post.controller"

const router = express.Router()

const auth =()=>{
  return  async (req:Request,res:Response,next:NextFunction)=>{
        console.log(`This is a middleware`)
        next()
    }
}



router.post("/",auth(),Postcontroller.createPost)  

export const postRouter = router