#!/bin/bash
# cron
service=candlesticks.js

if(($(ps -ef | grep -v grep | grep $service | wc -l) <= 0)); then
  node /home/deploy/trade/src/$service &
fi
