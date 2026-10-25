# Brag Plan: AutoGit-AI

Invocation: `/brag --tone polished --format landscape` (music on, SFX sparse, no voice).
Source of truth for copy: `portfolio/content/profile.json` → project `autogit`, plus the cloned repo README, `package.json`, `extension.js` and `lib/secretScanner.js`.

## Inspection rubric (Step 1)

1. **What is the app?** A VS Code extension: save a file and AutoGit stages it, writes an AI commit message with GitHub Copilot, scans the staged diff for leaked secrets and pushes.
2. **Most impressive claim?** "The only auto-commit extension with a built-in secret scanner that blocks API keys, tokens and passwords before they reach your remote." Shipped on the VS Code Marketplace as `ShreyaBoyane.auto-git-copilot` (v1.4.0, Apache-2.0).
3. **Visual hook?** The README's own flow diagram `images/how-it-works.png`: five boxes (Save a file, Stage, AI message, Secret scan, Commit + Push) with the red Secret scan box as the differentiator.
4. **What to show from the actual UI?** The status bar states (`Auto Git: Pending (n)`, `Auto Git: Working...`, `Auto Git: ON`), the "Committed and pushed" notification with a README commit message, the Auto Git output channel log line `SECRET BLOCKED: ... [aws-access-key-id] ...`, the verbatim blocking warning with its `Show Logs` / `Commit Anyway` buttons, the real settings names, and `icon.png`.
5. **Shortest satisfying video?** About 24 seconds: hook demo, flow diagram, the secret-scan block, marketplace proof, end card.
6. **Tone?** Preset `polished` (user-specified). Creative direction: quiet, confident developer-tool film; the product speaks in its own strings.
7. **Audio?** Steady clean bed (vol-12), sparse low-risk SFX matched to UI motion, subtle audio-reactive glow.
8. **Share caption?** See "Share copy" below.
9. **User flow worth showing?** Save a file → status bar goes Pending → Working → ON and a commit is pushed; a second save with a leaked AWS key → the commit is blocked with a redacted finding and a warning.

## What is this app?
AutoGit-AI removes every step between saving a file and a pushed commit, and it is the only auto-commit extension that scans the diff for secrets before the commit happens.

## The angle
Auto-commit removes the human review step between saving and pushing, which is exactly when secrets leak. AutoGit shows that automation and safety can be the same feature: the video demonstrates the save-to-push flow, then shows the product refusing to commit a leaked AWS key, quoting its own log line and notification.

## Hook (first 2-3 seconds)
"Save a file." in huge display type, then the VS Code status bar slides up already working: `Auto Git: Pending (1)` → `Auto Git: Working...` → `Auto Git: ON` while a notification confirms "Auto Git: Committed and pushed" with the README's example message `feat: add user authentication system`.

## Key moments (the middle)
- The real README flow diagram assembles box by box on the beat: Save a file, Stage, AI message, Secret scan (lands with a red glow), Commit + Push. Captions from the diagram itself: "Automatic on every save." and "No secret ever reaches your remote."
- The secret-scan block: the real Secret scan box crop, the headline "Scans every staged diff before it commits.", the Auto Git output channel typing `SECRET BLOCKED: AWS access key ID [aws-access-key-id] at src/config.js:12 (AKIAI************)` and `Commit blocked by secret scan.`, then the verbatim warning "Auto Git blocked the commit: AWS access key ID in src/config.js:12. Remove it, add an ignore pattern, or commit anyway." with `Show Logs` and `Commit Anyway`. Chips: "10+ secret pattern families" and "Fails closed on oversized diffs" (profile.json).
- Marketplace proof: the real extension icon, "AutoGit-AI", "Shipped on the VS Code Marketplace", `ShreyaBoyane.auto-git-copilot`, v1.4.0, Apache-2.0, VS Code 1.90+, and a settings.json panel typing the real settings `autoGitCopilot.scanForSecrets`, `autoGitCopilot.protectedBranches`, `autoGitCopilot.autoPush`, `autoGitCopilot.delayMs`.

## Outro / punchline
End card: "Shreya Boyane", "shreyaboyane.dev", "/projects/autogit". Music fades under it.

