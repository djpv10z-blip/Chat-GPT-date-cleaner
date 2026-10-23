# Changelog

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
