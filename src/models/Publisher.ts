import { IPublisher } from '../interfaces';
import { PublisherSchemaModel } from '../schemas';

class PublisherModel {
  async getPublishers(): Promise<IPublisher[]> {
    return await PublisherSchemaModel.find({});
  }

  async getPublisher(id: string, options = {}): Promise<IPublisher> {
    return await PublisherSchemaModel.findOne({ _id: id }, options);
  }

  async createPublisher(publisher: IPublisher): Promise<IPublisher> {
    return await PublisherSchemaModel.create(publisher);
  }

  async updatePublisher(publisher: IPublisher): Promise<IPublisher> {
    const filter = { _id: publisher.publisher_id };
    const update = { ...publisher, ...filter };
    return await PublisherSchemaModel.findOneAndUpdate(filter, update);
  }
}

export default new PublisherModel();