## User flow worth showing
Save `src/app.js` → status bar Pending → Working → ON → "Committed and pushed" notification (scene 1). Save a file with an AWS key → output channel logs the redacted finding → commit blocked with the override prompt (scene 3).

## Tone
- Preset: polished
- Creative direction: quiet, confident developer-tool film; the product speaks in its own strings
- Interpretation: few scenes, long holds, soft blur crossfades, one push slide into the secret-scan centerpiece, no jokes, no generic SaaS language, real UI strings only.

## Format: landscape, 1920x1080
## Duration: 24.5 seconds

## Visual identity (from the portfolio site)
- Background: #121218
- Accent: #f0b35c (single accent, amber)
- Text: #f4f2ee, secondary #b9b5ae
- Display font: Bricolage Grotesque (Google Fonts, latin woff2 embedded locally)
- Body font: Geist (Google Fonts, latin woff2 embedded locally); code: JetBrains Mono (bundled by Hyperframes)
- Panels borrow the diagram's own surface colors (#1e1e28, border #2c2c38) so the real crops sit naturally
- Strongest visual element: `images/how-it-works.png` cropped into its five boxes and four connectors, plus the Secret scan box at 1:1 and `icon.png`
- No em dashes anywhere on screen; sentence case throughout. The diagram's bottom caption (which contains an em dash in the PNG) is cropped out and re-set as two typographic lines.

## Share copy (draft)
Introducing AutoGit-AI: save a file and it stages, writes an AI commit message, scans the diff for leaked secrets and pushes. The only auto-commit extension with a built-in secret scanner, now on the VS Code Marketplace.

## Audio direction
- Role: steady professional bed with sparse motion-matched accents
- Music: `happy-beats-business-moves-vol-12-by-ende-dot-app.mp3` (steady and clean, the polished pick)
- Music treatment: starts at 0, fades in over 0.8 s to 0.36, holds, fades out from 23.0 s to silence at 24.4 s under the end card
- Music cue guidance: preset read from `assets/music/cues/happy-beats-business-moves-vol-12-by-ende-dot-app.music-cues.md` (109.96 BPM). Strong cues in window: 8.74, 9.29, 10.93, 13.11, 17.47, 18.56, 19.66, 22.37, 22.93. Beat grid used for sequential reveals: 6.56, 7.09, 7.64, 8.19, 8.74 (flow boxes) and 18.02, 18.56, 19.10, 19.66 (settings lines). Strong-cue locks: 13.11 (SECRET BLOCKED line lands), 17.47 (cut to the marketplace scene), 22.37 (site line on the end card).
- Audio-reactive treatment: subtle; a single amber radial glow behind each scene breathes with smoothed bass energy (opacity 0.12 to 0.30, scale 1.00 to 1.06). No waveforms, bars or pulsing text.
- SFX posture: sparse, low high-frequency risk only: one keypress on the save, one soft drop on the notification, one soft impact on the blocked commit, one bong on the end card.
- Audio-coupled moments: typed log lines in the output channel; typed settings lines; box-by-box diagram assembly on the beat grid.
- Restraint rule: no sound on every box, no typing clicks on every character, music never above 0.36, nothing bright or repeated.

## Storyboard

### Scene 1, Save a file, 6.0 s (0.00 to 6.00, blur crossfade out starting at 6.00)
Dark frame, amber glow breathing low left. "Save a file." slams in at 0.25 s (scale 1.12 to 1, power4.out) and holds. At 0.9 s a secondary line rises beneath it: "AutoGit stages it, writes the commit message, scans for secrets and pushes." At 0.56 s a VS Code status bar slides up from the bottom edge showing a spinning sync icon and `Auto Git: Pending (1)`; at 1.64 s it reads `Auto Git: Working...`; at 2.73 s it settles to `Auto Git: ON` and a notification slides in bottom right: "Auto Git: Committed and pushed" over `"feat: add user authentication system"`. Hold to 6.0 s.
Sequential/interaction: yes, the status bar steps through its three real states and the notification arrives as the commit lands.
Audio intent: a single keystroke, then the bed carries; one soft drop as the notification arrives.
Audio-coupled idea: keypress on the headline slam; drop on the notification.
Music: bed fades in, steady.
Transition mood: soft (blur crossfade) → Scene 2

