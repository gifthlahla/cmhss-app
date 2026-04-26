# 🎨 Design System — Campus Mental Health Support System

> This document is the single authority on every visual decision in this app.
> Every screen, widget, and component must be built to this specification.
> Before writing any UI code, read this document fully.
> After writing UI code, audit it against this document.

---

## Core Philosophy

This app serves people in potential emotional distress. The design must feel:

- **Calm** — Never busy, cluttered, or overwhelming
- **Trustworthy** — Clean, professional, medical-grade aesthetic
- **Fast** — Minimal visual noise so users can act quickly in emergencies
- **Accessible** — Large targets, high contrast, readable at a glance

The three principles that govern every design decision:
1. **60-30-10 Color Rule** — strict allocation, no exceptions
2. **8dp Grid System** — all spacing is a multiple of 8 (or 4 in tight situations)
3. **Minimalism** — if a UI element is not serving the user's immediate goal, remove it

---

## 1. Color System (60-30-10 Rule)

### The Rule Explained

| Role | % | Color | Hex | Usage |
|---|---|---|---|---|
| **Primary / Background** | 60% | Off-White | `#F8F9FA` | Screen backgrounds, safe zones |
| **Secondary / Brand** | 30% | Soft Blue | `#4A90E2` | Buttons, active nav, headers, cards tint |
| **Accent / Action** | 10% | Coral | `#FF6B4A` | SOS, critical/high badges, destructive actions |

### Full Color Palette

```dart
// In app_theme.dart

// Backgrounds
static const Color backgroundPrimary = Color(0xFFF8F9FA);  // 60% — all screens
static const Color backgroundCard    = Color(0xFFFFFFFF);  // Cards and modals
static const Color backgroundOverlay = Color(0x80000000);  // Modal overlays (50% black)

// Brand (Secondary — 30%)
static const Color secondary         = Color(0xFF4A90E2);  // Primary actions, active states
static const Color secondaryLight    = Color(0xFFD6E8FB);  // Chips, tags, light backgrounds
static const Color secondaryDark     = Color(0xFF2C6FBD);  // Pressed state for secondary

// Accent (10%)
static const Color accent            = Color(0xFFFF6B4A);  // SOS, critical alerts, high badges
static const Color accentLight       = Color(0xFFFFE5DF);  // Accent backgrounds (countdown bg)
static const Color accentDark        = Color(0xFFD94D2E);  // Pressed state for SOS button

// Status Colors (for appointment badges — do NOT use for general UI)
static const Color statusPending     = Color(0xFFF39C12);  // Orange — pending
static const Color statusApproved    = Color(0xFF27AE60);  // Green — approved
static const Color statusRejected    = Color(0xFFFF6B4A);  // Coral — rejected (reuse accent)

// Text
static const Color textPrimary       = Color(0xFF2C3E50);  // Body text, headings
static const Color textSecondary     = Color(0xFF7F8C8D);  // Captions, labels, hints
static const Color textOnSecondary   = Color(0xFFFFFFFF);  // Text on blue buttons
static const Color textOnAccent      = Color(0xFFFFFFFF);  // Text on coral buttons
static const Color textDisabled      = Color(0xFFBDC3C7);  // Disabled fields, placeholders

// Dividers and Borders
static const Color divider           = Color(0xFFECECEC);  // Subtle separators
```

### How to Apply the Rule (Checklist per Screen)

Before marking a screen as complete, verify:
- [ ] The **dominant visual area** is `#F8F9FA` (off-white)
- [ ] **Cards, modals, bottom sheets** use `#FFFFFF`
- [ ] **All primary action buttons** use `#4A90E2` (not custom blue, not any variation)
- [ ] **Only SOS, critical badges, and destructive actions** use `#FF6B4A`
- [ ] **No new colors** introduced (status colors are the only exception, listed above)
- [ ] **Hardcoded colors** (`Color(0xFF...)` inline) do not exist — only constants from `app_theme.dart`

---

## 2. Typography

### Font Family
**Roboto** (via `google_fonts` package) or system default as fallback.

```dart
// Apply globally in MaterialApp:
theme: ThemeData(
  fontFamily: GoogleFonts.roboto().fontFamily,
  ...
)
```

### Type Scale

