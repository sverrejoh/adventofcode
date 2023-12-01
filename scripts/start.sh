#!/bin/bash

year=$(date +%Y)
month=$(date +%m)
day=$(date +%d)

# Define the file name
root=$(git rev-parse --show-toplevel)
path="$root/$year"
filename="$path/day-$day.ts"

if [ "$month" -eq 12 ] && [ "$day" -ge 1 ] && [ "$day" -le 24 ]; then
    if [ ! -f "$filename" ]; then
			  mkdir -p "$path"
        cp "$root/template.ts" "$filename"
    else
        echo "File $filename already exists."
    fi
		open -a Emacs.app "$filename"
else
    echo "It's not between December 1 and 24."
fi
