/**
 * Enterprise-level validation utilities for Employee Form
 * Handles all edge cases, sanitization, and real-time validation
 */

/**
 * Sanitize input: trim, remove hidden chars, prevent injection
 */
export const sanitizeInput = (value) => {
  if (!value) return '';
  
  let sanitized = String(value)
    .trim()
    .replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
    .replace(/\u200B/g, '') // Remove zero-width space
    .replace(/\u200C/g, '') // Remove zero-width non-joiner
    .replace(/\u200D/g, '') // Remove zero-width joiner
    .replace(/\uFEFF/g, '') // Remove zero-width no-break space
    .slice(0, 1000); // Prevent extremely long strings
  
  return sanitized;
};

/**
 * Check if string contains leading/trailing spaces
 */
export const hasLeadingTrailingSpaces = (value) => {
  if (!value) return false;
  return value !== value.trim();
};

/**
 * Validate Indian Mobile Number (10 digits, starting with 6-9)
 * Strict rules: no all-same digits, no sequential
 */
export const validateIndianMobileNumber = (value) => {
  if (!value) {
    return { isValid: false, error: 'Mobile number is required' };
  }

  // Sanitize and remove country code if present
  let sanitized = sanitizeInput(value);
  
  // Remove leading +91 or 0091 country code if pasted
  sanitized = sanitized.replace(/^(\+91|0091)/, '');
  
  // Remove country code like 91
  if (sanitized.startsWith('91') && sanitized.length === 12) {
    sanitized = sanitized.substring(2);
  }

  // Check for leading/trailing spaces
  if (hasLeadingTrailingSpaces(value)) {
    return { isValid: false, error: 'Mobile number cannot have leading/trailing spaces' };
  }

  // Remove any spaces
  sanitized = sanitized.replace(/\s/g, '');

  // Check length
  if (sanitized.length !== 10) {
    return { isValid: false, error: 'Mobile number must be exactly 10 digits' };
  }

  // Check numeric only
  if (!/^\d+$/.test(sanitized)) {
    return { isValid: false, error: 'Mobile number must contain only digits' };
  }

  // Check starts with 6-9
  if (!/^[6-9]/.test(sanitized)) {
    return { isValid: false, error: 'Mobile number must start with 6-9' };
  }

  // Reject all same digits (0000000000, 1111111111, etc.)
  if (/^(\d)\1{9}$/.test(sanitized)) {
    return { isValid: false, error: 'Mobile number cannot contain all same digits' };
  }

  // Reject sequential numbers (1234567890, 9876543210, etc.)
  if (/^(0123456789|1234567890|2345678901|3456789012|4567890123|5678901234|6789012345|7890123456|8901234567|9012345678|9876543210|8765432109|7654321098|6543210987|5432109876|4321098765|3210987654|2109876543|1098765432|0987654321)$/.test(sanitized)) {
    return { isValid: false, error: 'Mobile number cannot be sequential' };
  }

  // Final regex pattern validation
  if (!/^[6-9]\d{9}$/.test(sanitized)) {
    return { isValid: false, error: 'Invalid mobile number format' };
  }

  return { isValid: true, error: '', sanitized };
};

/**
 * Validate Bank Account Number (9-18 digits)
 * No all-same, no sequential
 */
export const validateAccountNumber = (value) => {
  if (!value) {
    return { isValid: false, error: 'Account number is required' };
  }

  const sanitized = sanitizeInput(value);

  // Check leading/trailing spaces
  if (hasLeadingTrailingSpaces(value)) {
    return { isValid: false, error: 'Account number cannot have leading/trailing spaces' };
  }

  // Remove spaces for validation
  const digitsOnly = sanitized.replace(/\s/g, '');

  // Check numeric only
  if (!/^\d+$/.test(digitsOnly)) {
    return { isValid: false, error: 'Account number must contain only digits' };
  }

  // Check length
  if (digitsOnly.length < 9 || digitsOnly.length > 18) {
    return { isValid: false, error: 'Account number must be 9 to 18 digits' };
  }

  // Reject all same digits
  if (/^(\d)\1{8,17}$/.test(digitsOnly)) {
    return { isValid: false, error: 'Account number cannot contain all same digits' };
  }

  // Reject sequential numbers
  const isSequential = isSequentialNumber(digitsOnly);
  if (isSequential) {
    return { isValid: false, error: 'Account number cannot be sequential' };
  }

  return { isValid: true, error: '', sanitized: digitsOnly };
};

