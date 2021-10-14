import { Request, Response } from 'express';

import { HttpHandler } from '../helper';

import BookModel from '../models/Book';
import ReviewModel from '../models/Review';

import { ERROR_MSGS, SUCCESS_MSGS } from '../constants/message.constants';
import { STATUS_CODES } from '../constants/api.constants';

class ReviewService {
  async getAllReviewsByBook(req: Request, res: Response): Promise<void> {
    try {
      const book = await BookModel.getReviewsByBook(req.params.book_id);
      const reviews = await ReviewModel.getReviews(
        { _id: { $in: book.reviews } },
        { review_id: '$_id', _id: 0, reviewer: 1, message: 1 },
      );
      if (reviews.length) {
        HttpHandler.send(req, res, SUCCESS_MSGS.Reviews, reviews);
      } else {
        HttpHandler.sendError(
          req,
          res,
          STATUS_CODES.NotFound,
          `Reviews are ${ERROR_MSGS.NotAvailable} for this ${req.params.book_id}`,
        );
      }
    } catch (err) {
      HttpHandler.sendError(req, res, STATUS_CODES.BadRequest, err.message);
    }
  }

  async createReview(req: Request, res: Response): Promise<void> {
    try {
      const review = await ReviewModel.createReview(req.body);
      const book = await BookModel.updateReview(req.params.book_id, review._id);
      if (book._id && review._id) {
        HttpHandler.send(req, res, SUCCESS_MSGS.CreateReview, review);
      } else {
        HttpHandler.sendError(req, res, STATUS_CODES.Conflict, `${ERROR_MSGS.UnabletoCreate} review`);
      }
    } catch (err) {
      HttpHandler.sendError(req, res, STATUS_CODES.BadRequest, err.message);
    }
  }

  async getReview(req: Request, res: Response): Promise<void> {
    try {
      const book = await BookModel.getReviewsByBook(req.params.book_id);
      if (book.reviews.indexOf(req.params.review_id) >= 0) {
        const review = await ReviewModel.getReview(req.params.review_id);
        if (review._id) {
          HttpHandler.send(req, res, SUCCESS_MSGS.ReviewById, review);
        } else {
          HttpHandler.sendError(
            req,
            res,
            STATUS_CODES.NotFound,
            `Reviews are ${ERROR_MSGS.NotAvailable} for this book id`,
          );
        }
      } else {
        HttpHandler.sendError(
          req,
          res,
          STATUS_CODES.NotFound,
          `Reviews are ${ERROR_MSGS.NotAvailable} for this book id`,
        );
      }
    } catch (err) {
      HttpHandler.sendError(req, res, STATUS_CODES.BadRequest, err.message);
    }
  }

  async updateReview(req: Request, res: Response): Promise<void> {
    try {
      const book = await BookModel.getReviewsByBook(req.params.book_id);
      if (book.reviews.indexOf(req.params.review_id) >= 0) {
        delete req.body._id;
        const review = await ReviewModel.updateReview(req.params.review_id, req.body);
        if (review._id) {
          HttpHandler.send(req, res, SUCCESS_MSGS.UpdateReview, review);
        } else {
          HttpHandler.sendError(req, res, STATUS_CODES.Conflict, `${ERROR_MSGS.Unabletoupdate} review`);
        }
      } else {
        HttpHandler.sendError(
          req,
          res,
          STATUS_CODES.NotFound,
          `Reviews are ${ERROR_MSGS.NotAvailable} for this book id`,
        );
      }
    } catch (err) {
      HttpHandler.sendError(req, res, STATUS_CODES.BadRequest, err.message);
    }
  }

  async deleteReview(req: Request, res: Response): Promise<void> {
    try {
      const book = await BookModel.getReviewsByBook(req.params.book_id);
      if (book.reviews.indexOf(req.params.review_id) >= 0) {
        const book = await BookModel.deleteReview(req.params.book_id, req.params.review_id);
        const review = await ReviewModel.deleteReview(req.params.review_id);
        if (book._id && review._id) {
          HttpHandler.send(req, res, SUCCESS_MSGS.DeleteReview, review);
        } else {
          HttpHandler.sendError(req, res, STATUS_CODES.Conflict, `${ERROR_MSGS.UnabletoDelete} review`);
        }
      } else {
        HttpHandler.sendError(
          req,
          res,
          STATUS_CODES.NotFound,
          `Reviews are ${ERROR_MSGS.NotAvailable} for this book id`,
        );
      }
    } catch (err) {
      HttpHandler.sendError(req, res, STATUS_CODES.BadRequest, err.message);
    }
  }
}

export default new ReviewService();
