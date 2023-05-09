import React from "react";
import "./WeatherGraph.scss";
import { kelvinToCelsius } from "../../hooks/kelvinToCelsius";
import { Box, Typography } from "@mui/material";
import { IList } from "../../interfases/Interfases";

const WeatherGraph = ({ array }: any) => {
  const backgroundColor = (temp: number) => {
    if (temp <= 16) {
      return "rgba(204,226,69,0.5)";
    }
    if (temp > 16 && temp <= 25) {
      return "rgba(231,145,69,0.5)";
    }
    if (temp > 25) {
      return "rgba(244,92,92,0.5)";
    }
    return "rgba(204,226,69,0.5)";
  };
  return (
    <Box className="weather-graph-component">
      <Box className="weather-graph-wrapper">
        {array?.map((item: IList, index: number) => (
          <Box
            key={item.dt}
            className="weather-graph-block"
            sx={{
              left: index * 60,
              top: 160 - kelvinToCelsius(item.main.temp) * 3,
              background: backgroundColor(kelvinToCelsius(item.main.temp)),
            }}
          >
            <>
              {item.main.temp > 0 ? (
                <>&#43; {kelvinToCelsius(item.main.temp)}&#176;</>
              ) : (
                <>{kelvinToCelsius(item.main.temp)}&#176;</>
              )}
              <Typography className="weather-graph-time">
                {item.dt_txt.substring(11, 16)}
              </Typography>
            </>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default WeatherGraph;
