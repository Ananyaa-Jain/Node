# Input Validation
Input validation is a crucial aspect of backend development that ensures only properly formatted and expected data enters a system. It helps prevent security vulnerabilities like SQL injection, cross-site scripting (XSS), and malformed data errors.

## Types of Input Validation
***Client-side vs. Server-side Validation***
- **Client-side validation** (JavaScript in the browser) improves user experience but cannot be relied upon for security.
- **Server-side validation** (backend code) is mandatory since attackers can bypass client-side checks.

***Syntactic vs. Semantic Validation***
- **Syntactic validation:** Checks if the input follows the correct format (e.g., email must contain `@` and a domain).
- **Semantic validation:** Ensures input makes sense within the application (e.g., a birthdate shouldn’t be in the future).
