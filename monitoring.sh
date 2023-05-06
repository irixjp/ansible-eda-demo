#!/bin/bash

while true
do

    for i in {10..45}
    do
        file="${i}.txt"
        echo "Monitoring ${file}..."
        if grep -q "error" "${file}"; then
            echo "Error found in ${file}"
            message="{\"id\": ${i}, \"message\": \"error\"}"
            curl -X POST -H "Content-Type: application/json" -d "${message}" http://localhost:8082/endpoint
        fi

        if grep -q "unknown" "${file}"; then
            echo "Unknown found in ${file}"
            message="{\"id\": ${i}, \"message\": \"unknown\"}"
            curl -X POST -H "Content-Type: application/json" -d "${message}" http://localhost:8082/endpoint
        fi
        sleep 1
    done
    sleep 30
done

