# ✅ Testing Checklist — Campus Mental Health Support System

> No PR merges without the relevant tests in this document being verified.
> This is not optional. Testing is the gate between AI-generated code and main.
>
> For each task, run the scenarios relevant to the feature you changed.
> For Phase 5 (final), run ALL scenarios on both Android and iOS.

---

## How to Use This Document

1. Find the section matching the feature you just built
2. Run each scenario listed — on a real device or emulator
3. Record the result (Pass / Fail / Blocked)
4. Fix failures before committing
5. Reference the relevant section in your PR description:
   *"Verified: Testing Checklist Section 2.2 — all scenarios passed on Android API 33"*

---

## Device Coverage Requirements

| Phase | Android | iOS |
|---|---|---|
| Phases 1–4 (feature by feature) | ✅ Required | ✅ Required (at least simulator) |
| Phase 5 (full regression) | ✅ Required (min API 21) | ✅ Required (min iOS 12) |

For each test, note:
- Device/emulator name
- OS version
- Result (Pass / Fail)
- If Fail: describe the failure

---

## Section 1 — Authentication & Role Routing (Phase 1)

### 1.1 Student Registration

| # | Scenario | Steps | Expected Result | Result |
|---|---|---|---|---|
| 1 | Successful registration | Fill all fields correctly → tap Register | Account created, navigated to Student Dashboard | |
| 2 | Missing full name | Leave name blank → tap Register | Error shown on name field, no account created | |
| 3 | Invalid email format | Enter "notanemail" → tap Register | Error shown on email field | |
| 4 | Password too short | Enter 3-char password → tap Register | Error shown on password field | |
| 5 | Passwords don't match | Enter different passwords → tap Register | Error shown on confirm password field | |
| 6 | Email already registered | Use an existing email → tap Register | Firebase error shown (email in use) | |
| 7 | Auto-login after register | Complete registration | User lands on Student Dashboard (not Login) | |
| 8 | Firestore document created | Complete registration | Check Firebase console: `users` and `students` docs exist | |
| 9 | studentId in local storage | Complete registration | Check: `getStudentId()` returns a non-null value | |

### 1.2 Login

| # | Scenario | Steps | Expected Result | Result |
|---|---|---|---|---|
| 10 | Student login | Enter valid student credentials → Login | Navigates to Student Dashboard | |
| 11 | Psychiatrist login | Enter valid psychiatrist credentials → Login | Navigates to Psychiatrist Dashboard | |
| 12 | Wrong password | Enter wrong password → Login | Firebase error shown (invalid credentials) | |
| 13 | Non-existent email | Enter fake email → Login | Firebase error shown | |
| 14 | Empty fields | Tap Login with no input | Field validation errors shown | |
| 15 | Persistent login | Login → close app → reopen | User is still logged in on correct dashboard | |
| 16 | Loading state | Tap Login (slow network) | Loading indicator visible, button disabled | |

---

## Section 2 — Student Features (Phase 2)

### 2.1 Student Dashboard

| # | Scenario | Steps | Expected Result | Result |
|---|---|---|---|---|
| 17 | Welcome card shows name | Log in as student | Correct name displayed on welcome card | |
| 18 | Article slider loads | Dashboard visible | Articles appear in horizontal scroll | |
| 19 | Article slider loading state | First load on fresh data | Shimmer skeleton visible before articles load | |
| 20 | Article opens WebView | Tap any article | WebView opens with correct external URL | |
| 21 | WebView closes | Tap back from WebView | Returns to Student Dashboard | |
| 22 | Quick actions visible | Dashboard | SOS, Book Appointment, My Appointments, Profile buttons visible | |
| 23 | Bottom nav: Home | Tap Home tab | Student Dashboard shown | |
| 24 | Bottom nav: Appointments | Tap Appointments tab | My Appointments page shown | |
| 25 | Bottom nav: Profile | Tap Profile tab | Student Profile Editor shown | |

### 2.2 Book Appointment