/**
 * Check if a number string is sequential (ascending or descending)
 */
export const isSequentialNumber = (numStr) => {
  if (numStr.length < 3) return false;

  // Check ascending: 01234, 123456, etc.
  let isAscending = true;
  for (let i = 1; i < numStr.length; i++) {
    if (parseInt(numStr[i]) !== (parseInt(numStr[i - 1]) + 1) % 10) {
      isAscending = false;
      break;
    }
  }

  // Check descending: 98765, 321098, etc.
  let isDescending = true;
  for (let i = 1; i < numStr.length; i++) {
    if (parseInt(numStr[i]) !== (parseInt(numStr[i - 1]) - 1 + 10) % 10) {
      isDescending = false;
      break;
    }
  }

  return isAscending || isDescending;
};

/**
 * Validate Branch Name (3-50 chars, letters and spaces only)
 */
export const validateBranchName = (value) => {
  if (!value) {
    return { isValid: false, error: 'Branch name is required' };
  }

  const sanitized = sanitizeInput(value);

  // Check leading/trailing spaces
  if (hasLeadingTrailingSpaces(value)) {
    return { isValid: false, error: 'Branch name cannot have leading/trailing spaces' };
  }

  // Check pattern: letters and spaces only
  if (!/^[A-Za-z\s]{3,50}$/.test(sanitized)) {
    return { isValid: false, error: 'Branch name must contain only letters and spaces (3-50 characters)' };
  }

  // Reject if contains numbers
  if (/\d/.test(sanitized)) {
    return { isValid: false, error: 'Branch name cannot contain numbers' };
  }

  // Reject if contains special characters
  if (/[!@#$%^&*()_+=\[\]{};:'",.<>?/\\|`~]/.test(sanitized)) {
    return { isValid: false, error: 'Branch name cannot contain special characters' };
  }

  // Reject script injection patterns
  if (/(<|>|script|alert|javascript|onerror|onclick)/i.test(sanitized)) {
    return { isValid: false, error: 'Invalid characters detected in branch name' };
  }

  return { isValid: true, error: '', sanitized };
};

/**
 * Validate IFSC Code (11 chars, pattern: AAAA0XXXXXX)
 * 5th character must be 0
 */
export const validateIFSCCode = (value) => {
  if (!value) {
    return { isValid: false, error: 'IFSC code is required' };
  }

  let sanitized = sanitizeInput(value);

  // Auto-uppercase
  sanitized = sanitized.toUpperCase();

  // Check leading/trailing spaces
  if (hasLeadingTrailingSpaces(value)) {
    return { isValid: false, error: 'IFSC code cannot have leading/trailing spaces' };
  }

  // Remove spaces for validation
  sanitized = sanitized.replace(/\s/g, '');

  // Check length
  if (sanitized.length !== 11) {
    return { isValid: false, error: 'IFSC code must be exactly 11 characters' };
  }

  // Check pattern: AAAA0XXXXXX
  if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(sanitized)) {
    return { isValid: false, error: 'Invalid IFSC format (Example: SBIN0001234)' };
  }

  // Double-check 5th character is 0
  if (sanitized[4] !== '0') {
    return { isValid: false, error: 'IFSC code\'s 5th character must be 0' };
  }

  // Extract bank code (first 4 characters)
  const bankCode = sanitized.substring(0, 4);

  return { isValid: true, error: '', sanitized, bankCode };
};

/**
 * Extract bank name from IFSC code first 4 characters
 */
