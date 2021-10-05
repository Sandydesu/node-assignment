export const ERROR_MSGS = {
  Unauthorized: 'Missing or invalid token',
  BadRequest: 'Missing required request headers or parameters',
  InternalServerError: 'Server encountered an unexpected condition',
  MongoDBError: 'MongoDBError',
};

export const SUCCESS_MSGS = {
  Books: 'Successfully returned a list of books',
  BooksById: 'Successfully returned a book',
  CreateBook: 'Successfully created a new book',
  UpdateBook: 'Successfully updated a book',
  DeleteBook: 'Successfully deleted a book',
};
