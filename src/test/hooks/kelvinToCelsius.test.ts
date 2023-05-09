import { kelvinToCelsius } from "../../hooks/kelvinToCelsius";


describe("kelvinToCelsius", () => {
    test("converts 0K to -273°C", () => {
        expect(kelvinToCelsius(0)).toBe(-273);
    });

    test("converts 273.15K to 0°C", () => {
        expect(kelvinToCelsius(273.15)).toBe(0);
    });
});