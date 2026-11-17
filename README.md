# ⚽ PitchSide

A responsive football live-scores website built with plain HTML, CSS and JavaScript (no frameworks, no build step).

## Features
- Today's matches with live score, status and minute
- Date strip and competition filters
- Match centre: events timeline, key stats and lineups
- Team pages: coach, recent results, upcoming fixtures and squad
- Competition pages: standings with form, results and fixtures
- Team search, live-match ticker, dark/light theme
- Grass-green theme with generated team badges (no image files needed)

## Project structure
```
pitchside/
├── index.html   # page structure
├── styles.css   # design tokens, layout, grass background
├── app.js       # routing and page rendering
└── data.js      # teams, matches, events, standings (sample data)
```

## Run locally
Open `index.html` in your browser, or serve the folder with VS Code Live Server
(or `npx serve`). All four files must be in the same folder.

## Customize
- **Colors:** edit the variables at the top of `styles.css` (`--ac`, `--ac2`, `--g1`, `--g2`).
- **Data:** all matches, teams and standings live in `data.js`.
- **Team logos:** add an image URL as the 4th value of a team in `data.js`,
  e.g. `["Arsenal","ARS","#e03a3e","logos/arsenal.png"]`. Without it, a shield badge is generated.

## Sample data
Scores, lineups, coaches and standings are **sample data**. To show real results, connect a
licensed football data provider (for example football-data.org) through your own backend and
replace the arrays in `data.js` with fetched data. Keep API keys on the server, never in browser code,
and check the provider's terms before displaying data publicly.

## Deploy with GitHub Pages
1. Push the project to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. Your site will be live at `https://<username>.github.io/<repo-name>/`.

## License
Add a license of your choice (for example MIT) before sharing publicly.
Club names are used only as sample labels; this project is not affiliated with any club or league.
