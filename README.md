# 🧠 Campus Mental Health Support System (CMHSS)
> A Flutter + Firebase mobile application connecting students with campus psychiatrists.
> Built for real users. Designed for calm, professional, production-level experience.

---

## 📌 Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Prerequisites](#3-prerequisites)
4. [Repository Structure](#4-repository-structure)
5. [Environment Setup](#5-environment-setup)
6. [Firebase Configuration](#6-firebase-configuration)
7. [Running the App](#7-running-the-app)
8. [Building for Release](#8-building-for-release)
9. [Key Documents](#9-key-documents)
10. [Team Contacts](#10-team-contacts)

---

## 1. Project Overview

**CMHSS** is an MVP mobile application built with Flutter (frontend) and Firebase (backend).
It serves two user roles:

| Role | Core Capabilities |
|---|---|
| **Student** | Book appointments, read health advice, trigger emergency SOS, edit profile |
| **Psychiatrist** | Manage appointments, write prescriptions, respond to SOS alerts in real time |

**No AI. No paid APIs. No real-time chat.** This is a focused, lean MVP.

- 11 pages total (see `MVP_SCOPE.md`)
- Firebase free tier only
- 60-30-10 color rule enforced across all screens (see `DESIGN_SYSTEM.md`)

---

## 2. Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Frontend | Flutter | Latest stable |
| Language | Dart | Latest stable |
| Auth | Firebase Authentication (email/password) | ^4.16.0 |
| Database | Cloud Firestore (NoSQL) | ^4.14.0 |
| Push Notifications | Firebase Cloud Messaging (FCM) | ^14.7.0 |
| Cloud Functions | Firebase Cloud Functions | ^4.5.0 |
| Location | geolocator + permission_handler | ^10.1.0 / ^11.0.0 |
| Maps | map_launcher (external, no API key) | ^3.0.0 |
| Web Content | webview_flutter | ^4.4.0 |
| Local Storage | shared_preferences | ^2.2.0 |
| Loading States | shimmer | ^3.0.0 |
| Splash Screen | flutter_native_splash | ^2.3.0 |
| State Management | provider | ^6.0.5 |
| Device Info | device_info_plus | ^9.1.0 |
| Fonts | google_fonts | ^6.1.0 |
| Internationalisation | intl | ^0.18.0 |

---

## 3. Prerequisites

Before cloning this repo, ensure you have the following installed and verified:

### Flutter & Dart
```bash
flutter --version
# Required: Flutter 3.x or above, Dart 3.x or above

flutter doctor
# All checkmarks must be green before you start working
```

### Firebase CLI
```bash
npm install -g firebase-tools
firebase --version
firebase login
```

### Git
```bash
git --version
# Required: 2.30+
```

### Android Studio / Xcode
- **Android:** Android Studio with SDK API level 21+ installed
- **iOS:** Xcode 14+ with Command Line Tools (macOS only)

### Node.js (for Cloud Functions)
```bash
node --version   # Required: 18.x LTS
npm --version
```

---

## 4. Repository Structure

```
campus-mhss/
│
├── android/                        # Android-specific config
├── ios/                            # iOS-specific config
│
├── lib/
│   ├── main.dart                   # App entry point, Firebase init
│   ├── app_theme.dart              # Global theme (60-30-10 colors, typography)
│   ├── app_constants.dart          # Spacing, radii, shared constants
│   │
│   ├── models/                     # Dart data models (Student, Appointment, etc.)
│   ├── services/                   # Firebase, Auth, Location, LocalStorage services
│   ├── providers/                  # State management (UserProvider, etc.)
│   │
│   ├── pages/
│   │   ├── auth/                   # Page 1: Login, Page 2: Registration
│   │   ├── student/                # Pages 3–6: Student-facing screens
│   │   └── psychiatrist/           # Pages 7–11: Psychiatrist-facing screens
│   │
│   └── widgets/                    # Shared reusable UI components
│       ├── card_widget.dart
│       ├── primary_button.dart
│       ├── accent_button.dart
│       ├── error_snackbar.dart
│       ├── loading_overlay.dart
│       └── skeleton_item.dart
│
├── functions/                      # Firebase Cloud Functions (FCM SOS trigger)
│   └── index.js
│
├── firestore.rules                 # Firestore security rules
├── pubspec.yaml                    # Flutter dependencies
├── firebase.json                   # Firebase project configuration
├── .firebaserc                     # Firebase project alias
│
├── README.md                       ← You are here
├── MVP_SCOPE.md                    # Frozen feature list — do not deviate
├── PROJECT_STATUS.md               # Living progress tracker — update after every PR
├── DESIGN_SYSTEM.md                # Colors, typography, spacing rules
├── CONTRIBUTING.md                 # How to contribute: AI rules, PR process
├── GIT_WORKFLOW.md                 # Step-by-step git commands for every task
├── AI_USAGE_RULES.md               # Rules for using Claude/Gemini in Antigravity IDE
├── OWNERS.md                       # Who owns which files/pages
└── TESTING_CHECKLIST.md            # Test scenarios before every PR merge
```

---

## 5. Environment Setup

### Step 1 — Clone the repository
```bash
git clone https://github.com/YOUR_ORG/campus-mhss.git
cd campus-mhss
```

### Step 2 — Install Flutter dependencies
```bash
flutter pub get
```

### Step 3 — Add Firebase config files
You must obtain these from the team lead or Firebase console.
Place them in the correct directories:

| File | Location |
|---|---|
| `google-services.json` | `android/app/google-services.json` |
| `GoogleService-Info.plist` | `ios/Runner/GoogleService-Info.plist` |

> ⚠️ These files are in `.gitignore`. **Never commit them to the repository.**

### Step 4 — Set up local environment variables
Create a file at the project root called `.env` (also gitignored):
```
FIREBASE_PROJECT_ID=your-project-id
EMERGENCY_PHONE_NUMBER=your-campus-security-number
```

Load this in `app_constants.dart` using the `flutter_dotenv` package or hardcode
the emergency phone number as a team-agreed constant for MVP.

### Step 5 — Install Cloud Functions dependencies
```bash
cd functions
npm install
cd ..
```

---

## 6. Firebase Configuration

### Services to Enable in Firebase Console
1. **Authentication** → Sign-in method → Email/Password → Enable
2. **Firestore Database** → Create in production mode → Apply `firestore.rules`
3. **Cloud Messaging (FCM)** → No extra setup needed for Flutter
4. **Cloud Functions** → Requires Blaze (pay-as-you-go) plan — free tier usage applies

### Firestore Indexes
The following composite indexes must be created manually in the Firebase console
(or they will be auto-prompted on first query):

| Collection | Fields Indexed | Order |
|---|---|---|
| `appointments` | `studentId` ASC, `createdAt` DESC | — |
| `appointments` | `status` ASC, `criticalLevel` DESC, `createdAt` ASC | — |
| `emergency_alerts` | `resolved` ASC, `timestamp` DESC | — |
| `prescriptions` | `studentId` ASC, `createdAt` DESC | — |

### Deploy Firestore Rules
```bash
firebase deploy --only firestore:rules
```

### Deploy Cloud Functions
```bash
firebase deploy --only functions
```

---

## 7. Running the App

### Run on Android emulator
```bash
flutter emulators --launch <emulator_id>
flutter run
```

### Run on iOS simulator (macOS only)
```bash
open -a Simulator
flutter run
```

### Run on physical device
```bash
flutter devices          # List connected devices
flutter run -d <device_id>
```

### Run with a specific flavor or environment
```bash
flutter run --dart-define=ENV=dev
```

---

## 8. Building for Release

### Android APK
```bash
flutter build apk --release
# Output: build/app/outputs/flutter-apk/app-release.apk
```

### Android App Bundle (recommended for Play Store)
```bash
flutter build appbundle --release
```

### iOS (macOS only)
```bash
flutter build ios --release
# Then archive via Xcode for TestFlight/App Store
```

### Distribution
Upload to **Firebase App Distribution** for internal testing:
```bash
firebase appdistribution:distribute build/app/outputs/flutter-apk/app-release.apk \
  --app YOUR_FIREBASE_APP_ID \
  --groups "internal-testers"
```

---

## 9. Key Documents

| Document | Purpose | Who Must Read |
|---|---|---|
| `MVP_SCOPE.md` | Frozen feature list. No deviations allowed. | Everyone |
| `PROJECT_STATUS.md` | Update after every merged PR | Everyone |
| `DESIGN_SYSTEM.md` | UI/UX rules for every screen | Everyone |
| `CONTRIBUTING.md` | PR process, commit rules, review expectations | Everyone |
| `GIT_WORKFLOW.md` | Exact git commands to follow for every task | Everyone |
| `AI_USAGE_RULES.md` | How to use Claude/Gemini safely in Antigravity | Everyone |
| `OWNERS.md` | Who owns which pages/files | Everyone |
| `TESTING_CHECKLIST.md` | Scenarios to verify before every PR | Everyone |

---

## 10. Team Contacts

| Name | Role | Pages Owned | Contact |
|---|---|---|---|
| [Name] | Team Lead | All / Reviewer | — |
| [Name] | Student Pages Dev | Pages 1–6 | — |
| [Name] | Psychiatrist Pages Dev | Pages 7–11 | — |
| [Name] | Firebase / Functions | Services layer | — |
| [Name] | UI / Design System | Widgets, theme | — |

> Fill in team details before distributing this file.

---

*Last updated: see git log*
*For questions, open a GitHub Issue tagged `question`.*
