import React, { useEffect, useState } from "react";
import "./home.scss";
import { useDispatch } from "react-redux";

import { getWeatherCityApi } from "../../redux/citiesWeather";
import { AppDispatch } from "../../redux/store";
import { ICityData, IWeatherData } from "../../interfases/Interfases";

import cityImg from "../../assets/City-PNG-Photo.png";
import cityData from "../../data/city.ua.list.json";

import {
  Box,
  Autocomplete,
  TextField,
  Typography,
  Grid,
  createFilterOptions,
} from "@mui/material";
import CityCardView from "../../component/cityCard/CityCardView";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();

  const optionFilter = createFilterOptions({
    ignoreCase: true,
    matchFrom: "any",
    limit: 1000,
  });

  const [selectedCities, setSelectedCities] = useState<Array<string>>([]);
  const [weatherData, setWeatherData] = useState<Array<IWeatherData>>([]);

  const getAllCity = (cityData as Array<ICityData>).map(({ name }) => name);

  const filterCity = getAllCity.filter(
    (item) => !selectedCities.includes(item)
  );

  const onChange = async (value: Array<string>, e: any) => {
    setSelectedCities(value);
    localStorage.setItem("cities", JSON.stringify(value));
    if (e.target.textContent) {
      const findedCityWithCountryCode: ICityData | undefined = (
        cityData as Array<ICityData>
      ).find((x) => x.name === e.target.textContent);

      dispatch(
        getWeatherCityApi({
          lat: findedCityWithCountryCode?.coord.lat,
          lon: findedCityWithCountryCode?.coord.lon,
        })
      ).then(getWeatherInfoAboutCity);
    } else {
      const filteredWeatherData = weatherData.filter((item: IWeatherData) => {
        if (!item) {
          return null;
        }
        return value.includes(item.name);
      });
      setWeatherData(filteredWeatherData);
      localStorage.setItem("weatherData", JSON.stringify(filteredWeatherData));
    }
  };

  useEffect(() => {
    const citiesLocalData: Array<string> | null = JSON.parse(
      localStorage.getItem("cities") as string
    );
    const weatherData: Array<IWeatherData> | null = JSON.parse(
      localStorage.getItem("weatherData") as string
    );
    const filterCoords = weatherData?.filter((item) => item !== null);

    const coords = filterCoords?.map(({ coord }) => coord);

    let promises: any = [];

    coords?.forEach(({ lat, lon }) => {
      let c = dispatch(
        getWeatherCityApi({
          lat: lat,
          lon: lon,
        })
      );
      promises.push(c);
    });

    promises.length && getRefreshData(promises);

    if (citiesLocalData?.length) {
      setSelectedCities(citiesLocalData);
    }

    if (weatherData?.length) {
      setWeatherData(weatherData);
    }
  }, []);

  function getWeatherInfoAboutCity(result: any) {
    if (Array.isArray(result)) {
      setWeatherData(result.map((x) => x.payload));
    } else {
      setWeatherData([...weatherData, result.payload]);
      localStorage.setItem(
        "weatherData",
        JSON.stringify([...weatherData, result.payload])
      );
    }
  }

  function getRefreshData(promises: any) {
    Promise.all(promises).then(getWeatherInfoAboutCity);
  }

  const renderCity = () => {
    if (weatherData?.length) {
      return (
        <Grid container sx={{ display: "flex" }}>
          {weatherData.map((item: IWeatherData) => {
            if (!item) {
              return null;
            }
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                xl={2}
                key={item.name}
                sx={{ padding: "13px" }}
              >
                <CityCardView
                  coord={item.coord}
                  main={item.main}
                  cityName={item.name}
                  weather={item.weather}
                />
              </Grid>
            );
          })}
        </Grid>
      );
    } else {
      return (
        <Box className="info-block">
          <img alt="" className="info-block-img" src={cityImg} />
          <Typography className="info-block-title">Choose a city!</Typography>
        </Box>
      );
    }
  };

  return (
    <Box className="home" data-testid="Card">
      <Autocomplete
        filterOptions={optionFilter}
        disableListWrap
        multiple
        fullWidth
        renderGroup={(params) => params as unknown as React.ReactNode}
        value={selectedCities}
        onChange={(e, newValue) => onChange(newValue as Array<string>, e)}
        options={getAllCity.length ? filterCity : []}
        renderOption={(props, option) => {
          return (
            <li {...props} key={props.id}>
              {option as React.ReactNode}
            </li>
          );
        }}
        renderInput={(params) => <TextField {...params} label="Cities" />}
      />
      {renderCity()}
    </Box>
  );
};
export default Home;
