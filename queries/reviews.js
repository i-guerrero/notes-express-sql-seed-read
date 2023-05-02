const db = require("../db/dbConfig.js");

// GET
const getAllReviews = async (bookmark_id) => {
  try {
    const allReviews = await db.any(
      "SELECT * FROM reviews WHERE bookmark_id=$1",
      bookmark_id
    );
    return allReviews;
  } catch (error) {
    return error;
  }
};

// SHOW
const getReview = async (id) => {
  try {
    const oneReview = await db.oneOrNone(
      "SELECT * FROM reviews WHERE id=$1",
      id
    );
    return oneReview;
  } catch (error) {
    return error;
  }
};

// CREATE
const createReview = async (review) => {
  try {
    const newReview = await db.one(
      "INSERT INTO reviews (bookmark_id, reviewer, title, content, rating) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [
        review.bookmark_id,
        review.reviewer,
        review.title,
        review.content,
        review.rating,
      ]
    );
    return newReview;
  } catch (error) {
    throw error;
  }
};

// DELETE
const deleteReview = async (id) => {
  try {
    const deletedReview = await db.one(
      "DELETE FROM reviews WHERE id = $1 RETURNING *",
      id
    );
    return deletedReview;
  } catch (error) {
    return error;
  }
};

// UPDATE
const updateReview = async (id, review) => {
  try {
    const updatedReview = await db.one(
      "UPDATE reviews SET bookmark_id=$1, reviewer=$2, title=$3, content=$4, rating=$5 WHERE id=$6 RETURNING *",
      [
        review.bookmark_id,
        review.reviewer,
        review.title,
        review.content,
        review.rating,
        id,
      ]
    );
    return updatedReview;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllReviews,
  getReview,
  createReview,
  deleteReview,
  updateReview,
};
