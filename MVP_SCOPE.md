# 🔒 MVP Scope — Campus Mental Health Support System

> **This document is FROZEN.**
> No features, pages, or flows may be added, removed, or significantly changed
> without a formal team vote and written approval recorded in this file.
> Any AI-suggested feature outside this scope must be declined immediately.

---

## Why This Document Exists

When using AI coding agents, the most common failure mode in group projects is
**scope creep** — features are quietly added, pages multiply, and the codebase
becomes inconsistent. This document serves as the single source of truth for what
this MVP is and what it is not.

If your Antigravity IDE agent suggests something not listed here → **reject it.**
If a teammate proposes a new feature → **create a GitHub Issue, vote as a team.**

---

## 📱 Application Overview

| Property | Value |
|---|---|
| Platform | Mobile (Android + iOS) |
| Framework | Flutter |
| Backend | Firebase (free tier) |
| Total Pages | **11 (fixed — no more, no less for MVP)** |
| AI Features | **None** |
| Paid APIs | **None** |
| Real-time Chat | **Not in MVP** |
| Video/Audio Calls | **Not in MVP** |
| Dark Mode | **Not in MVP** |
| In-App Article Editor | **Not in MVP** |
| SMS Fallback | **Not in MVP** |

---

## 👤 User Roles

### Role 1: Student

| # | Feature | Notes |
|---|---|---|
| 1 | Persistent login | Stays logged in across sessions |
| 2 | Read health advice articles | External URLs via WebView overlay |
| 3 | Book appointment | Date, time, reason, critical level (Low/Medium/High) |
| 4 | View own appointment history | With status badges and psychiatrist notes |
| 5 | Edit profile | Emergency contact name/phone, allergies, medical conditions |
| 6 | Emergency SOS (logged in) | Sends GPS location to psychiatrists via Firestore + FCM |
| 7 | Emergency SOS (not logged in) | Triple-tap logo on login screen — uses locally stored ID |
| 8 | Logout | From AppBar icon on any screen |

### Role 2: Psychiatrist

| # | Feature | Notes |
|---|---|---|
| 1 | Dashboard with statistics | Pending appointments, active students, active alerts (live) |
| 2 | View & approve/reject appointments | Sorted by critical level |
| 3 | Write prescriptions | Including dosage, instructions, duration, refills |
| 4 | Forward prescription to clinic | Via `mailto:` link (no in-app email) |
| 5 | Search student history | Appointments, prescriptions, past emergency alerts |
| 6 | Receive SOS push notification | Via FCM (high-priority, even in background) |
| 7 | View student location | Opens external Google/Apple Maps — no API key needed |
| 8 | Resolve emergency | Marks alert resolved in Firestore |
| 9 | View unresolved SOS alerts list | Manual check via Alerts tab |
| 10 | Logout | From AppBar icon on any screen |

### Role 3: Admin (Manual — No In-App Interface)

| # | Feature | Notes |
|---|---|---|
| 1 | Preload health advice articles | Done manually via Firebase console |
| 2 | Create psychiatrist accounts | Done manually via Firebase console |

---

## 📋 The 11 Pages (Fixed)

| # | Page Name | Role | Navigation |
|---|---|---|---|
| 1 | Login | Both | Entry point |
| 2 | Registration | Student only | From Login |
| 3 | Student Dashboard | Student | Bottom nav: Home |
| 4 | Book Appointment | Student | From Dashboard quick action |
| 5 | My Appointments | Student | Bottom nav: Appointments |
| 6 | Student Profile Editor | Student | Bottom nav: Profile |
| 7 | Psychiatrist Dashboard | Psychiatrist | Bottom nav: Dashboard |
| 8 | Appointment Approval | Psychiatrist | From Dashboard list item |
| 9 | Student History & Prescription Writer | Psychiatrist | Bottom nav: Students / Quick action |
| 10 | View Student Location | Psychiatrist | From notification tap / Alerts list |
| 11 | Emergency Alerts List | Psychiatrist | Bottom nav: Alerts |

**No page may be added without a team vote recorded in the Change Log below.**

---

## 🗄️ Firestore Collections (Fixed Schema)

### `users`
```
email: String
role: "student" | "psychiatrist"
createdAt: Timestamp
lastLogin: Timestamp
fcmToken: String (added in Phase 4)
```

### `students`
```
fullName: String
dateOfBirth: String (optional)
emergencyContactName: String
emergencyContactPhone: String
allergies: String
medicalConditions: String
preferredLanguage: String (optional)
psychiatristId: String (optional)
```

### `psychiatrists`
```
fullName: String
clinicName: String
clinicAddress: String
clinicPhone: String
email: String
```

### `appointments`
```
studentId: String
studentName: String
psychiatristId: String
requestedDate: Timestamp
requestedTime: String
reason: String
criticalLevel: "Low" | "Medium" | "High"
status: "pending" | "approved" | "rejected"
psychiatristNote: String (optional)
createdAt: Timestamp
updatedAt: Timestamp
```

### `prescriptions`
```
studentId: String
studentName: String
psychiatristId: String
medication: String
dosage: String
instructions: String
duration: String
refills: Number
forwardedToClinic: Boolean
forwardedAt: Timestamp (nullable)
createdAt: Timestamp
```

### `emergency_alerts`
```
studentId: String (nullable — anonymous SOS)
deviceId: String
locationLat: Number
locationLng: Number
timestamp: Timestamp
resolved: Boolean
resolvedAt: Timestamp (nullable)
resolvedBy: String (psychiatristId, nullable)
locationHistory: Array (optional, future use)
```

### `health_advice`
```
title: String
category: String
url: String (external article URL)
imageUrl: String
description: String
author: String
publishedAt: Timestamp
isActive: Boolean
```

---

## 🚫 Explicitly Out of Scope for MVP

The following will NOT be built. If an AI agent generates code for these, it must be
removed before committing.

| Feature | Why Excluded |
|---|---|
| Real-time chat / messaging | Complexity, cost, out of MVP goals |
| Video or audio calls | Requires paid infrastructure |
| Profile picture upload | Firebase Storage cost + complexity |
| Dark mode | Deferred to post-MVP |
| In-app article editor for admin | Too complex; admin uses Firebase Console |
| SMS fallback for SOS | Requires paid SMS API |
| Google Maps embedded view | Requires API key; use map_launcher instead |
| Multiple psychiatrist assignment | Single `psychiatristId` per student, optional |
| Student-to-student interaction | Not in scope |
| Notifications other than SOS | Deferred |
| Payment / subscription | Not applicable |
| AI diagnosis or chatbot | Explicitly excluded — no AI in this app |
| Rating or feedback system | Deferred |
| Analytics dashboard | Deferred |

---

## 🗳️ Scope Change Log

> Any approved scope change must be recorded here with date, description, and team agreement.

| Date | Requested By | Feature | Decision | Approved By |
|---|---|---|---|---|
| — | — | — | No changes yet | — |

---

*Document version: 1.0*
*Frozen on: project kickoff*
*To propose a change: open a GitHub Issue tagged `scope-change-request`*
