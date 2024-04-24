const mongoose = require("mongoose");

// Define book schema
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publicationYear: {
      type: Number,
      required: true,
    },
    ISBN: {
      type: String,
      unique: true,
    },
    genre: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    pageCount: {
      type: Number,
    },
    language: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    // Additional fields can be added as needed
    // Example: ratings, reviews, coverImageURL, etc.
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create book model
module.exports = mongoose.model("Book", bookSchema);
