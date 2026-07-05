# SG-OS — Shreyansh Gupta's Portfolio

An interactive portfolio styled as an operating system: a boot sequence on load, a
terminal/system aesthetic throughout, scroll-triggered reveals, and a persistent
"system bar" that tracks your scroll progress like a loading percentage.

No build step. No framework. Just HTML, CSS, and vanilla JS — so it's easy to
keep editing yourself and free to host.

## File structure

```
sg-os-portfolio/
├── index.html      → structure & content containers
├── css/style.css   → design system (all colors/fonts as CSS variables at the top)
└── js/script.js    → boot sequence, content data, animations
```

## Editing your content

Almost everything you'll want to update lives in **`js/script.js`** at the top,
as plain data — no HTML editing required:

- `PROCESSES` — the "currently learning" list
- `SKILLS` — grouped skill tags (set `learning: true` for in-progress skills, shown in amber)
- `PROJECTS` — each project card (name, description, problem solved, tags, GitHub link)
- `TIMELINE` — your education/journey timeline

To change colors or fonts, edit the `:root` variables at the top of `css/style.css`.

## Version history

**v1.0** — Boot screen, scrolling portfolio (About, Skills, Education, Certifications,
Projects, Journey, Contact), terminal theme, scroll reveal animations.

**v2.0 (current)** — Real window management:
- **Drag** — grab any window's title bar to move it (mouse + touch)
- **Resize** — drag the bottom-right corner grip
- **Minimize** — yellow dot sends it to the taskbar without closing it
- **Maximize** — green dot fills the desktop; click again to restore its exact previous size/position
- **Taskbar** — every open window gets a pill in the dock; click to focus, click again to minimize
- **Start Menu** — `☰ Start` button on the dock lists every app, useful once windows cover the desktop icons
- **Desktop Widgets** — a live clock and a status widget sit in the top-right corner of the desktop, always visible
- **Mission Brief** — a briefing screen after boot, before entering
- **Desktop** — icon-based home screen (`#desktop`), no scrolling
- **Window Manager** — click an icon to open a floating window; windows
  cascade, focus-on-click (raises z-index), close with the red dot or `Esc`
- **Command Palette** — `Ctrl+K` / `Cmd+K` anywhere, VS Code-style, fuzzy
  filters and opens any app or link
- The classic scrolling site still exists underneath — "Exit to Classic Site"
  from the dock, or "⊞ Desktop Mode" from the classic nav, switches between them

## Editing your content (still one source of truth)

All content lives in `js/script.js`, at the top, as plain data. This is now
shared by **both** the classic scrolling page and the desktop windows — edit
it once, it updates everywhere:

- `PROCESSES`, `SKILLS`, `PROJECTS`, `TIMELINE`, `EDUCATION`, `CERTIFICATIONS`
- `APPS` (further down) — defines the desktop icons: id, emoji, label, window
  title, and which render function fills its window
- `COMMANDS` — defines what the Command Palette can do; add a new command
  here any time you add a new app or link

To add a whole new app/window: write a new render function (see `aboutHTML()`
or `skillsHTML()` for the pattern), add an entry to `APPS`, and add a matching
"Open X" entry to `COMMANDS`.

**v2.0 → OS Milestone (current)** — the full desktop-OS interaction model:
- **Window Manager** — draggable (title bar), resizable (corner handle), minimize/maximize/restore, click-to-focus (z-index), smooth open/close animations, multiple windows open at once
- **Taskbar** — every running app shown as a pill, active app highlighted, click to focus/minimize, live clock, system tray (theme toggle + status indicator)
- **Terminal app** — real command line: `help`, `about`, `whoami`, `pwd`, `date`, `ls`, `skills`, `projects`, `github`, `resume`, `open <app>`, `clear`. Commands live in one `TERMINAL_COMMANDS` registry in `js/script.js` — add a new command by adding one entry
- **Desktop** — double-click icons to open (single click selects), right-click for a context menu (refresh, sort icons, toggle theme, about), drag icons to reorder (order is remembered)
- **Command Palette (Ctrl+K)** — now searches apps, every project, every skill, and every journey entry; selecting a project/skill/journey result opens the right window and scrolls to + highlights that exact item
- **State persistence (localStorage)** — open windows (position, size, minimized/maximized state), desktop mode, theme (Phosphor green / Amber), and desktop icon order all survive a page refresh

## Filling in placeholders

A few things are marked as placeholders — search for these in the files:

- **LinkedIn** — currently shows "coming soon" in the contact section
  (`index.html`, `#contact`). Replace the `href="#"` with your LinkedIn URL and
  remove the `link-disabled` class + `tabindex="-1"`.
- **Student Performance Data Analysis** — has no GitHub link yet
  (`js/script.js`, `PROJECTS` array, `link: null`). Add the repo URL once it's public.
- **Resume PDF** — not yet linked. Add a `resume.pdf` file to the project root and
  link it from the hero section's action buttons if you want a direct download.
- **Certifications** — only "in progress" ones are listed on the timeline. Add
  finished certificates as new `TIMELINE` entries once you complete them.

## Deploying it for free

**Option A — GitHub Pages (recommended, matches your GitHub-heavy story):**
1. Create a new repo, e.g. `sg-os-portfolio`.
2. Push these three files/folders to it.
3. Go to Settings → Pages → set source to the `main` branch, root folder.
4. Your site goes live at `https://shreyanshg11.github.io/sg-os-portfolio/`.
5. Optional: rename the repo to `Shreyanshg11.github.io` to get it at your root domain.

**Option B — Vercel or Netlify:**
1. Drag-and-drop the `sg-os-portfolio` folder into vercel.com/new or app.netlify.com/drop.
2. It deploys instantly with a free `.vercel.app` / `.netlify.app` URL.
3. You can attach a custom domain later if you buy one.

## Notes

- The contact form doesn't have a backend — submitting it opens the visitor's
  email client pre-filled with their message (via `mailto:`). If you want real
  form submissions without a backend, look into Formspree or Web3Forms (both
  have free tiers and just need a form `action` URL change).
- Respects `prefers-reduced-motion` — the boot sequence skips straight to the
  site for visitors with that setting on.
- Fully responsive; nav collapses to a slide-out menu under 900px width.
