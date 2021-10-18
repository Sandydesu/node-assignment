import PublisherModel from '../../models/Publisher';

import { PublisherSchemaModel } from '../../schemas';

import publisherDetails from '../mock/data/mock-publisher';

jest.mock('../../schemas');

describe('Publisher Model', () => {
  it('Get Publishers', (done) => {
    (PublisherSchemaModel.find as jest.Mock).mockResolvedValue([{ ...publisherDetails }]);
    PublisherModel.getPublishers().then((value) => {
      expect(value.length).toEqual(1);
      done();
    });
  });

  it('Get Publisher', (done) => {
    (PublisherSchemaModel.findOne as jest.Mock).mockResolvedValue({ ...publisherDetails });
    PublisherModel.getPublisher(publisherDetails._id).then((value) => {
      expect(value._id).toEqual(publisherDetails._id);
      done();
    });
  });

  it('Create Publisher', (done) => {
    (PublisherSchemaModel.create as jest.Mock).mockResolvedValue({ ...publisherDetails });
    const publisher = new PublisherSchemaModel(publisherDetails);
    PublisherModel.createPublisher(publisher).then((value) => {
      expect(value._id).toEqual(publisherDetails._id);
      done();
    });
  });

  it('Update Publisher', (done) => {
    (PublisherSchemaModel.findOneAndUpdate as jest.Mock).mockResolvedValue({ ...publisherDetails });
    const publisher = new PublisherSchemaModel(publisherDetails);
    PublisherModel.updatePublisher(publisher).then((value) => {
      expect(value._id).toEqual(publisherDetails._id);
      done();
    });
  });
});
