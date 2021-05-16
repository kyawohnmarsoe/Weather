import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import weatherAPI from "../../api";

const sliceName = "weather";

export const fetchCurrentWeather = createAsyncThunk(
    `${sliceName}/fetchCurrentWeather`,
    ({ query }) => weatherAPI.fetchCurrentWeather({ query })
);

export const fetchWeatherForecast = createAsyncThunk(
    `${sliceName}/fetchWeatherForecast`,
    ({ lat, lon }) => weatherAPI.fetchWeatherForecast({ lat, lon })
);

export const weatherSlice = createSlice({
    name: sliceName,
    initialState: {
        currentData: null,
        loading: true,
        error: null,
        currentCity:'Singapore',
        forecastData:null,
  
        
    },
    reducers: {
        changeCity: (state,action) => {
           
            state.loading = false;
            state.currentCity = action.payload;
           
        },
        CurrentWeatherData: (state,action) => {
            state.loading = false;
            state.currentData = action.payload;
            state.error=null;
        },
        CurrentWeatherError: (state,action) => {
            state.loading = false;
            state.currentData = null;
            state.error = action.payload;
        },
        ForecastWeatherData: (state,action) => {
            state.loading = false;
            state.forecastData = action.payload;
      
            state.error=null;
        },
        ForecastWeatherError: (state,action) => {
            state.loading = false;
            state.forecastData = null;
          
            state.error = action.payload;
        }

    },
    extraReducers: {
        [fetchCurrentWeather.pending]: (state, { payload, meta }) => {
            state.loading = true;
        },
        [fetchCurrentWeather.fulfilled]: (state, { payload, meta }) => {
            state.loading = false;
            state.currentData = payload.data;
        },
        [fetchCurrentWeather.rejected]: (state, { error, meta }) => {
            state.loading = false;
            state.error = error;
        },
    },
});
export const { changeCity,CurrentWeatherData,CurrentWeatherError,ForecastWeatherData,ForecastWeatherError } = weatherSlice.actions;

export default weatherSlice.reducer;
