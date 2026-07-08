import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CollectFeedsUseCase } from './application/CollectFeedsUseCase.mjs';
import { GenerateDigestUseCase } from './application/GenerateDigestUseCase.mjs';
import { DeliverDigestUseCase } from './application/DeliverDigestUseCase.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const config = JSON.parse(fs.readFileSync(path.join(here, 'config.json'), 'utf8'));

/** JST の YYYY-MM-DD を返す */
function jstDateString(date = new Date()) {
    return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Tokyo' }).format(date);
}

const items = await new CollectFeedsUseCase(config).execute();
const digest = await new GenerateDigestUseCase(config).execute(jstDateString(), items);
const { markdownPath, jsonPath, slackSent } = await new DeliverDigestUseCase().execute(digest);

console.log(`[run] Markdown: ${markdownPath}`);
console.log(`[run] JSON: ${jsonPath}`);
if (slackSent) console.log('[run] Slack 配信完了');

process.exit(0);
