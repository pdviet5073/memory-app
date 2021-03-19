import mongoose from "mongoose";
import PostMessage from "../models/postsMessage.js";

//[GET] /post
export const getPosts = async (req, res) => {
    try {
        const postMessage = await PostMessage.find();
        res.status(200).json(postMessage);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//[POST] /post
export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});
    try {
        await newPost.save();

        res.status(200).json(newPost);
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//[POST] /post/:id
export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    try {
        //đảm bảo rằng id là hợp lệ
        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(404).send(`No post with that id: ${_id}`);

        const updatePost = await PostMessage.findByIdAndUpdate(_id, post, {
            new: true,
        });
        res.json(updatePost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//[DELETE] /post/:id
export const deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        //đảm bảo rằng id là hợp lệ
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).send(`No post with that id:`);

        await PostMessage.findByIdAndDelete(id);
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


//[PATCH] /post/:id/likePost
export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({ message: "Unauthorized"});

    try {
        //đảm bảo rằng id là hợp lệ
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).send(`No post with that id: ${id}`);

        //tìm Id để lấy ra lượt like hiện tại 
        const post = await PostMessage.findById(id);

        const index =  post.likes.findIndex(id => id === String(req.userId))
        if(index === -1){
            //like the post
            post.likes.push(req.userId);
        }
        else{
            //dislike a post
            post.likes = post.likes.filter(id => id !==String(req.userId))
        }
        const updateLikePost = await PostMessage.findByIdAndUpdate(id, post, {new: true})

        
        res.json(updateLikePost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
likePost