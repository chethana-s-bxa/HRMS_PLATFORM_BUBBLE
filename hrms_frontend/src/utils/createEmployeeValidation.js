/**
 * Create Employee Form Validation Utility
 * Comprehensive validation for all fields with edge-case coverage
 */

/**
 * Sanitize input - remove control chars, trim whitespace
 */
export const sanitizeInput = (value) => {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // Remove control characters
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // Remove zero-width characters
    .trim();
};

/**
 * Sanitize input for name fields (allows internal spaces, only trims edges)
 * Used for firstName, lastName to preserve user-entered spaces
 */
export const sanitizeNameInput = (value) => {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // Remove control characters
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // Remove zero-width characters
    ; // Preserve internal and edge spaces while typing; trimming handled in validators
};

/**
 * Check for repeated characters (e.g., "aaaa", "bbbb", "eeee")
 * Returns true if 4 or more same characters in a row are found
 */
export const hasRepeatedCharacters = (value) => {
  const pattern = /(.)\1{3,}/; // Match 4 or more same characters
  return pattern.test(value);
};

/**
 * Check if more than 70% of string is the same character
 * Returns true if more than 70% is same char
 */
export const hasTooMuchSameCharacter = (value) => {
  if (!value || value.length === 0) return false;
  
  const charCount = {};
  let maxCount = 0;
  
  // Count occurrences of each character
  for (const char of value) {
    charCount[char] = (charCount[char] || 0) + 1;
    maxCount = Math.max(maxCount, charCount[char]);
  }
  
  // Check if more than 70% is same character
  const percentage = (maxCount / value.length) * 100;
  return percentage > 70;
};

// Heuristic: determine if a token looks like a real word (has vowel or is an acronym)
const hasVowel = (str) => {
  if (!str) return false;
  // normalize accents, remove diacritics
  const base = str.normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
  return /[aeiouAEIOU]/.test(base);
};

const isLikelyWord = (token) => {
  if (!token) return false;
  // Remove surrounding punctuation
  const cleaned = token.replace(/[^A-Za-zÀ-ÿ]/g, '');
  // Accept acronyms like HR, RND (2-4 uppercase letters)
  if (/^[A-Z]{2,4}$/.test(token)) return true;
  // If cleaned has at least 2 letters, require a vowel (simple word heuristic)
  if (cleaned.length >= 2) return hasVowel(cleaned);
  // Allow Roman numerals (I, II, III, IV, V, X, etc.)
  if (/^[IVXLCDM]+$/i.test(token)) return true;
  // Allow single uppercase letters used as levels (e.g., 'I')
  if (/^[A-Z]$/.test(token)) return true;
  return false;
};

// Split tokens smartly: split on capitals for camelCase/PascalCase as fallback
const splitSmart = (token) => {
  if (!token) return [];
  // If token contains separators, return original split
  if (/[^A-Za-zÀ-ÿ0-9]/.test(token)) return [token];
  // Split by capital letters (PascalCase / camelCase)
  const parts = token.split(/(?=[A-Z])/).filter(Boolean);
  return parts.length > 1 ? parts : [token];
};

/**
 * Validate First Name (letters including accented chars, spaces allowed for middle names, 2-30 chars, no repeated chars)
 */
