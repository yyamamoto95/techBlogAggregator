[デプロイサイトです](https://soft-kheer-8e0b97.netlify.app/)

## 📰 Daily Digest

毎朝6時(JST)に GitHub Actions が RSS を収集し、その日の注目記事を最大10本に絞ったダイジェストを `digests/YYYY-MM-DD.md` に生成します。**外部サービスの設定は一切不要で動作します**(LLM・Slackはオプション)。

```
収集(23フィード) → はてブ数付与 → ルールベース選抜 → 要約 → 配信
```

### 仕組みと段階的なフォールバック

| 段階 | デフォルト(設定不要) | オプションを設定した場合 |
| --- | --- | --- |
| 選抜 | はてブ数 + キーワード一致のスコアリング(LLM不使用) | 同左 |
| 要約 | RSS の抜粋を使用 | `ANTHROPIC_API_KEY` があれば Claude が1行要約 |
| 配信 | `digests/*.md` にコミット | `SLACK_WEBHOOK_URL` があれば Slack にも配信 |

LLM や Slack が落ちていても(またはキーを外しても)ダイジェスト生成は止まりません。

### セットアップ

1. そのまま使う: 何も設定しなくても毎朝 `digests/` にダイジェストが積まれます
2. LLM要約を有効化: リポジトリの Secrets に `ANTHROPIC_API_KEY` を追加(モデルは `scripts/digest/config.json` の `summary.model`、または env `ANTHROPIC_MODEL` で変更可能)
3. Slack配信を有効化: Secrets に `SLACK_WEBHOOK_URL` を追加
4. サイト再ビルド連動: Secrets に `NETLIFY_BUILD_HOOK` を追加

### カスタマイズ

`scripts/digest/config.json` で関心キーワード・件数・セレンディピティ枠(スコア外からランダムに混ぜる本数)を調整できます。手動実行は `npm run digest`、または Actions の `workflow_dispatch` から。

<p align="center">
  <a href="https://www.gatsbyjs.com/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby Minimal TypeScript Starter
</h1>

## 🚀 Quick start

1.  **Create a Gatsby site.**

    Use the Gatsby CLI to create a new site, specifying the minimal TypeScript starter.

    ```shell
    # create a new Gatsby site using the minimal TypeScript starter
    npm init gatsby -- -ts
    ```

2.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd my-gatsby-site/
    npm run develop
    ```

3.  **Open the code and start customizing!**

    Your site is now running at http://localhost:8000!

    Edit `src/pages/index.tsx` to see your site update in real-time!

4.  **Learn more**

    - [Documentation](https://www.gatsbyjs.com/docs/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Tutorials](https://www.gatsbyjs.com/docs/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Guides](https://www.gatsbyjs.com/docs/how-to/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [API Reference](https://www.gatsbyjs.com/docs/api-reference/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Plugin Library](https://www.gatsbyjs.com/plugins?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Cheat Sheet](https://www.gatsbyjs.com/docs/cheat-sheet/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)

## 🚀 Quick start (Netlify)

Deploy this starter with one click on [Netlify](https://app.netlify.com/signup):

[<img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify" />](https://app.netlify.com/start/deploy?repository=https://github.com/gatsbyjs/gatsby-starter-minimal-ts)
