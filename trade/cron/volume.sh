#!/bin/bash
# cron
service=volume.js

if(($(ps -ef | grep -v grep | grep $service | wc -l) <= 0)); then
  node /home/deploy/scripts/src/$service &
fi
