import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { collect } from './collect.mjs';
import { enrichWithHatebu } from './hatebu.mjs';
import { selectTopItems } from './score.mjs';
import { summarize } from './summarize.mjs';
import { jstDateString, postToSlack, updateJsonIndex, writeMarkdown } from './deliver.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const config = JSON.parse(fs.readFileSync(path.join(here, 'config.json'), 'utf8'));

const collected = await collect(config.lookbackHours);
console.log(`[run] 過去${config.lookbackHours}時間の記事: ${collected.length}件`);

const enriched = await enrichWithHatebu(collected);
const selected = selectTopItems(enriched, config);
console.log(`[run] 選抜: ${selected.length}件`);

const summarized = await summarize(selected, config);

const dateStr = jstDateString();
const file = writeMarkdown(summarized, dateStr);
console.log(`[run] Markdown 出力: ${file}`);

const jsonFile = updateJsonIndex(summarized, dateStr);
console.log(`[run] JSON インデックス更新: ${jsonFile}`);

const sentToSlack = await postToSlack(summarized, dateStr);
if (sentToSlack) console.log('[run] Slack 配信完了');

// rss-parser が失敗したソケットを保持し続けることがあるため明示的に終了する
process.exit(0);
