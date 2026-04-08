```markdown
# KATHI-HARSHITH-REDDY Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns, coding conventions, and workflows found in the `KATHI-HARSHITH-REDDY` JavaScript repository. It covers file naming, import/export styles, commit message habits, and testing patterns, providing practical code examples and actionable commands to streamline your workflow.

## Coding Conventions

### File Naming
- **Style:** camelCase
- **Example:**  
  ```plaintext
  userProfile.js
  fetchDataFromApi.js
  ```

### Import Style
- **Style:** Relative imports
- **Example:**  
  ```javascript
  import { fetchData } from './apiUtils';
  ```

### Export Style
- **Style:** Named exports
- **Example:**  
  ```javascript
  // In apiUtils.js
  export function fetchData() { ... }
  
  // In another file
  import { fetchData } from './apiUtils';
  ```

### Commit Messages
- **Type:** Freeform (no strict prefixing)
- **Average Length:** ~32 characters
- **Examples:**  
  ```
  fixed bug in user login flow
  add validation for email input
  ```

## Workflows

### Adding a New Feature
**Trigger:** When implementing a new functionality  
**Command:** `/add-feature`

1. Create a new JavaScript file using camelCase naming.
2. Write your feature using relative imports for dependencies.
3. Use named exports for all functions or constants.
4. Add or update relevant test files (`*.test.*`).
5. Commit changes with a clear, concise message.

### Fixing a Bug
**Trigger:** When resolving a defect  
**Command:** `/fix-bug`

1. Locate the bug in the relevant file.
2. Apply the fix, maintaining code conventions.
3. Update or add test cases to cover the fix.
4. Commit with a descriptive message of the fix.

### Writing Tests
**Trigger:** When adding or updating tests  
**Command:** `/write-test`

1. Create or update a test file matching the pattern `*.test.*`.
2. Write test cases for the relevant functions or modules.
3. Run the tests using the project's test runner (framework unknown).
4. Commit test changes with a meaningful message.

## Testing Patterns

- **File Pattern:** `*.test.*` (e.g., `userProfile.test.js`)
- **Framework:** Not detected; use standard JavaScript testing practices.
- **Example:**  
  ```javascript
  // userProfile.test.js
  import { getUserProfile } from './userProfile';

  test('should return user profile data', () => {
    const result = getUserProfile('user123');
    expect(result).toHaveProperty('name');
  });
  ```

## Commands
| Command        | Purpose                                      |
|----------------|----------------------------------------------|
| /add-feature   | Start the workflow for adding a new feature  |
| /fix-bug       | Begin the process for fixing a bug           |
| /write-test    | Guide for writing or updating test cases     |
```
