# 🌿 Git Workflow — Campus Mental Health Support System

> This document contains the exact git commands every team member must follow
> for every single task, from start to finish. Follow this precisely.
> Deviating from this workflow is the #1 cause of broken `main` branches.

---

## Why This Workflow Exists

You are a group working simultaneously on the same codebase, with AI agents
generating code. Without strict git discipline:
- Two people modify the same file → destructive merge conflict
- AI generates untested code that gets pushed to `main` → everyone is blocked
- Someone pushes a half-done feature → the app doesn't compile for the whole team

This workflow eliminates all of those.

---

## The Main Branch

`main` represents **working, tested, production-ready code at all times.**

Unbreakable rules for `main`:
- ❌ No direct commits to `main`
- ❌ No force pushes to `main` (`git push --force`)
- ❌ No untested code in `main`
- ✅ Every commit on `main` came through a reviewed and approved Pull Request
- ✅ The app always compiles and runs from `main`

---

## Full Task Workflow (Step-by-Step)

### STEP 0 — Before You Start Anything

```bash
# Check PROJECT_STATUS.md first (open the file, not git)
# Confirm your task is not taken by someone else
# Confirm you are not skipping ahead in the phases
```

---

### STEP 1 — Sync Your Local Main

```bash
git checkout main
git pull origin main
```

**Why:** Other PRs may have merged since you last pulled. Always start fresh.
If this step gives you merge conflicts, something went wrong earlier — stop and
ask the team before proceeding.

---

### STEP 2 — Create Your Feature Branch

```bash
git checkout -b feature/phase[N]-[short-description]
```

**Examples:**
```bash
git checkout -b feature/phase2-date-picker-appointment
git checkout -b feature/phase3-approval-page-ui
git checkout -b feature/phase4-triple-tap-sos-countdown
git checkout -b fix/phase2-status-badge-wrong-color
```

**Verify you're on the right branch:**
```bash
git branch
# The active branch has a * next to it
```

---

### STEP 3 — Do Your Work (One Atomic Task)

Work only on the task described by your branch name.
Use AI (Claude/Gemini in Antigravity) for the implementation.
See `AI_USAGE_RULES.md` for how to prompt correctly.

**While working:**
```bash
# Check which files you've changed at any point
git status

# See what exactly changed in a file
git diff lib/pages/student/book_appointment_page.dart
```

---

### STEP 4 — Test Before Anything Else

```bash
# Run the app and test your specific change manually
flutter run

# Specifically test:
# 1. The happy path (normal use)
# 2. An edge case (empty input, no network, permission denied)
# 3. That existing features you didn't touch still work
```

**If the feature doesn't work → fix it now, before committing.**
**Never commit code that you haven't personally verified works.**

---

### STEP 5 — Static Analysis

```bash
flutter analyze
```

This must return **zero warnings and zero errors.**

Common AI-generated issues to fix manually:
```
# "Unused import" — delete the import line
# "Prefer const constructors" — add const keyword
# "Avoid print calls" — replace print() with proper error handling
# "Missing required argument" — fix the constructor call
```

If `flutter analyze` has warnings you don't understand, ask the team before pushing.
Do not suppress warnings with `// ignore:` unless the whole team agrees.

---

### STEP 6 — Update PROJECT_STATUS.md

Open `PROJECT_STATUS.md` and check off your completed task.
Update the phase status if the whole phase is now done.
Add a line to the Change Log at the bottom.

```bash
# After editing PROJECT_STATUS.md, check it looks right
git diff PROJECT_STATUS.md
```

---

### STEP 7 — Stage Your Changes

```bash
# Stage specific files (preferred — never blindly stage everything)
git add lib/pages/student/book_appointment_page.dart
git add PROJECT_STATUS.md

# If you have multiple files in the same logical change:
git add lib/pages/student/
git add lib/widgets/date_picker_field.dart
git add PROJECT_STATUS.md

# Verify what's staged before committing
git status
```

**Never use `git add .` without first running `git status` to see what it will include.**
AI tools sometimes create temp files or modify files you didn't intend to change.

---

### STEP 8 — Commit

```bash
git commit -m "feat: add date picker to Book Appointment with future-date validation"
```

Follow the commit message format in `CONTRIBUTING.md`.
One commit per atomic task (preferred).
If your task required multiple logical steps, you may have 2–3 commits — that's fine.

**Verify your commit:**
```bash
git log --oneline -5
# Should show your new commit at the top
```

---

### STEP 9 — Push to Remote

```bash
git push origin feature/phase2-date-picker-appointment
```

If this is your first push for this branch:
```bash
git push -u origin feature/phase2-date-picker-appointment
# The -u sets upstream tracking, so future pushes can just be: git push
```

---

### STEP 10 — Open a Pull Request

