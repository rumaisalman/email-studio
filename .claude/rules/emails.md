---
paths:
  - "campaigns/**/emails/*.md"
---

# Email file rules

Every email file must follow these rules, in this order.

## 1. Subject and preview

- The first line is `Subject: ...`. It is 50 characters or fewer, counting the whole line, "Subject: " included.
- The second line is `Preview: ...`. It is 90 characters or fewer, counting the whole line, "Preview: " included.

## 2. Greeting

- Greet the reader by name with `{{first_name}}`. For example: "Hi {{first_name}},"

## 3. Plain text body

- Write the body as plain text. No bold, italics, headings or lists. The button link is the only Markdown.

## 4. One main link

- Each email has exactly one link. No other links anywhere in the email.
- Write it as a button link to the denim totes page, like this: `[Button text](https://lumitote.example/denim)`
- Change "Button text" to a confident invite, such as "See the denim totes".

## 5. Sign-off and footer

- End the email with our sign-off from `brand/voice.md`, on two lines:

  Carry it bold,
  The LumiTote team

- After the sign-off, add this two-line footer, word for word:

  You're getting this because you joined the LumiTote waitlist.
  LumiTote, {{company_address}} · Unsubscribe: {{unsubscribe_url}}

- Write the footer as plain text. Don't put it inside a code block or backticks.
- Nothing comes after the footer.
