# AI Failure Audit — prevention checklist, not claimed runtime proof
- **Stale response race**: requesting CES then TE could show stale CES data. Prevention: AbortController signal plus aborted guard before setView.
- **Missing cleanup**: pending simulated packet timeouts could continue on unmount. Prevention: clearTimeout in abort handler and `return () => controller.abort()`.
- **False ERROR on abort**: changing squads could show a broken connection when intentionally canceled. Prevention: ignore AbortError.

These are code-level preventive checks, not evidence of three bugs independently observed in DevTools. Supply observed traces if the instructor requires empirical audit proof.
