---
name: personalize
description: Write a version of each campaign email for every lead group in leads/leads.csv. Use when a campaign's emails are final and you want one copy per group.
argument-hint: "[campaign folder]"
context: fork
allowed-tools: Read, Glob, Grep, Write
---

# Personalize campaign emails for each lead group

The campaign folder is: $ARGUMENTS

## 1. Check the campaign folder

- If no campaign folder was given, stop. Use Glob on `campaigns/*/` to list the campaign folders that exist. Reply with that list and ask which one to use. Don't write any files.
- If the folder doesn't exist, or it has no `emails/*.md` files, stop and say so. List the campaign folders that do exist.

## 2. Read what you need

- Read every email in `<campaign folder>/emails/*.md`. Don't read or copy files that are already in `groups/`.
- Read `leads/leads.csv` and find the groups in the `group` column. Right now they are `new-to-lumitote`, `gift-buyers` and `everyday-carriers`. If the file lists other groups, use those.
- Read `brand/voice.md` and `.claude/rules/emails.md`. Every version must follow both.

## 3. Write one version of each email per group

Keep these exactly the same as the original email:

- The `Subject:` and `Preview:` lines
- The `{{first_name}}` greeting
- The overall structure and order of the email
- The one link, with the same button text and URL
- The sign-off and the plain-text footer, word for word

Change only these two things:

1. **The opening line**, the first sentence after the greeting. Make it fit the group.
2. **One example.** Find the line that gives an example of where or how you carry the bag, and change it to fit the group. Change only that one line.

What each group cares about:

- **new-to-lumitote:** they are new to LumiTote. Introduce the brand and the denim tote as a bold statement bag.
- **gift-buyers:** they may give the bag as a gift. Talk about giving a bag that makes a statement. Don't guess who the gift is for. Say "them" or "they", never "her" or "she".
- **everyday-carriers:** they want a bag for daily life. Talk about carrying it every day, to class, work or wherever the day goes.

Brand rules to follow in every version:

- Stay confident, bold and stylish. Use short, sure sentences.
- Never mention discounts, sales, deals, money off, promo codes or anything free.
- Don't add product facts the original doesn't state, such as sizes, what fits inside, strength, waterproofing or eco claims.
- Don't assume the reader is a woman or opened an earlier email.
- Keep the body plain text. The button link is the only Markdown.

## 4. Save the files

- Save each version to `<campaign folder>/groups/<group>/emails/<same file name>`.
- For example: `campaigns/new-product-launch/groups/gift-buyers/emails/01-the-launch.md`.
- If a file already exists there, overwrite it with the new version.

## 5. Reply with a short summary only

Don't paste the emails. Reply with:

- How many files you wrote, for example "Wrote 12 files (4 emails × 3 groups)."
- One example opening line for each group.
