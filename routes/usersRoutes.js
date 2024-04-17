const express = require("express");
const router = express.Router();

const users = require("../data/users");

// Creating a GET route for the entire users database.
router.get("/", (req, res) => {
    res.json(users);
});

// GET user by ID
router.get("/:id", (req, res) => {
    const user = users.find((u) => u.id == req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: "User not found" });
    }
});

// POST create a new user
router.post("/", (req, res) => {
    const { name, username, email } = req.body;
    const newUser = {
        id: users.length + 1,
        name,
        username,
        email
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PATCH update user by ID
router.patch("/:id", (req, res) => {
    const userId = req.params.id;
    const userIndex = users.findIndex((u) => u.id == userId);
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...req.body };
        res.json(users[userIndex]);
    } else {
        res.status(404).json({ error: "User not found" });
    }
});

// DELETE delete user by ID
router.delete("/:id", (req, res) => {
    const userId = req.params.id;
    const userIndex = users.findIndex((u) => u.id == userId);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.json({ message: "User deleted successfully" });
    } else {
        res.status(404).json({ error: "User not found" });
    }
});



module.exports = router;