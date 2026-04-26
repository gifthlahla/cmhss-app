# 📊 Project Status — Campus Mental Health Support System

> **This is a living document.**
> Every team member MUST update this file in the same PR that completes a task.
> A PR without a `PROJECT_STATUS.md` update will be rejected during review.

---

## ⚡ Quick Summary

| Phase | Title | Status | Progress |
|---|---|---|---|
| Phase 1 | Setup & Auth | 🔲 Not Started | 0% |
| Phase 2 | Student Features | 🔲 Not Started | 0% |
| Phase 3 | Psychiatrist Features | 🔲 Not Started | 0% |
| Phase 4 | Emergency & Notifications | 🔲 Not Started | 0% |
| Phase 5 | Polish, Testing & Deployment | 🔲 Not Started | 0% |

**Legend:**
- 🔲 Not Started
- 🔄 In Progress
- ✅ Complete
- ❌ Blocked

---

## Phase 1 — Project Setup & Core Infrastructure (Week 1)

### 1.1 Flutter Project Initialization
- [ ] Create Flutter project with correct folder structure (`pages`, `widgets`, `services`, `models`, `utils`)
- [ ] Add all packages to `pubspec.yaml` and run `flutter pub get`
- [ ] Configure `flutter_native_splash` (white background + app logo)
- [ ] Verify `flutter doctor` is clean on all dev machines

### 1.2 Firebase Integration
- [ ] Create Firebase project (Blaze plan)
- [ ] Enable Email/Password Authentication
- [ ] Enable Firestore in production mode
- [ ] Enable Firebase Cloud Messaging (FCM)
- [ ] Download and place `google-services.json` (Android)
- [ ] Download and place `GoogleService-Info.plist` (iOS)
- [ ] Initialize Firebase in `main.dart`

### 1.3 Design System Setup
- [ ] Create `app_theme.dart` with full color palette, text themes, button themes, input themes
- [ ] Create `app_constants.dart` with spacing values and corner radii
- [ ] Verify `ThemeData` is applied globally in `MaterialApp`

### 1.4 Authentication Pages
- [ ] **Page 1 — Login Page:** Logo, email/password fields, validation, login button, register link
- [ ] **Page 2 — Registration Page:** All required fields, validation, Firebase Auth account creation
- [ ] Write `users` and `students` documents to Firestore on registration
- [ ] Save `studentId` to `shared_preferences` after registration

### 1.5 Role-Based Routing
- [ ] `authStateChanges` listener set up in `main.dart`
- [ ] `RoleWrapper` widget reads role from Firestore and routes to correct dashboard
- [ ] `UserProvider` (or equivalent) stores `currentUser` and `role` in state

### 1.6 Local Storage Setup
- [ ] `LocalStorageService` class created with `saveStudentId()`, `getStudentId()`, `clear()`
- [ ] Storage integrated into registration and logout flows

