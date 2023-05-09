/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../redux/store";
import CityCardView from "../../component/cityCard/CityCardView";

const mockWeatherData = {
  cityName: "Kyiv",
  main: {
    feels_like: 23,
    humidity: 5656,
    pressure: 23,
    temp: 67,
    temp_max: 78,
    temp_min: 87,
  },
  weather: [
    {
      description: "light rain",
      icon: "10d",
      id: 500,
      main: "Rain",
    },
  ],
  coord: {
    lat: 50.43,
    lon: 30.52,
  },
};

describe("CityCardView", () => {
  it("renders the city name, weather description, and temperature", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CityCardView {...mockWeatherData} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("London")).toBeInTheDocument();
    expect(screen.getByText("Cloudy")).toBeInTheDocument();
    expect(screen.getByText("Min: 7°C")).toBeInTheDocument();
    expect(screen.getByText("Max: 17°C")).toBeInTheDocument();
  });

  it("dispatches an action to refresh weather data when refresh button is clicked", () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CityCardView {...mockWeatherData} />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(
      container.querySelector(".refresh-weather-button") as HTMLElement
    );

    expect(store.dispatch({ type: "citiesWeather/getWeatherCityApi" })).toEqual(
      [{ type: "citiesWeather/getWeatherCityApi" }]
    );
  });
});
