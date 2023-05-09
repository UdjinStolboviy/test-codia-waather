import citiesWeatherReducer, { getWeatherCityApi } from "../../redux/citiesWeather";


describe('getWeatherCityApi', () => {
    it('should return data when called', async () => {
        const result = await getWeatherCityApi({ lat: 1.23, lon: 4.56 });
        expect(result).toBeDefined();
    });
});

describe('citiesWeatherReducer', () => {
    it('should return initial state when given undefined state', () => {
        const result = citiesWeatherReducer(undefined, { type: 'TEST_ACTION' });
        expect(result).toEqual({});
    });
});





