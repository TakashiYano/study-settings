# 概要

## 技術

- JavaScript

- npm(パッケージ管理システム)
  - 依存関係を解決できるため、パッケージ管理システムを用いる
    - 一つ一つ管理していく手間を省き、パッケージ管理をすべて自動化させる
    - 「Googleがホストしているものをscriptタグで読み込んでいる」方法ではなく、「yarn addを用いてnode_modulesの中にパッケージを入れて呼び出す」方法を用いることが多い
  - [コマンド](https://qiita.com/rubytomato@github/items/1696530bb9fd59aa28d8)
    - pwd：現在の階層を確認する
    - yarn(npm) -v：バージョンを確認する
    - yarn init -y(対話型がyesでデフォルト)：プロジェクトごとに、パッケージ管理を行うpackage.jsonを作成
      - npm initは必須だが、yarn initは必須でなく、npmライブラリをローカルにインストールするだけで自動でpackage.jsonを作成してくれる
  - yarn.lock：パッケージの依存関係を示す
  - node_modules：パッケージはdistに入れられていることが多い
  - パッケージのバージョン管理
    - package.jsonのdependenciesを手動で書き換えてコマンドでyarnを行うか、コマンドでyarn upgrade ～ --latestを用いる
    - yarn add ～ のみでパッケージのバージョン管理が可能
    - node_modulesの中のパッケージをバージョン管理している

- npmライブラリ
  - ローカルにインストールする(yarn add ～)
    - node_modulesの中にある.binファイルを参照する
    - 実行ファイルがnode_modulesの中にあるのでこのディレクトリを他の人と共有してチーム開発をする場合でも、同じバージョンで実行できる
    - node_modulesは膨大なファイル量になるため、Git Hubで共有せずにお互いの環境でインストールし直す
      - その際にpackage.json、yarn.lockが必要となる
  - グローバルにインストールする(yarn global add ～)
    - チームで開発するときに不便
    - 他の人がグローバルの環境にそのパッケージが入っているかどうかわからない
    - パッケージがあったとしてもバージョンが同じであるかどうかわからない
  - パッケージのバージョンを確認するコマンド(～ --version)
  - mapファイル(style.css.map)
    - デバッグなどに使う
    - CSSと開発時に使っているSassの関連付けを行うためのファイル

- npmスクリプト
  - node_modules内の実行ファイルを毎回指定するのは大変で、チーム開発の際もわかりにくいため、そういったコマンド(タスク)の実行はnpm scriptsに登録して使う
  - buildを実行したい時にタスクランナー(Gulp, Grunt)を使って実現する必要がない

- チーム開発におけるnode_modulesの扱い方
  - node_modulesを共有しない理由
    - プロジェクトによってはパッケージが200～300個になることも多々あり、膨大なファイルサイズとなるため
    - Gitでファイルの管理をしていくことになるが、node_modules内の全てをGitで管理しようとすると、コードの差分がすごいことになってしまう
  - node_modulesを共有しないための方法
    - package.jsonとyarn.lockをGitHubにあげて、チームメンバーがインストールし直すという手法を用いる
    - GitHubから自分のローカル環境にクローンをして、そこで改めてyarnすることでnode_modulesを作る
    - バージョン管理が指定されているyarn.lockがあれば、各々インストールし直しても同じものがインストールされる
  - .gitignoreの使い方
    - git initで.gitという不可視フォルダが作られ、.gitがあるとVS Codeで差分管理が可能になる
    - .gitignoreに記載されたファイルはソース管理から外れる

- npx
  - パッケージをインストールすることなくコマンドを実行することが出来る
  - yarn create ～はnpxと完全に互換性があるわけではない
    - 一回限りの実行を行うときはnpxで行う
    - yarn2からはyarn dlxというコマンドで実現可能
  - 注意事項
    - npxでインストールするときには、公式ドキュメントのコマンドをコピーして実行することで、タイポによって悪意のあるソフトをインストールしてしまうことを防ぐ必要がある
  - npxを使うと便利なパッケージ
    - vercelが出しているserve(https://github.com/vercel/serve)：ローカルのサーバーを簡単に立ち上げるもの
      - シングルページアプリケーションを確認したい時やビルドしたものが動くかを確認したいときに用いる

- [Babel](https://babeljs.io/)
  - JavaScriptのコンパイラで、コンパイラというのはあるプログラムを別のプログラムに変換すること
  - ブラウザによっては新しい記法が使える・使えないという問題があったりするが、Babelを使うことによってどのブラウザでも動くように変換する
  - TypeScriptやReact JSXもBabelを通してブラウザで動かすように変換する

- [モジュールバンドラー「webpack」](https://webpack.js.org/)
  - ReactやNext.jsなどのモダンなWebフレームワークの裏側で必ず動いているツール
  - モジュール同士の依存関係を解決して1つのJSファイルにまとめたり、CommonJS形式のモジュールをブラウザが動く形に変換できる
  - SassをCSSに変換する
  - 画像ファイルを変換してサイズを減らす
  - 開発環境を立ち上げて便利に開発できるようにする
  - ホットリローディング
  - --mode=development：ブラウザの開発ツールが解析しやすいようにバンドルされている
  - --mode=production：変数が短くなったり、空白や改行が削除されていたりなど最適化されファイルサイズが小さくなっている

- webpack-dev-server(開発体験の向上)
  - ソース内にあるjsファイルを監視させて、何か変更があった際に自動で更新する

- ECMAScriptとは
  - JavaScriptの中核となる言語使用のこと
  - どの実行環境でも共通な動作のみが定義されている
  - ブラウザの違いなどを意識せずにECMAScriptで開発することが出来る(実装速度に差があるためコンパイル)

- jQuery
  - 少ない記述で多くの実装が出来るため、多くの開発者に利用された
  - ブラウザ間の差異を吸収できたのも便利だった

- ServerJS→CommonJS
  - 2つの問題(CommonJS)
    - 名前空間：モジュールによって解決される
    - 依存関係：パッケージ管理(npm)によって解決される

- モジュールとは
  - モジュールは相互に読み込んだり、exportとimportを使用して機能をやり取りしたり、あるモジュールの関数を別のモジュールから呼び出したりすることが出来る
  - モジュールにはスコープの概念がある
    - JavaScriptのモジュールは1ファイル単位で、ファイル内の変数や関数は外部に影響を及ぼさない
  - 機能の細分化
    - モジュールのおかげで名前空間の問題が解決されて、機能が細かく分けられるようになった
    - さらにいろんな機能を組み合わせて便利なことが出来るようになった

- Node.jsとCommonJS
  - JavaScriptにはモジュールの仕様が複数存在していて、CommonJS形式はNode.jsで使われている

- パッケージ管理(npm)で依存関係問題を解決
  - 共有の需要：機能が細分化されていくとそれらを共有して使用するニーズが生まれる
  - パッケージ：共有したい機能の単位。1ファイルの場合もあれば、ディレクトリの場合もある
  - 共有方法(パッケージ管理システム)：Node.jsでいろんなパッケージが開発されるようになるとそのパッケージのバージョンを管理したり、共有するためのシステムの必要性が生まれた
    1. リポジトリの購読
      - ローカル環境にインストールしたパッケージを更新できる。またパッケージを検索できる
    1. パッケージのインストール・削除
      - パッケージを指定してローカルにインストールできる。ローカルから削除することもできる
    1. 依存関係の解決
      - パッケージに必要な別のパッケージを自動的にインストールや更新することが出来る
    1. 設定管理
      - 設定を書くことで1・2・3を自動で行える。毎回手動でパッケージを入れたりする必要がなくなりチームでの環境を簡単にそろえたりすることが出来る

- ブラウザでモジュールを使うための技術
  - ブラウザでモジュールを使うために、コードを事前に変換することが主流になった
  - コードを事前に変換することで、モジュールを使える以外にも多くの恩恵を得た
    - Bundle(バンドル)
      1. 開発時はCommonJSモジュールで開発
      1. モジュールの依存関係を解決して1ファイルに変換(バンドル)
      1. 変換したコードをいつも通りscriptタグで読み込む
    - Complie(コンパイル)
      1. 開発時はブラウザでは動かないけど、開発に便利な機能を使ってコードが書ける
      1. 書いたコードをブラウザで動くように変換する(コンパイル)
      1. 変換したコードをscriptタグで読み込む

- バンドルツール
  - Browserify
    - CommonJS形式で書かれたものをブラウザ向けにバンドルするツール
  - webpack
    - 主にJavaScript向けだが、対応するローダーがあればHTML、CSS、画像などのフロントエンドのアセットも変換(バンドル)することが出来る
    - Code Splitting
      - webpackを使うとコードを複数のchunkに分割できる
      - chunkは実行時に非同期的にロードされるため、最初のロード時間を短縮することが出来る

- ES Modulesの策定
  - ES2015でJavaScriptの言語仕様としてモジュールの仕組みがついに導入された
  - webpackがES Modulesに対応し、ES Modules形式でモジュール間のやり取りが可能に

- ES2015とBabel
  - ES2015
    - モジュール以外にもlet, const, class, Promise, アロー関数, 分割代入, スプレッド構文, テンプレート文字列...などのたくさんの仕様が追加されたがすぐに使えなかった
  - Babel(6to5)
    - ES2015などで書かれたコードを従来の環境でも動くように古いJavaScriptに変換するコンパイラ

- パラダイムシフト
  - 事前に変換というパラダイムシフトによってjQueryが使われなくなった
  - 事前に変換することでモジュールも使えるし、ESの新機能やTypeScriptなどが使える

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
