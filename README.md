# Base layout template with Gulp, SCSS and Stylelint

1. Create a repo using this template
1. Replace `<your_account>` and `<repo_name>` with your Github username and the new repo name
   - [DEMO LINK](https://IvanRyabukha.github.io/2048_copy_JS_game/)

# JS 2048 Game

Classic **2048** puzzle game implemented in **pure JavaScript**.

- Move tiles with arrow keys (← ↑ → ↓)
- Combine numbers to reach **2048**
- Score tracking and restart option
- Clean, modular architecture (`Game.class.js` handles logic)

## 🧩 Project structure

.
├── src
│ ├── modules
│ │ └── Game.class.js # Game logic
│ ├── styles # SCSS styles
│ ├── scripts # Main JS files
│ └── index.html # Entry point
├── gulpfile.js # Build configuration
├── package.json
├── .stylelintrc
└── README.md

## 🚀 How to run locally

**Clone the repository**

```bash
git clone https://IvanRyabukha.github.io/2048_copy_JS_game/
cd js_2048_game

Install dependencies
npm install

Run the project
npm start
```
