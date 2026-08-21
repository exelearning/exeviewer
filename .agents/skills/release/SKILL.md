---
name: release
description: Prepare a new eXeViewer release — bump the version across all files that carry it and add the CHANGELOG entry. Use when the user asks to "sacar una release", "preparar la versión X", "bump version", or to sync the version number with eXeLearning.
---

# Prepare an eXeViewer release

Bumps the version in every file that carries it and writes the CHANGELOG entry.
This repo keeps its version number aligned with the main eXeLearning project, so
releases are sometimes cut with no functional changes at all — that is normal and
expected.

## Step 0 — Ask for the target version (always)

Before doing anything else, ask the user which version is being released, unless
they already stated it in the request (e.g. `/release 4.0.4`).

Use `AskUserQuestion` with the next patch / minor / major bump computed from the
current `package.json` version as the options, and let the user type any other
value via "Other". Example for a current version of `4.0.3`:

- `4.0.4` — patch (recommended for maintenance / sync releases)
- `4.1.0` — minor
- `5.0.0` — major

Use **today's date** for the CHANGELOG entry (format `YYYY-MM-DD`) unless the
user gives a different one.

## Step 1 — Check the repo state and what changed

```bash
git fetch --tags
git tag --sort=-v:refname | head -5          # last released tag
git log --oneline <last-tag>..HEAD           # commits since it
git diff --stat <last-tag>..HEAD             # files touched
git status --porcelain                       # working tree must be clean-ish
```

Read the actual diff of anything that is not a dependency bump — the CHANGELOG
entry must describe real user-facing behaviour, not commit subjects.

## Step 2 — Update the version

The version string lives in **exactly these five files**. Verify with
`git grep -n "<old-version>"` afterwards that nothing is left behind.

| File | What to change |
|---|---|
| `package.json` | top-level `"version"` |
| `package-lock.json` | top-level `"version"` **and** `packages[""].version` (two occurrences) |
| `js/app.js` | `version: '<x.y.z>'` inside the `config` defaults block (~line 12) |
| `sw.js` | `SW_VERSION` constant (~line 6) |
| `CHANGELOG.md` | new entry at the top |

`SW_VERSION` **must** be bumped with the release. `CACHE_NAME` derives from it,
and the `activate` handler purges every cache whose name differs — so if
`SW_VERSION` does not change, the previous release's app shell is never evicted
and users keep being served stale files. It also means the precache list can be
edited safely: the new list only takes effect for existing users once the cache
name changes.

Do **not** touch:

- `DB_VERSION` in `sw.js` — IndexedDB schema version, unrelated to the release.
- Do not run `npm version`; it creates a git tag and commit as a side effect.

## Step 3 — Write the CHANGELOG entry

`CHANGELOG.md` has a strict, consistent style. Match it exactly:

- Entries are newest-first, right under the `# CHANGELOG` heading.
- Heading format: `## vX.Y.Z – YYYY-MM-DD` — note the separator is an **en dash
  (`–`, U+2013)**, not a hyphen.
- Body is a flat bullet list, one line per change, no sub-bullets, no bold.
- Written in **English**, in the imperative/descriptive third person: "Add …",
  "Fix …", "Improve …", "Support …".
- Each bullet ends with a period.
- Entries are separated by a `---` line with a blank line on each side.

Template:

```markdown
# CHANGELOG

## v4.0.4 – 2026-09-01

- Add ...
- Fix ...

---

## v4.0.3 – 2026-08-06
```

### When there are no functional changes

If the diff since the last tag contains nothing user-facing (only dependabot
bumps, CI tweaks, docs), the release exists purely to keep numbering in sync.
Write a single bullet in that style, e.g.:

```markdown
- Maintenance release with no functional changes: version bumped to keep numbering aligned with eXeLearning for consistency across related projects.
```

Do **not** list dependency bumps (dependabot `sharp`, `png-to-ico`, …) as
changelog bullets — this CHANGELOG has never included them, and those are
devDependencies used only by `npm run generate-icons`, so they never reach the
served app.

## Step 4 — Report, then stop

Show the user a summary of the edits (`git diff --stat`) and the new CHANGELOG
entry.

**Do not commit, tag, or push unless the user explicitly asks.** If they do ask,
follow the existing convention for the commit subject:

```
Prepare v4.0.3 release.
```

and tag with a plain `vX.Y.Z` tag on `main`.