| Name | Use Case | Size | Weight | Color |
|---|---|---|---|---|
| `displayLarge` | Welcome card headline | 28sp | Bold (700) | `textPrimary` |
| `headlineLarge` | Page titles (AppBar) | 24sp | Bold (700) | `textPrimary` |
| `headlineMedium` | Section headers | 20sp | Medium (500) | `textPrimary` |
| `titleLarge` | Card titles, list item names | 18sp | Medium (500) | `textPrimary` |
| `bodyLarge` | Main body text, form labels | 16sp | Regular (400) | `textPrimary` |
| `bodyMedium` | Secondary body, descriptions | 14sp | Regular (400) | `textSecondary` |
| `labelLarge` | Button text | 16sp | Medium (500) | `textOnSecondary` |
| `bodySmall` | Captions, timestamps, hints | 12sp | Regular (400) | `textSecondary` |

```dart
// In app_theme.dart — TextTheme definition
static const TextTheme textTheme = TextTheme(
  displayLarge:  TextStyle(fontSize: 28, fontWeight: FontWeight.w700, color: textPrimary),
  headlineLarge: TextStyle(fontSize: 24, fontWeight: FontWeight.w700, color: textPrimary),
  headlineMedium:TextStyle(fontSize: 20, fontWeight: FontWeight.w500, color: textPrimary),
  titleLarge:    TextStyle(fontSize: 18, fontWeight: FontWeight.w500, color: textPrimary),
  bodyLarge:     TextStyle(fontSize: 16, fontWeight: FontWeight.w400, color: textPrimary),
  bodyMedium:    TextStyle(fontSize: 14, fontWeight: FontWeight.w400, color: textSecondary),
  labelLarge:    TextStyle(fontSize: 16, fontWeight: FontWeight.w500, color: Colors.white),
  bodySmall:     TextStyle(fontSize: 12, fontWeight: FontWeight.w400, color: textSecondary),
);
```

### Typography Rules
- **Never** mix more than 2 font weights on one screen
- **Never** use font sizes outside the scale above
- **Always** use `Theme.of(context).textTheme.bodyLarge` — not hardcoded `TextStyle(fontSize: 16)`
- Line height: 1.4–1.6 for body text (Flutter default is acceptable)
- Letter spacing: default (no custom letter spacing unless absolutely necessary)

---

## 3. Spacing & Layout Grid

### Base Unit: 8dp

All spacing values must be a multiple of 8dp. Use 4dp only when 8dp is too large
for a specific micro-spacing context (e.g., between icon and label).

```dart
// In app_constants.dart
static const double spaceXXS =  4.0;  // Micro: icon-to-label gaps
static const double spaceXS  =  8.0;  // Small: between related items
static const double spaceS   = 12.0;  // Medium-small: inner card sections
static const double spaceM   = 16.0;  // Medium: screen margin, between cards
static const double spaceL   = 24.0;  // Large: between sections
static const double spaceXL  = 32.0;  // X-Large: major section separators
static const double spaceXXL = 48.0;  // XX-Large: hero spaces, onboarding
```

### Screen Layout Rules

```
┌──────────────────────────────────┐
│  StatusBar                        │
│  AppBar (height ~56dp)            │
│                                   │
│  ← 16dp margin                   │
│  ┌────────────────────────────┐   │
│  │  Content area               │   │
│  │  Cards: 16dp inner padding  │   │
│  │  Between cards: 8–16dp gap  │   │
│  └────────────────────────────┘   │
│  16dp margin →                   │
│                                   │
│  Bottom Navigation (~56dp)        │
└──────────────────────────────────┘
```

| Property | Value |
|---|---|
| Screen horizontal margin | 16dp |
| Screen top padding (below AppBar) | 16dp |
| Screen bottom padding (above nav) | 16dp |
| Gap between cards | 12dp |
| Card internal padding | 16dp |
| Section header margin-bottom | 8dp |
| Button height | 48dp (minimum) |
| Bottom nav height | 56dp |
| AppBar height | 56dp (Flutter default) |

---

## 4. Component Specifications

### 4.1 Cards

```dart
Container(
  decoration: BoxDecoration(
    color: Colors.white,                          // Always white
    borderRadius: BorderRadius.circular(12),      // 12dp radius — always
    boxShadow: [
      BoxShadow(
        color: Colors.black.withOpacity(0.06),    // Very subtle shadow
        blurRadius: 8,
        offset: Offset(0, 2),                     // 2dp downward — feels grounded
      ),
    ],
  ),
  padding: EdgeInsets.all(16),                    // 16dp internal padding
  child: ...,
)
```

**Rules:**
- No visible borders on cards (shadow replaces border)
- Radius is always 12dp — not 8, not 16
- Background is always `#FFFFFF`, never `#F8F9FA`
- Cards must not touch screen edges — maintain 16dp margin

### 4.2 Primary Button (Secondary Color)

