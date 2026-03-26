#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const os = require("os");

const commandsDir = path.join(__dirname, "..", "commands");
const targetDir = path.join(os.homedir(), ".claude", "commands");
const action = process.argv[2] || "install";

if (action === "uninstall") {
  uninstall();
} else {
  install();
}

function install() {
  fs.mkdirSync(targetDir, { recursive: true });

  const files = fs
    .readdirSync(commandsDir)
    .filter((f) => f.endsWith(".md"));

  let count = 0;
  for (const file of files) {
    const src = path.join(commandsDir, file);
    const dest = path.join(targetDir, file);

    if (fs.existsSync(dest)) {
      const stat = fs.lstatSync(dest);
      if (stat.isSymbolicLink()) {
        fs.unlinkSync(dest);
      } else {
        fs.renameSync(dest, dest + ".bak");
        console.log(`  Backed up existing ${file} → ${file}.bak`);
      }
    }

    fs.symlinkSync(src, dest);
    console.log(`  Linked ${file}`);
    count++;
  }

  console.log(`\nInstalled ${count} skills to ${targetDir}`);
}

function uninstall() {
  const files = fs
    .readdirSync(commandsDir)
    .filter((f) => f.endsWith(".md"));

  let count = 0;
  for (const file of files) {
    const src = path.join(commandsDir, file);
    const dest = path.join(targetDir, file);

    if (
      fs.existsSync(dest) &&
      fs.lstatSync(dest).isSymbolicLink() &&
      fs.readlinkSync(dest) === src
    ) {
      fs.unlinkSync(dest);
      console.log(`  Removed ${file}`);
      count++;

      if (fs.existsSync(dest + ".bak")) {
        fs.renameSync(dest + ".bak", dest);
        console.log(`  Restored ${file} from backup`);
      }
    }
  }

  console.log(`\nUninstalled ${count} skills from ${targetDir}`);
}
