# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this studio is for

This is an email studio for a small business. We use it to plan email campaigns and write the emails for them. The sample business is LumiTote, a tote bag shop launching denim tote bags.

@brand/voice.md

## Folders

- `brand/`: the brand's voice and style: how we sound, words we use and avoid, and claims we must never make.
- `leads/`: practice lists of made-up people we email, grouped by interest.
- `campaigns/`: one folder per campaign, with its plan and its emails.
- `notes/`: research, decisions and drafts that aren't part of a campaign yet.

## Studio rules

- Write in plain English: short sentences, everyday words, no jargon.
- Never send email to real people.
- Ask me before deleting anything: files, folders, emails or rows in a lead list.

## The course

This studio is built for the **Email Studio Lab** course. The full assignment, with every step's build and check prompts word for word, is in `ASSIGNMENT.md`. The studio is built step by step by pasting the prompts from `ASSIGNMENT.md`. It lives in this folder, not in a separate `my-email-studio` folder.

### How the course runs each step

1. **Build:** the user pastes the step's build prompt. Do exactly what it asks, and commit when it says to.
2. **Fresh session:** the user runs `/exit` and then `claude` again.
3. **Check:** the user pastes the check prompt in the new session. Check prompts say "Don't change any files". Test and measure (count characters, run commands); don't just read and eyeball.

Many steps need a new session before the next prompt, for example after adding a plugin, rule or skill, or after editing `.mcp.json`. That's because those files load when a session starts.

### How the finished studio fits together

- `CLAUDE.md` imports `@brand/voice.md`, so the brand voice loads in every session.
- `leads/CLAUDE.md` holds rules for the leads folder only: made-up people, every address at `@example.com`, a consent value on every row.
- `.claude/rules/emails.md` applies through `paths: campaigns/**/emails/*.md`. It sets the email format: a `Subject:` line of 50 characters or fewer, a `Preview:` line of 90 or fewer, a `{{first_name}}` greeting, exactly one link, then the sign-off and a plain-text footer. It also applies to the per-group copies in `campaigns/<c>/groups/<group>/emails/`, because they sit in an `emails/` folder too.
- The `/personalize` skill (`.claude/skills/personalize/`, `context: fork`) writes one copy of each email per lead group into `groups/<group>/emails/`.
- `.mcp.json` connects the `resend` MCP server. Its env defaults point to a practice server (`RESEND_BASE_URL` defaults to `http://localhost:4000`, `RESEND_API_KEY` to `re_practice`), so nothing is sent for real unless the user sets those variables.
- `.claude/hooks/send-guard.mjs` is a PreToolUse hook on `mcp__resend__.*`. It allows recipients only at `@resend.dev` or the user's `MY_EMAIL` (set in the uncommitted `.claude/settings.local.json`). It always blocks broadcast and automation tools, exiting with code 2.
- `scripts/review.mjs` runs `claude -p ... --output-format json --json-schema "<schema text>"` against `review/findings.schema.json`. It writes `review/findings.json` and exits with code 1 if any finding is high severity.

## Commands

- Practice email server (keep it running in a second terminal for Steps 9–11 and 14): `npx emulate@0.12.3 start --service resend`
- Automatic review (from Step 13): `node scripts/review.mjs <campaign folder>`
- This machine runs Windows: PowerShell and Git Bash, with Node.js 22.18.0 and Git 2.49.0.

## Hard rules

- Never email real people. Sends may go only to `@resend.dev` addresses or to the user's `MY_EMAIL`.
- If the send guard blocks a call, report the block. Don't work around it.
- Never write a real Resend API key into any file or commit.
