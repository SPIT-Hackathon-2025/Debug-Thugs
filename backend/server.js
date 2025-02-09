// require("dotenv").config(); // Load environment variables
// // const mongoose = require("mongoose");

// const express = require("express");
// const mongoose = require("./config/db");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // mongoose
// //   .connect("mongodb+srv://manishsj289:gawE725YZsH70LnF@cluster0.jusby.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
// //   .then(() => console.log("Database connected"))
// //   .catch((err) => console.error("Database connection error:", err));

// // Routes
// // app.use("/api/users", require("./routes/userRoutes"));
// // app.use("/api/apartments", require("./routes/apartmentRoutes"));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const { initGridFS } = require("./config/gridfs");
const { contracts } = require('./config/contracts');

const startServer = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI environment variable is not defined');
        }

        // Connect to MongoDB and wait for full connection
        const connection = await connectDB();
        console.log('MongoDB connected successfully');

        // Initialize GridFS with the established connection
        await initGridFS(connection);
        console.log('GridFS initialized successfully');

        const app = express();
        app.use(express.json());
        app.use(cors());

        // Routes
        app.use("/api/auth", require("./routes/authRoutes"));
        app.use("/api/apartments", require("./routes/apartmentRoutes"));
        app.use("/api/images", require("./routes/imageRoutes"));
        app.use('/api/users', require('./routes/userRoutes'));
        app.use('/api/rentals', require('./routes/rentalRoutes'));

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log('Smart contracts initialized');
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Add proper error handling for the startup process
startServer().catch(err => {
    console.error('Fatal error during startup:', err);
    process.exit(1);
});
