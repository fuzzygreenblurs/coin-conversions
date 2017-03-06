#### The Problem:
This is a web app that will find out what the best exchanges would be to convert bitcoin to other digital currencies such as <Ethereum>, <Litecoin>, and <DASH>. It returns the best rates possible when it converts the coins to give his children.

#### Endpoints:

- For example, a GET request to the path `/` returns the following JSON:
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
