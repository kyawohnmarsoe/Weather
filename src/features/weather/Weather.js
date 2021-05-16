import React,{useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux"
import Axios from 'axios'
import {
    changeCity,
    CurrentWeatherData,
    CurrentWeatherError,
    ForecastWeatherData,
    ForecastWeatherError
} from './weatherSlice'
import styles from "./Weather.module.css"
import moment from 'moment'


function Weather() {
    const currentCity = useSelector(state => state.weather.currentCity)
    const currentData = useSelector(state => state.weather.currentData)
    const forecastData = useSelector(state => state.weather.forecastData)
    var newForecastDataDaily
    if(forecastData !== null){
        const forecastDataDaily = forecastData.daily;
         newForecastDataDaily = forecastDataDaily.slice(1, 6)
    }
    const error = useSelector(state => state.weather.error)
    const dispatch = useDispatch()
    const API_KEY = "567fb009055f8d8fddf69948130c088f"
    // Current 
    const getCurrentWeather = (city) =>{
        Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
        
        .then(response=>{
            dispatch(CurrentWeatherData(response.data))
            getForecastWeather(response.data.coord.lat,response.data.coord.lon)
        })
        .catch(error=>{
            dispatch(CurrentWeatherError("City Not Found!"))
        })
    }
     // Forecast 
    const getForecastWeather = (lat,lon) =>{
        Axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,current&appid=${API_KEY}`)
        
        .then(response=>{
            // console.log(response.data)
            dispatch(ForecastWeatherData(response.data))
        })
        .catch(error=>{
            // console.log(error.message)
            dispatch(ForecastWeatherError("City Not Found!"))
        })
    }
    useEffect(()=>{
        getCurrentWeather(currentCity)
    },[currentCity])

    const [newCity,setNewCity] = useState('Singapore')
   
    return (
      
        <div >
            <h1>Open Weather</h1>
        
                <input type="text"
                value={newCity}
                onChange={e=>setNewCity(e.target.value)}
                />
                <input type="submit" 
                value="Search"
                onClick= { () => dispatch(changeCity(newCity)) } />
         
            {
                error && <h2>{error}</h2>
            }

            {
                currentData &&
                <div className={styles.weatherBox}>
                    <span className={styles.cityname}>{currentCity}</span>
                    <div className={styles.row}>
                        <div>
                            <img src={`http://openweathermap.org/img/wn/${currentData.weather[0].icon}.png`} alt="Weather Icon" className={styles.icon}/>
                            <span className={styles.description}>{currentData.weather[0].description}</span>
                        </div>
                        
                        <span className={styles.temperature}>{currentData.main.temp} °C</span>
                        <div className={styles.windBox}>
                            <span>Wind:{currentData.wind.speed} m/s</span> 
                            <span>Sunrise: {moment(currentData.sys.sunrise * 1000).format('LT')} </span> 
                            <span>Sunset:{moment(currentData.sys.sunset * 1000).format('LT')} </span> 
                        </div>
                    </div>
                   
                        {
                            forecastData &&
                            <div className={styles.row}>
                            {
                                    newForecastDataDaily.map((data,index) => (
                                    <div key={index}>
                                        <span>{moment(data.dt * 1000).format('dddd')}</span>
                                        <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="Weather Icon"  className={styles.icon}/>
                                        <span >{data.temp.day} °C</span>
                                    </div>
                                ) )
                            }
                            </div>
                        }
                        
                   
                </div>
            }
        </div>
    )
}

export default Weather
