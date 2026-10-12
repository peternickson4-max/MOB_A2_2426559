# UI/UX Design — PeterPortfolio

Student: Shyaka Peter Guy  
Registration number: 24/26559  
Verification code: MOB-A2-6559  
Required Home sentence: “My name is Shyaka Peter Guy.”

## Page 1 — Identity and concept
PeterPortfolio is a mobile portfolio for presenting a student’s skills, education and genuine projects to internship reviewers. Visual direction: deep blue, pale blue and white; strong contrast; simple cards; readable text.

## Page 2 — User flow and information architecture
Bottom tabs: Home, Skills, Projects, Profile and About. Projects opens a nested Project Details route. Profile editing follows edit → validate → show field-level errors or save → persist using AsyncStorage → restore after restart. Media flow: request permission → select/capture image → preview → replace/remove. Core portfolio content should remain available in Airplane Mode.

## Pages 3–4 — Annotated wireframes
Include annotated views for Home, Skills and Education, Projects, Project Details, Profile Editor, validation errors and About. Show navigation controls, key labels, action buttons, empty/error/success states and how the layout adapts to a narrow phone. Final screenshots must come from the actual running app, not mock images represented as test evidence.

## Page 5 — Visual and accessibility decisions
Palette: deep blue #275DAD, pale blue #EEF4FF, dark text #172033, muted text #596579 and white cards. Use reusable Flexbox layouts, scrollable screens, readable body text, consistent spacing and visible field labels. Inputs and controls should have accessibility labels; errors must include text, not color alone. Aim for touch targets around 44 points and test Android’s increased text size. Store only low-risk portfolio data locally; never store passwords, tokens or sensitive records.

## Optional page 6 — Implementation comparison
If included, compare real final-app screenshots against the approved wireframes and explain actual changes. Remove this page if using a five-page document.
