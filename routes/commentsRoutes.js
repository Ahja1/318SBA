const express = require("express");
const router = express.Router();

const comments = require("../data/comments.js");

// Creating a GET route for the entire comments database.
router.get("/", (req, res) => {
    res.json(comments);
});

// GET comment by ID
router.get("/:id", (req, res) => {
    const comment = comments.find((c) => c.id == req.params.id);
    if (comment) {
        res.json(comment);
    } else {
        res.status(404).json({ error: "Comment not found" });
    }
});

// POST create a new comment
router.post("/", (req, res) => {
    const { userId, comment } = req.body;
    const newComment = {
        id: comments.length + 1,
        userId,
        comment
    };
    comments.push(newComment);
    res.status(201).json(newComment);
});

// PATCH update comment by ID
router.patch("/:id", (req, res) => {
    const commentId = req.params.id;
    const commentIndex = comments.findIndex((c) => c.id == commentId);
    if (commentIndex !== -1) {
        comments[commentIndex] = { ...comments[commentIndex], ...req.body };
        res.json(comments[commentIndex]);
    } else {
        res.status(404).json({ error: "Comment not found" });
    }
});

// DELETE delete comment by ID
router.delete("/:id", (req, res) => {
    const commentId = req.params.id;
    const commentIndex = comments.findIndex((c) => c.id == commentId);
    if (commentIndex !== -1) {
        comments.splice(commentIndex, 1);
        res.json({ message: "Comment deleted successfully" });
    } else {
        res.status(404).json({ error: "Comment not found" });
    }
});


module.exports = router;