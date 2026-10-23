# Changelog

## v1.2.1 — 2026-10-23

- Added the official Tech Minimal extension icon in **16, 32, 48 and 128 px** sizes.
- Updated the Chrome Manifest V3 `icons` property and bumped the extension version to `1.2.1`.
- Included the GitHub project banner, social preview and logo in the source package.
- Updated project README and packaging instructions.
- **No functional changes to scanning, chat selection or conversation visibility operations.**
- This remains an **unofficial experimental beta**. Real ChatGPT deletion/visibility behavior has not been independently validated.

## v1.2.0 — 2026-10-23

- Draggable and minimizable in-page floating window; minimized icon can also be dragged.
- First-run language selection persisted with Chrome extension `storage.local`.
- Full interface translation into Italian, English, Spanish, Russian, Japanese, Simplified Chinese, Arabic (RTL), and French.
- Mandatory disclaimer acknowledgement and localized typed confirmation before every deletion attempt.
- Added server-side timestamp recheck of each chat before attempting to delete it; failure to read current dates stops the batch.
- Dates now use the user's browser time zone; cutoff day remains inclusive among protected chats.
- Improved CSV safety by escaping spreadsheet formulas in chat titles.
- Kept scan preview, CSV, archived/Project options, backup checkbox, test deletion, stop button and batch delay.
- UI tested in local Chromium with simulated ChatGPT responses; compatibility with ChatGPT's live internal APIs **not independently verified**.

## v1.1.0 — 2026-10-23

- User-selected retention date, no fixed year.
- Keep chats created **or updated** on/after cutoff date.
- New scan and CSV required when changing date or filters.

## Disclaimer

Undocumented ChatGPT endpoints may change. Test carefully with a full backup before using this extension on a live account.
