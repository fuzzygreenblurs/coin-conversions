import {
  getAllExchangeRatesFromSingleApi,
  getAllExchangeRateData,
  getExchangeRateData }
from './getExchangeRates'

import {
  standardizeDataset,
  getAverageExchangeRate,
  getHighestExchangeRate,
  getLowestExchangeRate,
  processData }
from './dataProcessing'

const LIST_OF_APIS = ['Poloniex', 'Bittrex']
const LIST_OF_CURRENCIES = ['ETH', 'LTC', 'DASH']
const POLONIEX_DATASET = [
  {
    "globalTradeID": 84735961,
    "tradeID": 2606806,
    "date": "2017-03-05 21:05:20",
    "type": "sell",
    "rate": "0.00311372",
    "amount": "5.14033236",
    "total": "0.01600555"
  },
  {
    "globalTradeID": 84735923,
    "tradeID": 2606805,
    "date": "2017-03-05 21:05:07",
    "type": "buy",
    "rate": "0.00311373",
    "amount": "5.74106779",
    "total": "0.01787607"
  }
]

const BITTREX_DATASET = [
  {
    "Id": 34421624,
    "TimeStamp": "2017-03-05T20:55:34.8",
    "Quantity": 2,
    "Price": 0.00313213,
    "Total": 0.00626426,
    "FillType": "FILL",
    "OrderType": "BUY"
  },
  {
    "Id": 34419459,
    "TimeStamp": "2017-03-05T20:28:15.323",
    "Quantity": 120.35690871,
    "Price": 0.00307628,
    "Total": 0.37025155,
    "FillType": "PARTIAL_FILL",
    "OrderType": "SELL"
  }
]

const main = (listOfApis, listOfCurrencies) => {
  listOfApis.forEach((api) => {
    getAllExchangeRatesFromSingleApi(api, listOfCurrencies).then((rawData) => {
      const output = []
      Object.keys(rawData).forEach((currency) => {
        const processedApiData = processData(api, currency, rawData[currency])
        output.push(processedApiData)
      })
      console.log(output, "output");
    })
  })
}

main(LIST_OF_APIS, LIST_OF_CURRENCIES)

//process data
  // const standardizedPoloniexData = standardizeDataset(POLONIEX_DATASET)
  // // console.log(standardizedPoloniexData)
  //
  //
  // const standardizedBittrexData = standardizeDataset(BITTREX_DATASET)
  // // console.log(standardizedBittrexData)
  // //
  // // console.log(getHighestExchangeRate(standardizedPoloniexData));
  // // console.log(getHighestExchangeRate(standardizedBittrexData));
  // // console.log(getLowestExchangeRate(standardizedPoloniexData));
  // // console.log(getLowestExchangeRate(standardizedBittrexData));
  //
  // // console.log(getAverageExchangeRate(standardizedPoloniexData))
  // // console.log(getAverageExchangeRate(standardizedBittrexData))
  //
  // const processedPoloniexData = processData(POLONIEX_DATASET)
  // const processedBittrexData = processData(BITTREX_DATASET)
  //
  // console.log(processedPoloniexData)
  // console.log("-------------------------");
  // console.log(processedBittrexData)
  //

//call api
  // getAllExchangeRatesFromSingleApi('Poloniex', LIST_OF_CURRENCIES).then((values) => {
  //   // console.log(values, 'VALUES')
  //   return values
  // })
