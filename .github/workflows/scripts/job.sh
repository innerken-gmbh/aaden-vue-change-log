LOG=$(git log --pretty=format:"%h - %s")
$LOG >>CHANGELOG.md
node .github/workflows/scripts/save-change-log.js $LOG
git config user.name Haodong Ju
git config user.email juhaodong@gmail.com
git add .
git commit -m "[GITHUB CI] Update changelog"
git push
