# 👤 Ownership Map — Campus Mental Health Support System

> This document prevents merge conflicts by making file ownership explicit.
> Before modifying any file, verify you are its owner.
> If you need to touch a file owned by someone else, coordinate with them FIRST.

---

## How Ownership Works

- Each file or directory has **one primary owner**
- The primary owner is responsible for **all changes** to that file
- If a change crosses ownership boundaries, the two owners must coordinate:
  - Agree on the change in team chat
  - One of them makes the change
  - The other reviews the PR
- The **services layer** is shared — coordinate before modifying service files

---

## 📋 Assignment Table

> Fill in real names before project kickoff. Use GitHub usernames for consistency.

| Owner | Responsibility |
|---|---|
| **[Team Lead]** | `main` branch protection, PR merges, Firebase console, Cloud Functions |
| **[Student Dev]** | Pages 1–6 (Auth + Student-facing pages), student-related widgets |
| **[Psychiatrist Dev]** | Pages 7–11 (Psychiatrist-facing pages), psychiatrist-related widgets |
| **[Firebase Dev]** | All service classes, Firestore rules, FCM, Cloud Functions |
| **[UI Dev]** | Shared widgets, `app_theme.dart`, `app_constants.dart`, design system |

---

## 📁 File Ownership By Directory

### `/lib/pages/auth/`
| File | Owner | Notes |
|---|---|---|
| `login_page.dart` | [Student Dev] | Includes triple-tap SOS logic (Phase 4 adds to this file) |
| `registration_page.dart` | [Student Dev] | — |

### `/lib/pages/student/`
| File | Owner | Notes |
|---|---|---|
| `student_dashboard_page.dart` | [Student Dev] | SOS button on dashboard is also here |
| `book_appointment_page.dart` | [Student Dev] | — |
| `my_appointments_page.dart` | [Student Dev] | — |
| `student_profile_page.dart` | [Student Dev] | — |

### `/lib/pages/psychiatrist/`
| File | Owner | Notes |
|---|---|---|
| `psychiatrist_dashboard_page.dart` | [Psychiatrist Dev] | — |
| `appointment_approval_page.dart` | [Psychiatrist Dev] | — |
| `student_history_page.dart` | [Psychiatrist Dev] | Includes prescription writer tab |
| `view_student_location_page.dart` | [Psychiatrist Dev] | Phase 4 — coordinate with Firebase Dev |
| `emergency_alerts_list_page.dart` | [Psychiatrist Dev] | Phase 4 |

### `/lib/services/`
| File | Owner | Notes |
|---|---|---|
| `auth_service.dart` | [Firebase Dev] | Login, registration, logout, role routing |
| `appointment_service.dart` | [Firebase Dev] | CRUD for appointments collection |
| `prescription_service.dart` | [Firebase Dev] | CRUD for prescriptions collection |
| `emergency_service.dart` | [Firebase Dev] | Write + read emergency_alerts |
| `notification_service.dart` | [Firebase Dev] | FCM token management, receive notifications |
| `health_advice_service.dart` | [Firebase Dev] | Read health_advice collection |
| `local_storage_service.dart` | [Firebase Dev] | shared_preferences wrapper |
| `location_service.dart` | [Firebase Dev] | geolocator + permission_handler wrapper |

### `/lib/models/`
| File | Owner | Notes |
|---|---|---|
| `user_model.dart` | [Firebase Dev] | — |
| `student_model.dart` | [Firebase Dev] | — |
| `psychiatrist_model.dart` | [Firebase Dev] | — |
| `appointment_model.dart` | [Firebase Dev] | — |
| `prescription_model.dart` | [Firebase Dev] | — |
| `emergency_alert_model.dart` | [Firebase Dev] | — |
| `health_advice_model.dart` | [Firebase Dev] | — |

