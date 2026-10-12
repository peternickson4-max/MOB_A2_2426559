# MOB_A2_2426559 — Test Log

Student: Shyaka Peter Guy  
Registration number: 24/26559  
App: PeterPortfolio  
Verification code: MOB-A2-6559  
Date tested: `[YYYY-MM-DD]`  
Device/emulator: `[model]`  
Android version: `[version]`  
APK version/build: `[version/build ID]`

**Important:** Do not mark a test PASS until you personally run it and observe the result.

| ID | Test | Steps | Expected result | Actual result / evidence | Status |
|---|---|---|---|---|---|
| T01 | Standalone launch | Install APK and launch without Expo Go | App opens to portfolio | `[record]` | NOT RUN |
| T02 | Identity sentence | Open Home | “My name is Shyaka Peter Guy.” appears exactly | `[record]` | NOT RUN |
| T03 | Verification code | Open Home and About | MOB-A2-6559 is visible | `[record]` | NOT RUN |
| T04 | Skills | Open Skills tab | At least five skills and education timeline display | `[record]` | NOT RUN |
| T05 | Project details | Open each project | Correct detail screen and content display | `[record]` | NOT RUN |
| T06 | Stack back navigation | Open project details and press Android Back | Returns to previous screen and session remains | `[record]` | NOT RUN |
| T07 | Headline validation | Enter fewer than 5 characters and save | Field-level error; invalid data not saved | `[record]` | NOT RUN |
| T08 | Biography validation | Enter fewer than 30 characters and save | Field-level error; invalid data not saved | `[record]` | NOT RUN |
| T09 | Primary skill validation | Enter fewer than 2 characters and save | Field-level error; invalid data not saved | `[record]` | NOT RUN |
| T10 | Valid save | Enter valid values and save | Confirmation; Home reflects saved values | `[record]` | NOT RUN |
| T11 | Restart persistence | Save, fully close, relaunch | Saved profile is restored | `[record]` | NOT RUN |
| T12 | Gallery selection | Choose image and select one | Image preview appears | `[record]` | NOT RUN |
| T13 | Gallery cancellation | Open gallery then cancel | Friendly cancellation feedback; app remains usable | `[record]` | NOT RUN |
| T14 | Permission denial | Deny image/camera permission | Friendly message; app remains usable | `[record]` | NOT RUN |
| T15 | Remove image | Remove selected image and save | Avatar returns to initials | `[record]` | NOT RUN |
| T16 | Airplane Mode | Enable Airplane Mode and navigate core tabs | Saved core portfolio remains usable offline | `[record]` | NOT RUN |
| T17 | Narrow screen / large text | Test narrow device and increased system font | Content remains readable and reachable | `[record]` | NOT RUN |
| T18 | EAS APK install | Build preview APK, install and open | APK installs and launches independently | `[record]` | NOT RUN |

## Build and code checks

- `npm.cmd run typecheck`: `[NOT RUN / PASS / FAIL; include output]`
- `npx expo-doctor`: `[NOT RUN / PASS / FAIL; include output]`
- EAS build URL and ID: `[fill after build]`
- Final commit hash: `[fill after commit]`
- Evidence screenshots/video file names: `[list actual evidence]`

## Issues and fixes

`[Record actual issues, fixes, retest outcomes and dates. Do not invent results.]`
