import { useState, useEffect } from "react";
import axios from "axios"

function App() {
  const api_key = process.env.REACT_APP_API_KEY

  const [countries, setCountries] = useState([])
  const [searchString, setSearchString] = useState("")
  const [weather, setWeather] = useState(null)
  const [lastCountry, setLastCountry] = useState("")
  
  useEffect(()=> {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data)
    })
  },[])

  useEffect(()=> {
    const requestWeather = async (countryname, apikey) => {
      if (!countryname || !apikey) return
      const weatherdata = await axios.get(`http://api.weatherstack.com/current?access_key=${apikey}&query=${countryname}`)
      setWeather(weatherdata.data)
    }

    requestWeather(lastCountry,api_key)
  },[lastCountry, api_key])

  const searchCountries = (event) => {
    setSearchString(event.target.value)
    const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(event.target.value.toLowerCase()))
    if (filteredCountries.length === 1 && lastCountry !== filteredCountries[0].name) {
      setLastCountry(filteredCountries[0].name)
    }
  }

  const CountryList = ({countries, onShow}) => (
    countries.map(country => (
        <div key={country.name}>
          {country.name} <button onClick={onShow.bind(this, country.name)}>show</button>
        </div>
    ))
  )

  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(searchString.toLowerCase()))

  const CountrySection = ({countries, searchString, onShow}) => {
    if (!searchString)
      return ( <div>Please use the input box above to search for countries</div> )
    else if(countries.length === 0)
      return ( <div>No matches found</div> )
    else if (countries.length > 10)
      return ( <div>Too many matches, specify another filter</div> )
    else if (countries.length === 1)
      if (lastCountry === countries[0].name && weather)
        return (
          <>
            <CountryDetails country={countries[0]}/> 
            <Weather weather={weather}/>
          </>
        )
      else {
        if (lastCountry === countries[0].name) return null;
        return<CountryDetails country={countries[0]}/>
      }
    else
      return ( <CountryList countries={countries} onShow={onShow}/> )
  }

  const CountryDetails = ({country}) => (
    <div>
      <h1>{country.name}</h1>
      capital {country.capital}<br/>
      population {country.population}<br/>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} width="150px" alt={`Flag of ${country.name}`}/>
      <Weather country={country}/>
    </div>
  )

  const Weather = ({weather}) => {
    if (!weather) return null;
    return (
      <div>
        <h2>Weather in {weather.location.name}</h2>
        <b>temperature:</b>{weather.current.temperature} celsius<br/>
        {
          weather.current.weather_icons.map(iconUrl => (
            <div key={iconUrl}>
              <img src={iconUrl} width="50px" alt="Weather Icon"></img><br/>
            </div>
          ))
        }
        <b>wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}<br/>
      </div>
    )
  }



  const onShowPress = (countryname) => {
    setSearchString(countryname)
    setLastCountry(countryname)
  }

  return (
    <div>
      find countries <input value={searchString} onChange={searchCountries}></input><br/>
      <CountrySection countries={countriesToShow} searchString={searchString} onShow={onShowPress}/>
    </div>
  );
}

export default App;
