# 🤝 Contributing — Campus Mental Health Support System

> Read this in full before making your first commit.
> These rules exist to protect the codebase from the most common group-project failures,
> especially when AI coding agents are involved.
> Violations block your PR from merging.

---

## The Golden Rules (Print These Out)

```
1. ✅ ONE prompt = ONE atomic task. Never ask AI to build a whole feature.
2. ✅ TEST on a real device or emulator BEFORE you commit. No exceptions.
3. ✅ Update PROJECT_STATUS.md in the SAME PR as your feature work.
4. ✅ NEVER commit directly to main. All work goes through a pull request.
5. ✅ Stay inside the 11-page MVP scope. Read MVP_SCOPE.md before you start.
6. ✅ Resolve merge conflicts MANUALLY. Never let an AI auto-resolve conflicts.
7. ✅ Run `flutter analyze` and fix ALL warnings before pushing.
8. ✅ Never move to the next task until the current one is confirmed working.
```

---

## 1. Before You Write a Single Line of Code

### Step 1 — Check PROJECT_STATUS.md
Open `PROJECT_STATUS.md` and confirm:
- The task you're about to work on is **not already in progress by someone else**
- The task is **the next uncompleted item** in the current phase
- No blocking dependencies are unresolved

If another team member already has a task in progress that you depend on, coordinate
with them first — do not start working around it.

### Step 2 — Check OWNERS.md
Open `OWNERS.md` and confirm:
- The file(s) you are about to modify are **assigned to you**
- If you need to touch a file owned by another person, message them first and log
  the coordination in the PR description

### Step 3 — Sync with main
```bash
git checkout main
git pull origin main
```
Never start from a stale `main`. This causes unnecessary merge conflicts.

### Step 4 — Read the relevant sections
Before touching UI: re-read `DESIGN_SYSTEM.md` for the component you're building.
Before writing Firestore logic: re-read the schema in `MVP_SCOPE.md`.
Before using AI: re-read `AI_USAGE_RULES.md`.

---

## 2. Branching Strategy

### Branch Naming Convention

```
feature/phase[N]-[short-description]
```

Examples:
```
feature/phase1-login-page
feature/phase2-book-appointment-date-picker
feature/phase3-appointment-approval-ui
feature/phase4-sos-triple-tap-countdown
feature/phase5-shimmer-loading-states
fix/phase2-appointment-status-badge-color
```

**Rules:**
- All lowercase, hyphens only (no underscores, no slashes within the description)
- Always include the phase number
- Be specific — `phase2-dashboard` is bad, `phase2-article-slider-streambuilder` is good
- Fix branches use `fix/` prefix, not `feature/`
- Never use `my-work`, `test`, `temp`, `final`, `final-final` as branch names

### Branch Lifecycle

```bash
# 1. Create your branch from a fresh main
git checkout main
git pull origin main
git checkout -b feature/phase2-book-appointment-date-picker

# 2. Do your work (one atomic task)
# 3. Test on device/emulator
# 4. Commit (see commit rules below)
# 5. Push
git push origin feature/phase2-book-appointment-date-picker

# 6. Open a Pull Request on GitHub
# 7. After PR is merged, delete the branch
git branch -d feature/phase2-book-appointment-date-picker
```

---

## 3. Commit Rules

### One Commit Per Atomic Task (Preferred)

Each commit should represent one complete, tested, working change.
Commits like "wip", "stuff", "fix", "asdfgh" are not acceptable.

### Commit Message Format

```
type: short description of what was done

Optional longer description if the change is complex.
Reference any related issue: Closes #23
```

**Type prefixes:**
| Prefix | When to Use |
|---|---|
| `feat:` | New feature or functionality added |
| `fix:` | Bug fix |
| `style:` | UI/design change (not logic) |
| `refactor:` | Code restructured without behavior change |
| `docs:` | Changes to .md files only |
| `test:` | Adding or modifying tests |
| `chore:` | pubspec, config, build files |

**Good examples:**
```
feat: add date picker to Book Appointment page with future-only validation
fix: correct coral color on High critical level badge
style: apply 16dp margin to Student Dashboard screen edges
docs: update PROJECT_STATUS.md — Book Appointment date picker complete
```

**Bad examples:**
```
update
fix stuff
done
wip2
AI added the form
```

### What to Include in One Commit
- The functional code change
- The `PROJECT_STATUS.md` update (check off the completed task)
- Any widget test for the new feature

---

## 4. Pull Request Process

### PR Size Rule
**Maximum 200 lines changed per PR.**
If AI generated more than 200 lines for a single task, you likely prompted too broadly.
Split into multiple PRs or trim unnecessary generated code.

### PR Title Format
```
[Phase N] Short description of what this PR delivers
```

Examples:
```
[Phase 2] Add date picker to Book Appointment page
[Phase 3] Appointment Approval UI with approve/reject logic
[Phase 4] Triple-tap SOS countdown dialog on Login page
```

### PR Description Template

When opening a PR, use this template (copy-paste into GitHub PR description):

