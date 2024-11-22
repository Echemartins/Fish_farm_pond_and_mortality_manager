// Require necessary packages and setup
const mongoose = require("mongoose");
const pond = require("../models/pondModel")

// Define the Category schema
const mortalitySchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    comment: {
        type: String,
        required: true,
    },
    pondId: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pond",
            required: true
        },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the Category model based on the schema
const Mortality = mongoose.model("Mortality", mortalitySchema);

// Export the Category model to use in other parts of the application
module.exports = Mortality;
