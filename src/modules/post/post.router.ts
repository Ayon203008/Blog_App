import express from "express"
import { Postcontroller } from "./post.controller"

const router = express.Router()

router.post("/",Postcontroller.createPost)  

export const postRouter = router