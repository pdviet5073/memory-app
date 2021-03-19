import express from "express";
const router = express.Router();
import {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
} from "../controllers/postsController.js";
import auth from "../middleware/auth.js"


router.get("/",auth, getPosts);
router.post("/",auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id",auth, deletePost);
router.patch("/:id/likePost",auth, likePost);

export default router;
