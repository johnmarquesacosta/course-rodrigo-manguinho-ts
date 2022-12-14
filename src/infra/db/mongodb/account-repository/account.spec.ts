import { MongoHelper } from '../helpers/mongo-helper';
import { AccountMongoRepository } from './account';

describe('Account Mongo Repository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL as string);
    });
    afterAll(async () => {
        await MongoHelper.disconnect();
    });
    beforeEach(async () => {
        const accountCollection = await MongoHelper.getCollection('accounts');
        await accountCollection.deleteMany({});
    });

    test('Should return an account on success', async () => {
        const sut = new AccountMongoRepository();
        const account = await sut.add({
            name: 'any_name',
            email: 'anymail@mail.com',
            password: 'any_password',
        });

        expect(account).toBeTruthy();
        expect(account.id).toBeTruthy();
    });
});
