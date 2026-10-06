# AutoGit-AI: VS Code extension with secret scanning

Shipped on the VS Code Marketplace.

> Save a file and AutoGit stages it, writes an AI commit message with GitHub Copilot, scans the diff for leaked secrets and pushes. The only auto-commit extension with a built-in secret scanner that blocks keys, tokens and passwords before they reach the remote.

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

- Published on the VS Code Marketplace as ShreyaBoyane.auto-git-copilot under Apache-2.0, with CI that lints, tests and packages on every push.
- Pure logic lives in a fully unit-tested library; VS Code wiring is isolated in the extension entry point.
- Debounced batching, protected branches, status-bar control and a full output-channel log.

## Key numbers

- Secret pattern families: 10+
- License: Apache-2.0
- Minimum VS Code: 1.90

## Stack

TypeScript, JavaScript, VS Code Extension API, GitHub Copilot, Git, secret scanning

## Image

![Diagram of the AutoGit flow: save, stage, AI message, secret scan, commit and push](https://shreyaboyane.dev/projects/autogit/how-it-works.webp)

Canonical page: https://shreyaboyane.dev/projects/autogit. This markdown: https://shreyaboyane.dev/md/projects/autogit.md. Generated from the site content model, last updated 2026-10-06.
