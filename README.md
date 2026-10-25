# Lab 03 — Exercise 3: KRAFTON PUBG Vietnam Live Telemetry
Student: Huynh Quoc Minh Thong (22521432)

## What this is
A React 19 + Vite educational simulation based on the Lab 3 Exercise 3 slides (not Lab 3 Homework 3). No live PUBG API is used, and match figures are examples provided in the teaching slides.

## Run
```
npm install
npm run dev
```
Visit the Local URL printed by Vite.

## Verify
- Select CES / TE / GE. Old requests are canceled with AbortController.
- LOADING has a height-stable skeleton; SUCCESS shows map, phase, alive, kills, and simulated WWCD.
- 35% simulated packet loss leads to an accessible ERROR alert and Retry action.
- Turn packet loss off to reliably confirm SUCCESS. Set slow delay, then change teams rapidly to test cancellation.
- Use Chrome DevTools for Slow 3G, mobile viewport, and Console/Network checks. Those checks must be done locally before submitting screenshots.

## Source
Lab 03 PDF, pp. 22–23. Two atomic commits required by the exercise should be made through actual Git operations; do not claim commits not performed.
