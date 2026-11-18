import { writeFileSync } from 'node:fs';

// Documentation only. No imagery download, authentication, provider service or approval inference.
const urls = [
  'https://gdal.org/en/stable/user/raster_data_model.html',
  'https://gdal.org/en/stable/drivers/raster/gtiff.html',
  'https://dataspace.copernicus.eu/terms-and-conditions',
  'https://dataspace.copernicus.eu/data-collections/copernicus-sentinel-missions/sentinel-2',
  'https://www.usgs.gov/centers/eros/data-citation',
  'https://www.ogc.org/standards/stac/',
];
const results = [];
for (const url of urls) {
  const record = { url, checkedAt: new Date().toISOString() };
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(8000), redirect: 'error' });
    record.status = response.status;
    const reader = response.body.getReader();
    let text = '';
    let length = 0;
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 1_048_576) {
        await reader.cancel();
        throw new Error('Documentation byte budget exceeded');
      }
      text += decoder.decode(value, { stream: true });
    }
    record.bytes = length;
    const plain = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    record.excerpts = [
      ...plain.matchAll(
        /.{0,90}(?:GT\(0\)|pixel.?center|pixel.?corner|PixelIsPoint|licen[sc]e|attribution|redistribut|public domain|resolution).{0,180}/gi
      ),
    ]
      .slice(0, 10)
      .map((match) => match[0]);
  } catch (error) {
    record.error = String(error);
  }
  results.push(record);
}
writeFileSync('docs/audit/phase-14/evidence/references.json', `${JSON.stringify(results, null, 2)}\n`);
console.log(results.map((record) => `${record.url}: ${record.status ?? record.error}`).join('\n'));
