# 業務フロー ワイヤーフレーム

このサイトの利用フロー（閲覧・保存・ダイジェスト）と、毎朝の自動ダイジェスト生成パイプラインを
[flow-wireframe](https://github.com/yyamamoto95/flow-wireframe) で見える化したもの。

| ファイル | 役割 |
|---------|------|
| `techblog.flow.json` | フロー定義（これが編集対象。`$schema` によりエディタ補完が効く） |
| `techblog.wireframe.html` | 生成物（ブラウザで直接開ける静的HTML。JSなし・単一ファイル） |

## 再生成の方法

```bash
npx flow-wireframe build wireframes/techblog.flow.json -o wireframes/techblog.wireframe.html
```

定義（JSON）を変更したら HTML を再生成してコミットする。出力は決定的（同じ定義→同じHTML）なので、
JSON の diff がそのまま仕様変更のレビューになる。

## フロー ID の規約

- `TB-1xx`: 閲覧系（読者が主体）
- `TB-2xx`: 自動化系（システムが主体。画面を持たない処理ステップを含む）
