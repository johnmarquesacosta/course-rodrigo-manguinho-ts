import validator from 'validator';
import { EmailValidatorAdapter } from './email-validator-adapter';

interface SutTypes {
  sut: EmailValidatorAdapter;
}

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true;
  },
}));

const makeSut = (): SutTypes => {
  const sut = new EmailValidatorAdapter();
  return { sut };
};
describe('EmailValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const { sut } = makeSut();
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);
    const isValid = sut.isValid('invalid_email@mail.com');
    expect(isValid).toBe(false);
  });

  test('Should return true if validator returns true', () => {
    const { sut } = makeSut();
    const isValid = sut.isValid('valid_email@mail.com');
    expect(isValid).toBe(true);
  });

  test('Should call validator with correct email', () => {
    const { sut } = makeSut();
    const isEmailSpy = jest.spyOn(validator, 'isEmail');
    sut.isValid('correct_email@mail.com');
    expect(isEmailSpy).toHaveBeenCalledWith('correct_email@mail.com');
  });
});