| # | Scenario | Steps | Expected Result | Result |
|---|---|---|---|---|
| 26 | Date picker opens | Tap date field | Native date picker opens | |
| 27 | Past dates blocked | Date picker open | Past dates are not selectable / greyed out | |
| 28 | Time picker opens | Tap time field | Time picker opens | |
| 29 | Reason field validates | Leave reason blank → Submit | Error on reason field | |
| 30 | Critical level required | Leave level unselected → Submit | Error or default level applied | |
| 31 | Successful booking | Fill all fields → Submit | Snackbar: "Appointment requested", returns to Dashboard | |
| 32 | Firestore document created | Complete booking | Check Firebase console: `appointments` doc exists, status = "pending" | |
| 33 | Correct critical level color | Choose "High" | High badge shown in coral (#FF6B4A) | |
| 34 | Correct critical level color | Choose "Medium" | Medium badge shown in orange | |
| 35 | Correct critical level color | Choose "Low" | Low badge shown in green | |

### 2.3 My Appointments

| # | Scenario | Steps | Expected Result | Result |
|---|---|---|---|---|
| 36 | List loads | Navigate to Appointments tab | All student appointments listed | |
| 37 | Shimmer on load | Fresh load | Shimmer skeleton visible during fetch | |
| 38 | Pending badge | Have a pending appointment | Orange "pending" badge visible | |
| 39 | Approved badge | Have an approved appointment | Green "approved" badge visible | |
| 40 | Rejected badge | Have a rejected appointment | Coral "rejected" badge visible | |
| 41 | Tap to see detail | Tap any appointment | Bottom sheet / detail view shows full info | |
| 42 | Psychiatrist note visible | Approved/Rejected appointment | Psychiatrist's note shown in detail view | |
| 43 | Empty state | No appointments | Clear message: "No appointments yet" (not blank screen) | |

### 2.4 Student Profile Editor

| # | Scenario | Steps | Expected Result | Result |
|---|---|---|---|---|
| 44 | Profile loads | Navigate to Profile tab | Fields pre-filled with existing Firestore data | |
| 45 | Edit and save | Change emergency contact → Save | Snackbar: "Profile updated" | |
| 46 | Firestore updated | After save | Check Firebase console: `students` doc reflects new values | |
| 47 | Loading state | Open profile | Brief loading indicator or shimmer while fetching | |

### 2.5 SOS — Logged In

| # | Scenario | Steps | Expected Result | Result |
|---|---|---|---|---|
| 48 | Location permission granted | First SOS tap (permission already granted) | Location fetched, alert written to Firestore | |
| 49 | Location permission denied | First SOS tap (permission denied) | Dialog: "Enable location", offers to open Settings | |
| 50 | Haptic feedback | Tap SOS button | Heavy haptic felt on device | |
| 51 | Firestore alert created | SOS triggered | Check Firebase console: `emergency_alerts` doc with resolved=false | |
| 52 | Confirmation dialog | After SOS | Dialog: "Help is on the way" with accent color | |
| 53 | Location accuracy | SOS with GPS on | lat/lng in Firestore matches actual location (verify on map) | |

---

## Section 3 — Psychiatrist Features (Phase 3)

### 3.1 Psychiatrist Dashboard

| # | Scenario | Steps | Expected Result | Result |
|---|---|---|---|---|
| 54 | Stat cards load | Log in as psychiatrist | 3 cards: pending count, active students, active alerts | |
| 55 | Pending count updates live | Student submits appointment | Count on dashboard updates without reload | |
| 56 | Pending list loads | Dashboard visible | Up to 5 pending appointments listed | |
| 57 | Sorted by critical level | Multiple pending appointments | High shown first, then Medium, then Low | |
| 58 | Tap appointment | Tap pending item | Navigates to Appointment Approval page | |
| 59 | Manage Articles dialog | Tap Manage Articles | "Coming Soon" dialog appears | |

### 3.2 Appointment Approval

| # | Scenario | Steps | Expected Result | Result |
|---|---|---|---|---|
| 60 | Appointment details shown | Open approval page | Student name, date, time, reason, critical level visible | |
| 61 | Approve appointment | Tap Approve → Confirm | Status updates to "approved" in Firestore | |
| 62 | Student sees approved | After psychiatrist approves | Student's My Appointments shows green "approved" badge | |
| 63 | Reject without note | Tap Reject → Confirm with no note | Status updates to "rejected" | |
| 64 | Reject with note | Tap Reject → Enter note → Confirm | Status = "rejected", psychiatristNote saved in Firestore | |
| 65 | Student sees note | After rejection with note | Student's detail view shows psychiatrist note | |
| 66 | Returns to dashboard | After approve/reject | Back to Psychiatrist Dashboard, appointment gone from pending list | |

### 3.3 Student History & Prescription Writer

| # | Scenario | Steps | Expected Result | Result |
|---|---|---|---|---|
| 67 | Search returns results | Type partial student name | Matching students listed below search | |
| 68 | Search no results | Type non-existent name | Empty state shown (not error) | |
| 69 | Select student | Tap a student in search results | History tab populates | |
| 70 | History: appointments shown | Student with appointments selected | Last 5 appointments listed | |
| 71 | History: prescriptions shown | Student with prescriptions selected | Last 5 prescriptions listed | |
| 72 | History: past alerts shown | Student with past resolved alerts | Last 5 shown | |
| 73 | Write prescription: all fields | Fill medication, dosage, instructions, duration, refills | No validation errors | |
| 74 | Prescription saves | Submit form | Firestore `prescriptions` doc created | |
| 75 | Forward to clinic | Tap Forward button | Email client opens with pre-filled prescription data | |
| 76 | Empty student history | Student with no data selected | "No appointments yet" etc. messages, no crash | |

---

## Section 4 — Emergency System & Notifications (Phase 4)

### 4.1 Triple-Tap SOS (Login Page — Not Logged In)

| # | Scenario | Steps | Expected Result | Result |
|---|---|---|---|---|
| 77 | Triple-tap triggers dialog | Tap logo 3 times quickly | Countdown dialog appears | |
| 78 | Haptic on each tap | Triple-tap | Light haptic felt on each of the 3 taps | |
| 79 | Countdown counts down | Dialog open | Timer counts 10 → 0 visibly | |
| 80 | Cancel works | Tap CANCEL before 0 | Dialog closes, NO alert written to Firestore | |
| 81 | SOS fires at 0 | Do not cancel | Alert written to Firestore after countdown | |
| 82 | StudentId in alert | Prior registration exists | alert.studentId matches registered student's UID | |
| 83 | Anonymous alert | No prior registration / no stored ID | alert.studentId is null, alert still created | |
| 84 | Confirmation shown | SOS fires | "Emergency alert sent" dialog shown | |
| 85 | Location in alert | SOS fires with GPS | lat/lng present in the Firestore document | |

### 4.2 Push Notifications

| # | Scenario | Steps | Expected Result | Result |
|---|---|---|---|---|
| 86 | FCM token stored | Student logs in | FCM token exists in Firestore `users` document | |
| 87 | Psychiatrist receives notification | Student triggers SOS | Notification appears on psychiatrist device within ~5 seconds | |
| 88 | Notification received: app open | App in foreground on psychiatrist device | In-app notification or visual alert shown | |
| 89 | Notification received: app background | App in background on psychiatrist device | System notification appears | |
| 90 | Notification received: app closed | App fully closed on psychiatrist device | System notification appears | |
| 91 | Notification tap opens Page 10 | Tap notification | App opens to View Student Location (correct alert) | |

### 4.3 View Student Location (Page 10)

| # | Scenario | Steps | Expected Result | Result |
|---|---|---|---|---|
| 92 | Student info shown | Open page with known student | Student name, allergies, emergency contact shown | |
| 93 | Anonymous student | Open page with null studentId | "Anonymous Student" shown, no crash | |
| 94 | Open in Maps | Tap "Open in Maps" | External maps app opens at correct coordinates | |
| 95 | Call Emergency Services | Tap Call button | Phone dialer opens with configured number | |
| 96 | Forward to Clinic | Tap Forward | Email client opens with location + student info pre-filled | |
| 97 | Resolve alert | Tap Resolve | alert.resolved = true in Firestore, alert disappears from list | |
| 98 | Alert timestamp shown | Page open | Correct timestamp of the SOS alert displayed | |

### 4.4 Emergency Alerts List (Page 11)

| # | Scenario | Steps | Expected Result | Result |
|---|---|---|---|---|
| 99 | Unresolved alerts listed | Active alerts exist | List shows unresolved alerts, newest first | |
| 100 | Resolved alert disappears | Resolve an alert on Page 10 | Alert immediately disappears from list (real-time) | |
| 101 | Empty state | No active alerts | Clear "No active alerts" message, not blank screen | |
| 102 | Tap alert | Tap any list item | Navigates to View Student Location (correct alert) | |
| 103 | Anonymous alert shown | Anonymous SOS in list | Shows "Anonymous" name, no crash | |

---

## Section 5 — Regression & Polish (Phase 5)

### 5.1 Full App Regression (Run All Critical Paths)

Run these end-to-end scenarios on both Android and iOS:

| # | Scenario | Expected Result | Android | iOS |
|---|---|---|---|---|
| 104 | Student registers → logs in → books appointment | No errors, appointment in Firestore | | |
| 105 | Psychiatrist approves appointment | Student sees approved status | | |
| 106 | Student triggers SOS (logged in) → psychiatrist receives notification | Notification within 5s | | |
| 107 | Psychiatrist taps notification → opens map → resolves | Alert marked resolved | | |
| 108 | Triple-tap SOS on login (no login) | Alert created, anonymous or with stored ID | | |
| 109 | Psychiatrist writes prescription → forwards via email | Email client opens with correct data | | |
| 110 | No internet: student books appointment | Write queued, syncs when online | | |
| 111 | No internet: student views appointments | Cached data shown, no crash | | |
| 112 | Student logs out → logs back in | No stale state, correct dashboard | | |
| 113 | Psychiatrist logs out → logs back in | No stale state, correct dashboard | | |

### 5.2 UI / Design Audit (Every Screen)

Visit every page and verify against `DESIGN_SYSTEM.md`:

| Page | Background #F8F9FA | Cards white | Buttons #4A90E2 | SOS only uses coral | Spacing 8dp grid | Tap targets ≥48dp |
|---|---|---|---|---|---|---|
| 1 — Login | | | | | | |
| 2 — Registration | | | | | | |
| 3 — Student Dashboard | | | | | | |
| 4 — Book Appointment | | | | | | |
| 5 — My Appointments | | | | | | |
| 6 — Student Profile | | | | | | |
| 7 — Psychiatrist Dashboard | | | | | | |
| 8 — Appointment Approval | | | | | | |
| 9 — Student History / Prescriptions | | | | | | |
| 10 — View Student Location | | | | | | |
| 11 — Emergency Alerts List | | | | | | |

### 5.3 Edge Cases

| # | Scenario | Expected Result | Result |
|---|---|---|---|
| 114 | Student with no appointments | My Appointments shows empty state message | |
| 115 | Psychiatrist with no pending appointments | Dashboard pending list shows empty state | |
| 116 | SOS while location is OFF | Permission dialog shown, graceful handling | |
| 117 | SOS while airplane mode on | Graceful error (cannot reach Firestore) | |
| 118 | Very long student name in list | Text wraps or truncates — no overflow | |
| 119 | Very long reason text in appointment | Text wraps — no overflow | |
| 120 | Prescription with all fields at max length | No overflow, saves correctly | |
| 121 | App receives notification while SOS countdown active | Countdown continues, no crash | |
| 122 | Rapid triple-tap (6 taps instead of 3) | Single countdown triggered, not two | |
| 123 | Student opens appointment detail: no psychiatrist note | Field absent or shows "No note" — not empty/null crash | |
| 124 | Firestore offline + SOS triggered | Write queued, confirmation still shown | |
| 125 | Font size increased to 1.3× (accessibility) | No text overflow on any screen | |

### 5.4 Security Verification

| # | Scenario | Expected Result | Result |
|---|---|---|---|
| 126 | Student tries to read another student's appointments | Firestore rules block the read | |
| 127 | Student tries to write to prescriptions | Firestore rules block the write | |
| 128 | Unauthenticated user tries to read appointments | Firestore rules block the read | |
| 129 | Student tries to update appointment status | Firestore rules block the write | |
| 130 | Anonymous SOS write succeeds | Rule allows it (specifically for emergency) | |

---

## Failure Log

Record all failures found during testing here. Failures must be resolved before Phase 5 is marked complete.

| Date | Test # | Scenario | Device | Failure Description | Fixed By | Fixed Date |
|---|---|---|---|---|---|---|
| — | — | — | — | — | — | — |

---

*All 130 scenarios must pass on at least one Android and one iOS device before marking Phase 5 complete.*
*A scenario marked "Blocked" (cannot test due to missing dependency) must be explained in the PR.*
