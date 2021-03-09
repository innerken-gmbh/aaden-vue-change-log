#!/bin/bash
PROJECT_NAME=$(basename -s .git $(git config --get remote.origin.url))
LOG=$(git log -1 --pretty=format:"%h::$PROJECT_NAME::%s")
echo $LOG
echo $LOG >>CHANGELOG.md
node scripts/save-change-log.js $LOG
git config user.name Haodong Ju
git config user.email juhaodong@gmail.com
git add .
git commit -m "[GITHUB CI] Update changelog"
git push
