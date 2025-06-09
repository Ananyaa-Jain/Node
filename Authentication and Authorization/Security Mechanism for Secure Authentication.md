# Security Mechanisms for Secure Authentication
Authentication is just the first step in securing an application. Multiple layers of security mechanisms must work together to protect against various attack vectors and ensure comprehensive protection.

## 1. Password Hashing (Using `bcrypt`)
**The Problem:** Storing passwords in plain text is one of the most critical security vulnerabilities. If a database is compromised, attackers immediately gain access to all user credentials.

**The Solution: Cryptographic Hashing**
- Password hashing transforms plain-text passwords into irreversible cryptographic digests using algorithms like bcrypt, scrypt, or Argon2.
- A hash is a one-way cryptographic function. You **can’t reverse** a hash to get the original password.
- `bcrypt` also adds a **salt** (random data) before hashing, which ensures **even the same passwords have different hashes**.
