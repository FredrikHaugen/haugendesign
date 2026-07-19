# LocalFlow

> Portfolio copy for haugendesign.no. Extracted from the internal `local-flow/PROJECT.md`. Nothing here may be rewritten or expanded by a coding agent.

## Slug

`localflow`

## Card

**LocalFlow**
Fully-local voice dictation for macOS. Hold a hotkey anywhere, speak, release. Clean, formatted text appears in whatever app you're using. No cloud, no accounts, no telemetry.

Tags: `Swift 6` `SwiftUI` `whisper.cpp` `Apple MLX` `Metal`

Link: https://github.com/FredrikHaugen/whispr-local

## Year

2026

## Detail page

LocalFlow is fully-local voice dictation for macOS. Hold a hotkey anywhere, speak, release. Clean, formatted text appears in whatever app you're using, typically in about a second. Every byte of audio and text is processed on the Mac. No cloud, no accounts, no telemetry. The only network traffic the app ever produces is downloading model files from Hugging Face, and only when you explicitly ask it to.

Each dictation flows through a five-stage, on-device pipeline: capture, trim, transcribe, clean up, inject. whisper.cpp with Metal GPU acceleration turns speech into text. A small local LLM on Apple MLX removes filler words and fixes punctuation, capitalization, and spacing. The text is pasted into the focused app, with the previous clipboard contents snapshotted and restored afterwards.

A transcript is never silently lost. Every failure path ends with the text delivered somewhere visible or an explicit error. AI cleanup can never block or corrupt a dictation: any model error or timeout falls back to the raw transcript. If the focused element is a password field, LocalFlow refuses to inject and refuses to write the transcript to the clipboard.

Names, jargon, and technical terms that speech models routinely butcher get two layers of defense: vocabulary terms bias recognition toward the right spellings, and per-term aliases are corrected deterministically after transcription.

Version 0.1.0.

[CONFIRM: the internal doc frames this as "the Wispr Flow experience" with local processing. Naming a competitor's product on the portfolio is your call, and the TOV bans it for Vitne. The copy above omits it; add the sentence yourself if you want the comparison.]

### Stack

Swift 6, SwiftUI. whisper.cpp vendored as an xcframework with checksum verification, Metal accelerated. mlx-swift-lm for local LLM inference, Qwen3-4B-Instruct 4-bit by default. A custom NSEvent hotkey state machine for the modifier-only binding. CGEvent paste injection with a character-by-character typing fallback. SPM package with no .xcodeproj; the app is assembled and codesigned by script.

---

## Do not publish (from the internal doc)

- The bundle identifier `com.figge.LocalFlow`.
- Anything from `local-flow/TESTING.md`, including the macOS 26 injection-spike notes. It is an internal checklist.
- The "not sandboxed" detail and the permissions internals. True, but it belongs in the repo README, not on a portfolio page.
