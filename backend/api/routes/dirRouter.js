// module to create a router for the directory API
const express = require("express");
const router = express.Router();

// import the directory controller
const dirController = require("../controllers/dirController");

// batch download helpers
router.post("/download/size", dirController.dir_download_size_post);
router.post("/download", dirController.dir_download_post);

// handle the GET request for getting a list of all directories
router.get("/*", dirController.dir_list_get);

// handle the POST request for uploading files/folders to a directory
router.post("/*", dirController.upload.array("files"), dirController.dir_upload_post);

exports.router = router;
