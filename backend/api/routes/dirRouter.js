// module to create a router for the directory API
const express = require('express');
const router = express.Router();

// import the directory controller
const dirController = require('../controllers/dirController');

// handle the GET request for getting a list of all directories
router.get('/*', dirController.dir_list_get);

exports.router = router;
