const express = require("express");
const app = express();
const port = 3000;

const error = require("./utilities/error");

var path = require("path");

// Importing the data from database files
const usersRoutes = require("./routes/usersRoutes");
const postsRoutes = require("./routes/postsRoutes");
const commentsRoutes = require("./routes/commentsRoutes");

// Custom logging requests middleware
const logReq = function (req, res, next) {
    console.log("Request Received");
    next();
};

app.use(express.urlencoded({ extended: true })); 


app.use(logReq);

// Use our Routes
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/comments", commentsRoutes)

// rendering views with ejs
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "styles")));

// GET ROUTE TO RENDER THE FORM
app.get("/", (req, res) => {
    res.render("index");
});

// POST ROUTE TO HANDLE THE FORM SUBMISSION

app.post("/submit", (req, res) => {
    const { name, username, email } = req.body;
    const queryParameter = req.query.parameterName; ///added query parameter
    // Do something with the form data, e.g., save it to a database
    console.log("Received form data:", { name, username, email });
    console.log("Received query parameter:", queryParameter);
    res.send("Form submitted successfully!");

});

// PATCH route to update user data
app.patch("/api/users/:id", (req, res) => {
    const userId = req.params.id;
    res.send(`Updated user with id ${userId}`);
});

// Added the new PATCH route here
app.patch("/api/users", (req, res) => {
    const userId = req.query.id; 
    res.send(`Updated user with id ${userId}`);
});


// DELETE route to delete user data
app.delete("/api/users/:id", (req, res) => {
    const userId = req.params.id;
    // Delete user data based on userId
    res.send(`Deleted user with id ${userId}`);
});


app.delete("/api/users", (req, res) => {
    const userId = req.query.id; // Accessing query parameter 'id'
    // Delete user data based on userId
    res.send(`Deleted user with id ${userId}`);
});

// Custom 404 (not found) middleware
app.use((req, res) => {
    res.status(404);
    res.json({ error: "Resource Not Found" });
});

// Error-handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}.`);
});