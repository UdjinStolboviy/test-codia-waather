import React, { useState } from "react";
import cn from "classnames";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, CircularProgress, Typography } from "@mui/material";

import { kelvinToCelsius } from "../../hooks/kelvinToCelsius";
import { getWeatherCityApi } from "../../redux/citiesWeather";
import { AppDispatch } from "../../redux/store";
import { IWeather, IWeatherData } from "../../interfases/Interfases";

import refreshButton from "../../assets/refreshButton.png";
import "./CityCardStyle.scss";

interface CityCardViewProps extends IWeather {
  cityName: string;
}

const CityCardView = ({
  cityName,
  main,
  weather,
  coord,
}: CityCardViewProps) => {
  const [isAnimated, setIsAnimated] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleRefresh = async (
    event: React.MouseEvent<HTMLDivElement>,
    { lat, lon }: { lat: number; lon: number }
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isAnimated) {
      setIsAnimated(true);
    }

    try {
      const { payload } = await dispatch(
        getWeatherCityApi({ lat: lat, lon: lon })
      );
      setNewWeatherData(payload);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnimated(false);
    }
  };

  const setNewWeatherData = (newWeatherData: IWeatherData) => {
    const weatherData: Array<IWeatherData> | null = JSON.parse(
      localStorage.getItem("weatherData") as string
    );

    const updatedWeatherData = weatherData?.map((item) => {
      if (item.name === cityName) {
        item = newWeatherData;
      }
      return item;
    });

    localStorage.setItem("weatherData", JSON.stringify(updatedWeatherData));
  };

  const handleCardClick = () => {
    navigate(`/detail-info/${cityName}`);
  };

  return (
    <Box className="card-rapper">
      {isAnimated && (
        <Box className="loading">
          <CircularProgress color="inherit" />
        </Box>
      )}
      <Box
        className={cn("card", { blured: isAnimated })}
        onClick={handleCardClick}
      >
        <Typography className="counrty-name">{cityName}</Typography>
        <Box
          onClick={(event: any) => handleRefresh(event, coord)}
          className="refresh-weather-button"
        >
          <img
            className={cn("refresh-icon", { rotate: isAnimated })}
            src={refreshButton}
            alt=""
          />
        </Box>
        {weather[0] && (
          <img
            src={`http://openweathermap.org/img/wn/${weather[0]?.icon}@2x.png`}
            alt=""
          />
        )}
        <Typography className="weather-description">
          {weather[0]?.description}
        </Typography>
        <Typography className="temp-title">Temperature</Typography>
        <Box className="min-max-temp-wrapper">
          <Typography>Min: {kelvinToCelsius(main?.temp_min)}&#8451;</Typography>
          <Typography>Max: {kelvinToCelsius(main?.temp_max)}&#8451;</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CityCardView;
