import express, { Request, Response } from "express"
import { toNodeHandler } from "better-auth/node";
import { postRouter } from "./modules/post/post.router"
import { auth } from "./lib/auth";

const app = express()
app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json())

app.use('/posts', postRouter)

app.get("/", (req: Request, res: Response) => {
    res.send("Hello world")
})

export default app;