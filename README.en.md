# xlabs-club

[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/void-sleep/xlabs-club/.github%2Fworkflows%2Fgh-pages.yml)](https://github.com/void-sleep/xlabs-club/actions)
[![GitHub Repo stars](https://img.shields.io/github/stars/void-sleep/xlabs-club)](https://github.com/void-sleep/xlabs-club/stargazers)
[![GitHub contributors](https://img.shields.io/github/contributors/void-sleep/xlabs-club)](https://github.com/void-sleep/xlabs-club/graphs/contributors)
[![Commit Activity](https://img.shields.io/github/commit-activity/m/void-sleep/xlabs-club)](https://github.com/void-sleep/xlabs-club)

English | [中文](README.md)

**xlabs.club** — Exploring the edge with open source, delivering value through sharing.

This is the source of the [xlabs.club][] site. It collects our field notes on platform engineering and cloud-native work from the trenches: DevOps, DataOps, FinOps, and AIOps — the real pitfalls and lessons from driving long-term business growth with technology.

PRs are welcome.

_If these notes help your work, a ⭐ on this repo tells us to keep writing._

## What's on the site

- **Platform engineering** — our journey building a platform org around DevOps, DataOps, FinOps, and AIOps.
- **Cloud-native** — using cloud-native tech to support constantly shifting, complex business.
- **Blog** — engineering war stories; dig in and you'll find surprises.
- **awesome-x-ops** — a curated list of software, blogs, and tools for AIOps, DataOps, DevOps, GitOps, and FinOps.
- **void-ops** — IaC ops scripts and reusable templates (e.g. Argo Workflows template repo) that compose and extend the official examples.

## Featured reading

- [Two hidden boundaries of MCP tool results: the 10 MiB stdio frame cap and outputSchema validation](https://www.xlabs.club/blog/mcp-tool-result-limits/) — SDK 1.32.1 measured: a 10,485,760-byte result frame kills the connection with nothing but "Connection closed", and schema failures come back as ordinary `isError` results.
- [MCP Streamable HTTP in practice: missing one Accept entry = 406, second initialize kills the server](https://www.xlabs.club/blog/mcp-streamable-http-sdk-behavior/) — wire-level captures of SDK 1.30.0: hard Accept check, one-transport-per-session requirement, GET/DELETE return raw 500 in stateless mode.
- [LLM observability in practice: how far can you trust the usage from an OpenAI-compatible gateway](https://www.xlabs.club/blog/llm-observability-usage-fields/) — 5 models measured: `include_usage` is a no-op, MiniMax returns zero-filled usage, aborted streams lose tokens, prompt_tokens differs 6.8×.
- [Prompt regression testing in practice: the same prompt fails differently on two models](https://www.xlabs.club/blog/prompt-regression-testing/) — 198 calls, 11 cases: JSON-valid but contract-compliant 0/33, verdicts still flip at temperature=0.
- [MCP 2026-07-28: no more initialize handshake](https://www.xlabs.club/blog/mcp-2026-07-28-version-negotiation/) — wire-level capture of v1/v2 client negotiation, dual-era server implementation, cache-field pitfalls.

## Contributing

Built with [Astro][], [Starlight][] and [Starlight Blog][]. Content is plain Markdown — just write.

Requires Node.js 26 and pnpm 12.

```bash
pnpm install
# dev server on http://localhost:4321/
pnpm run dev
# build to dist/
pnpm run build
```

Content layout:

```
src/content/docs/
├── blog/      # engineering notes, war stories
└── docs/
    ├── cloud/     # cloud-native
    ├── platform/  # platform engineering
    ├── guides/    # how-tos
    └── tldr/      # quick reference
```

Minimal front matter for a new post (`src/content/docs/blog/my-post.md`):

```markdown
---
title: "Your Title"
description: "One-line summary"
date: 2024-03-31T21:29:52+08:00
draft: false
tags: [k8s]
categories: ["K8S"]
---
```

Create the file, preview with `pnpm run dev`, then open a PR.

## License

Content is licensed under [CC BY-NC 4.0][].

[xlabs.club]: https://www.xlabs.club
[Astro]: https://astro.build/
[Starlight]: https://starlight.astro.build/
[Starlight Blog]: https://starlight-blog-docs.vercel.app/
[CC BY-NC 4.0]: https://creativecommons.org/licenses/by-nc/4.0/
