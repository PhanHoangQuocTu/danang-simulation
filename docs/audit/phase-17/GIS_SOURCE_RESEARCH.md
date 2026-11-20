# Phase 17 — GIS Source Research

**Date:** 2026-11-20. **Question:** where do real, licensable road and
building geometries for the Da Nang pilot come from?

## OSM licence and attribution (verified live 2026-11-20)

- **Source checked:** `https://www.openstreetmap.org/copyright` and
  the OSMF Licence/Attribution Guidelines
  (`osmfoundation.org`, adopted 2021-06-25) via live search.
- **Licence:** Open Database License (ODbL) 1.0, since September 2012.
  Free to copy, distribute, transmit and adapt for any purpose,
  including commercial use, with no fees.
- **Two conditions:** (1) attribute OpenStreetMap — the requested
  attribution is **"© OpenStreetMap contributors"**, hyperlinked to
  `https://www.openstreetmap.org/copyright` where possible, with a clear
  statement that the data is available under the ODbL; (2) **share-alike**
  — if a derived database is publicly distributed, it must be
  distributed under the same licence.
- **What this means for the pilot:** the committed asset is a derived
  database, so it carries the ODbL-1.0 licence and the attribution in
  its header, in the registry entry, and in the F3/registry UI via the
  existing source catalog. Redistribution is allowed only under
  ODbL-1.0 (registry `redistributionAllowed: true` with that
  restriction recorded).
- **Not legal advice.** The legal text at
  `opendatacommons.org/licenses/odbl` governs over this summary.

## Tag sets used (OSM wiki, verified against the actual response)

| Feature | Tags read |
| --- | --- |
| Roads | `highway`, `name`, `ref`, `lanes`, `width`, `surface`, `bridge`, `tunnel`, `oneway`, `maxspeed` |
| Buildings | `building`, `building:levels`, `height`, `min_height`, `roof:shape`, `name` |

`maxspeed` (162 roads) and `ref` (0 roads) are recorded in the ingest
report but not stored in the asset: the renderer does not use them.
`addr:*` tags (82 buildings) are likewise recorded, not rendered.

## Official Vietnamese datasets (one search round, 2026-11-20)

No public download route was found — consistent with earlier research:

- **MONRE / Department of Survey and Mapping:** survey and mapping
  data is provided on request through the Center of Survey and Mapping
  Data (in-person request / fee-based); no anonymous bulk download.
  Topographic and cadastral geodatabases exist (1/10,000, 1/5,000,
  1/2,000) but are not publicly downloadable.
- **DONRE (provincial):** provincial land databases are built and
  managed locally; public web access covers planning information, land
  price frameworks and parcel lookups — not downloadable road/building
  vector geometry.
- **National spatial data portal (`dosm.vnsdi.gov.vn`) and Da Nang GIS
  portal (`gisportal.danang.gov.vn/sxd/`):** no usable dataset/license
  metadata or download found (already recorded as `blocked` /
  candidate in the registry, Phase 13).
- **Conclusion:** OSM is the only licensable, anonymously retrievable
  vector source for the pilot. A formal MONRE/DONRE data request
  remains the route for authoritative geometry (see `KNOWN_ISSUES.md`).

## Acquisition route decision

| Candidate | Result |
| --- | --- |
| Overpass API (`overpass-api.de` + mirrors kumi / private.coffee / nchc) | **Times out from this VM** (curl HTTP 000). Not used. |
| Official OSM API map call (`api.openstreetmap.org/api/0.6/map?bbox=...`) | **Works: HTTP 200**, 4,128,354 bytes, SHA-256 `b4bf752f…94d`. Pilot bbox 0.028 x 0.027 deg is well under the 0.25 deg^2 API limit. Selected. |
| Vietnam PBF / Geofabrik extract | Not downloaded: a country extract is far larger than the pilot and would need the same clipping; the API call returns exactly the pilot window. |

No other remote fetch was introduced.
