const path = require("path");
const fs = require("fs");

/**
 * description: get the home path of the user's server.
 * This functon takes into consideration the operating system
 * @return {string} the home path of the user's server
 */
function getHomePath() {
    const homePath =
        process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];
    return homePath;
}

module.exports = {
    getHomePath,
};
