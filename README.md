# 概要

## 技術

- JavaScript

- TypeScript

- [React](https://ja.reactjs.org/docs/getting-started.html)

  - [react-error-boundary](https://github.com/bvaughn/react-error-boundary)
    - 使用する最も簡単な方法<ErrorBoundary>は、エラーをスローする可能性のあるコンポーネントをラップする.これにより、そのコンポーネントとその子孫によってスローされたエラーも処理される

- [Next.js](https://nextjs.org/docs)
  - CSR・SSR・SSG
    - 速度面：「CSR」と「SSG」はどちらも静的なファイルを返すため、同じ速度
    - 動的なページを作るとして「CSR＋クライアントFetch」と「SSG」の場合を比較するとSSGの方が早くなる
  - CSR
    - レスポンスとして静的なファイルを返すだけなので非常に高速
    - 静的なファイルはキャッシュを効かせることが可能で、同じリクエストがあった時にすぐにレスポンスを投げることが出来る
    - Next.jsのprefetchという機能を使って、ユーザーがあるページを見ているときに
    裏側で他の静的なページを読み込んでくれるためページ間遷移が高速になる
    - ユーザーの回線速度に依存するので、たくさんのリクエストがあるとその分遅くなる
  - SSR
    - リクエストとレスポンスのやり取りが多い
    - 動的だとキャッシュを効かせることができない
    - Next.jsのprefetchを使うことが出来ない
    - ユーザーの機密情報などを扱う際には使用することがある
    - サーバー間のデータフェッチはユーザーの回線速度に依存せず基本は高速になる
  - SSG
    - ビルドの段階でアプリケーションサーバーとリソース(API・SaaS・DB・ファイルシステム)間でリクエストとリスポンスのやり取りが行われ、Webサーバーに静的なファイルが準備される
    - データソースへのリクエスト数が減る
  - クライアントFetchはどれでも可能
    - クライアントFetchを用いてSSRで取得した情報を更新することも可能
    - リアルタイムのデータを常に表示させ続ける
  - Vercel limitation(制限)
    - Vercelのアプリケーションサーバーには制限がある
    - タイムアウトの制限
    - 同時実行数の制限
  - SSG(動的なルート)
    - getStaticPropsと合わせてgetStaticPathsを使う必要がある
    - getStaticPathsはfallbackオプションの使い方で挙動が変わる
    - getStaticPaths
      - 動的なルートで静的生成(SSG)する際に使用する
      - articleIdがとりうる値をリストアップする
    - 静的なルートでSSG：getStaticPropsのみ
    - 動的なルートでSSG：getStaticProps + getStaticPaths
    - ビルド時の後にデータソースが増えた場合には、3つのオプションから挙動を選ぶ
      - fallback:false→指定外のルートは404を返す。データ追加がない場合。
      - fallback:true→最初のリクエストにはフォールバック。ローディング中に静的生成。
      - fallback:"blocking"→最初のリクエストはSSRの挙動。静的生成後に表示
      - ポイント：データの追加があるときは、fallbackはtrueまたは"blocking"
    - 動的なルートの例(articleId・userIdは可変)
      - article/[articleId]
      - user/[userId]
  - ISR
    - SSGのページを更新(再生成)できる→getStaticPropsのrevalidateオプション(number型)を設定するだけで実現可能
    - 更新の間隔を調整できる
    - 更新は新しいリクエスト時のみ→余分なリクエストが発生しない
    - 例
      - revalidate=5だと最大5秒に1度しか再生成されない
      - 5秒以上経って、初のリクエスト時に再生成される

- [Tailwind CSS](https://tailwindcss.com/)
  - 特徴
    - ユーティリティファーストCSSフレームワーク→便利なclassを多く用意している
    - 自分でCSSファイルを作る必要がなく、スタイリングするときはTailwind CSSがあらかじめ用意したclassを当てはめる
    - パフォーマンスが良い
      - 本番環境では未使用のclassを削除してくれる
    - @applyを用いてclassを一つにまとめることが可能
      - @applyを多用すると管理が大変になるため注意する
    - Headless UI
      - Tailwind CSSと上手く合うように作られたUIコンポーネント
    - JSフレームワークとの相性
      - 状態をJavaScript側で管理したいことが多いのに対して、Bootstrapはbootstrap.min.jsの中でJavaScriptがあるため競合してしまうことがある
  - メリット
    - 命名を考えなくて良い
    - 微調整で頭を使わなくて良い
    - レスポンシブ対応(ブレイクポイントの設定)を任せることが出来る
      - sm：min-widthが640px以上のとき
      - md：min-widthが768px以上のとき
      - lgやxlもある
    - ダークモード対応を簡易的に行うことが出来る
      - configファイルでdarkmodeの設定を行うことで使用可能
  - Bootstrap(https://getbootstrap.jp/)との違い
    - 柔軟性：Tailwind CSSは柔軟性があり、Bootstrapは簡単に書ける(記述量が少ない)
      - Bootstrapは他の要件やデザインが違う場合に対応するのが難しい
    - ファイルサイズ：Tailwind CSSはPurgeCSSを用いることによってBootstrapよりパフォーマンスが高くなる
      - Bootstrap：bootstrap.min.js(81KB)+bootstrap.min.css(153KB)=234KB
      - Tailwind CSS：71.3KB(PurgeCSSにより10KB以下になる)
      - PurgeCSS
        - 未使用のclassを削除してくれるもの
    - JavaScriptへの依存：Tailwind CSSはJavaScriptへの依存なし、Bootstrapは依存あり
      - Bootstrap：Accordionコンポーネント、Modalコンポーネント
      - bootstrap.min.jsには、沢山のJavaScriptの記述が入っているため、無駄なJSも読み込んでしまう

- [Chakra UI](https://chakra-ui.com/docs/getting-started), [Material UI](https://material-ui.com/)
  - JavaScriptのUIコンポーネントを用いた方が表現力が高いため、Bootstrapより利用される機会が多い

- [Vercel](https://nextjs.org/docs/deployment#vercel-recommended)
  - プラットフォーム
    - githubのリポジトリと連携して、サイトのデプロイが可能
  - 独自ドメイン(vercelで購入することも可能)
    - httpsに標準で対応しているため証明書を発行する必要がない
    - Googleドメインなどで購入したドメインを用いる際にはAddする
  - サブドメイン
    - 大きなサービスを運用する際には費用軽減のためサブドメインを用いる

- [ESLint](https://eslint.org/docs/rules/)

  - コードの解析を行うツール
  - plugins：「rules に本来 eslint に無い独自のルールを追加するもの」
    - ESLint は React に関するルールを持っていないので plugin に設定することでルールを追加することが出来る
    - rules に独自の設定を追加する
  - extends：「rules のデフォルト設定を行えるもの」＋「他のオプションを拡張できるもの」
    - rules のデフォルトのセットを決める
    - rules 以外の設定を拡張する
  - env：「グローバルな変数を環境に応じて定義してくれるもの」
    - node を env に追加することで module などの node のグローバル変数を認識する(browser も同様)
  - parserOptions：「JavaScript が構文を解析するときに必要な情報を補足として付けるもの」
    - ESLint はデフォルトで ECMAScript の構文しかサポートしていない
    - 最新の構文を使えるようにするために設定する
    - EcmaFeatures の設定なしで jsx の記法を使うことが出来る
      - 理由：外部パッケージの eslint-plugin-react が勝手に jsx の設定を true にしている
  - settings
    - package.json の react を見て React のバージョンを決める設定を行う
  - 特徴
    - ESLint は js ファイルしか見ない
    - jsx はデフォルトでは認識しないようになっている
    - --ext を使って他の拡張子を認識するようになる
    - fix というオプションを用いると、自動修正することが出来る
    - 今あるプロダクトに ESLint を導入するときに--fix を付けることによって自動修正できるものは全部自動修正してくれる
  - [@typescript-eslint/naming-convention](https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqazBOeFdUOGYtdldfbFAxSEZjTG9yWWxJNXFFQXxBQ3Jtc0tsTTMwWGZ0Zi15SVo5b0Rna1dHZXZpd2JNN3Bvb2o1QUI0RExMY2NtZHBrdGozZHJycUtWa0RGRG5FVUR5R3NjUUdFM2lyTjFyekljbGZ0d1E2aTFkTnFvb2hvT191d2lpelA1UUVTMzlxWVpVcW00UQ&q=https%3A%2F%2Fdev.classmethod.jp%2Farticles%2Fshuntaka9576-check-eslint%2F)

  ```
    // 対話式でESLintの設定を行うことが可能
    yarn run eslint --init
  ```

- [Prettier]()
  - コードの整形を行うツール

- ESLint・Prettier
  - npm-run-all(package)
    - lintを同時に走らせる(run-p)
    - fixを連続的に走らせる(run-s)
      - eslintの修正中にprettierの修正を加えることを防ぐため
    - --continue-on-errorを付けることで出力を変えたりできる
  - husky & lint-staged
    - スクリプトに lint を登録して、また別のパッケージで husky, lint-staged を組み合わせると、GitHub でコミットしてコードを送る前に yarn lint で検査を行う事によって、検査が通ればコミットできるけど、検査が通らなければエラーを出してコミットできないようにすることが出来る
    - .huskyディレクトリのpre-commitファイルをgitに上げないように.gitignoreファイルが.huskyディレクトリ内に作成されている
    - package.json内のscriptsのyarn prepareで.huskyディレクトリを作成するようにしている

    ```
      // 設定
      npx mrm@2 lint-staged
    ```

- [json-server](https://github.com/typicode/json-server)(mockAPIを作るときに便利)
  - 欲しいAPIを素早く定義することが出来る
  - フィルタリングの処理
  - ページングの処理
  - ソートの処理
  - 比較の処理

- [Google Domains](https://domains.google.com/registrar/search?hl=ja)
  - Gmailをそのまま独自ドメインを反映させて使うことが出来る
  - Google Domainsで購入したドメインをVercelで使う方法
    - Google Domainsのカスタムネームサーバーを使用する
