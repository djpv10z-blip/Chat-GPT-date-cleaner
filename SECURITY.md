
# 🔐 Security Policy

## ChatGPT Date Cleaner

**Current Version:** 1.2.1 Beta

**Platform:** Google Chrome — Manifest V3

**License:** MIT

**Last Updated:** October 23, 2026

Thank you for helping keep ChatGPT Date Cleaner and its users safe.

Security is an important part of this project because the extension interacts with ChatGPT conversation metadata and the user's authenticated browser session.

ChatGPT Date Cleaner is an independent, unofficial project. It is not affiliated with, endorsed by, or supported by OpenAI.

---

## 1. Supported Versions

The following table describes the project's current security maintenance policy.

| Version | Security Maintenance |
|---|---|
| 1.2.1 Beta | Current development version |
| 1.2.0 Beta | Superseded |
| 1.1.0 Beta | Not actively maintained |
| 1.0.0 | Not actively maintained |

Security reports are welcome for all versions.

However, security fixes will generally be prioritized for the latest development version.

Users are encouraged to install the latest available release.

[View Latest Releases](https://github.com/djpv10z-blip/Chat-GPT-date-cleaner/releases)

---

## 2. Reporting a Security Vulnerability

**Please do not report security vulnerabilities through public GitHub Issues.**

The repository has GitHub Private Vulnerability Reporting enabled.

This allows security researchers to communicate privately with the project maintainer.

### How to Report

1. Open the GitHub repository.
2. Navigate to **Security and quality**.
3. Select **Advisories**.
4. Click **Report a vulnerability**.
5. Complete the private reporting form.
6. Submit the report.

Official repository:

https://github.com/djpv10z-blip/Chat-GPT-date-cleaner

### Important

Do not publish security vulnerability details publicly before the maintainer has had an opportunity to investigate and coordinate a response.

---

## 3. Information to Include

A useful security report should contain:

- A clear description of the vulnerability.
- The affected extension version.
- The affected browser and operating system.
- Steps required to reproduce the issue.
- Expected behavior.
- Actual behavior.
- Potential security impact.
- Relevant technical information.
- Suggested mitigation, if available.

Where possible, provide a minimal and safe proof of concept.

### Sensitive Information

Never include real:

- Passwords.
- Authentication tokens.
- Session cookies.
- Private ChatGPT conversations.
- Personal identifying information.
- Confidential business information.

Use synthetic or redacted examples wherever possible.

---

## 4. Security Issues of Particular Interest

The following categories are especially relevant to ChatGPT Date Cleaner.

### Authentication and Session Security

- Exposure of ChatGPT authentication tokens.
- Unintended persistence of authentication credentials.
- Transmission of session information to unauthorized destinations.

### Conversation Data Protection

- Unexpected disclosure of conversation metadata.
- Unauthorized access to conversation content.
- Accidental transmission of sensitive information.
- Insecure handling of generated CSV exports.

### Conversation Processing

- Processing of conversations outside the user's selection.
- Incorrect retention-date verification.
- Bypassing mandatory confirmation controls.
- Unexpected modifications to protected conversations.
- Cross-account processing vulnerabilities.

### Browser Extension Security

- Cross-site scripting vulnerabilities.
- Unsafe processing of untrusted conversation titles.
- Excessive or unintended extension permissions.
- Unsafe external communication.
- Vulnerabilities introduced by third-party dependencies.

This list is not exhaustive.

---

## 5. Responsible Security Testing

Security research should be performed responsibly.

Researchers should:

- Use accounts and data they own or are explicitly authorized to test.
- Avoid accessing other users' information.
- Avoid disrupting ChatGPT or other services.
- Avoid collecting unnecessary personal information.
- Avoid publishing authentication credentials.
- Avoid destructive testing against real user data.
- Respect applicable laws and service terms.

The project does not authorize testing against OpenAI infrastructure or accounts belonging to other users.

---

## 6. Vulnerability Handling

After receiving a private security report, the maintainer will aim to:

1. Review the submitted information.
2. Assess the potential security impact.
3. Request additional details if necessary.
4. Attempt to reproduce the issue safely.
5. Develop and validate an appropriate fix.
6. Prepare a corrected release where needed.
7. Coordinate disclosure when appropriate.

Response and resolution times may vary according to the complexity of the issue and maintainer availability.

No guaranteed response time or remediation deadline is provided.

---

## 7. Coordinated Disclosure

The project encourages coordinated vulnerability disclosure.

Security details should remain private while the issue is being investigated and an appropriate mitigation is developed.

When suitable, the maintainer may publish a GitHub Security Advisory explaining:

- The affected versions.
- The nature of the vulnerability.
- Its potential impact.
- Available mitigations.
- The version containing the fix.

Public disclosure should be coordinated with the reporter whenever reasonably possible.

---

## 8. Security Advisories and Updates

Security-related corrections may be distributed through GitHub Releases.

Users should review release notes before installing updated versions.

Official resources:

[GitHub Releases](https://github.com/djpv10z-blip/Chat-GPT-date-cleaner/releases)

[Project Changelog](https://github.com/djpv10z-blip/Chat-GPT-date-cleaner/wiki/Changelog)

[Security and Quality](https://github.com/djpv10z-blip/Chat-GPT-date-cleaner/security)

---

## 9. Privacy and Sensitive Data

ChatGPT Date Cleaner operates within the authenticated ChatGPT browser session.

The extension processes conversation metadata and may retrieve individual conversation records for verification.

The current version does not intentionally include developer-operated analytics or advertising services.

For more information:

[Privacy Policy](https://github.com/djpv10z-blip/Chat-GPT-date-cleaner/wiki/Privacy-Policy)

### Important Limitation

ChatGPT Date Cleaner uses undocumented ChatGPT interfaces.

These interfaces may change without notice.

The current conversation-removal mechanism changes conversation visibility and does not independently guarantee permanent data erasure from OpenAI systems.

---

## 10. Security Recommendations for Users

Users are encouraged to:

1. Download releases only from the official repository.
2. Keep Google Chrome updated.
3. Install the latest available extension version.
4. Review extension permissions.
5. Maintain verified backups of important ChatGPT conversations.
6. Avoid sharing authentication credentials.
7. Review conversation selections before processing.
8. Use the single-conversation test before large operations.
9. Stop using the extension if unexpected behavior occurs.
10. Report suspected security problems privately.

Never bypass the application's safety confirmations.

---

## 11. No Security Warranty

ChatGPT Date Cleaner is experimental software distributed under the MIT License.

The software is provided "AS IS", without warranties to the extent permitted by applicable law.

The project cannot guarantee absolute security, uninterrupted compatibility, or the absence of vulnerabilities.

Nothing in this policy excludes rights or liabilities that cannot legally be excluded.

---

## 12. Contact and Project Information

**Project:** ChatGPT Date Cleaner

**Current Version:** 1.2.1 Beta

**Maintainer:** Repository owner

**Repository:**

https://github.com/djpv10z-blip/Chat-GPT-date-cleaner

### Private Security Reports

Use GitHub's **Report a vulnerability** feature in the repository's Security section.

### General Bug Reports

Non-sensitive issues may be reported through:

[GitHub Issues](https://github.com/djpv10z-blip/Chat-GPT-date-cleaner/issues)

Do not disclose sensitive security information in public Issues.

---

### 🔐 Security Matters

**Responsible disclosure helps protect users and improve the project.**

*ChatGPT Date Cleaner — Version 1.2.1 Beta*

*Independent open-source project. Not affiliated with OpenAI.*