```dart
ElevatedButton(
  onPressed: () {},
  style: ElevatedButton.styleFrom(
    backgroundColor: AppTheme.secondary,          // #4A90E2
    foregroundColor: Colors.white,
    minimumSize: Size(double.infinity, 48),       // Full width, 48dp tall
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(8),     // 8dp radius
    ),
    elevation: 0,                                 // Flat — no elevation on buttons
  ),
  child: Text('Label', style: Theme.of(context).textTheme.labelLarge),
)
```

### 4.3 SOS / Accent Button

```dart
ElevatedButton(
  onPressed: () {},
  style: ElevatedButton.styleFrom(
    backgroundColor: AppTheme.accent,             // #FF6B4A — SOS only
    foregroundColor: Colors.white,
    minimumSize: Size(80, 80),                    // Circular, large tap target
    shape: CircleBorder(),
    elevation: 4,                                 // Slightly elevated for urgency
  ),
  child: Icon(Icons.sos_rounded, size: 32),
)
```

**Important:** The AccentButton style is used ONLY for the SOS trigger.
Do not reuse this style for any other button in the app.

### 4.4 Input Fields

```dart
TextFormField(
  decoration: InputDecoration(
    labelText: 'Label',
    labelStyle: TextStyle(color: AppTheme.textSecondary),
    filled: true,
    fillColor: Color(0xFFF0F4F8),                // Very light gray-blue fill
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(8),
      borderSide: BorderSide.none,               // No border by default
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(8),
      borderSide: BorderSide(color: AppTheme.secondary, width: 1.5), // Blue on focus
    ),
    errorBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(8),
      borderSide: BorderSide(color: AppTheme.accent, width: 1.5),    // Coral on error
    ),
    contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 14),
  ),
)
```

### 4.5 Status Badges

```dart
// Use these exact colors for appointment status:
Container(
  padding: EdgeInsets.symmetric(horizontal: 10, vertical: 4),
  decoration: BoxDecoration(
    color: _getBadgeColor(status).withOpacity(0.12), // Light background
    borderRadius: BorderRadius.circular(20),
  ),
  child: Text(
    status,
    style: TextStyle(
      color: _getBadgeColor(status),               // Full color text
      fontSize: 12,
      fontWeight: FontWeight.w500,
    ),
  ),
)

Color _getBadgeColor(String status) {
  switch (status) {
    case 'pending':  return Color(0xFFF39C12);  // Orange
    case 'approved': return Color(0xFF27AE60);  // Green
    case 'rejected': return AppTheme.accent;    // Coral
    default:         return AppTheme.textSecondary;
  }
}
```

### 4.6 Critical Level Badges (Appointments)

```dart
// In appointment lists and forms:
Color _getCriticalColor(String level) {
  switch (level) {
    case 'High':   return AppTheme.accent;              // #FF6B4A
    case 'Medium': return Color(0xFFF39C12);            // Orange
    case 'Low':    return Color(0xFF27AE60);            // Green
    default:       return AppTheme.textSecondary;
  }
}
```

### 4.7 Bottom Navigation Bar

```dart
BottomNavigationBar(
  backgroundColor: Colors.white,
  selectedItemColor: AppTheme.secondary,          // #4A90E2 — active tab
  unselectedItemColor: AppTheme.textSecondary,    // #7F8C8D — inactive
  selectedFontSize: 12,
  unselectedFontSize: 12,
  type: BottomNavigationBarType.fixed,
  elevation: 8,
  // Student tabs: Home, Appointments, Profile
  // Psychiatrist tabs: Dashboard, Students, Alerts
)
```

### 4.8 AppBar

```dart
AppBar(
  backgroundColor: Colors.white,
  elevation: 0,                                   // Flat — no shadow
  title: Text('Page Title', style: Theme.of(context).textTheme.headlineLarge),
  foregroundColor: AppTheme.textPrimary,
  actions: [
    IconButton(
      icon: Icon(Icons.logout, color: AppTheme.textSecondary),
      onPressed: () => _showLogoutDialog(context),
    ),
  ],
)
```

### 4.9 Skeleton Loading (Shimmer)

```dart
// Use the shimmer package for all loading states
Shimmer.fromColors(
  baseColor: Color(0xFFE0E0E0),
  highlightColor: Color(0xFFF5F5F5),
  child: Container(
    height: 80,                                   // Match real item height
    decoration: BoxDecoration(
      color: Colors.white,
      borderRadius: BorderRadius.circular(12),
    ),
  ),
)
```

**Rule:** Every list driven by `StreamBuilder` or `FutureBuilder` must show
shimmer items while loading. Minimum 3 skeleton items visible.

### 4.10 Snackbar (Error and Success)

