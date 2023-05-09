import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIConfig, APIKey } from "../config/api";
import { default as APIService } from "../api/instance";

export interface IcountryWeatherData {
   lat: number | undefined;
   lon: number | undefined;
}

export const getWeatherCityApi = createAsyncThunk<any, IcountryWeatherData>(
   "citiesWeather/getWeatherCityApi",
   async (data) => {
      const responce = await APIService.get(APIConfig.countryWeather, {
         params: { lat: data?.lat, lon: data?.lon, appid: APIKey },
      }).then(({ data }) => data);
      return responce;
   }
);

export const citiesWeatherSlice = createSlice({
   name: "citiesWeather",
   initialState: {},
   reducers: {},
   extraReducers: {
      [getWeatherCityApi.pending.type]: (_, _i) => { },
      [getWeatherCityApi.fulfilled.type]: (_, _i) => { },
      [getWeatherCityApi.rejected.type]: (_, _i) => { },
   },
});

const citiesWeatherReducer = citiesWeatherSlice.reducer;
export default citiesWeatherReducer;
