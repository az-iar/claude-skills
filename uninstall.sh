#!/bin/bash
set -e

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
TARGET_DIR="$HOME/.claude/commands"

count=0
for file in "$REPO_DIR"/*.md; do
    [ -f "$file" ] || continue
    name="$(basename "$file")"
    link="$TARGET_DIR/$name"

    if [ -L "$link" ] && [ "$(readlink "$link")" = "$file" ]; then
        rm "$link"
        echo "  Removed $name"
        count=$((count + 1))

        # Restore backup if exists
        if [ -f "$link.bak" ]; then
            mv "$link.bak" "$link"
            echo "  Restored $name from backup"
        fi
    fi
done

echo ""
echo "Uninstalled $count skills from $TARGET_DIR"
