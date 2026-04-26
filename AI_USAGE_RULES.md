# 🤖 AI Usage Rules — Campus Mental Health Support System

> This document governs how Claude and Gemini (via Antigravity IDE) are used
> throughout this project. Every team member must read and follow these rules.
>
> AI agents are powerful tools. Without discipline, they are the fastest way to
> create a codebase that nobody fully understands and nobody can safely modify.

---

## The Core Problem

AI agents in Antigravity IDE can generate dozens of files and hundreds of lines of code
in seconds. This feels like progress. It is often the opposite, because:

1. **AI generates plausible-looking code that hasn't been tested** — it compiles but breaks at runtime
2. **AI does not know your full codebase** — it invents function names, collection names, and variable names that don't match what exists
3. **AI doesn't respect your design system** — it introduces hardcoded colors, custom font sizes, and random spacing
4. **AI solves the literal prompt, not the actual problem** — a vague prompt gets a vague (broken) solution
5. **AI scope creeps** — given a chance, it will add "helpful" features outside your MVP

The rules below exist to keep you in control, not the agent.

---

## Rule 1: One Prompt = One Atomic Task

### What This Means
Each AI prompt must request **exactly one small, independently testable change.**

### Prompt Anatomy (What a Good Prompt Contains)

```
1. The specific FILE to modify (full path)
2. The specific WIDGET or FUNCTION to add/change
3. The specific BEHAVIOR expected
4. The DESIGN constraints (color, spacing — reference DESIGN_SYSTEM.md values)
5. What NOT to change (protects surrounding code)
```

### Good Prompt Examples

```
"In lib/pages/student/book_appointment_page.dart, add a TextFormField 
that opens showDatePicker when tapped. The selected date must be stored in 
a DateTime? variable called _selectedDate. Only allow dates in the future 
(after DateTime.now()). Use the secondary color #4A90E2 for the confirm 
button in the picker theme. Do not modify any other part of the file."
```

```
"In lib/services/appointment_service.dart, add a method called 
createAppointment that takes an AppointmentModel and writes it to the 
Firestore 'appointments' collection. Return a Future<void>. 
Handle exceptions by rethrowing them. Do not modify any existing methods."
```

```
"In lib/widgets/skeleton_item.dart, create a new widget called SkeletonItem 
using the shimmer package. It should accept a double height parameter and 
render a rounded rectangle (12dp radius) with shimmer effect using 
baseColor #E0E0E0 and highlightColor #F5F5F5. Keep it as a stateless widget."
```

### Bad Prompt Examples (Never Do These)

```
❌ "Build the entire Book Appointment page"
   Why: AI will build everything but nothing will match your design or Firestore schema.

❌ "Make the Student Dashboard functional"
   Why: Too vague — the AI will invent data structures and miss your 60-30-10 colors.

❌ "Add SOS with push notifications"
   Why: Two separate phases worth of work. The result will be buggy and monolithic.

❌ "Complete Phase 2"
   Why: Catastrophically scoped. You will spend more time fixing than building.

❌ "Refactor the codebase to be cleaner"
   Why: AI will restructure files that work fine and break things in the process.
```

### The Split Test

If your prompt contains the word **"and"**, split it into two prompts.

```
❌ "Add the date picker AND write the appointment to Firestore"

✅ Prompt 1: "Add the date picker field"
✅ Prompt 2: "Write the appointment data to Firestore on form submission"
```

---

## Rule 2: Never Commit Without Human Testing

### The Gate That Cannot Be Bypassed

After every AI-generated code change, before you type `git add`:

```
1. Run the app:     flutter run
2. Navigate to:     the exact screen the AI modified
3. Perform:         the exact action the prompt described
4. Verify:          it works as expected in the UI
5. Verify:          surrounding features still work (didn't break anything)
6. Only then:       git add + git commit
```

This takes 2–5 minutes. It saves hours of debugging later.

### Common AI Failures to Watch For

