# @helpfeel/cosense-cli

Cosense (旧Scrapbox) のページを読み・調べるCLIとClaude Code Agent Skill。

## CLI として使う

Node.js 24+ が必要。

```bash
npm install -g @helpfeel/cosense-cli
cosense --help
```

各コマンドの詳細:

```bash
cosense <command> --help
```

## Claude Code Agent Skill として使う

Claude Codeのplugin marketplaceとして登録するとAgent Skill (`cosense`) が利用できる。

```
/plugin marketplace add nota/cosense-cli
/plugin install cosense-cli@cosense-cli
```

skillが有効になると、Claude Codeに「Cosenseで〇〇調べて」「このCosenseページ読んで」等と依頼すると自動でskillが起動する。skill側はこのCLI (`cosense` コマンド) を呼び出すので、上記のCLIインストールも事前に必要。

## License

Proprietary. Copyright Helpfeel Inc.
