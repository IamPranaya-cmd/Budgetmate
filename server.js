const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const transactionRoutes = require("./routes/transactions");
app.use("/api/transactions", transactionRoutes);

// DB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Root route
app.get("/", (req, res) => {
    res.send("BudgetMate backend is running 🚀");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
