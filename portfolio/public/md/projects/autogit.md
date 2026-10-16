# AutoGit-AI: VS Code extension with secret scanning

Shipped on the VS Code Marketplace.

- Problem: Auto-commit removes the human review step between saving and pushing, which is exactly when secrets leak.
- What she did: Built a VS Code extension that stages, writes a Copilot commit message, scans added lines for secrets and pushes.
- What changed: Shipped on the VS Code Marketplace under Apache-2.0, blocking 10+ families of keys, tokens and passwords before they reach the remote.

> Save a file and AutoGit stages it, writes an AI commit message with GitHub Copilot, scans the diff for leaked secrets and pushes. Its built-in secret scanner blocks keys, tokens and passwords before they reach the remote.

- Kind: Developer tooling
- Period: May 2025 to present (ongoing)
- Affiliation: Open source
- Repository: https://github.com/Sonica-B/AutoGit
- VS Code Marketplace: https://marketplace.visualstudio.com/items?itemName=ShreyaBoyane.auto-git-copilot

## Problem

Auto-commit removes the human review step between saving and pushing, which is exactly when secrets leak; AI-assisted commits leak at roughly twice the baseline rate.

## Approach

Pattern plus entropy scanning of only the added lines (AWS, GitHub, GitLab, Google, Slack, Stripe, npm, SendGrid, OpenAI and Anthropic keys, JWTs, private-key blocks, connection strings); fails closed on oversized diffs; fingerprint-bound overrides; gitignore-style excludes enforced at staging time; skips merges, rebases and detached HEAD; git invoked with argument arrays, never shell strings.

## Results

- Blocks keys, tokens and passwords across 10+ secret pattern families before every push.
- Published on the VS Code Marketplace as ShreyaBoyane.auto-git-copilot under Apache-2.0.
- Runs CI that lints, tests and packages the extension on every push.
- Kept pure logic in a fully unit-tested library, isolated from the VS Code wiring.
- Added debounced batching, protected branches, status-bar control and a full output-channel log.
- Runs on VS Code 1.90 and later.

## Key numbers

- Secret pattern families: 10+

## Stack

TypeScript, JavaScript, VS Code Extension API, GitHub Copilot, Git, secret scanning

## Pitch video

25 seconds, built from the real repository: https://shreyaboyane.dev/videos/autogit.mp4 (poster: https://shreyaboyane.dev/videos/autogit.webp; thumbnail: https://shreyaboyane.dev/videos/autogit-thumb.webp).

## Image

![Diagram of the AutoGit flow: save, stage, AI message, secret scan, commit and push](https://shreyaboyane.dev/projects/autogit/how-it-works.webp)

Canonical page: https://shreyaboyane.dev/projects/autogit. This markdown: https://shreyaboyane.dev/md/projects/autogit.md. Written by Shreya Boyane; generated from the site content model, last updated 2026-10-15.
