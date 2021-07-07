# 概要

## 技術

- JavaScript

- TypeScript

- [React](https://ja.reactjs.org/docs/getting-started.html)

- [Next.js](https://nextjs.org/docs)

- [Vercel](https://nextjs.org/docs/deployment#vercel-recommended)
  - プラットフォーム

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
