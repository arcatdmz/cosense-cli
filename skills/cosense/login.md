# Cosenseにログインする手順書

まずCLIコマンドの仕様を `cosense login --help` で確認する。

## 手順

Agent自身は `cosense login` を実行しない。ユーザーに以下を依頼する:

1. `cosense login --help` の Usage に従って、別のターミナルウィンドウで `cosense login` を実行する
2. 表示されたURL・手順に従ってトークンを発行する
3. ターミナルに戻ってトークンを貼り付け、Enterで確定する
4. 完了をAgentに伝える

完了報告を受けたら、最初に失敗した操作をリトライする。

## 補足

- 401/403が解消しない場合、トークンが正しく発行されているか・対象origin/projectが正しいかをユーザーに確認する

## Assistant環境での補足

- Agent自身は `cosense login` を実行しない
- assistant環境に既存の秘密情報がある場合は、それを優先して使う
- `COSENSE_PAT` が未設定で、`COSENSE_PERSONAL_ACCESS_TOKEN` または `SCRAPBOX_PERSONAL_ACCESS_TOKEN` が存在する場合は、`COSENSE_PAT` としてexportする
- 認証確認は `cosense whoami https://scrapbox.io` で行う
- 認証診断中にトークン値や秘密設定の生の内容を出力しない
