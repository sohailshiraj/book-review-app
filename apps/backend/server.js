const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bookRoutes = require("./src/routes/bookRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/books", bookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});