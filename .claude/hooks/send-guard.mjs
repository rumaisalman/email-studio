// Send guard: a PreToolUse hook for the resend MCP tools.
// It reads the tool call as JSON from standard input.
// Exit 0 allows the call. Exit 2 blocks it, and the reason on stderr goes back to Claude.

const SEND_TOOLS = ["send-email", "send-batch-emails"];
const ALWAYS_BLOCK = [
  "send-broadcast",
  "create-automation",
  "send-inbox-draft",
  "send-new-inbox-email",
];

function block(reason) {
  process.stderr.write(`Send guard blocked this call: ${reason}\n`);
  process.exit(2);
}

// Pull every address out of a to, cc or bcc value.
// Handles "a@x.com", "a@x.com, b@y.com", "Name <a@x.com>" and arrays of these.
function addressesFrom(value) {
  if (value == null) return [];
  if (Array.isArray(value)) return value.flatMap(addressesFrom);
  if (typeof value === "object") {
    return addressesFrom(value.email ?? value.address ?? "");
  }
  return String(value)
    .split(/[,;]/)
    .map((part) => {
      const angle = part.match(/<([^>]+)>/);
      return (angle ? angle[1] : part).trim().toLowerCase();
    })
    .filter(Boolean);
}

// Find to, cc and bcc anywhere in the input, so batch emails are covered too.
function collectRecipients(node, found = []) {
  if (Array.isArray(node)) {
    node.forEach((item) => collectRecipients(item, found));
  } else if (node && typeof node === "object") {
    for (const [key, value] of Object.entries(node)) {
      if (["to", "cc", "bcc"].includes(key.toLowerCase())) {
        found.push(...addressesFrom(value));
      } else {
        collectRecipients(value, found);
      }
    }
  }
  return found;
}

let raw = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => (raw += chunk));
process.stdin.on("end", () => {
  let call;
  try {
    call = JSON.parse(raw);
  } catch {
    block("could not read the tool call, so it is not safe to allow it.");
  }

  const toolName = String(call.tool_name ?? "");
  // "mcp__resend__send-email" -> "send-email". Treat _ and - the same.
  const action = toolName.split("__").pop().replace(/_/g, "-").toLowerCase();
  const input = call.tool_input ?? {};

  if (ALWAYS_BLOCK.includes(action)) {
    block(`${action} can reach whole lists of people, so it is never allowed here.`);
  }

  if (SEND_TOOLS.includes(action)) {
    const myEmail = (process.env.MY_EMAIL ?? "").trim().toLowerCase();
    const recipients = collectRecipients(input);

    if (recipients.length === 0) {
      block(`${action} has no recipients I can check, so it is not allowed.`);
    }

    const notAllowed = recipients.filter(
      (address) =>
        !address.endsWith("@resend.dev") && !(myEmail && address === myEmail)
    );

    if (notAllowed.length > 0) {
      block(
        `${notAllowed.join(", ")} is not allowed. ` +
          "Send only to @resend.dev test addresses or to MY_EMAIL."
      );
    }
  }

  process.exit(0);
});
