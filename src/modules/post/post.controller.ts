import { Request, Response } from "express";
import { postService } from "./post.service";
import { Post } from "../../../generated/prisma/client";
import { success } from "better-auth/*";

const createPost = async (req: Request, res: Response) => {
  try {
    const user = req.user
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Unathorized"
      })
    }

    const result = await postService.createPost(req.body, user.id)
    res.status(201).json(result)
  }
  catch (e) {
    res.status(400).json({
      error: "Post creation failed",
      details: e
    })
  }
};

const getAllPost = async (req: Request, res: Response) => {
  try {
    const { search } = req.query
    const searchString = typeof search==='string' ? search : undefined
    const tags = req.query.tags ? (req.query.tags as string).split(",") : []

    const result = await postService.getAllPost({ search:searchString ,tags})
    res.status(200).json({
      success: true,
      message: ""
    })

  } catch (e) {
    res.status(400).json({
      error: "Post creation failed",
      details: e
    })
  }
}



export const Postcontroller = {
  createPost,
  getAllPost
};