| Symptom | Likely AI Mistake | What to Check |
|---|---|---|
| App crashes immediately | Null check on a nullable variable | Find `!` on a nullable and add null check |
| Firestore write silently fails | Wrong collection name or field type mismatch | Check Firebase console for the document |
| UI looks wrong | Inline hardcoded color instead of `AppTheme.secondary` | Search for `Color(0xFF...)` in the file |
| Navigation doesn't work | `Navigator.push` called with wrong context | Move Navigator call inside a `Builder` |
| Stream doesn't update | Missing index or wrong `where` clause | Check Firebase console for the query |
| Widget not found | AI imported from a package you don't have | Check `pubspec.yaml` |
| Colors are off | AI used `Colors.blue` instead of `AppTheme.secondary` | Find and replace with constants |
| Spacing looks wrong | AI used `SizedBox(height: 10)` or `padding: 5` | Fix to 8dp-grid values |

### If the Feature Doesn't Work

Do not commit. Do not push. Take one of these approaches:

**Option A: Refine the Prompt**
```
"The code you generated in [file] for [function] does not work because [exact error].
Here is the relevant context: [paste the error + relevant code].
Fix only the [specific issue] without changing anything else."
```

**Option B: Fix Manually**
If the AI's structure is correct but a detail is wrong, fix it yourself.
Small manual fixes are often faster than re-prompting.

**Option C: Discard and Re-prompt**
If the generated code is fundamentally wrong:
```bash
git checkout lib/pages/student/book_appointment_page.dart
# This restores the file to its last committed state
```
Then write a more specific prompt.

---

## Rule 3: Never Let AI Modify Files Outside the Prompt Scope

### The Single File Rule

Every prompt must specify **which file** the AI is allowed to modify.
If the AI suggests changes to other files, **reject those changes.**

```dart
// ✅ Correct prompt response: AI only touches the file you specified

// ❌ AI offers to also modify:
// - Other pages it thinks need updating
// - The routing logic
// - The service class (when you only asked for the UI)
// - pubspec.yaml (when you didn't ask for a new package)
```

### How to Enforce This in Antigravity

When accepting AI suggestions:
- Review each file the AI wants to change before accepting
- Accept only the file(s) explicitly named in your prompt
- If the AI modified `app_theme.dart` and you didn't ask it to — **reject that change**

### Exception: Legitimate Cross-File Changes

Some single tasks genuinely require touching 2 files:
- Adding a new model (`appointment_model.dart`) AND using it in a service — acceptable
- Adding a new page AND registering its route — acceptable

In these cases, your prompt should explicitly name both files:
```
"Create a new file lib/models/appointment_model.dart with the AppointmentModel 
class. Also add an import for it in lib/services/appointment_service.dart. 
Do not modify any other files."
```

---

## Rule 4: AI for Patterns and Structure — Human for Business Logic

### What AI is Good At in This Project

| ✅ Use AI For | Reason |
|---|---|
| `StreamBuilder` / `FutureBuilder` boilerplate | Structural pattern — unlikely to have logic errors |
| Widget layout (Column, Row, Padding) | Visual structure — easy to verify visually |
| Form validation boilerplate | Standard patterns |
| `TextFormField` with `InputDecoration` | Cosmetic — verify colors manually |
| Firebase CRUD structure | Easy to verify in Firebase console |
| Shimmer skeleton layout | Visual — verify in emulator |
| `showDatePicker` / `showTimePicker` boilerplate | Standard Flutter pattern |
| Test boilerplate | Easy to verify by running tests |

### What You Must Write or Carefully Review Yourself

| ⚠️ Be Careful With | Reason |
|---|---|
| Firestore security rules | Wrong rules = data breach or broken app for all users |
| Emergency SOS location logic | Safety-critical — test on a real device |
| FCM notification handling | Complex platform differences — test on Android AND iOS |
| Role-based routing logic | Wrong routing = student sees psychiatrist screens |
| Triple-tap countdown logic | Edge cases with timers are hard for AI to get right |
| Offline queuing behavior | Firestore persistence edge cases |
| Conflict resolution logic | Only you know what the correct intent is |

---

## Rule 5: Reject AI Suggestions Outside MVP Scope

### The Scope Boundary

Before accepting any AI-generated feature, ask:
**"Is this in MVP_SCOPE.md?"**

