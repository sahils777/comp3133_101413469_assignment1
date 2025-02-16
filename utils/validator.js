const { body } = require('express-validator');

exports.validateUserSignup = [
    body('username').not().isEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

exports.validateUserLogin = [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').not().isEmpty().withMessage('Password is required'),
];

exports.validateEmployee = [
    body('first_name').not().isEmpty().withMessage('First name is required'),
    body('last_name').not().isEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender'),
    body('designation').not().isEmpty().withMessage('Designation is required'),
    body('salary').isFloat({ min: 1000 }).withMessage('Salary must be at least 1000'),
    body('date_of_joining').isISO8601().withMessage('Invalid date format'),
    body('department').not().isEmpty().withMessage('Department is required'),
];
