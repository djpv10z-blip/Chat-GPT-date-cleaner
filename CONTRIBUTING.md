
# 🤝 Contributing to ChatGPT Date Cleaner

Thank you for your interest in contributing to **ChatGPT Date Cleaner**!

We welcome contributions that improve the extension's functionality, safety, accessibility, translations, documentation, and user experience.

**Current Version:** 1.2.1 Beta

**License:** MIT

**Platform:** Google Chrome — Manifest V3

**Supported Languages:** 8

> ⚠️ ChatGPT Date Cleaner is an independent, unofficial project. It is not affiliated with or endorsed by OpenAI.

---

## 1. Ways to Contribute

You can help improve the project by:

- Reporting reproducible bugs.
- Suggesting new features.
- Improving existing translations.
- Adding new languages.
- Improving accessibility.
- Fixing JavaScript errors.
- Improving Chrome compatibility.
- Expanding automated tests.
- Improving documentation.
- Reviewing potential safety issues.

Contributors of all experience levels are welcome.

---

## 2. Before Contributing

Before submitting a contribution:

1. Read the project README.
2. Review the documentation.
3. Check existing GitHub Issues.
4. Review the latest release.
5. Make sure your contribution is relevant to the project.

### Useful Links

[Project Repository](https://github.com/djpv10z-blip/Chat-GPT-date-cleaner)

[Official Wiki](https://github.com/djpv10z-blip/Chat-GPT-date-cleaner/wiki)

[GitHub Issues](https://github.com/djpv10z-blip/Chat-GPT-date-cleaner/issues)

[Latest Releases](https://github.com/djpv10z-blip/Chat-GPT-date-cleaner/releases)

---

## 3. Reporting Bugs

Before submitting a bug report, search existing issues to avoid duplicates.

Use the dedicated **Bug Report** form.

[Report a Bug](https://github.com/djpv10z-blip/Chat-GPT-date-cleaner/issues/new/choose)

Include:

- Extension version.
- Chrome version.
- Operating system.
- Steps to reproduce.
- Expected behavior.
- Actual behavior.
- Relevant error messages.

Never submit real authentication credentials, session tokens, or private conversations.

---

## 4. Suggesting Features

Feature requests are welcome.

Use the dedicated **Feature Request** form.

Describe:

- The problem you want to solve.
- The proposed feature.
- Expected user benefits.
- Possible alternatives.
- Any compatibility or safety concerns.

For significant changes, open an Issue and discuss the proposal before submitting a large Pull Request.

---

## 5. Translation Contributions

ChatGPT Date Cleaner currently supports:

| Language | Native Name |
|---|---|
| Italian | Italiano |
| English | English |
| Spanish | Español |
| Russian | Русский |
| Japanese | 日本語 |
| Chinese (Simplified) | 简体中文 |
| Arabic | العربية |
| French | Français |

Translations are primarily managed through `locales.js`.

### Translation Guidelines

- Preserve translation keys.
- Maintain the intended meaning.
- Avoid removing safety warnings.
- Keep terminology consistent.
- Verify the interface layout.
- Test right-to-left behavior for Arabic.
- Avoid unnecessary changes to unrelated languages.

Submit translation suggestions through the **Translation Improvement** Issue form.

Safety-critical wording should receive particular attention.

---

## 6. Development Environment

ChatGPT Date Cleaner is developed primarily with JavaScript and Chrome Manifest V3.

### Main Project Files

| File | Description |
|---|---|
| `manifest.json` | Chrome extension configuration |
| `content.js` | Main application and interface logic |
| `locales.js` | Multilingual interface strings |
| `assets/` | Icons and graphical resources |
| `README.md` | Project overview |
| `CHANGELOG.md` | Version history |
| `PRIVACY.md` | Privacy documentation |
| `SECURITY.md` | Security policy |

Additional contribution and Issue configuration files may be located inside `.github/`.

### Local Installation

1. Fork the repository.
2. Clone your fork.
3. Open `chrome://extensions`.
4. Enable Developer Mode.
5. Click **Load unpacked**.
6. Select the local project folder containing `manifest.json`.
7. Open ChatGPT and refresh the webpage.

The extension runs inside the ChatGPT browser session.

---

## 7. Development Guidelines

When modifying the code:

- Keep changes focused and understandable.
- Follow the existing JavaScript structure.
- Avoid unnecessary dependencies.
- Preserve Manifest V3 compatibility.
- Avoid introducing external data collection.
- Use safe handling for untrusted conversation metadata.
- Preserve the existing language architecture.
- Do not weaken safety confirmations.
- Document meaningful functional changes.

### Authentication Security

Never hardcode:

- Passwords.
- Session cookies.
- Authentication tokens.
- API keys.
- Personal credentials.

Do not add code that sends authentication information to unrelated external services.

---

## 8. Safety-Critical Changes

Conversation-management functionality requires particular care.

Changes affecting the following components should receive additional review:

- Conversation date filtering.
- Creation and modification timestamp verification.
- Project conversation detection.
- Candidate selection.
- Confirmation dialogs.
- Conversation processing endpoints.
- Authentication handling.
- Stop and cancellation controls.

### Important Requirements

Contributors must not intentionally bypass:

- Retention-date checks.
- Mandatory disclaimers.
- Explicit confirmation.
- Backup acknowledgment.
- Project protection settings.
- Existing safety verification controls.

Destructive functionality must never be introduced without clear user consent.

---

## 9. Testing Contributions

Before submitting a Pull Request, perform the tests relevant to your changes.

### Recommended Checks

- Verify that Chrome loads the extension.
- Verify that the manifest is valid.
- Check the interface in supported languages.
- Test minimizing and restoring.
- Check conversation-list rendering.
- Test CSV generation using synthetic data.
- Verify date filtering around cutoff boundaries.
- Check daylight-saving and time-zone behavior.
- Verify that confirmation controls cannot be bypassed.
- Check error handling.
- Verify that no credentials are exposed.

### Avoid Destructive Testing

Do not use real, valuable conversations for testing.

Prefer simulated responses and synthetic conversation data.

Any live-account testing must use accounts and data that you own or are explicitly authorized to test.

Do not test against other people's accounts.

### Automated Testing

Automated tests are encouraged.

If you introduce new testing tools or dependencies, document their installation and use.

Passing automated checks does not guarantee that live ChatGPT interfaces will continue to work.

---

## 10. Submitting a Pull Request

### Recommended Workflow

1. Fork the repository.
2. Create a dedicated development branch.
3. Make your changes.
4. Test your changes locally.
5. Commit your changes with a meaningful message.
6. Push the branch to your fork.
7. Open a Pull Request against the project's `main` branch.

### Branch Naming Examples

- `fix/csv-export`
- `feature/search-filter`
- `translation/french`
- `docs/installation-update`
- `security/input-validation`

### Pull Request Description

Include:

- A summary of the changes.
- The problem being addressed.
- Related Issue numbers.
- Testing performed.
- Potential safety or privacy implications.
- Screenshots for relevant interface changes.

### Review

Pull Requests are subject to maintainer review.

The maintainer may request changes before accepting a contribution.

Submission does not guarantee merging.

---

## 11. Commit Messages

Use short, descriptive commit messages.

Examples:

- `Fix CSV export encoding`
- `Improve French translations`
- `Add conversation search filter`
- `Update installation documentation`
- `Improve timestamp validation`

Avoid generic messages such as `fix`, `update`, or `changes`.

---

## 12. Documentation Standards

Documentation should be:

- Clear and accurate.
- Written in understandable English.
- Consistent with the released extension.
- Updated when behavior changes.
- Explicit about experimental limitations.

### Links

Use verified GitHub URLs or correctly formed relative repository links.

Avoid broken or duplicated Markdown links.

### Version References

Documentation referring to the latest version should be updated whenever a new release is published.

Historical release notes should remain available.

---

## 13. Security Vulnerabilities

Security vulnerabilities must not be reported through public GitHub Issues.

The repository supports private vulnerability reporting.

### Reporting Procedure

1. Open the repository.
2. Navigate to **Security and quality**.
3. Open **Advisories**.
4. Select **Report a vulnerability**.
5. Submit the report privately.

[Security Policy](https://github.com/djpv10z-blip/Chat-GPT-date-cleaner/blob/main/SECURITY.md)

### Responsible Disclosure

Do not publicly reveal sensitive vulnerabilities before coordinating with the maintainer.

Never include real credentials or private conversation data in reports.

---

## 14. Privacy Principles

Contributions should respect the privacy of ChatGPT users.

Avoid introducing:

- Undisclosed tracking.
- Unnecessary collection of conversation contents.
- External transmission of user metadata.
- Persistent storage of authentication tokens.
- Hidden background operations.
- Unnecessary browser permissions.

Any proposed changes to data collection or processing must be clearly documented and reviewed before acceptance.

[Privacy Policy](https://github.com/djpv10z-blip/Chat-GPT-date-cleaner/wiki/Privacy-Policy)

---

## 15. Community Expectations

All contributors are expected to communicate respectfully and constructively.

We encourage:

- Helpful feedback.
- Clear technical discussions.
- Respect for other contributors.
- Inclusive communication.
- Responsible vulnerability reporting.
- Respect for user privacy.

Harassment, personal attacks, discrimination, and intentional misuse of the project are not acceptable.

The project maintainer may moderate contributions and discussions to maintain a constructive environment.

---

## 16. License

ChatGPT Date Cleaner is distributed under the MIT License.

By submitting a contribution intended for inclusion in the project, you agree to make that contribution available under the project's MIT License, to the extent you have the necessary rights to do so.

Only submit code, translations, images, or documentation that you are legally entitled to contribute.

[View MIT License](https://github.com/djpv10z-blip/Chat-GPT-date-cleaner/blob/main/LICENSE)

---

## 17. Project Maintenance

ChatGPT Date Cleaner is an independently maintained open-source project.

Maintainer review, release schedules, and feature priorities may vary depending on available resources.

Contributors are encouraged to discuss significant changes before beginning extensive development work.

---

## 18. Useful Resources

| Resource | Link |
|---|---|
| Repository | [GitHub](https://github.com/djpv10z-blip/Chat-GPT-date-cleaner) |
| Documentation | [Wiki](https://github.com/djpv10z-blip/Chat-GPT-date-cleaner/wiki) |
| Issues | [Issue Tracker](https://github.com/djpv10z-blip/Chat-GPT-date-cleaner/issues) |
| Releases | [Downloads](https://github.com/djpv10z-blip/Chat-GPT-date-cleaner/releases) |
| Security | [Security Policy](https://github.com/djpv10z-blip/Chat-GPT-date-cleaner/blob/main/SECURITY.md) |
| License | [MIT License](https://github.com/djpv10z-blip/Chat-GPT-date-cleaner/blob/main/LICENSE) |

---

## Thank You!

Every useful contribution helps improve ChatGPT Date Cleaner.

Whether you report a bug, improve a translation, fix an issue, or contribute documentation, your support is appreciated.

### 🧹 ChatGPT Date Cleaner

**Current Version:** 1.2.1 Beta

**License:** MIT

*Clean your history. Keep what matters.*

*Independent open-source project. Not affiliated with OpenAI.*
