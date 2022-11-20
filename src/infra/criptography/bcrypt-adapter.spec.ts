import bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcrypt-adapter';

jest.mock('bcrypt', () => ({
    async hash(): Promise<string> {
        return new Promise((resolve) => resolve('any_value'));
    },
}));

const salt = 12;
const makeSut = (): BcryptAdapter => {
    return new BcryptAdapter(salt);
};
describe('BcryptAdapter', () => {
    test('Should call bcrypt with correct values', async () => {
        const sut = makeSut();
        const hashSpy = jest.spyOn(bcrypt, 'hash');
        await sut.encrypt('any_value');
        expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
    });

    test('Should return a hash on success', async () => {
        const sut = makeSut();
        const hash = await sut.encrypt('any_value');
        expect(hash).toBe('any_value');
    });
});