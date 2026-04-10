#!/usr/bin/env node

const { execSync } = require("child_process");
const readline = require("readline");

const args = process.argv.slice(2);
let message = args.join(" ").trim();

function run(cmd) {
  try {
    const output = execSync(cmd, { stdio: "inherit" });
    return output;
  } catch (err) {
    process.exit(1);
  }
}

function commit(msg) {
  if (!msg) {
    console.error("Error: commit message cannot be empty.");
    process.exit(1);
  }
  console.log("\n→ Staging all changes...");
  run("git add .");
  console.log(→ Committing: "${msg}");
  run(git commit -m ${JSON.stringify(msg)});
  console.log("→ Pushing...");
  run("git push");
  console.log("\n✓ Done.\n");
}

if (message) {
  commit(message);
} else {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Commit message: ", (answer) => {
    rl.close();
    commit(answer.trim());
  });
}
node git.js