```dart
// Error
ScaffoldMessenger.of(context).showSnackBar(
  SnackBar(
    content: Text('Something went wrong. Please try again.'),
    backgroundColor: AppTheme.accent,
    behavior: SnackBarBehavior.floating,
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
    margin: EdgeInsets.all(16),
    action: SnackBarAction(label: 'Retry', textColor: Colors.white, onPressed: () {}),
  ),
);

// Success
ScaffoldMessenger.of(context).showSnackBar(
  SnackBar(
    content: Text('Appointment requested successfully.'),
    backgroundColor: Color(0xFF27AE60),
    behavior: SnackBarBehavior.floating,
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
    margin: EdgeInsets.all(16),
  ),
);
```

**Rules:**
- Always use `SnackBarBehavior.floating` — never the default bottom-attached style
- Never use a full-screen dialog for error messages
- Snackbar duration: 3 seconds for info, 5 seconds for errors with a retry action

---

## 5. Elevation & Depth

| Component | Elevation | Notes |
|---|---|---|
| AppBar | 0dp | Flat, no shadow |
| Cards | 2dp (via BoxShadow) | Subtle, never harsh |
| Bottom Navigation | 8dp | Lifts above content |
| SOS Button | 4dp | Intentionally elevated for urgency |
| Modals / Bottom Sheets | 8dp | Provided by Flutter defaults |
| All other buttons | 0dp | Flat with ripple only |

---

## 6. Animation & Transitions

### Page Transitions
```dart
// Slide from right (consistent across all navigation):
Navigator.push(context, PageRouteBuilder(
  pageBuilder: (_, __, ___) => DestinationPage(),
  transitionsBuilder: (_, animation, __, child) {
    return SlideTransition(
      position: Tween<Offset>(begin: Offset(1, 0), end: Offset.zero)
        .animate(CurvedAnimation(parent: animation, curve: Curves.easeInOut)),
      child: child,
    );
  },
  transitionDuration: Duration(milliseconds: 250),
));
```

### Interaction Feedback
- **Button tap:** Flutter's default ripple (`InkWell`) — no custom animation needed
- **SOS button tap:** `HapticFeedback.heavyImpact()` — mandatory, must be tested
- **Regular button taps:** `HapticFeedback.lightImpact()` — optional but encouraged
- **Triple-tap logo:** `HapticFeedback.lightImpact()` on each tap
- **Duration for all transitions:** 200–300ms — never slower

### What NOT to Animate
- Do not animate data updates in lists (avoid jarring reorders)
- Do not use hero animations (not necessary for MVP)
- Do not animate color changes

---

## 7. Accessibility

| Rule | Requirement |
|---|---|
| Tap target minimum | 48 × 48dp for every interactive element |
| Text contrast ratio | ≥ 4.5:1 for all body text (WCAG AA) |
| `Semantics` labels | Add for icon-only buttons (e.g., logout icon) |
| Font scaling | Test at 1.3× system font scale — no text overflow |
| Screen reader | All form fields have `labelText` or `Semantics` child |

```dart
// Example: Adding semantics to logout icon
Semantics(
  label: 'Logout',
  button: true,
  child: IconButton(icon: Icon(Icons.logout), onPressed: ...),
)
```

---

## 8. Light Mode Only

This MVP is **light mode only.**
- Do NOT use `MediaQuery.of(context).platformBrightness`
- Do NOT implement `ThemeMode.dark`
- Do NOT use `Theme.of(context).brightness`
- Force light mode in `MaterialApp`:

```dart
MaterialApp(
  themeMode: ThemeMode.light,  // Always light
  theme: AppTheme.lightTheme,
  ...
)
```

---

## 9. Design Audit Checklist (Run Before Every PR)

Before requesting a PR review, open each screen you changed and verify:

```
Visual Audit
[ ] Background is #F8F9FA (not white, not gray)
[ ] Cards are white with 12dp radius and subtle shadow
[ ] Primary buttons are #4A90E2, 48dp tall, full width where appropriate
[ ] Only SOS uses #FF6B4A as button background
[ ] No hardcoded colors (search "Color(0x" in your changed files)
[ ] No hardcoded TextStyle (search "fontSize:" in your changed files)

Spacing Audit
[ ] Screen edges have 16dp margin
[ ] Gaps between elements are 8dp or 16dp (never 5, 7, 10, etc.)
[ ] Card padding is 16dp internally

Accessibility Audit
[ ] All buttons and tappable areas are at least 48dp tall/wide
[ ] Icon-only buttons have Semantics labels
[ ] No text is below 12sp

Feedback Audit
[ ] Loading state visible on async operations
[ ] Error state handled with Snackbar (not crash, not silent fail)
[ ] Success state shows confirmation Snackbar
```

---

*This is the law. When in doubt, simpler is always right.*
