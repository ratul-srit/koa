#!/usr/bin/env bash
file="./.babelrc"
if [ -f "$file" ]
then
      echo "$file exists."
else
       touch "$file"
       echo "{
    \"presets\": [
    [\"env\", {
        \"targets\": {
        \"node\": true
        }
    }]
    ]
}" >> $file
fi

# file="./eslintrs.js"