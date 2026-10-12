My name is Shyaka Peter Guy.

# PeterPortfolio

**Student:** Shyaka Peter Guy  
**Registration number:** 24/26559  
**Verification code:** MOB-A2-6559  
**App version:** 1.0.0  
**Android package:** `rw.ac.ines.ug2426559.peterportfolio`

## Purpose

PeterPortfolio is a personal portfolio app for introducing a student to internship reviewers. It presents skills, education, projects and editable profile information, and is designed to keep its core screens available offline.

## Features

- Home introduction with the exact sentence “My name is Shyaka Peter Guy.”
- Profile avatar/image, headline, biography, primary skill and availability.
- Five skills and an education/training summary. Confirm all details are accurate before submission.
- Two project examples with separate project-detail screens. Personalize contributions and outcomes to match work actually completed.
- Bottom-tab navigation and a nested stack route for project details.
- Controlled profile editor with field-level validation.
- Gallery selection and camera capture with permission and cancellation feedback, preview and remove action.
- Local persistence using AsyncStorage.
- About screen with app identity, registration number, verification code, version and data-use statement.

## Install and run on Windows

Open PowerShell in the folder containing `package.json`:

```powershell
npm.cmd install
npx.cmd expo-doctor
npm.cmd run typecheck
npx.cmd expo start
```

Scan the Expo QR code using Expo Go for development testing only. The assignment requires a standalone APK that runs without Expo Go.

## Build the standalone Android APK

```powershell
npx.cmd eas-cli@latest login
npx.cmd eas-cli@latest build:configure
npx.cmd eas-cli@latest build --platform android --profile preview
```

The `preview` profile is configured to produce an APK. Download it only after EAS reports a successful build, then install and test it on an Android phone.

## APK build and verification

Follow [`BUILD_AND_VERIFICATION.md`](BUILD_AND_VERIFICATION.md) to run checks, build the standalone APK with your own Expo account, install it on Android, and record real test results. No APK or physical-device verification is claimed by this source ZIP.

## Required deliverables

- `docs/MOB_A2_2426559_UIUX.pdf`
- `evidence/MOB_A2_2426559_TEST_LOG.pdf`
- `evidence/MOB_A2_2426559_DECLARATION.pdf`
- `evidence/AI_USE.md`
- `MOB_A2_2426559.apk` (after successful EAS build)
- `MOB_A2_2426559_DEMO.mp4` (record actual app demonstration)
- GitHub repository `MOB_A2_2426559` and release tag `v1.0.0`

## Final verification details — complete after actually doing them

- Tested device: `[enter actual phone/emulator model]`
- Android version: `[enter actual Android version]`
- Type check: `[record actual result]`
- Expo Doctor: `[record actual result]`
- EAS build URL: `[add successful build URL]`
- Final commit hash: `[fill after final commit]`
- GitHub repository URL: `[fill after pushing repository]`
- GitHub release URL: `[fill after publishing v1.0.0]`
- APK download URL: `[fill after attaching APK to release]`

Do not claim these checks or releases are complete until you have personally run and verified them.

## Known limitations to review

- The project descriptions are starter examples. Replace any claim that does not reflect your own contribution.
- Image URI persistence may vary by Android version; test after closing and reopening the installed app.
- This starter project has not been verified as a successful production build or physical-device test in this package.
