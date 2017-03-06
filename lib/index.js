import express from 'express'
const app = express()

import { getAllExchangeRatesFromSingleApi } from './getExchangeRates'
import { generateFinalDataFromApi, getAllBestExchangeRates } from './dataProcessing'
import { LIST_OF_APIS, LIST_OF_CURRENCIES } from './constants'

app.get("/", (req, res) => {
  res.send("This is an API for digital currency exchange rates. Built by Akhil Sankar.")
})

app.get("/optimal_exchange_rates", (req, res) => {
  getOptimalExchangeRates(LIST_OF_APIS, LIST_OF_CURRENCIES).then((finalData) => {
    console.log(finalData)
    res.send(JSON.stringify(finalData))
  })
})

app.get("/all_exchange_rates", (req, res) => {
  getAllExchangeRates(LIST_OF_APIS, LIST_OF_CURRENCIES).then((finalData) => {
    console.log(finalData)
    res.send(JSON.stringify(finalData))
  })
})

app.listen(3000)

const getOptimalExchangeRates = (listOfApis, listOfCurrencies) => {
  const allApiCallPromises = generateAllApiCallPromises(listOfApis, listOfCurrencies)

  return Promise.all(allApiCallPromises)
  .then((finalProcessedData) => {
    return getAllBestExchangeRates(finalProcessedData, listOfCurrencies)
  })
}

const getAllExchangeRates = (listOfApis, listOfCurrencies) => {
  const allApiCallPromises = generateAllApiCallPromises(listOfApis, listOfCurrencies)

  return Promise.all(allApiCallPromises).then((finalProcessedData) => {
    return finalProcessedData
  })
}

const generateAllApiCallPromises = (listOfApis, listOfCurrencies) => {
  let allApiCallPromises = listOfApis.map((api) => {
    return getAllExchangeRatesFromSingleApi(api, listOfCurrencies)
    .then((rawData) => {
      return generateFinalDataFromApi(api, rawData)
    })
  })

  return allApiCallPromises
}
