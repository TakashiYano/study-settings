# 概要

## 技術

- JavaScript

- TypeScript

- [React](https://ja.reactjs.org/docs/getting-started.html)

- [Next.js](https://nextjs.org/docs)

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

  ```
    // 対話式でESLintの設定を行うことが可能
    yarn run eslint --init
  ```

- [Prettier]()
  - コードの整形を行うツール
