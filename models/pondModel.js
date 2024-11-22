// Require necessary packages and setup
const mongoose = require('mongoose');
const mortality = require("./mortalityModel")

// Define the Category schema
const pondSchema = new mongoose.Schema({
  pondName: {
    type: String,
    required: true,
    unique: true
  },
  stockQuantity: {
    type: Number,
    required: true
  },
  responsible: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  additionalInformation: {
    type: String,
    required: true
  },
  mortalities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mortality'
}],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Category model based on the schema
const Pond = mongoose.model('Pond', pondSchema);

// Export the Category model to use in other parts of the application
module.exports = Pond;