### `/lib/widgets/` (Shared — coordinate before modifying)
| File | Owner | Notes |
|---|---|---|
| `card_widget.dart` | [UI Dev] | Global card component |
| `primary_button.dart` | [UI Dev] | Global primary button |
| `accent_button.dart` | [UI Dev] | SOS button component |
| `error_snackbar.dart` | [UI Dev] | Global error display |
| `loading_overlay.dart` | [UI Dev] | Global loading screen cover |
| `skeleton_item.dart` | [UI Dev] | Shimmer loading placeholder |
| `status_badge.dart` | [UI Dev] | Appointment status badge |
| `critical_level_badge.dart` | [UI Dev] | Critical level indicator |

### `/lib/providers/`
| File | Owner | Notes |
|---|---|---|
| `user_provider.dart` | [Firebase Dev] | Auth state + role |

### Core Files (Team Lead Only)
| File | Owner | Notes |
|---|---|---|
| `lib/main.dart` | [Team Lead] | App entry point, Firebase init, routing |
| `lib/app_theme.dart` | [UI Dev] | Needs Team Lead approval for any change |
| `lib/app_constants.dart` | [UI Dev] | Needs Team Lead approval for any change |
| `pubspec.yaml` | [Team Lead] | Any package additions need Team Lead approval |
| `firestore.rules` | [Firebase Dev] | Must be reviewed by Team Lead before deploy |
| `functions/index.js` | [Firebase Dev] | Cloud Function — must be tested before deploy |

### Documentation Files (All — each updates their relevant sections)
| File | Primary Editor | Notes |
|---|---|---|
| `README.md` | [Team Lead] | — |
| `PROJECT_STATUS.md` | **Everyone** | Each person updates their own tasks |
| `MVP_SCOPE.md` | [Team Lead] | Changes require full team vote |
| `DESIGN_SYSTEM.md` | [UI Dev] | Changes require Team Lead approval |
| `CONTRIBUTING.md` | [Team Lead] | — |
| `GIT_WORKFLOW.md` | [Team Lead] | — |
| `AI_USAGE_RULES.md` | [Team Lead] | — |
| `OWNERS.md` | [Team Lead] | Update when ownership changes |
| `TESTING_CHECKLIST.md` | [Team Lead] | — |

---

## 🤝 Cross-Ownership Coordination Protocol

When your task requires touching a file owned by someone else:

### Step 1 — Notify
Post in team chat:
```
"I need to modify [file] (owned by @[owner]) to [reason].
My change will be: [describe specifically what you need to add/change].
Does this work for you?"
```

### Step 2 — Wait for Confirmation
Do not touch the file until the owner responds.
If no response within 2 hours during active development — escalate to Team Lead.

### Step 3 — Make the Change Together
Options:
- The **file owner** makes the change (you describe what's needed)
- You make the change and the **file owner reviews your PR** specifically for that file
- You both sit (virtually) and make the change together

### Step 4 — Note in PR Description
In your PR description, include:
```
Cross-ownership change: modified [file] (owned by @[owner]).
Coordinated with @[owner] on [date]. @[owner] is aware and will review.
```

---

## 🔄 Ownership Change Process

If workload needs to be rebalanced, an owner can be changed:
1. Notify the team in chat
2. Team Lead updates this file in a `docs:` commit
3. The new owner pulls `main` and verifies they can run the affected code

---

## Known Coordination Points

These tasks **cross ownership boundaries** and require advance coordination:

| Phase | Task | Files Involved | Owners to Coordinate |
|---|---|---|---|
| Phase 1 | Role-based routing | `main.dart`, `user_provider.dart` | Team Lead + Firebase Dev |
| Phase 2 | SOS button triggers service | `student_dashboard_page.dart`, `emergency_service.dart` | Student Dev + Firebase Dev |
| Phase 4 | Triple-tap on login calls location | `login_page.dart`, `location_service.dart`, `emergency_service.dart` | Student Dev + Firebase Dev |
| Phase 4 | Notification tap opens Page 10 | `notification_service.dart`, `view_student_location_page.dart` | Firebase Dev + Psychiatrist Dev |
| Phase 5 | Final UI polish | All page files | UI Dev reviews all screens |

---

*Last updated: project kickoff*
*Maintained by: [Team Lead]*