If no → reject it immediately, regardless of how useful it sounds.

### Common Out-of-Scope AI Suggestions to Reject

| AI Might Suggest | Your Response |
|---|---|
| "Would you like me to add a chat feature?" | No. Not in scope. |
| "I've added a dark mode toggle for you" | Remove it. Not in scope. |
| "I've also uploaded a profile picture feature" | Remove it. Not in scope. |
| "I embedded Google Maps with the API key" | Replace with map_launcher. No API keys. |
| "I added an AI chatbot for mental health advice" | Remove it. No AI in this app. |
| "I've added SMS notifications as a fallback" | Remove it. Not in scope. |
| "I created a separate admin portal" | Remove it. Not in scope. |

### How to Handle It

When AI adds something out of scope:
1. Do NOT commit the out-of-scope code
2. Revert the file: `git checkout lib/the-file-ai-touched.dart`
3. Re-prompt with a more restrictive instruction that includes "Do not add anything beyond what was explicitly asked"

---

## Rule 6: Design System Enforcement After Every AI Response

AI agents do not have your `DESIGN_SYSTEM.md` memorized.
After every AI-generated UI code, run this search before committing:

```bash
# Search for hardcoded colors in the file AI just edited
grep -n "Colors\." lib/pages/student/book_appointment_page.dart
grep -n "Color(0x" lib/pages/student/book_appointment_page.dart

# Search for hardcoded font sizes
grep -n "fontSize:" lib/pages/student/book_appointment_page.dart

# Search for non-grid spacing (look for suspicious numbers like 5, 10, 15, 20)
grep -n "SizedBox(height: [^0-9]*[05]\b" lib/pages/student/book_appointment_page.dart
```

Fix every instance found:

```dart
// Replace:
color: Colors.blue                          →  color: AppTheme.secondary
color: Color(0xFF4A90E2)                    →  color: AppTheme.secondary
style: TextStyle(fontSize: 16)              →  style: Theme.of(context).textTheme.bodyLarge
SizedBox(height: 10)                        →  SizedBox(height: AppConstants.spaceXS)
padding: EdgeInsets.all(5)                  →  padding: EdgeInsets.all(AppConstants.spaceXXS)
```

---

## Prompting Cheat Sheet for This Project

### Template for UI Pages

```
In [full file path], [add/modify] the [widget name].

Requirements:
- [Specific behavior 1]
- [Specific behavior 2]
- Colors: use AppTheme.secondary (#4A90E2) for primary buttons, 
  AppTheme.accent (#FF6B4A) only for SOS, AppTheme.backgroundPrimary (#F8F9FA) for background
- Spacing: all padding/margin values must be multiples of 8dp
- Use Theme.of(context).textTheme for all text styles — no inline TextStyle
- Card container: white background, 12dp border radius, subtle box shadow
- Do not modify any other widget or file.
```

### Template for Firestore Service Methods

```
In [full file path], add a method called [methodName].

It should:
- Accept [parameters]
- Read from / Write to the '[collection_name]' Firestore collection
- Return a [return type]
- Handle exceptions by [rethrowing / showing snackbar / logging]
- Match this schema exactly: [paste relevant schema from MVP_SCOPE.md]

Do not modify existing methods. Do not add new imports beyond what is needed.
```

### Template for Bug Fixes

```
In [full file path], the [feature] is broken because [exact error message or behavior].

Here is the relevant code section:
[paste only the broken code — not the whole file]

Fix only this issue. Do not refactor or restructure surrounding code.
The fix should [describe expected behavior].
```

---

## One Final Reminder

The AI agent is a junior developer who:
- Writes fast but makes mistakes
- Doesn't know your codebase history
- Doesn't know your team's agreements
- Can't test its own code
- Will always say "yes" to a request, even if it's a bad idea

**You are the senior developer.** You review, you test, you decide what merges.

The quality of this project is determined by the quality of your human review,
not the speed of the AI's generation.

---

*These rules apply to Claude, Gemini, and any other AI agent used in Antigravity.*
*If a new AI tool is added to the project, this document must be updated.*
