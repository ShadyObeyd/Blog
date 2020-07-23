export const baseUrl = 'https://localhost:44393/api';
export const emailPattern = /^[A-Za-z0-9]+@[A-Za-z]+\.[a-z]{2,3}$/;
export const passwordMinLength = 3;
export const invalidEmailMessage = 'Invalid email!';
export const invalidPasswordMessage = `Password should be at least ${passwordMinLength} symbols long!`;
export const invalidRePasswordMessage = 'Passwords don\'t match!';