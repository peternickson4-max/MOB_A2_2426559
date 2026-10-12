# Final APK build and verification — required student actions

This source package is prepared for the assignment, but no APK is included because a cloud EAS build must be run under an authorized Expo account and then installed and tested on a real Android device. Do not describe the APK as verified until the steps below have passed.

## 1. Install and check the source on Windows

Open PowerShell in this folder (the folder containing `package.json`):

```powershell
npm.cmd install
npx.cmd expo-doctor
npm.cmd run typecheck
npx.cmd expo start
```

Open the app in Expo Go for development checks. Expo Go is not the standalone APK requirement.

## 2. Build the standalone APK

Create/sign in to an Expo account in your own terminal. Never send your password to another person or paste it into a chat.

```powershell
npx.cmd eas-cli@latest login
npx.cmd eas-cli@latest build:configure
npx.cmd eas-cli@latest build --platform android --profile preview
```

Wait until EAS reports the build as successful. Open the build URL printed in the terminal and download the APK. Rename the downloaded file to `MOB_A2_2426559.apk` only after a successful download.

## 3. Verify the downloaded APK

Install the APK on an Android phone (not just Expo Go). Check all of these and record the actual result in `evidence/MOB_A2_2426559_TEST_LOG.pdf`:

- App opens from the Android launcher without Expo Go.
- Home begins with `My name is Shyaka Peter Guy.`
- About shows `MOB-A2-6559` and registration `24/26559`.
- A headline shorter than 5 characters, biography shorter than 30 characters, and primary skill shorter than 2 characters each show field-level errors and prevent saving.
- Valid profile changes save, then remain after force-closing and reopening the app.
- Gallery image selection and camera capture work after granting permissions; cancellation and denied permission are handled; image can be previewed and removed.
- Project cards open separate detail screens and Back returns to the prior navigation state.
- Core screens work in Airplane Mode.

Record your actual phone model, Android version, date, EAS build URL, and test outcomes. Do not mark tests passed before running them.

## 4. Remaining release deliverables

The APK, two-minute demo video, GitHub repository/release URLs, final commit hash, and a verified-device test record must be created by actually performing the steps. They are not fabricated or represented as completed in this source package. Review all project contribution statements and education/skills for accuracy before submitting.
