---
title: Eurostruct CRM
summary: A web portal where a construction company tracks its projects, bids and the architects, subcontractors and contacts behind them.
year: 2026
involvement: contributor
stack: [Web]
icon: /work/eurostruct-crm-icon.png
---

Commercial construction runs on relationships: which architect firms send work, which
subcontractors deliver, and which bids are worth chasing. Eurostruct CRM keeps all of that in
one place, and is the portal the [Eurostruct](/work/eurostruct/) phone app signs in to.

## What it does

- A dashboard of win rate, backlog, pipeline and recent activity
- Projects, architect firms, subcontractors and contacts, linked to each other
- Role-based access, so each kind of user sees and edits only what they should
- Outreach workflows that send follow-up emails on a schedule
- Expense receipts matched against card statements, with reminders for the missing ones
- A phone entrance for project managers: the day's site visits, search, and a quick
  add-contact form that reads a business card from a photo

## How it is built

Next.js and React in TypeScript, on a PostgreSQL database. It is a desktop-first workspace
that switches to a phone layout with a tab bar on small screens. Scheduled work such as
outreach and receipt matching runs inside the same server.
