# Editing the JUST Lab website

You don't need to know how to code. Every page is a plain text file.

## Three ways to make a change

1. **Ask Claude** — "add our new paper, DOI 10.xxxx/xxxx" or "draft a news post
   about the FAPESP grant". It edits the files, commits, and the site updates.
2. **Edit in Google Drive** — open the shared `Agora_Vai_JustLab_SITE/content/`
   folder, edit the file, save. It gets picked up on the next sync.
3. **Edit on GitHub** — if you have an account, edit the file directly and open a
   pull request.

## Add yourself (current members)

Copy an existing file in `src/content/people/`, rename it to
`firstname-lastname.md`, and fill it in:

```markdown
---
name: Your Full Name
role: Volunteer Undergraduate Researcher · Chemical Engineering
category: undergrad        # pi | collaborator | researcher | grad | undergrad | staff
areas: [genetic-engineering, recombinant-proteins]
startDate: 2026-09         # year-month
order: 5
photo: your-name.jpg       # square, at least 600px, drop it in src/assets/people/
links:
  email: you@usp.br
  orcid: https://orcid.org/0000-0000-0000-0000
  lattes: http://lattes.cnpq.br/...
  scholar: https://scholar.google.com/citations?user=...
project:
  title: >-
    Your project title.
---

One short paragraph about what you work on, in your own words.
```

No photo yet? Leave `photo:` blank — a green initials circle shows instead.

## When someone leaves

Don't delete the file. Add two lines to the front-matter:

```yaml
endDate: 2027-12
nowAt: "PhD student, ETH Zürich"
```

They move to **Former Trainees and Co-supervised Students** automatically.

## Add a news post

New file in `src/content/news/` named `2026-10-15-short-title.md`:

```markdown
---
title: Short headline
date: 2026-10-15
tags: [publication]      # publication | grant | award | event | outreach | people
---

A sentence or two.
```

## Add a publication

Add an entry to `src/data/publications.yaml` (copy one that's there). If you give
Claude the DOI it fills in the rest.

## Rules of thumb

- Keep the `---` front-matter block and its indentation intact.
- If the site build fails, the change won't go live — someone will see the error
  and fix it.
- Don't edit anything in `src/pages/`, `src/components/`, or `src/styles/`
  unless you mean to change how the site looks.
