# Sheru Bhai: Luxury Life — starter game project

A mobile-friendly browser prototype with a procedural 3D world, joystick/keyboard controls, character family, mansion courtyard, car, phone apps, virtual bank/donations, missions, day/night toggle and local save/load.

## Run locally
- Open `index.html` in a modern browser with internet access. Three.js is loaded from CDN.
- Some browsers restrict ES modules when opening local files. Use a local static server (VS Code Live Server, `python -m http.server`) or deploy via GitHub Pages.

## Deploy on GitHub Pages
1. Create a GitHub repository.
2. Upload all files and folders from this project.
3. Go to **Settings → Pages**.
4. Select **Deploy from a branch**, branch `main`, folder `/root`.
5. Save. Wait for Pages to publish; then open the generated URL.

A workflow is included at `.github/workflows/pages.yml` to publish Pages on pushes to `main` if Pages is configured for GitHub Actions.

## Controls
- Keyboard: WASD or arrows; E interact; F toggle driving; Space reserved.
- Mobile: joystick; run button; interact; car button.
- Phone: bank, messages, contacts, map, missions, garage, help, settings.
- Game save is local to the browser/device (localStorage).

## Important scope
This is a **prototype**, not a finished commercial 3D game. Characters and scene objects are procedurally assembled from primitive meshes. The supplied character reference is included as visual guide only; detailed custom sculpted models, animations, voice/dialogue, large city, interiors, multiplayer, performance optimization, QA, and APK packaging are future production work.

## Android release path
For a Play Store release, expand/replace prototype assets, test on real devices, add privacy policy and age/content rating, build a signed Android package/AAB (Unity/Godot or web wrapper such as Capacitor), and complete Play Console requirements. Do not publish without testing.
