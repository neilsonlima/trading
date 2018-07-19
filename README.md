# trade

## Description

Trade is a command-line cryptocurrency trading bot using Node.js and MongoDB

## Quick-start

### Step 1) Requirements

- Windows / Linux / macOS 10 (or Docker)
- [Node.js](https://nodejs.org/) (version v10.5.0 or higher) and [MongoDB](https://www.mongodb.com/).

### Step 2) Install trade

Run in your console,

```
git clone https://github.com/neilsonlima/trade.git
```

Install dependencies:

```
cd trade
npm install
cd strategy
npm install
```

### Ubuntu 16.04 Step-By-Step

```
sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get install build-essential mongodb -y

curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs

git clone https://github.com/neilsonlima/trade.git
cd trade
npm install
cd strategy
npm install

node src/server.js &
node src/strategy.js &
node src/clandlesticks.js &
node src/volume.js &
```

## crontab
    * * * * * sleep 10 && /home/user/trade/cron/volume.sh
    * * * * * sleep 15 && /home/user/trade/cron/candlesticks.sh
    * * * * * sleep 30 && /home/user/trade/cron/candlesticks.sh
    * * * * * sleep 45 && /home/user/trade/cron/candlesticks.sh

## Donations are always welcome

If this helped you in any way, you can always leave me a tip at
```
BTC 1Kajo85BqqjN2R4HM4geX8takiuLK6b7n9
ETH 0x95b4b64b1208df79a78d850895ff241432d98c39
LTC LYDTSTUA8z1iW4GKSL7MmtpvwspyRpqwzc
```        
