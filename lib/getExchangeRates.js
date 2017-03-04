import request from 'request'
import { POLONIEX_BASE_PATH, BITTREX_BASE_PATH } from './constants'

export const getExchangeRate = (exchangeApi, market) => {
  const url = urlGenerator(exchangeApi, market)
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      resolve(JSON.parse(body))
    })
  })
}

// export const getPoloniexExchangeRate = (market) => {
//   const url = `${POLONIEX_BASE_PATH}&currencyPair=${market}`
//   return new Promise((resolve, reject) => {
//     request(url, (error, response, body) => {
//       resolve(JSON.parse(body))
//     })
//   })
// }
//
// export const getBittrexExchangeRate = () => {
//   const url = BITTREX_BASE_PATH
//   return new Promise((resolve, reject) => {
//     request(url, (error, response, body) => {
//       resolve(JSON.parse(body))
//     })
//   })
// }

export const getAveragePoloniexExchangeRate = (exchangeData) => {
  const numberOfRecords = exchangeData.length
  const aggregateNumerator = exchangeData.reduce( (accumulator, currentRecord) => {
    accumulator += parseFloat(currentRecord.rate)
    return accumulator
  }, 0)

  return (aggregateNumerator/numberOfRecords)
}

const urlGenerator = (exchangeApi, market) => {
  let output
  switch (exchangeApi)
    {
      case 'Poloniex':
        output = `${POLONIEX_BASE_PATH}?command=returnTradeHistory&currencyPair=${market}`
        break

      case 'Bittrex':
        output = `${BITTREX_BASE_PATH}/getmarkethistory?market=${market}`
        break
    }
    return output
}

//output high, low, last, average for both exchanges
