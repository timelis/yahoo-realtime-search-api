# yahoo-realtime-search-api

`daily-eat-cron/src/lib/yahoo-search`を変更せず`src/lib/yahoo-realtime-search`へコピーし、`YahooSearch`の各メソッドをHTTPから呼び出すAPIです。

URL: https://yahoo-realtime-search-api.cdvxxxc9.workers.dev

すべてPOST、`Content-Type: application/json`。Zodで型を検証し、不正な入力や未知のフィールドは400を返します。値の変換・補正・既定値の追加は行わず、クラスの戻り値をそのままJSONで返します。引数を省略する場合も`{}`を送信してください。

| パス | 必須JSONフィールド | 任意JSONフィールド |
| --- | --- | --- |
| `/autoscroll` | `p: string` | `fr: string`, `rkf: number`, `b: number`, `latestTweetId: string`, `results: number`, `catchupTweet: boolean` |
| `/pagination` | `p: string` | `fr: string`, `rkf: number`, `b: number`, `oldestTweetId: string`, `start: string` |
| `/recommend/pagination` | なし | `rkf: number`, `b: number`, `results: number`, `oldestTweetId: string` |
| `/recommend/video` | なし | `rkf: number`, `b: number`, `results: number` |
| `/interest/category/pagination/:categoryId` | なし | `oldestTweetId: string` |

```sh
curl https://yahoo-realtime-search-api.cdvxxxc9.workers.dev/pagination \
  -H 'Content-Type: application/json' \
  -d '{"p":"東京"}'
```

```sh
bun install --frozen-lockfile
bun run dev
bun run typecheck
bun run check
bun run fix
```

Ultracite（Oxlint + Oxfmt）の`core`と`anti-slop`、型情報を使ったlintを有効にしています。

Cloudflareの個人アカウント`cdvxxxc9@gmail.com`に同名のWorkerとして配置しています。GitHubの`timelis/yahoo-realtime-search-api`の`main`へのpushで、Workers Buildsが型チェック後に自動デプロイします。ビルド環境変数`BUN_VERSION=1.4.2`を設定済みです。ローカルもBun 1.4.2を使用してください。

手動デプロイは、同アカウントへアクセス可能なWrangler認証で`bun run deploy`を実行します。
