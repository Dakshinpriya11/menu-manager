export const ERROR_MESSAGES = {
  // AUTH
  AUTH_MISSING_CREDENTIALS: 'Email and password are required to login.',
  AUTH_INVALID_CREDENTIALS: 'Incorrect email or password provided.',
  AUTH_TOKEN_MISSING: 'Authentication token is missing from request headers.',
  AUTH_TOKEN_INVALID: 'Invalid or expired authentication token.',

  // USER
  USER_NOT_FOUND: 'The requested user does not exist.',
  USER_ALREADY_EXISTS: 'A user with this email already exists.',
  USER_FORBIDDEN: 'You do not have permission to perform this action.',

  // MENU
  MENU_NOT_FOUND: 'The requested menu does not exist.',
  MENU_NOT_ACTIVE: 'No active menu is currently available.',
  MENU_INVALID_PAYLOAD: 'Menu data is missing or contains invalid fields.',

  // ORDER TYPE
  ORDER_TYPE_INVALID: 'The specified order type is invalid.',
  ORDER_TYPE_PAYMENT_REQUIRED: 'This order type requires additional payment.',
  ORDER_TYPE_REQUIRED: 'Order type is required for this request.',
  ORDER_TYPE_INVALID_PAYLOAD: 'Order type ID and price modifier must be valid numbers.',


  // COMMON
  VALIDATION_ERROR: 'Request validation failed due to invalid data.',
  INTERNAL_ERROR: 'An unexpected server error occurred.',

// ITEM
  ITEM_INVALID_ID: 'Item ID must be a valid number.',
  ITEM_INVALID_PAYLOAD: 'Item details are missing or invalid.',
  ITEM_INVALID_AVAILABILITY: 'Item availability must be a boolean value.',
  ITEM_NOT_FOUND: 'The requested item does not exist.',
} as const;
