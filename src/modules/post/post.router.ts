import express, { NextFunction, Request, Response } from "express"
import { Postcontroller } from "./post.controller"
import auth, { UserRole } from "../../middleware/auth"

const router = express.Router()

// * Get method to get all post
router.get("/",Postcontroller.getAllPost)

router.post("/", auth(UserRole.USER), Postcontroller.createPost) 
// * import everything from middleware

export const postRouter = router