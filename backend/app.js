const express = require("express");
const dirRouter = require("./api/routes/dirRouter");
const app = express();

app.use(express.static("public"));
app.use(express.json());

app.use("/api/directories/", dirRouter.router);
// create a router for the default path
const defaultRouter = express.Router();
// handle the GET request for getting the default path
defaultRouter.get("/", (req, res) => {
    res.send(
        'This is the default path. Try <a href="/api/directories">http://localhost:5000/api/directories</a> instead.'
    );
});
app.use("/", defaultRouter);

app.listen(5000, () =>
    console.log("Server listening on address: http://localhost:5000/")
);
