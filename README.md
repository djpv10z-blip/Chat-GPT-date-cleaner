# 🧹 ChatGPT Date Cleaner

**Clean your history. Keep what matters.**

![Version](https://img.shields.io/badge/version-1.2.0-blue)
![Status](https://img.shields.io/badge/status-beta-orange)
![Chrome](https://img.shields.io/badge/browser-Google%20Chrome-4285F4)
![Manifest](https://img.shields.io/badge/manifest-v3-informational)
![Languages](https://img.shields.io/badge/languages-8-brightgreen)

**ChatGPT Date Cleaner** is a free, independent Chrome extension that helps you find and review ChatGPT conversations older than a date you choose. It provides a CSV preview and requires explicit confirmation before attempting to remove selected conversations from your visible ChatGPT history.

> [!WARNING]
> **Experimental beta — back up your data first.** This is an unofficial project, **not affiliated with, endorsed by, or supported by OpenAI**. It uses undocumented ChatGPT interfaces that may change without notice. Its current removal request changes conversation visibility; a successful response **does not prove permanent data erasure**. Removal may be difficult or impossible to reverse.

## ⬇️ Download

**[Download from GitHub Releases](../../releases)** — choose the latest release and download the ZIP attached under **Assets** (not the auto-generated “Source code” archives).

**Version:** 1.2.0 Beta · **Platform:** Google Chrome (Manifest V3)

## ✨ Features

| Feature | Description |
|---|---|
| 📅 Custom cutoff date | Preserve conversations created **or updated** on or after your selected date. The cutoff day is included. |
| 🔎 Conversation scanning | Review the eligible conversation list before making changes. |
| ✅ Selective processing | Adjust which conversations are selected; all eligible candidates are selected by default. |
| 📁 Archived and Project filters | Optionally include archived conversations and conversations identified as belonging to Projects. |
| 📄 CSV export | Download candidate titles, dates, links, and selection information for review. |
| 🛡️ Safety confirmations | Backup acknowledgment, disclaimer acceptance, and typed confirmation before each removal action. |
| 🧪 One-chat test | Test with one unimportant conversation before attempting a larger operation. |
| 🪟 Movable interface | Drag the window or minimize it to a floating icon. |
| 🌐 Eight languages | Italian, English, Spanish, Russian, Japanese, Simplified Chinese, Arabic, and French. |

## 🚀 Installation

1. Download the **extension ZIP** from [Releases](../../releases).
2. Extract it into a folder you intend to keep.
3. In Chrome, open `chrome://extensions` and enable **Developer mode**.
4. Choose **Load unpacked** and select the extracted folder containing `manifest.json`.
5. Open or refresh [ChatGPT](https://chatgpt.com), sign in, and click the floating extension launcher.
6. Select your preferred language when prompted.

> GitHub downloads require manual installation. They do not provide Chrome Web Store-style automatic updates.

For detailed steps, see the **[Installation Guide](../../wiki/Installation-Guide)**.

## 🧭 How to use it safely

1. In ChatGPT, request and **verify a complete data export** via **Settings → Data Controls → Export Data**. The extension's CSV is **not** a backup of conversation contents.
2. Choose the date **from which conversations must be kept** and configure archived/Project filters.
3. Click **Analyze chats**. Scanning does not send removal requests.
4. Review the selected candidates; download the **CSV** and check it carefully.
5. Confirm you have your full backup. Use **Delete 1 test chat** on a conversation you can afford to lose.
6. Read and accept the disclaimer, enter the requested confirmation phrase, and verify the result in ChatGPT.
7. Run a **fresh scan** and export a **new CSV** before any further removal operation.

**Date rule:** a conversation can be eligible only if **both** its creation timestamp and its last-update timestamp precede the chosen cutoff. Entries with missing or unverified dates are excluded or cause the process to stop. Dates are interpreted in your browser's time zone.

**Large lists:** only the first **350 candidates** are displayed in the table, while additional candidates can remain selected. The CSV contains the full candidate list. For large histories, review the CSV carefully and prefer smaller batches.

See the full **[User Guide](../../wiki/User-Guide)** and **[FAQ & Troubleshooting](../../wiki/FAQ-and-Troubleshooting)**.

## 🌍 Languages

Italiano · English · Español · Русский · 日本語 · 简体中文 · العربية · Français

The chosen interface language is saved locally and can be changed later using the globe icon.

## 🔒 Privacy and security

The current extension runs on `https://chatgpt.com/*` and uses the existing authenticated ChatGPT session to contact ChatGPT. It uses Chrome local storage for the language preference. It does not contain developer-operated analytics or advertising endpoints. CSV files are generated locally.

Before a removal attempt, the extension retrieves current conversation details to check timestamps; those responses may include conversation content even though the extension does not intentionally export complete messages.

Read **[Privacy Policy](../../wiki/Privacy-Policy)** and **[Safety & Disclaimer](../../wiki/Safety-and-Disclaimer)**. Also see [`PRIVACY.md`](PRIVACY.md).

## ⚠️ Known limitations

- Depends on **undocumented internal ChatGPT interfaces** and may stop working after service changes.
- Current removal behavior uses a visibility-change request; **permanent server-side deletion is not verified**.
- Project detection relies on available metadata and may be incomplete.
- Only the first 350 candidate rows appear in the table, but the remaining candidates can still be selected.
- Account compatibility and successful real-world removal are not guaranteed; use a one-chat test before considering bulk operations.
- Manually installed GitHub versions do not update automatically.

## 📚 Documentation

Visit the **[Project Wiki](../../wiki)** for:

- [Installation Guide](../../wiki/Installation-Guide)
- [User Guide](../../wiki/User-Guide)
- [Safety & Disclaimer](../../wiki/Safety-and-Disclaimer)
- [Privacy Policy](../../wiki/Privacy-Policy)
- [FAQ & Troubleshooting](../../wiki/FAQ-and-Troubleshooting)
- [Changelog](../../wiki/Changelog)

## 🐞 Issues and suggestions

Find a bug or have a feature suggestion? **[Open a GitHub Issue](../../issues)**. Include the extension version, Chrome version, steps to reproduce, expected behavior, and actual behavior. **Do not post conversation contents, exported CSVs, session cookies, passwords, or access tokens.**

## 📦 Project files

| File | Purpose |
|---|---|
| `manifest.json` | Chrome Manifest V3 configuration |
| `content.js` | User interface, scanning, exports, safeguards, and operations |
| `locales.js` | Translations for eight interface languages |
| `README.md` | Project introduction and installation summary |
| `CHANGELOG.md` | Version history |
| `PRIVACY.md` | Technical privacy notice |
| `ISTRUZIONI.txt` | Italian quick-start instructions |

## ⚖️ License and legal notice

**No open-source license has been selected yet.** Public source availability does not automatically grant permission to reuse or redistribute this code. The repository owner should add a `LICENSE` file before describing the project as open source.

The software is provided **“as is”** without warranties to the extent permitted by applicable law. This notice does not exclude rights or liabilities that cannot lawfully be excluded.

---

**ChatGPT Date Cleaner · v1.2.0 Beta**  
*Independent project — not affiliated with OpenAI.*
