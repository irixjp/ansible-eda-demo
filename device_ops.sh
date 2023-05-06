#!/bin/bash

if [[ "$#" -eq 1 && "$1" == "--help" ]]; then
  echo "Usage: $0 [all|device_number] [active|error|unknown]"
  echo "  all - 全てのデバイスを対象にする"
  echo "  device_number - 操作したいデバイス番号を指定する（10-45）"
  echo "  active - 正常起動状態にする"
  echo "  error - エラー状態にする"
  echo "  unknown - 状態不明の状態にする"
  exit 0
fi

if [[ "$#" -ne 2 ]]; then
  echo "引数の数が正しくありません"
  exit 1
fi

all_active_function() {
    for i in $(seq 10 45)
    do
        echo active > $i.txt
        wscat -c ws://localhost:8081 -x '{"id": '$i', "message": "active"}'
    done 
    wait
}

all_error_function() {
    for i in $(seq 10 45)
    do
        echo error > $i.txt
        wscat -c ws://localhost:8081 -x '{"id": '$i', "message": "error"}'
    done
    wait
}

all_unknown_function() {
    for i in $(seq 10 45)
    do
        echo unknown > $i.txt
        wscat -c ws://localhost:8081 -x '{"id": '$i', "message": "unknown"}'
    done
    wait
}

active_function() {
    echo active > $1.txt
    wscat -c ws://localhost:8081 -x '{"id": '$1', "message": "active"}'
}

error_function() {
    echo error > $1.txt
    wscat -c ws://localhost:8081 -x '{"id": '$1', "message": "error"}'
}

unknown_function() {
    echo unknown > $1.txt
    wscat -c ws://localhost:8081 -x '{"id": '$1', "message": "unknown"}'
}

if [[ "$1" == "all" ]]; then
  case "$2" in
    "active")
      all_active_function
      ;;
    "error")
      all_error_function
      ;;
    "unknown")
      all_unknown_function
      ;;
    *)
      echo "第二引数が正しくありません"
      exit 1
      ;;
  esac
elif [[ "$1" =~ ^[0-9]+$ ]]; then
  case "$2" in
    "active")
      active_function "$1"
      ;;
    "error")
      error_function "$1"
      ;;
    "unknown")
      unknown_function "$1"
      ;;
    *)
      echo "第二引数が正しくありません"
      exit 1
      ;;
  esac
else
  echo "第一引数が正しくありません"
  exit 1
fi

