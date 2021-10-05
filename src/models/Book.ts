import { IBook } from '../interfaces';
import { BookSchemaModel } from '../schemas';

class BookModel {
  async getBooks(): Promise<IBook[]> {
    return await BookSchemaModel.find({});
  }

  async getBook(id: string): Promise<IBook> {
    return await BookSchemaModel.findOne({ _id: id });
  }

  async createBook(book: IBook): Promise<IBook> {
    return await BookSchemaModel.create(book);
  }

  async updateBook(id: string, book: IBook): Promise<IBook> {
    const filter = { _id: id };
    const update = { ...book };
    return await BookSchemaModel.findOneAndUpdate(filter, update);
  }

  async deleteBook(id: string): Promise<IBook> {
    const filter = { _id: id };
    return await BookSchemaModel.findOneAndDelete(filter);
  }
}

export default new BookModel();
