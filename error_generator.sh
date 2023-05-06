#!/bin/bash

while true
do
    # generate a random number between 10 and 30
    A=$((RANDOM % 21 + 10))

    # generate a random number between 10 and 45
    B=$((RANDOM % 36 + 10))

    # wait for A seconds
    sleep "$A"

    # generate a random number between 1 and 2
    C=$((RANDOM % 2 + 1))

    if [[ "$(cat ${B}.txt)" == "active" ]]; then
        if [[ "$C" -eq 1 ]]; then
            echo "error" > "$B.txt"
        elif [[ "$C" -eq 2 ]]; then
            echo "unknown" > "$B.txt"
        fi
    fi
done
