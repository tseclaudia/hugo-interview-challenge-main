import {body} from 'express-validator';


const isNumeric = (value) => {
    return typeof value === 'number';
  };

export const submitValidator = [
    body('firstName').isString().notEmpty().withMessage('First name must be a non-empty string'),
    body('lastName').isString().notEmpty().withMessage('Last name must be a non-empty string'),
    body('dOb').optional().isISO8601().custom((value) => {
        if (!value) {
          return true;
        }
    
        const dOb = new Date(value);
        const today = new Date();
        const age = (today - dOb) / (365 * 24 * 60 * 60 * 1000); // Calculate age in years
    
        if (age < 16) {
          throw new Error('User must be at least 16 years old'); 
        }
    
        return true;
      }),
      body('street').isString().notEmpty().withMessage('Street must be a non-empty string'),
      body('city').isString().notEmpty().withMessage('City must be a non-empty string'),
      body('state').isString().notEmpty().withMessage('State must be a non-empty string'),
      body('zip').custom(isNumeric).withMessage('Zip code must be numeric'),
      body('vin').isString().notEmpty().withMessage('VIN must be a non-empty string'),
      body('year').custom(isNumeric).isInt({ min: 1985, max: 2025 }).withMessage('Year must be a valid year between 1985 and 2025'),
      body('make').isString().notEmpty().withMessage('Make must be a non-empty string'),
      body('model').isString().notEmpty().withMessage('Model must be a non-empty string'),
  ]

export const updateValidator = [
    body('firstName').optional().isString().notEmpty().withMessage('First name must be a non-empty string'),
    body('lastName').optional().isString().notEmpty().withMessage('Last name must be a non-empty string'), 
    body('dOb').optional().isISO8601().custom((value) => {
      if (!value) {
        return true;
      }
  
      const dOb = new Date(value);
      const today = new Date();
      const age = (today - dOb) / (365 * 24 * 60 * 60 * 1000); // Calculate age in years
  
      if (age < 16) {
        throw new Error('User must be at least 16 years old'); 
      }
  
      return true;
    }),
    body('street').optional().isString().notEmpty().withMessage('Street must be a non-empty string'),
    body('city').optional().isString().notEmpty().withMessage('City must be a non-empty string'),
    body('state').optional().isString().notEmpty().withMessage('State must be a non-empty string'),
    body('zip').optional().custom(isNumeric).withMessage('Zip code must be numeric'),
    body('vin').optional().isString().notEmpty().withMessage('VIN must be a non-empty string'),
    body('year').optional().custom(isNumeric).isInt({ min: 1985, max: 2025 }).withMessage('Year must be a valid year between 1985 and 2025'),
    body('make').optional().isString().notEmpty().withMessage('Make must be a non-empty string'),
    body('model').optional().isString().notEmpty().withMessage('Model must be a non-empty string'),
  ];