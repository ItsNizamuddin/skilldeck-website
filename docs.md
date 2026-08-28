New: PartnerComparisonTable.tsx (category/courses/overview/), mounted in TopPartnersSection between the partner cards and PartnerSchedulesList.

I checked the live payload rather than trusting the mockup, and that changed what the table can show. /api/tenants returns only id, name, legalName, slug, logo, industry, companySize, foundedYear, isFeatured, rank, and schedules return deliveryType, batchType, totalSessions, duration, commencementDate, startsAt, venu, country, pricing[], enableFastfilling, enableRecommend, isFlexibleSchedule, seatsAvailable, isFeatured, rank.

So four mockup rows have no backing data: Overall Rating, Placement Support, Certification, Students Enrolled. I did not stub them with fake ticks. Instead every row is gated on has.* — it renders only if at least one partner actually has that field. Rating is wired up and will appear the moment the API starts returning it.

Rows driven by real payload — the old ScheduleComparisonTable had 7 columns; this maps the fields the new project added on top:

┌──────────────────────────────────────────┬───────────────────────────────────────────────────────────────────────────────────────────────┬──────────────────────┐
│                   Row                    │                                            Source                                             │      New vs old      │
├──────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────┤
│ Overall Rating                           │ rating / reviewCount                                                                          │ gated, no data today │
├──────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────┤
│ Course Fee                               │ pricing[].comparedPrice + actualPrice strike-through + computed % off, cheapest flagged green │ discount % is new    │
├──────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────┤
│ Sessions                                 │ totalSessions, most-sessions flagged                                                          │                      │
├──────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────┤
│ Session Duration                         │ duration mins                                                                                 │ new                  │
├──────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────┤
│ Next Batch                               │ earliest startsAt/commencementDate                                                            │                      │
├──────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────┤
│ Mode                                     │ deduped deliveryType                                                                          │                      │
├──────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────┤
│ Batch Type                               │ deduped batchType                                                                             │                      │
├──────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────┤
│ Location                                 │ venu → country.name                                                                           │                      │
├──────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────┤
│ Seats Available                          │ seatsAvailable                                                                                │ new                  │
├──────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────┤
│ Filling Fast / Flexible / Recommended    │ enableFastfilling, isFlexibleSchedule, enableRecommend                                        │ all new              │
├──────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────┤
│ Specialisation / Established / Team Size │ industry, foundedYear, companySize                                                            │ all new              │
├──────────────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────────────────────┼──────────────────────┤
│ Key Highlights                           │ mapToInstitute.highlights                                                                     │                      │
└──────────────────────────────────────────┴───────────────────────────────────────────────────────────────────────────────────────────────┴──────────────────────┘

Values aggregate across all of a partner's schedules, not just the first — the old component compared one row per schedule; this compares one column per company.

Also wired up: PartnerCompanyCard accepted isCompared/onCompareToggle props but never rendered a control — dead props. Added the Compare checkbox from the mockup. compareList was likewise being tracked and never consumed. Selection is capped at 4, matching the "Compare up to 4 Companies" badge; with nothing ticked the table defaults to the top 4 providers, and an "Add Company" column appears while there's room.

One defect found and worked around: the API double-encodes currency symbols — ₹ arrives as â‚¹. safeSymbol() falls back to getCurrencySymbol(currency) when it detects that. Worth noting the existing cards and PartnerSchedulesList read priceObj.currency.symbol directly, so they still show the mojibake — I scoped the fix to the new component rather than changing existing render behaviour. Say the word and I'll apply it across the board.

Build compiles, lint clean on the new file, and the component is confirmed in the client bundle. I could not verify it visually: TopPartnersSection is a client component that fetches partners after mount, so curl only returns the static training-partners wrapper. Needs a browser to eyeball.