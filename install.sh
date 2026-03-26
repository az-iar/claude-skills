#!/bin/bash
set -e

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
TARGET_DIR="$HOME/.claude/commands"

mkdir -p "$TARGET_DIR"

count=0
for file in "$REPO_DIR"/*.md; do
    [ -f "$file" ] || continue
    name="$(basename "$file")"

    if [ -L "$TARGET_DIR/$name" ]; then
        rm "$TARGET_DIR/$name"
    elif [ -f "$TARGET_DIR/$name" ]; then
        echo "  Backing up existing $name → $name.bak"
        mv "$TARGET_DIR/$name" "$TARGET_DIR/$name.bak"
    fi

    ln -s "$file" "$TARGET_DIR/$name"
    echo "  Linked $name"
    count=$((count + 1))
done

echo ""
echo "Installed $count skills to $TARGET_DIR"
