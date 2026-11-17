// Nonintrusive documentation review only. No dataset, tile or image download.
import { writeFileSync } from 'node:fs';
const urls = [
  'https://www.openstreetmap.org/copyright',
  'https://osmfoundation.org/wiki/Licence/Attribution_Guidelines',
  'https://operations.osmfoundation.org/policies/tiles/',
  'https://operations.osmfoundation.org/policies/vector/',
  'https://wiki.openstreetmap.org/wiki/Overpass_API',
  'https://download.geofabrik.de/asia/vietnam.html',
  'https://dataspace.copernicus.eu/explore-data/data-collections/copernicus-contributing-missions/collections-description/COP-DEM',
  'https://dataspace.copernicus.eu/news/2026-8-25-copernicus-dem-30m-view-service-update',
  'https://gisportal.danang.gov.vn/sxd/',
  'https://dosm.vnsdi.gov.vn/',
];
const results = [];
for (const url of urls) {
  try {
    const response = await fetch(url, { redirect: 'error', signal: AbortSignal.timeout(8000) });
    const reader = response.body.getReader();
    let body = '';
    let bytes = 0;
    const decoder = new TextDecoder();
    try {
      while (true) {
        const chunk = await reader.read();
        if (chunk.done) break;
        bytes += chunk.value.byteLength;
        if (bytes > 524288) throw new Error('Documentation byte cap');
        body += decoder.decode(chunk.value, { stream: true });
      }
    } finally {
      await reader.cancel();
    }
    const text = body
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ');
    const excerpts = [
      ...text.matchAll(
        /.{0,90}(?:licen[cs]e|attribution|share.alike|ODbL|DSM|GLO-30|access|restricted|non.commercial|quota).{0,180}/gi
      ),
    ]
      .slice(0, 16)
      .map((match) => match[0]);
    results.push({ url, checkedAt: new Date().toISOString(), status: response.status, bytes, excerpts });
  } catch (error) {
    results.push({ url, checkedAt: new Date().toISOString(), error: error.message });
  }
  console.log(url, results.at(-1).status ?? results.at(-1).error);
  writeFileSync('docs/audit/phase-13/evidence/metadata.json', `${JSON.stringify(results, null, 2)}\n`);
}
