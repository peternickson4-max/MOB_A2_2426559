# PeterPortfolio — User Flow and Information Architecture

## Main navigation

Bottom tabs:
1. Home
2. Skills
3. Projects
4. Profile
5. About

Nested stack:
- MainTabs
  - Projects tab → Project Details (`projectId` parameter)

## Main flows

### Recruiter review
Launch app → Home introduction → Skills and education → Projects → open a project detail → About.

### Edit profile
Profile tab → edit headline, biography, primary skill and availability → validate → field-level errors if invalid → correct errors → save → Home reflects updated profile.

### Profile image
Home → Choose image or Take photo → request permission → select/capture or cancel → preview → replace or remove → save profile from Profile tab.

### Persistence
App starts → AsyncStorage is read → saved profile replaces defaults → edits are validated → save → close/restart app → saved profile is restored.

## Information architecture

The five bottom tabs expose the major portfolio areas. Project Details is a stack screen above the tabs, so Android Back returns to the previous screen while preserving the current session. Profile fields are controlled by React state; AsyncStorage stores the editable profile as JSON.
