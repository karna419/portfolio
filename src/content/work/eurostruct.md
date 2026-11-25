---
title: Eurostruct
summary: The phone app a construction company's site teams use to report, inspect and document their projects from the job site.
year: 2026
involvement: contributor
stack: [React Native, Expo, iOS, Android]
icon: /work/eurostruct-field-icon.png
---

The Eurostruct app puts the paperwork of a construction site on the phone of the person
standing on it. It is the mobile side of the [Eurostruct CRM](/work/eurostruct-crm/) and
signs in against the same portal.

## What it does

- Daily reports and a site journal, written on site instead of back at the office
- Inspections and walkthroughs, with defects logged, photographed and marked up on the photo
- Project photos and video, filed against the right project
- Receipts captured with the document scanner, so expenses don't wait for the end of the month
- Site visits, new contacts and new bids added from the field
- Booking of machines and equipment

## How it is built

One React Native codebase with Expo, shipping to both iOS and Android. Sign-in is followed
by Face ID or fingerprint unlock, push notifications tell people what needs their attention,
and a share extension lets a receipt or document be sent to the app from anywhere on the
phone.

Releases are automatic. A push to the main branch is type-checked and tested, then goes out
as an over-the-air update when only JavaScript changed, or as a new store build when native
code did.