```markdown
## What this PR does
<!-- One sentence: what feature or fix does this deliver? -->

## Phase & Task
- Phase: [1 / 2 / 3 / 4 / 5]
- Task reference: [e.g., Section 2.2 — Book Appointment Form]
- Closes issue: #[issue number if applicable]

## AI was used for
<!-- Be honest. List what the AI generated vs what you wrote manually. -->
- [ ] Boilerplate / skeleton code
- [ ] StreamBuilder structure
- [ ] Firestore query
- [ ] UI layout
- [ ] Business logic (describe which)

## Testing done
- [ ] Tested on Android emulator (API level: ___)
- [ ] Tested on iOS simulator (iOS version: ___)
- [ ] Tested on physical device (describe: ___)
- [ ] `flutter analyze` passes with zero warnings
- [ ] Widget test written and passing

## Design checklist
- [ ] Background is #F8F9FA
- [ ] No hardcoded colors
- [ ] No hardcoded TextStyle
- [ ] Spacing is 8dp-grid-compliant
- [ ] All tap targets ≥ 48dp

## PROJECT_STATUS.md updated
- [ ] Yes — task is marked complete in the correct phase

## Screenshots
<!-- Required for any UI change. Attach at least one screenshot. -->
```

### PR Review Requirements

- **Minimum 1 reviewer** must approve before merging
- The reviewer must:
  - Pull the branch locally and run the app
  - Verify the UI matches `DESIGN_SYSTEM.md`
  - Confirm `PROJECT_STATUS.md` was updated
  - Run `flutter analyze`
- Reviewer must **not** approve a PR with:
  - Hardcoded colors
  - Missing loading/error states
  - No `PROJECT_STATUS.md` update
  - AI-generated code that was not tested

### Merging
- Use **Squash and Merge** on GitHub (keeps `main` history clean)
- Delete the branch after merging
- The PR author confirms the feature still works after merge (takes 2 minutes)

---

## 5. What Counts as an "Atomic Task"

An atomic task is a single, testable, independently deployable change.

### ✅ Good (atomic) — one prompt, one PR
- "Add the date picker field to Book Appointment page"
- "Write the Firestore query for pending appointments sorted by critical level"
- "Style the appointment status badge with correct colors"
- "Add validation to the registration form email field"
- "Create the `SkeletonItem` widget for list loading states"

### ❌ Bad (too large) — must be split
- "Build the entire Book Appointment page"
- "Complete all of Phase 2"
- "Make the Student Dashboard functional"
- "Add SOS and push notifications"

**Rule of thumb:** If your task description contains the word "and", it should be split
into two tasks.

---

## 6. Code Style Standards

### Dart/Flutter
- Follow official [Dart style guide](https://dart.dev/guides/language/effective-dart/style)
- Use `const` wherever possible (AI often forgets this — add it manually)
- No `print()` statements — use proper error handling and Snackbars
- No unused imports (AI frequently leaves these — run `flutter analyze`)
- No commented-out code in PRs (delete it; git history preserves old versions)

### File Naming
```
snake_case for all files:
  login_page.dart ✅
  LoginPage.dart  ❌
  loginPage.dart  ❌
```

### Widget Naming
```
PascalCase for all widgets and classes:
  class LoginPage extends StatelessWidget ✅
  class login_page extends StatelessWidget ❌
```

### Import Order (at top of every .dart file)
```dart
// 1. Dart SDK imports
import 'dart:async';

// 2. Flutter imports
import 'package:flutter/material.dart';

// 3. Firebase / third-party packages
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

// 4. Internal app imports
import '../widgets/card_widget.dart';
import '../services/auth_service.dart';
```

### Firestore Service Pattern
All Firestore reads and writes must go through a service class,
NOT directly in a widget's `build()` method or `setState()`.

```dart
// ✅ Correct — service class in /lib/services/
class AppointmentService {
  Future<void> createAppointment(AppointmentModel appt) async { ... }
  Stream<List<AppointmentModel>> getStudentAppointments(String uid) { ... }
}

// ❌ Incorrect — Firestore access inside a widget
class MyAppointmentsPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    FirebaseFirestore.instance.collection('appointments')... // NO
  }
}
```

---

## 7. Forbidden Practices

These are hard blockers. A PR containing any of these will be rejected:

| Practice | Why It's Forbidden |
|---|---|
| `Color(0xFF...)` hardcoded in a widget | Breaks 60-30-10 consistency |
| `TextStyle(fontSize: ...)` hardcoded | Bypasses design system |
| Direct Firestore calls inside `build()` | Causes re-render loops and bad architecture |
| `print()` for debugging | Use proper error handling |
| Committing `google-services.json` or `GoogleService-Info.plist` | Security risk |
| Merging without updating `PROJECT_STATUS.md` | Breaks team visibility |
| Letting AI resolve a merge conflict | AI cannot understand both sides of intent |
| Adding a feature not in `MVP_SCOPE.md` | Scope creep |
| Completing more than one Phase task in a single PR | Violates one-prompt-one-task rule |

---

## 8. Escalation

If you are stuck for more than 30 minutes:
1. Post in the team chat with the specific error/blocker
2. Attach relevant code (not the whole file)
3. Tag the file owner from `OWNERS.md`

Do not keep pushing to your branch hoping it will eventually work.
A blocked task that is declared early is much better than a broken feature merged late.

---

*These rules apply equally to all team members, regardless of experience level.*
*They are not bureaucracy — they are the reason the project will succeed.*
