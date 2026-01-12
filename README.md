# Overview

a small api that fetches weather data for any city for free it depends on ![Visual Crossing’s API](https://www.visualcrossing.com/weather-api/).

# Usage

## Prerequiset

1. Node: ^22

## Quick start

1. clone the repo

```bash
git clone https://github.com/AbdelRahmanAlTamimi/weather-api-node.git
cd weather-api-node
```

2. get your api key from https://www.visualcrossing.com/weather-api/

3. create .env file and configure it

```bash
cp .env.example .env
```
then add your API key and redis url

4. install dependancies and run the project
```bash
npm i 
npm run dev
```

the project url: http://localhost:8080

# Architecture
![architecture](weather-api-architecture.png)