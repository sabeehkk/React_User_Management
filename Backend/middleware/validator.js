import { body } from 'express-validator'

export const validate = [
    body('email').isEmail().withMessage('invalid email'),
    body('password').isLength({min : 4}).withMessage("password need strendth"),
    body('name').isLength({min : 2}).withMessage("name is not proper"),
    body('phoneNumber').isLength({min : 10 , max:10}).withMessage("10 digits needed")
]


