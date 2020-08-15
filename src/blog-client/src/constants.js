export const baseUrl = 'https://localhost:44393/api';
export const emailPattern = /^[A-Za-z0-9.]+@[A-Za-z]+\.[a-z]{2,3}$/;
export const passwordMinLength = 3;
export const invalidEmailMessage = 'Invalid email!';
export const invalidPasswordMessage = `Password should be at least ${passwordMinLength} symbols long!`;
export const invalidRePasswordMessage = 'Passwords don\'t match!';

export const invalidTitleMessage = 'Post title cannot be empty!';
export const contentMinLength = 20;
export const invalidContentMessage = `Content cannot be less than ${contentMinLength} characters!`;
export const invalidCategoryMessage = 'Category cannot be empty!';
export const noPostsWithCategoryMessage = 'No posts with this category!';
export const userHasNoPostsMessage = "You currently don't have any posts!";