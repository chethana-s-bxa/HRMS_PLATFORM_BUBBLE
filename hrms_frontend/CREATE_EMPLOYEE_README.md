Create Employee — Validation & Input Handling Changes

Summary
-------
This document summarizes the changes made to the Create Employee form and its associated validation utilities to provide robust, enterprise-grade validation while supporting international names and sensible user input behavior.

Files modified
--------------
- `src/utils/createEmployeeValidation.js`
- `src/pages/HR/CreateEmployee.jsx`

Key Goals
---------
- Allow international names: support accented characters, hyphens, apostrophes, and internal spaces.
- Prevent garbage/spam inputs: block repeated characters (4+), inputs where >70% is the same character, and freeform punctuation-based gibberish.
- Maintain typing-friendly behavior: preserve internal spaces while typing; trim/clean only for validation/submit.
- Harden specific fields: `department`, `designation`, and `currentOfficeLocation` use stricter character sets and a heuristic to detect "likely words".

Major Changes
-------------
1. sanitizeNameInput (new)
   - Location: `src/utils/createEmployeeValidation.js`
   - Purpose: Remove control/zero-width characters but preserve user-typed internal spaces while typing. Trim is applied only during validation.

2. Validation functions updated / added
   - `validateFirstName`, `validateLastName`
     - Use `sanitizeNameInput` for typing and `trim()` for validation.
     - Regex: `/^[A-Za-zÀ-ÿ\s\-']+$/` to accept accented letters, spaces, hyphens, apostrophes.
     - Checks: required, length limits, repeated-character check (`hasRepeatedCharacters`), and >70% same char check (`hasTooMuchSameCharacter`).

   - `validateDepartment`, `validateDesignation`, `validateOfficeLocation`
     - Stricter allowed characters to prevent garbage input (commas/periods allowed in office location for "City, State" formats).
     - Token-level heuristic (`isLikelyWord`) introduced to require that each word-like token contains a vowel or is an accepted acronym/roman numeral/single-letter level.
     - `splitSmart` helper added to handle camelCase/PascalCase tokens (so "SoftwareEngineeringI" is accepted).

3. Heuristic helpers
   - `hasVowel`, `isLikelyWord` — basic natural-language heuristics to reduce acceptance of random, vowel-less gibberish (e.g., `sdghd`). Accepts acronyms (`HR`), Roman numerals (`I`, `II`), and single-letter levels (`I`).
   - `splitSmart` — splits on capital letters to allow joined words like `SoftwareEngineeringI` to be tokenized and validated.

4. CreateEmployee JSX changes
   - `handleChange` updated to use `sanitizeNameInput` for the following fields while typing: `firstName`, `lastName`, `department`, `designation`, `currentOfficeLocation`.
   - Real-time validation remains active on `onChange` with trimmed checks applied in validators; trimming and stricter validation still occur on blur/submit.

5. Debugging/Logging
   - Temporary console logging was added during debugging and later removed from validators. Handlers still contain minimal logs to aid testing; these can be removed on request.

Behavior Notes
--------------
- Users can type spaces mid-word; input will be preserved while typing. Validators operate on trimmed versions of inputs so leading/trailing spaces are removed for validation.
- Department and designation entries like `Software Engineering I`, `SoftwareEngineeringI`, and `Bengaluru, Karnataka` are now accepted.
- Obvious gibberish like `sdghd`, `jdshd`, or repeated character strings are rejected with clear validation messages.

Next steps / tuning
-------------------
- If you want to relax or tighten allowed punctuation for any field (e.g., allow commas in `department`), tell me which field and characters to allow.
- Heuristic `isLikelyWord` is intentionally conservative; if legitimate short tokens are blocked, list examples to add to the allowance rules.

Files of interest
-----------------
- `src/utils/createEmployeeValidation.js` — main changes and helpers
- `src/pages/HR/CreateEmployee.jsx` — sanitizer usage in `handleChange` and validation wiring

Contact
-------
If you'd like, I can:
- Remove debug logs and finalize the validators.
- Add unit tests for the validation functions.
- Add examples and usage notes in the UI.

