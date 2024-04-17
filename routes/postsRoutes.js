const express = require("express");
const router = express.Router();

const posts = require("../data/posts.js");

// Creating a GET route for the entire posts database.

router.get("/", (req, res) => {
    res.json(posts);
});


// GET post by ID
router.get("/:id", (req, res) => {
    const post = posts.find((p) => p.id == req.params.id);
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ error: "Post not found" });
    }
});

// POST create a new post
router.post("/", (req, res) => {
    const { userId, title, content } = req.body;
    const newPost = {
        id: posts.length + 1,
        userId,
        title,
        content
    };
    posts.push(newPost);
    res.status(201).json(newPost);
});

// PATCH update post by ID
router.patch("/:id", (req, res) => {
    const postId = req.params.id;
    const postIndex = posts.findIndex((p) => p.id == postId);
    if (postIndex !== -1) {
        posts[postIndex] = { ...posts[postIndex], ...req.body };
        res.json(posts[postIndex]);
    } else {
        res.status(404).json({ error: "Post not found" });
    }
});

// DELETE delete post by ID
router.delete("/:id", (req, res) => {
    const postId = req.params.id;
    const postIndex = posts.findIndex((p) => p.id == postId);
    if (postIndex !== -1) {
        posts.splice(postIndex, 1);
        res.json({ message: "Post deleted successfully" });
    } else {
        res.status(404).json({ error: "Post not found" });
    }
});


module.exports = router;