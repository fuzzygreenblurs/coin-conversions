#### The App:
This is a web app that will find out what the best exchanges would be to convert bitcoin to other digital currencies such as Ethereum, Litecoin, and DASH. It returns the best rates possible based on the exchange API used.

This app is currently deployed on Heroku: [Digital Currency Converter](https://digital-currency-exchanger.herokuapp.com/)

#### Features I'd like to Add:
 - Add an endpoint that takes params to convert for any currency to any other currency. The app currently has hardcoded constants for the currencies (see the `lib/constants.js` file).
 - Add a API call generator method to more easily build other API calls such as BTC-E

#### Endpoints:

Some of these endpoints result in larger outputs that have been described in more detail in this gist: [A Full Description of the Outputs From All Endpoints](https://gist.github.com/akhilsankar1993/da2c11a23bbad567f9d483dc0e87d1f7)

- GET request to the path `/:api/:currency/optimal_exchange_rate` returns JSON with processed data for the exchange rate for a specified `currency` to BTC from a specified `API`.
```javascript
{
  dataSource:"bittrex",
  data: [
    {
      dataSource:"bittrex",
      currency:"ltc",
      averageExchangeRate:306.96,
      highestExchangeRate:311.51,
      lowestExchangeRate:298.06,
      latestExchangeRate:
        {
          exchangeRate:308.99,
          timeStamp:"2017-03-10T04:16:17.683Z"
        }
    }
  ]
}
```

- GET request to the path `/optimal_exchange_rates` returns JSON with the best (sorted by API) exchange rates for the above currencies to BTC.

- GET request to the path `/all_exchange_rates` returns JSON for all data returned from each API for each currency.
