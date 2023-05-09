import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import WeatherGraph from "../../component/weatherGraph/WeatherGraph";
describe("WeatherGraph", () => {
  it("renders the weather graph blocks with correct time values", () => {
    const mockArray = [
      {
        dt: 1620536400,
        dt_txt: "2021-05-09 03:00:00",
        main: { temp: 290 },
      },
      {
        dt: 1620547200,
        dt_txt: "2021-05-09 06:00:00",
        main: { temp: 293 },
      },
      {
        dt: 1620558000,
        dt_txt: "2021-05-09 09:00:00",
        main: { temp: 284 },
      },
    ];

    const { getByText } = render(<WeatherGraph array={mockArray} />);

    // Check that the time values are rendered correctly
    expect(getByText("03:00")).toBeInTheDocument();
    expect(getByText("06:00")).toBeInTheDocument();
    expect(getByText("09:00")).toBeInTheDocument();
  });
});
