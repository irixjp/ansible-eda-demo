#!/bin/bash

# 引数の数が正しいかどうかを確認する
if [ "$#" -ne 3 ]; then
    echo "Error: Invalid arguments. Usage: $0 <ID> <websocket URL> <file path>" >&2
    exit 1
fi

# IDが整数であることを確認する
if ! [[ "$1" =~ ^[0-9]+$ ]]; then
    echo "Error: ID must be an integer." >&2
    exit 1
fi

# 初期状態を active に設定
echo "active" > "$3"

# 10-30秒のランダムな秒数を生成する関数
get_random_seconds() {
    echo $(( ( RANDOM % 21 )  + 10 ))
}

# メッセージを送信する関数
send_ws_message() {
    wscat -c "$2" -x '{"id": '$1', "message": "'$(cat "$3")'"}'
}

# 前回の状態を初期化
content=""

# 定期的にファイルを監視して、変更があればメッセージを送信する
while true; do
    sleep $(get_random_seconds)
    if [[ "$(cat "$3")" != "${content}" ]]; then
        send_ws_message "$1" "$2" "$3"
        content=$(cat "$3")
    fi
done

