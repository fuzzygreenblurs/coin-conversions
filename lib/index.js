import { getAllExchangeRatesFromSingleApi } from './getExchangeRates'
import { generateFinalDataFromApi, getAllBestExchangeRates } from './dataProcessing'
import { LIST_OF_APIS, LIST_OF_CURRENCIES } from './constants'

const main = (listOfApis, listOfCurrencies) => {
  let allApiCallPromises = listOfApis.map((api) => {
    return getAllExchangeRatesFromSingleApi(api, listOfCurrencies)
    .then((rawData) => {
      return generateFinalDataFromApi(api, rawData)
    })
  })

  return Promise.all(allApiCallPromises)
  .then((finalProcessedData) => {
    return getAllBestExchangeRates(finalProcessedData, listOfCurrencies)
  })
}

main(LIST_OF_APIS, LIST_OF_CURRENCIES).then((finalData) => {
  console.log(finalData);
})
