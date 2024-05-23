// Import necessary modules
const jsonServer = require("json-server");
const fs = require('fs');
const path = require('path');
const { log } = require("console");

// JSON Server initialization
const server = jsonServer.create();

// Function to copy data from db-base.json to db.json
function initializeDB() {
    const basePath = path.join(__dirname, 'db-base.json');
    const destinationPath = path.join(__dirname, 'db.json');

    fs.copyFile(basePath, destinationPath, (err) => {
        if (err) {
            console.error("Error while copying database file:", err);
            process.exit(1); // Stop the server if error
        } else {
            console.log("Database initialized successfully.");
            console.log("Files have been restored succesfully");
            startServer(); // Only start server after DB initialization
        }
    });
}

// Start server function
function startServer() {
    const router = jsonServer.router("db.json");
    const middlewares = jsonServer.defaults();

    server.use(middlewares);

    // Add custom routes if needed
    server.use(jsonServer.rewriter({
        "/*": "/$1",
    }));

    server.use(router);
    
    // Server starts listening
    server.listen(3000, () => {
        console.log("JSON Server is running on port 3000");
        console.log("HOME URL: http://localhost:3000");
    });
}

// Initialize DB and start server
initializeDB();

// Export the Server API
module.exports = server;