1. Go to the GitHub repository in your browser
2. Click **"Compare & pull request"** (GitHub shows this automatically after a push)
3. Set:
   - **Title:** `[Phase 2] Add date picker to Book Appointment page`
   - **Base branch:** `main`
   - **Compare branch:** your feature branch
4. Fill in the PR description using the template from `CONTRIBUTING.md`
5. Attach at least one screenshot of the UI change
6. Request review from another team member

---

### STEP 11 — Review Process

**As the author:**
- Respond to review comments promptly
- Make requested changes on the same branch and push again
- Do not resolve a reviewer's comment yourself — let the reviewer resolve it after they're satisfied

**As the reviewer:**
```bash
# Pull the branch and test it locally
git fetch origin
git checkout feature/phase2-date-picker-appointment
flutter run

# Test the specific feature described in the PR
# Verify design against DESIGN_SYSTEM.md
# Check that PROJECT_STATUS.md was updated
```

---

### STEP 12 — Merge

After approval:
- Use **Squash and Merge** on GitHub (not regular merge, not rebase merge)
- This keeps `main` history clean (one commit per feature)
- Delete the feature branch on GitHub after merging

---

### STEP 13 — Clean Up Locally

```bash
git checkout main
git pull origin main

# Delete your local feature branch
git branch -d feature/phase2-date-picker-appointment

# Verify it's gone
git branch
```

---

### STEP 14 — Confirm on Main

```bash
# Verify the app still works after your merge
flutter run

# Quick smoke test: navigate to the feature you just merged
# Confirm it works from a fresh main checkout
```

---

## Handling Common Situations

### Situation: Someone merged to main while I was working

```bash
# Save your current work
git stash

# Or commit your work-in-progress (WIP)
git add .
git commit -m "wip: date picker in progress — saving before rebase"

# Get the latest main into your branch
git fetch origin
git rebase origin/main

# If there are conflicts — resolve them manually (see below)
# Then continue
git rebase --continue

# Restore stashed changes (if you stashed)
git stash pop
```

### Situation: Merge conflict during rebase

```bash
# Git will pause and tell you which files have conflicts
# Open the conflicted file in your editor
# You will see:

<<<<<<< HEAD
your version of the code
=======
their version of the code from main
>>>>>>> origin/main

# DELETE the conflict markers
# MANUALLY decide which code is correct (usually: keep both, merge logic)
# NEVER let AI resolve conflicts — it cannot know which intent was correct

# After fixing:
git add [the-file-you-fixed]
git rebase --continue

# Repeat for each conflicted file
```

### Situation: I committed to main by accident

```bash
# Undo the last commit but keep the changes staged
git reset --soft HEAD~1

# Now create a proper branch and commit there
git checkout -b feature/phase2-thing-i-forgot-to-branch
git commit -m "feat: ..."
git push origin feature/phase2-thing-i-forgot-to-branch
```

### Situation: I pushed broken code to my feature branch

```bash
# Fix the code
# Test it
# Then amend or add another commit

# Option A: Amend the last commit (if not yet reviewed)
git add .
git commit --amend --no-edit
git push --force-with-lease origin feature/your-branch
# (force-with-lease is safer than --force — it won't overwrite if someone else pushed)

# Option B: Add a fix commit (if PR is already under review)
git add .
git commit -m "fix: correct date validation logic"
git push origin feature/your-branch
```

### Situation: I want to see what changed between my branch and main

```bash
git diff main...feature/your-branch
# or to see just the file names
git diff main...feature/your-branch --name-only
```

### Situation: I need to temporarily put my work aside

```bash
# Stash (temporary shelf for uncommitted changes)
git stash push -m "WIP: date picker half done"

# List stashes
git stash list

# Restore your stash
git stash pop     # Restores latest
git stash apply stash@{0}  # Restore specific one
```

---

## Quick Reference Card

```
Start task:
  git checkout main && git pull origin main
  git checkout -b feature/phaseN-description

During work:
  git status      (see what changed)
  git diff        (see exact changes)
  flutter analyze (check for issues)

Before commit:
  flutter run     (test manually)
  flutter analyze (zero warnings)
  Edit PROJECT_STATUS.md

Commit:
  git add [specific files]
  git status      (verify staged files)
  git commit -m "feat: description"

Push & PR:
  git push origin feature/phaseN-description
  Open PR on GitHub with template

After merge:
  git checkout main && git pull origin main
  git branch -d feature/phaseN-description
  flutter run (verify on main)
```

---

## Git Config Recommendations

Set these on every dev machine once:

```bash
# Your identity (use your real name and student email)
git config --global user.name "Your Full Name"
git config --global user.email "youremail@university.edu"

# Safer default for push (won't accidentally push to wrong remote)
git config --global push.default current

# Show branch in terminal prompt (optional but very helpful)
# If using zsh: install oh-my-zsh with git plugin
# If using bash: add PS1 modifications
```

---

*When in doubt: do not guess with git. Ask a teammate.*
*A question costs 2 minutes. A botched rebase costs 2 hours.*