### 1.7 Common Reusable Widgets
- [ ] `CardWidget` — white bg, 12dp radius, 2dp elevation, 16dp padding
- [ ] `PrimaryButton` — secondary color (#4A90E2), white text, 8dp radius
- [ ] `AccentButton` — coral (#FF6B4A), for SOS only
- [ ] `ErrorSnackbar` — bottom snackbar with message and optional retry
- [ ] `LoadingOverlay` — covers screen with circular progress indicator
- [ ] `SkeletonItem` — shimmer placeholder for lists

**Phase 1 Owner:** ___________
**Phase 1 Target:** End of Week 1
**Phase 1 Status:** 🔲 Not Started

---

## Phase 2 — Student Features (Week 2)

### 2.1 Student Dashboard (Page 3)
- [ ] Welcome card with greeting and next appointment status (`FutureBuilder`)
- [ ] Horizontal quick actions row (4 buttons: SOS, Book Appointment, My Appointments, Profile)
- [ ] Article slider (`StreamBuilder` on `health_advice` where `isActive == true`)
- [ ] WebView overlay opens on article tap
- [ ] Bottom navigation bar (Home, Appointments, Profile tabs)
- [ ] Logout icon in AppBar with confirmation dialog

### 2.2 Book Appointment (Page 4)
- [ ] Date picker (future dates only)
- [ ] Time picker
- [ ] Reason text field (multi-line, validated)
- [ ] Critical level selector (Low/Medium/High with correct colors)
- [ ] Firestore write to `appointments` collection on submit (`status = "pending"`)
- [ ] Success Snackbar and return to dashboard

### 2.3 My Appointments (Page 5)
- [ ] `StreamBuilder` listing all appointments for current student
- [ ] Status badges (pending = orange, approved = green, rejected = red)
- [ ] Tap to view detail (`showModalBottomSheet` with full info and psychiatrist note)
- [ ] Loading skeleton while fetching

### 2.4 Student Profile Editor (Page 6)
- [ ] Load existing profile from Firestore (`FutureBuilder`)
- [ ] Edit: full name, emergency contact name/phone, allergies, medical conditions
- [ ] Save updates Firestore `students` document
- [ ] Success Snackbar

### 2.5 SOS Button (Dashboard, Logged In)
- [ ] Permission check with `permission_handler`
- [ ] Location fetch with `geolocator`
- [ ] Firestore write to `emergency_alerts` collection
- [ ] Confirmation dialog (accent color emphasis)
- [ ] Haptic feedback (`HapticFeedback.heavyImpact()`)

**Phase 2 Owner:** ___________
**Phase 2 Target:** End of Week 2
**Phase 2 Status:** 🔲 Not Started

---

## Phase 3 — Psychiatrist Features (Week 3)

### 3.1 Psychiatrist Dashboard (Page 7)
- [ ] 3 stat cards (pending appointments, active students, active alerts) — real-time `StreamBuilder`
- [ ] Quick actions row (All Students, Write Prescription, Manage Articles placeholder)
- [ ] "Manage Articles" shows "Coming Soon" dialog
- [ ] Pending appointments list (sorted: High → Medium → Low, then newest first, limited to 5)
- [ ] Tap appointment → navigate to Page 8
- [ ] Bottom navigation bar (Dashboard, Students, Alerts)
- [ ] Logout icon in AppBar

### 3.2 Appointment Approval (Page 8)
- [ ] Load appointment details from Firestore
- [ ] Approve button (secondary color)
- [ ] Reject button (red outline) with optional note input
- [ ] Firestore update: `status`, `psychiatristNote`, `updatedAt`
- [ ] Snackbar confirmation and return to dashboard

### 3.3 Student History & Prescription Writer (Page 9)
- [ ] Tab layout: History tab + Write Prescription tab
- [ ] Student search (filter by name/email using Firestore `startAt/endAt`)
- [ ] History tab: last 5 appointments, last 5 prescriptions, last 5 resolved emergency alerts
- [ ] Write Prescription form: medication, dosage, instructions, duration, refills
- [ ] Save prescription to `prescriptions` collection
- [ ] "Forward to Clinic" button opens `mailto:` with pre-filled data
- [ ] "Clear selection" / back-to-search flow

### 3.4 Manage Articles Placeholder
- [ ] Confirmed: "Coming Soon" dialog is sufficient for MVP (no in-app editor)

**Phase 3 Owner:** ___________
**Phase 3 Target:** End of Week 3
**Phase 3 Status:** 🔲 Not Started

---

## Phase 4 — Emergency System & Notifications (Week 4)

### 4.1 Triple-Tap SOS on Login Page (Page 1)
- [ ] Triple-tap gesture detector on login logo
- [ ] Light haptic on each tap
- [ ] 10-second countdown dialog with CANCEL button (accent color countdown text)
- [ ] On completion: retrieve `studentId` from local storage (nullable)
- [ ] Location permission request + location fetch
- [ ] Write to `emergency_alerts` with `studentId` (or null) and `deviceId`
- [ ] "Emergency alert sent" confirmation dialog

### 4.2 Push Notifications (FCM)
- [ ] Request FCM permission on app start
- [ ] Store FCM token in Firestore (`users` document or `tokens` subcollection)
- [ ] Firebase Cloud Function: triggers on `emergency_alerts` `onCreate`
- [ ] Cloud Function fetches all psychiatrist FCM tokens and sends high-priority notification
- [ ] Android: FCM notification channel `emergency` configured
- [ ] iOS: background notification entitlements configured

### 4.3 View Student Location (Page 10)
- [ ] Receives `alertId` via route arguments
- [ ] Fetches alert + student data from Firestore
- [ ] Top bar: student name (or "Anonymous Student"), timestamp, accent background
- [ ] "Open in Maps" button using `map_launcher` (no API key required)
- [ ] Student info panel: allergies, emergency contact, last 3 appointment summaries
- [ ] "Anonymous" fallback if no `studentId`
- [ ] Action buttons: Call Emergency Services (tel link), Forward to Clinic (mailto), Resolve
- [ ] Resolve updates: `resolved = true`, `resolvedAt`, `resolvedBy`

### 4.4 Emergency Alerts List (Page 11)
- [ ] `StreamBuilder` on `emergency_alerts` where `resolved == false`, ordered by timestamp desc
- [ ] Each item: student name (or "Anonymous"), time elapsed, location preview
- [ ] Tap → navigate to Page 10 with `alertId`
- [ ] Empty state message when no active alerts

**Phase 4 Owner:** ___________
**Phase 4 Target:** End of Week 4
**Phase 4 Status:** 🔲 Not Started

---

## Phase 5 — Polish, Testing & Deployment (Week 5)

### 5.1 Firestore Security Rules
- [ ] Write strict `firestore.rules` covering all collections
- [ ] Test with Firebase Rules Simulator
- [ ] Allow anonymous SOS writes with field restrictions
- [ ] Deploy rules: `firebase deploy --only firestore:rules`

### 5.2 Loading & Error States
- [ ] Shimmer skeleton on ALL `StreamBuilder` and `FutureBuilder` lists
- [ ] Global Firestore exception handler → Snackbar (not dialog)
- [ ] Empty state widgets for all lists (no data messages)

### 5.3 Offline Behavior
- [ ] Firestore persistence enabled: `persistenceEnabled: true`
- [ ] Offline test: student views cached appointments without network
- [ ] Offline test: write is queued and syncs on reconnect

### 5.4 UI 60-30-10 Final Audit
- [ ] Every screen: background = `#F8F9FA`
- [ ] Every card/modal: `#FFFFFF`
- [ ] Every primary action button: `#4A90E2`
- [ ] SOS / critical / high badges: `#FF6B4A`
- [ ] All text contrast verified (WCAG AA)
- [ ] All tap targets ≥ 48dp
- [ ] All spacing verified as 8dp multiples
- [ ] No hardcoded inline colors remain in any widget

### 5.5 Performance
- [ ] `ListView.builder` used on all scrollable lists (no `Column` for long lists)
- [ ] `const` constructors applied wherever possible
- [ ] Appointment history pagination added (limit 20 + "Load more")
- [ ] No `print()` statements in production code

### 5.6 Testing
- [ ] All scenarios in `TESTING_CHECKLIST.md` verified on Android
- [ ] All scenarios in `TESTING_CHECKLIST.md` verified on iOS
- [ ] At least one widget test per page written and passing
- [ ] `flutter analyze` produces zero warnings

### 5.7 Build & Deployment
- [ ] Release APK built: `flutter build apk --release`
- [ ] APK uploaded to Firebase App Distribution
- [ ] iOS IPA built and uploaded to TestFlight (if Apple dev account available)
- [ ] `README.md` updated with final build instructions

**Phase 5 Owner:** ___________
**Phase 5 Target:** End of Week 5
**Phase 5 Status:** 🔲 Not Started

---

## 🧱 Currently Blocked

| Blocker | Reason | Waiting On | Date Raised |
|---|---|---|---|
| — | — | — | — |

---

## 📝 Change Log

> Add one line per PR merged. Newest entries at the top.

| Date | PR # | Author | What Changed |
|---|---|---|---|
| YYYY-MM-DD | #XX | @username | Description of what was completed |

---

*To update this file: edit in your feature branch, include changes in your PR.*
*This file must be the last thing you update before requesting a review.*
