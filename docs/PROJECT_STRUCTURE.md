# Project Structure

```text
PeterPortfolio/
├── App.tsx                 # Expo entry wrapper
├── src/
│   └── App.tsx             # React Native screens, navigation and state
├── app.json
├── eas.json
├── package.json
├── tsconfig.json
├── .gitignore
├── README.md
├── docs/
│   ├── MOB_A2_2426559_UIUX.pdf
│   ├── UIUX_CONTENT.md
│   ├── USER_FLOW.md
│   ├── FINAL_SUBMISSION_CHECKLIST.md
│   └── PROJECT_STRUCTURE.md
└── evidence/
    ├── MOB_A2_2426559_TEST_LOG.pdf
    ├── MOB_A2_2426559_DECLARATION.pdf
    ├── TEST_LOG_TEMPLATE.md
    └── AI_USE.md
```

`App.tsx` is a small Expo entry wrapper. The complete application source is under `src/App.tsx`, so the repository includes the required `src/` directory. For a larger project, screens and reusable components can later be split into separate files.
