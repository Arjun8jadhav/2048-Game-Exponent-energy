# 2048 (React + Vite + SCSS)

A clean, functional implementation of the 2048 game with a responsive grid UI and SCSS styling.

## Features

- Functional core game logic (pure functions for moves, merge, spawn)
- Keyboard and on-screen controls (↑ ↓ ← →)
- Configurable board size (3×3 to 8×8)
- Responsive, SCSS-based board with smooth colors
- Score tracking, restart button

## Requirements

- Node.js: 20.19+ or 22.12+ (due to Vite 7 engine requirements)
  - If you are on Node 20.11 or lower, either upgrade Node or downgrade Vite (see Troubleshooting)
- npm 10+

## Quick start

```bash
cd "Exponent energy task"
npm install
npm run dev
```

Then open the printed local URL in your browser (usually `http://localhost:5173`).

## Controls

- Keyboard: Arrow keys to move tiles
- On-screen buttons: Click ↑ ↓ ← →
- Restart: Click the Restart button
- Board size: Use the dropdown to choose 3–8; the game re-initializes with the selected size

## Project structure

```
src/
  components/
    Board.jsx, Board.scss
    Controls.jsx, Controls.scss
    ScoreBar.jsx, ScoreBar.scss
    Game.jsx
  hooks/
    useKeyboard.js
  logic/
    board.js        # pure game logic (init, move, spawn, canMove, has2048)
  state/
    actions.js, gameReducer.js
  styles/
    variables.scss, globals.scss
  App.jsx, main.jsx
```

## Styling

- Global styles live in `src/styles/globals.scss` and are imported in `Game.jsx`.
- The board is a CSS Grid in `src/components/Board.scss` and scales with the viewport.
- Tile colors are defined via a SCSS map in `src/styles/variables.scss`.

Tip: If you want a firmer max width on large screens, set:

```scss
/* src/components/Board.scss */
.board {
	max-width: min(70vw, 600px);
}
```

## Scripts

- `npm run dev` – start the dev server
- `npm run build` – production build
- `npm run preview` – preview the production build

## Troubleshooting

### "Vite requires Node.js version 20.19+ or 22.12+"

- You’re likely on Node 20.11 or older. Options:
  1. Upgrade Node (recommended): install Node 22 LTS, reopen terminal, run `node -v` to confirm.
  2. OR downgrade Vite for Node 20.11 compatibility:
     ```bash
     npm i -D vite@5 @vitejs/plugin-react@4
     ```

### Styles not applying

- Ensure SCSS imports exist:
  - `Game.jsx` imports `../styles/globals.scss`
  - `Board.jsx` imports `./Board.scss`
  - Component SCSS files sit next to their components
- Hard refresh the browser (Ctrl/Cmd + Shift + R)

### Grid too wide or too narrow

- Tweak `max-width` in `src/components/Board.scss` and the gap/tile sizes as needed.

---

Made with React + Vite + SCSS. Enjoy playing!