export const getBankNameFromIFSC = (ifscCode) => {
  if (!ifscCode || ifscCode.length < 4) return null;

  const bankCodeMap = {
    'SBIN': 'State Bank of India',
    'HDFC': 'HDFC Bank',
    'ICIC': 'ICICI Bank',
    'AXIS': 'Axis Bank',
    'KOTAK': 'Kotak Mahindra Bank',
    'INDB': 'IndusInd Bank',
    'IDFB': 'IDFC Bank',
    'BKID': 'Bank of India',
    'BOBER': 'Bank of Baroda',
    'PNBR': 'Punjab National Bank',
    'YARA': 'Yes Bank',
    'SCBL': 'Standard Chartered Bank',
    'HSBC': 'HSBC Bank',
    'CITI': 'Citibank',
    'UBIN': 'Union Bank of India',
    'IOBA': 'Indian Overseas Bank',
    'UTIB': 'Axis Bank',
    'AIRP': 'AirPayments',
  };

  const bankCode = ifscCode.substring(0, 4).toUpperCase();
  return bankCodeMap[bankCode] || null;
};

/**
 * Validate IFSC + Account Number compatibility
 */
export const validateIFSCAccountCompatibility = (ifscCode, accountNumber, bankName) => {
  if (!ifscCode || !accountNumber) {
    return { isValid: true, warning: null };
  }

  // If user typed account number without matching IFSC, warn them
  // This is a soft check, not a hard error
  if (ifscCode && accountNumber && !bankName) {
    return { isValid: true, warning: 'Please complete IFSC code to verify bank details' };
  }

  return { isValid: true, warning: null };
};

/**
 * Sanitize paste input - detect and clean clipboard data
 */
export const handlePasteInput = (pastedText) => {
  let cleaned = pastedText;

  // Remove country code from phone numbers
  cleaned = cleaned.replace(/^(\+91|0091|91)/, '');

  // Remove spaces and dashes from account numbers and IFSC
  // (This will be handled by individual validators)

  // Sanitize general
  cleaned = sanitizeInput(cleaned);

  return cleaned;
};

/**
 * Validate all salary payment fields together
 */
export const validateSalaryPaymentFields = (accountNumber, bankName, ifscCode, branchName, accountType) => {
  const errors = {
    accountNumber: validateAccountNumber(accountNumber),
    bankName: { isValid: !!bankName, error: bankName ? '' : 'Bank name is required' },
    ifscCode: validateIFSCCode(ifscCode),
    branchName: validateBranchName(branchName),
    accountType: { isValid: !!accountType, error: accountType ? '' : 'Account type is required' },
  };

  // Check compatibility
  const ifscValidation = errors.ifscCode.isValid ? errors.ifscCode : null;
  if (ifscValidation && ifscValidation.bankCode) {
    const detectedBankName = getBankNameFromIFSC(ifscCode);
    if (detectedBankName && bankName && !bankName.toLowerCase().includes(detectedBankName.split(' ')[0].toLowerCase())) {
      errors.ifscCompatibility = {
        isValid: false,
        warning: `Bank name might not match IFSC code. Expected: ${detectedBankName}`,
      };
    }
  }

  const hasErrors = Object.values(errors).some(err => err && !err.isValid);
  return { hasErrors, errors };
};

/**
 * Get clean phone number for API submission
 */
export const getCleanPhoneNumber = (phoneNumber) => {
  const validation = validateIndianMobileNumber(phoneNumber);
  return validation.sanitized || '';
};

/**
 * Get clean account number for API submission
 */
export const getCleanAccountNumber = (accountNumber) => {
  const validation = validateAccountNumber(accountNumber);
  return validation.sanitized || '';
};

/**
 * Get clean IFSC code for API submission
 */
export const getCleanIFSCCode = (ifscCode) => {
  const validation = validateIFSCCode(ifscCode);
  return validation.sanitized || '';
};

/**
 * Check if field has any visible validation errors
 */
export const hasValidationError = (fieldName, formData, validationErrors) => {
  return validationErrors[fieldName] && !validationErrors[fieldName].isValid;
};

/**
 * Get field error message
 */
export const getFieldError = (fieldName, validationErrors) => {
  if (validationErrors[fieldName]) {
    return validationErrors[fieldName].error || '';
  }
  return '';
};
