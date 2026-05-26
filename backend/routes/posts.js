import express from "express"
import { fetchAllPosts, fetchPostById } from "../db/posts.js"

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const posts = await fetchAllPosts()
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ message: "Error getting posts" })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const post = await fetchPostById(req.params.id)

    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }

    res.status(200).json(post)
  } catch (error) {
    res.status(500).json({ message: "Error getting post" })
  }
})

export default router;