export const validateFirstName = (value) => {
  const sanitized = sanitizeNameInput(value);
  const trimmed = sanitized.trim();

  if (!trimmed) {
    return { isValid: false, error: 'First name is required' };
  }

  if (trimmed.length < 2) {
    return { isValid: false, error: 'First name must be at least 2 characters' };
  }

  if (trimmed.length > 30) {
    return { isValid: false, error: 'First name cannot exceed 30 characters' };
  }

  // Allow letters (including accented), spaces, hyphens for compound names
  if (!/^[A-Za-zÀ-ÿ\s\-']+$/.test(trimmed)) {
    return { isValid: false, error: 'First name must contain only letters' };
  }

  // Check for repeated characters (4+ same chars in a row)
  if (hasRepeatedCharacters(trimmed)) {
    return { isValid: false, error: 'First name cannot contain repeated characters' };
  }

  // Check if more than 70% same character
  if (hasTooMuchSameCharacter(trimmed)) {
    return { isValid: false, error: 'First name cannot be mostly the same character' };
  }

  return { isValid: true, error: '' };
};

/**
 * Validate Last Name (letters including accented chars, spaces for compound names, 1-30 chars, no repeated chars)
 */
export const validateLastName = (value) => {
  const sanitized = sanitizeNameInput(value);
  const trimmed = sanitized.trim();

  if (!trimmed) {
    return { isValid: false, error: 'Last name is required' };
  }

  if (trimmed.length > 30) {
    return { isValid: false, error: 'Last name cannot exceed 30 characters' };
  }

  // Allow letters (including accented), spaces, hyphens, apostrophes
  if (!/^[A-Za-zÀ-ÿ\s\-']+$/.test(trimmed)) {
    return { isValid: false, error: 'Last name must contain only letters' };
  }

  if (hasRepeatedCharacters(trimmed)) {
    return { isValid: false, error: 'Last name cannot contain repeated characters' };
  }

  if (hasTooMuchSameCharacter(trimmed)) {
    return { isValid: false, error: 'Last name cannot be mostly the same character' };
  }

  return { isValid: true, error: '' };
};

/**
 * Validate Email with strict edge-case coverage
 */
export const validateEmail = (value) => {
  const sanitized = sanitizeInput(value);
  
  if (!sanitized) {
    return { isValid: false, error: 'Email is required' };
  }
  
  // Check for leading dot
  if (sanitized.startsWith('.')) {
    return { isValid: false, error: 'Email cannot start with a dot' };
  }
  
  // Check for consecutive dots
  if (sanitized.includes('..')) {
    return { isValid: false, error: 'Email cannot contain consecutive dots' };
  }
  
  // Split email into local and domain parts
  const emailParts = sanitized.split('@');
  
  if (emailParts.length !== 2) {
    return { isValid: false, error: 'Email must contain exactly one @ symbol' };
  }
  
  const [localPart, domain] = emailParts;
  
  // Check for missing local part
  if (!localPart || localPart.length === 0) {
    return { isValid: false, error: 'Email must have text before @' };
  }
  
  // Check for missing domain
  if (!domain || domain.length === 0) {
    return { isValid: false, error: 'Email must have domain after @' };
  }
  
  // Check domain has at least one dot
  if (!domain.includes('.')) {
    return { isValid: false, error: 'Email domain must contain a dot' };
  }
  
  // Check for consecutive dots in domain
  if (domain.includes('..')) {
    return { isValid: false, error: 'Email domain cannot have consecutive dots' };
  }
  
  // Check domain ends with valid TLD (at least 2 chars)
  const domainParts = domain.split('.');
  const tld = domainParts[domainParts.length - 1];
  
  if (tld.length < 2) {
    return { isValid: false, error: 'Email domain extension must be at least 2 characters' };
  }
  
  // General regex validation
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  
  if (!emailRegex.test(sanitized)) {
    return { isValid: false, error: 'Enter a valid email address' };
  }
  
  return { isValid: true, error: '' };
};

/**
 * Validate Indian Phone Number (+91 format, 13 chars total)
 */
export const validatePhoneNumber = (value) => {
  const sanitized = sanitizeInput(value).replace(/\s/g, '');
  
  if (!sanitized) {
    return { isValid: false, error: 'Phone number is required' };
  }
  
  // Check if starts with +91
  if (!sanitized.startsWith('+91')) {
    return { isValid: false, error: 'Phone must start with +91' };
  }
  
  // Check exact length (13 characters: +91 + 10 digits)
  if (sanitized.length !== 13) {
    return { isValid: false, error: 'Enter phone with +91 and 10 digits' };
  }
  
  // Extract digits after +91
  const digits = sanitized.slice(3);
  
  // Check if digits are only numbers
  if (!/^\d{10}$/.test(digits)) {
    return { isValid: false, error: 'Phone must contain exactly 10 digits after +91' };
  }
  
  // Check if starts with 6-9 (valid Indian mobile)
  const firstDigit = parseInt(digits[0], 10);
  if (firstDigit < 6 || firstDigit > 9) {
    return { isValid: false, error: 'Indian mobile must start with 6-9' };
  }
  
  return { isValid: true, error: '' };
};

/**
 * Validate Experience in Years (0-50, integers only)
 */
export const validateExperience = (value) => {
  if (value === '' || value === null || value === undefined) {
    return { isValid: false, error: 'Experience is required' };
  }
  
  const num = parseFloat(value);
  
  if (isNaN(num)) {
    return { isValid: false, error: 'Experience must be a number' };
  }
  
  // Check for decimals
  if (!Number.isInteger(num)) {
    return { isValid: false, error: 'Experience must be a whole number (no decimals)' };
  }
  
  if (num < 0) {
    return { isValid: false, error: 'Experience cannot be negative' };
  }
  
  if (num > 50) {
    return { isValid: false, error: 'Experience cannot exceed 50 years' };
  }
  
  return { isValid: true, error: '' };
};

/**
 * Validate Department (letters and spaces, 2-50 chars, sensible words only)
 */
export const validateDepartment = (value) => {
  const sanitized = sanitizeNameInput(value);
  const trimmed = sanitized.trim();

  if (!trimmed) {
    return { isValid: false, error: 'Department is required' };
  }

  if (trimmed.length > 50) {
    return { isValid: false, error: 'Department cannot exceed 50 characters' };
  }

  // Allow letters (including accents), spaces, hyphens, ampersand and apostrophes
  if (!/^[A-Za-zÀ-ÿ\s\-&']+$/.test(trimmed)) {
    return { isValid: false, error: 'Department may only contain letters, spaces, hyphens, & and apostrophes' };
  }

  // Each token (split by space/hyphen) should look like a real word or an acronym
  const tokens = trimmed.split(/[\s\-]+/).filter(Boolean);
  for (const t of tokens) {
    if (!isLikelyWord(t)) {
      return { isValid: false, error: `Department contains invalid word: ${t}` };
    }
  }

  if (hasRepeatedCharacters(trimmed)) {
    return { isValid: false, error: 'Department cannot contain repeated characters' };
  }

  if (hasTooMuchSameCharacter(trimmed)) {
    return { isValid: false, error: 'Department cannot be mostly the same character' };
  }

  return { isValid: true, error: '' };
};

/**
 * Validate Sub Business Unit (positive number, no leading 0, 1-6 digits)
 */
export const validateSubBusinessUnit = (value) => {
  const sanitized = sanitizeInput(value);
  
  if (!sanitized) {
    return { isValid: false, error: 'Sub Business Unit is required' };
  }
  
  // Check if only digits
  if (!/^\d+$/.test(sanitized)) {
    return { isValid: false, error: 'Sub Business Unit must be a number' };
  }
  
  // Check length
  if (sanitized.length > 6) {
    return { isValid: false, error: 'Sub Business Unit cannot exceed 6 digits' };
  }
  
  const num = parseInt(sanitized, 10);
  
  // Check if leading zero
  if (sanitized.startsWith('0')) {
    return { isValid: false, error: 'Sub Business Unit cannot start with 0' };
  }
  
  // Check positive
  if (num <= 0) {
    return { isValid: false, error: 'Sub Business Unit must be greater than 0' };
  }
  
  return { isValid: true, error: '' };
};

/**
 * Validate Designation (letters and spaces, 2-60 chars, sensible words only)
 */
export const validateDesignation = (value) => {
  const sanitized = sanitizeNameInput(value);
  const trimmed = sanitized.trim();

  if (!trimmed) {
    return { isValid: false, error: 'Designation is required' };
  }

  if (trimmed.length > 60) {
    return { isValid: false, error: 'Designation cannot exceed 60 characters' };
  }

  // Allow letters (including accents), spaces, hyphens and apostrophes; no commas/periods
  if (!/^[A-Za-zÀ-ÿ\s\-']+$/.test(trimmed)) {
    return { isValid: false, error: 'Designation may only contain letters, spaces, hyphens and apostrophes' };
  }

  // Each token should look like a real word or acronym
  const tokens = trimmed.split(/[\s\-\/()]+/).filter(Boolean);
  for (const t of tokens) {
    // allow short numerical tokens? designations shouldn't be purely numeric
    if (/[A-Za-z]/.test(t) && !isLikelyWord(t)) {
      return { isValid: false, error: `Designation contains invalid word: ${t}` };
    }
  }

  if (hasRepeatedCharacters(trimmed)) {
    return { isValid: false, error: 'Designation cannot contain repeated characters' };
  }

  if (hasTooMuchSameCharacter(trimmed)) {
    return { isValid: false, error: 'Designation cannot be mostly the same character' };
  }

  return { isValid: true, error: '' };
};

/**
 * Validate Office Location (letters, numbers and limited punctuation, sensible words)
 */
export const validateOfficeLocation = (value) => {
  const sanitized = sanitizeNameInput(value);
  const trimmed = sanitized.trim();

  if (!trimmed) {
    return { isValid: false, error: 'Office location is required' };
  }

  if (trimmed.length < 2) {
    return { isValid: false, error: 'Office location must be at least 2 characters' };
  }

  if (trimmed.length > 100) {
    return { isValid: false, error: 'Office location cannot exceed 100 characters' };
  }

  // Allow letters (including accents), numbers, spaces, hyphens, slashes, parentheses and apostrophes
  // Allow commas and periods to support 'City, State' formats
  if (!/^[A-Za-zÀ-ÿ0-9\s,\.\-\/()']+$/.test(trimmed)) {
    return { isValid: false, error: 'Office location may only contain letters, numbers, spaces, commas, periods, hyphens, slashes, parentheses and apostrophes' };
  }

  const tokens = trimmed.split(/[\s,\.\-\/()]+/).filter(Boolean);
  for (const t of tokens) {
    // If token contains letters, ensure it's a sensible word
    if (/[A-Za-zÀ-ÿ]/.test(t) && !isLikelyWord(t)) {
      return { isValid: false, error: `Office location contains invalid word: ${t}` };
    }
  }

  if (hasRepeatedCharacters(trimmed)) {
    return { isValid: false, error: 'Office location cannot contain repeated characters' };
  }

  if (hasTooMuchSameCharacter(trimmed)) {
    return { isValid: false, error: 'Office location cannot be mostly the same character' };
  }
  
  return { isValid: true, error: '' };
};

/**
 * Validate Manager ID (positive number, greater than 0)
 */
export const validateManagerId = (value) => {
  // Manager ID is optional
  if (!value || value === '') {
    return { isValid: true, error: '' };
  }
  
  const sanitized = sanitizeInput(String(value));
  
  if (!/^\d+$/.test(sanitized)) {
    return { isValid: false, error: 'Manager ID must be a number' };
  }
  
  const num = parseInt(sanitized, 10);
  
  if (num <= 0) {
    return { isValid: false, error: 'Manager ID must be greater than 0' };
  }
  
  return { isValid: true, error: '' };
};

/**
 * Validate CTC/Salary (10000 - 100000000, allow 2 decimal places)
 */
export const validateSalary = (value) => {
  if (value === '' || value === null || value === undefined) {
    return { isValid: false, error: 'Salary (CTC) is required' };
  }
  
  const num = parseFloat(value);
  
  if (isNaN(num)) {
    return { isValid: false, error: 'Salary must be a number' };
  }
  
  if (num < 10000) {
    return { isValid: false, error: 'Salary must be at least 10,000' };
  }
  
  if (num > 100000000) {
    return { isValid: false, error: 'Salary cannot exceed 100,000,000' };
  }
  
  if (num <= 0) {
    return { isValid: false, error: 'Salary must be greater than 0' };
  }
  
  return { isValid: true, error: '' };
};

/**
 * Handle paste input - sanitize clipboard data
 */
export const handlePasteInput = (e) => {
  const pastedText = (e.clipboardData || window.clipboardData).getData('text');
  const sanitized = sanitizeInput(pastedText);
  
  if (sanitized !== pastedText) {
    e.preventDefault();
    // Trigger the sanitized version
    const inputEvent = new ClipboardEvent('paste', {
      clipboardData: new DataTransfer(),
      bubbles: true,
    });
  }
  
  return sanitized;
};

/**
 * Validate all form fields
 */
export const validateAllFields = (formData) => {
  const errors = {};
  
  const validations = [
    { field: 'firstName', validator: validateFirstName },
    { field: 'lastName', validator: validateLastName },
    { field: 'personalEmail', validator: validateEmail },
    { field: 'phone', validator: validatePhoneNumber },
    { field: 'currentExperience', validator: validateExperience },
    { field: 'department', validator: validateDepartment },
    { field: 'subBusinessUnit', validator: validateSubBusinessUnit },
    { field: 'designation', validator: validateDesignation },
    { field: 'currentOfficeLocation', validator: validateOfficeLocation },
    { field: 'managerId', validator: validateManagerId },
    { field: 'salary', validator: validateSalary },
  ];
  
  validations.forEach(({ field, validator }) => {
    const result = validator(formData[field]);
    if (!result.isValid) {
      errors[field] = result.error;
    }
  });
  
  return errors;
};