### Scene 2, How it works, 6.0 s (6.00 to 12.55, blur crossfade in, push slide out)
Eyebrow "How it works" top left. The real README diagram assembles left to right on the beat grid: Save a file (6.56), Stage (7.09), AI message (7.64), Secret scan (8.19, lands with a slightly bigger spring and a soft red glow), Commit + Push (8.74). Connectors draw in just before each box. Captions beneath: "Automatic on every save." at 9.29 and "No secret ever reaches your remote." at 9.83. Hold until 12.55 (poster frame window: 10.6 to 12.4 s).
Sequential/interaction: yes, five real crops arrive one by one on consecutive beats; connectors scale in from the left.
Audio intent: the bed's pulse carries the assembly; no SFX, the beat does the work.
Audio-coupled idea: beat-grid reveal of the five boxes.
Music: steady.
Transition mood: clean slide (push) → Scene 3

### Scene 3, Secret scan, 4.9 s (12.55 to 17.47)
Left: the real Secret scan box crop pops in, then the headline "Scans every staged diff before it commits." and two chips: "10+ secret pattern families", "Fails closed on oversized diffs". Right: the Auto Git output channel panel slides in and types three real log lines, the `SECRET BLOCKED: AWS access key ID [aws-access-key-id] at src/config.js:12 (AKIAI************)` line landing on the 13.11 s strong cue, then `Commit blocked by secret scan.` At 14.73 s the verbatim warning notification springs in with `Show Logs` and `Commit Anyway`. Hold to 17.47.
Sequential/interaction: yes, typed log lines, then the blocking notification.
Audio intent: one soft impact as the block lands; otherwise restraint.
Audio-coupled idea: typed text; impact on the SECRET BLOCKED line.
Music: steady.
Transition mood: soft (blur crossfade) on the 17.47 strong cue → Scene 4

### Scene 4, On the Marketplace, 3.8 s (17.47 to 21.28)
Left: the real extension icon on a tile, "AutoGit-AI", "Shipped on the VS Code Marketplace", chips `ShreyaBoyane.auto-git-copilot`, `v1.4.0`, `Apache-2.0`, `VS Code 1.90+`. Right: a settings.json panel typing the real settings on the beat grid: `"autoGitCopilot.scanForSecrets": true`, `"autoGitCopilot.protectedBranches": ["main"]`, `"autoGitCopilot.autoPush": true`, `"autoGitCopilot.delayMs": 3000`. Hold to 21.28.
Sequential/interaction: yes, four settings lines type in one by one (18.02, 18.56, 19.10, 19.66).
Audio intent: nothing new; the bed carries.
Audio-coupled idea: beat-grid typed lines.
Music: steady.
Transition mood: slow crossfade → Scene 5

### Scene 5, End card, 3.2 s (21.28 to 24.50)
Short amber rule draws in, then "Shreya Boyane" (21.84), "shreyaboyane.dev" (22.37, strong cue, bong), "/projects/autogit" (22.93). Glow breathes; music fades to silence by 24.4.
Sequential/interaction: three lines arrive on consecutive beats.
Audio intent: one warm bong, then the bed fades out.
Audio-coupled idea: bong on the site line.
Music: fade out.

**Music mood for this video:** steady and clean (polished).
**Audio summary:** a quiet bed fades in under a single keystroke, carries the beat-aligned diagram assembly, lands one soft impact on the blocked commit, rings one bong on the end card and fades out.

## Reading-time check
"Save a file." 5.3 s; secondary line (11 words, 3.3 s needed) 4.7 s; status labels at least 1.08 s each; notification (10 words, 3.0 s) 2.9 s; "How it works" 5.9 s; "Automatic on every save." 2.9 s; "No secret ever reaches your remote." (6 words, 1.8 s) 2.4 s; secret-scan headline (7 words, 2.1 s) 4.4 s; chips 1.9 s; blocking notification title clause (5 words, 1.5 s) 2.4 s; marketplace line (6 words, 1.8 s) 3.1 s; settings lines hold 1.4 to 3.0 s; end card lines 1.4 s or more.
