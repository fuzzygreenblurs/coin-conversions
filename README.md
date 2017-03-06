#### The Problem:
This is a web app that will find out what the best exchanges would be to convert bitcoin to other digital currencies such as <Ethereum>, <Litecoin>, and <DASH>. It returns the best rates possible when it converts the coins to give his children.

#### Endpoints:

- GET request to the path `/optimal_exchange_rates` returns JSON with the best (sorted by API) exchange rates for the above currencies to BTC:
```javascript
{
  optimalExchangeRates: [
    {
      dataSource: "Poloniex",
      currency: "ETH",
      averageExchangeRate: 66.83,
      highestExchangeRate: 67.1,
      lowestExchangeRate: 66.68,
      latestExchangeRate: {
        exchangeRate: 66.79,
        timeStamp: "2017-03-06T13:01:46.000Z"
      }
    },
    {
      dataSource: "Poloniex",
      currency: "LTC",
      averageExchangeRate: 319.23,
      highestExchangeRate: 320.88,
      lowestExchangeRate: 317.98,
      latestExchangeRate: {
        exchangeRate: 318.29,
        timeStamp: "2017-03-06T13:01:36.000Z"
      }
    },
    {
      dataSource: "Bittrex",
      currency: "DASH",
      averageExchangeRate: 28.26,
      highestExchangeRate: 28.98,
      lowestExchangeRate: 27.78,
      latestExchangeRate: {
        exchangeRate: 27.88,
        timeStamp: "2017-03-06T05:55:44.583Z"
      }
    }
  ]
}
```

- GET request to the path `/all_exchange_rates` returns JSON for all data returned from each API for each currency:
```javascript
[
  {
    dataSource: "Poloniex",
    data: [
      {
        dataSource: "Poloniex",
        currency: "LTC",
        averageExchangeRate: 319.15,
        highestExchangeRate: 320.88,
        lowestExchangeRate: 317.98,
        latestExchangeRate: {
          exchangeRate: 319.93,
          timeStamp: "2017-03-06T13:27:47.000Z"
        }
      },
      {
        dataSource: "Poloniex",
        currency: "DASH",
        averageExchangeRate: 28.12,
        highestExchangeRate: 28.2,
        lowestExchangeRate: 28.09,
        latestExchangeRate: {
          exchangeRate: 28.09,
          timeStamp: "2017-03-06T13:27:44.000Z"
        }
      },
      {
        dataSource: "Poloniex",
        currency: "ETH",
        averageExchangeRate: 66.69,
        highestExchangeRate: 66.8,
        lowestExchangeRate: 66.48,
        latestExchangeRate: {
          exchangeRate: 66.48,
          timeStamp: "2017-03-06T13:27:52.000Z"
        }
      }
    ]
  },
  {
    dataSource: "Bittrex",
    data: [
      {
        dataSource: "Bittrex",
        currency: "LTC",
        averageExchangeRate: 319.05,
        highestExchangeRate: 325.08,
        lowestExchangeRate: 312.98,
        latestExchangeRate: {
          exchangeRate: 321.33,
          timeStamp: "2017-03-06T06:07:44.540Z"
        }
      },
      {
        dataSource: "Bittrex",
        currency: "ETH",
        averageExchangeRate: 66.34,
        highestExchangeRate: 67.42,
        lowestExchangeRate: 65.79,
        latestExchangeRate: {
          exchangeRate: 66.8,
          timeStamp: "2017-03-06T06:26:13.893Z"
        }
      },
      {
        dataSource: "Bittrex",
        currency: "DASH",
        averageExchangeRate: 28.26,
        highestExchangeRate: 28.98,
        lowestExchangeRate: 27.78,
        latestExchangeRate: {
          exchangeRate: 28.17,
          timeStamp: "2017-03-06T06:27:16.757Z"
        }
      }
    ]
  }
]
```
