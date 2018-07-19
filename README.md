# trade

## crontab
    * * * * * sleep 10 && /home/user/trade/cron/volume.sh
    * * * * * sleep 15 && /home/user/trade/cron/candlesticks.sh
    * * * * * sleep 30 && /home/user/trade/cron/candlesticks.sh
    * * * * * sleep 45 && /home/user/trade/cron/candlesticks.sh
