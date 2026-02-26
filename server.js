// Import the Express application from the 'backend/app' module.
const app = require('./backend/app');

// Start the server and make it listen for incoming requests on port 3000.
app.listen(3000, () => {
    // Log a message to the console once the server is successfully running.
    console.log("server is listening..");
});