import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { gethourlyWeatherForecastApi } from "../../redux/hourlyWeatherForecast";


const mockStore = configureStore([thunk]);

describe("hourlyWeatherForecastSlice", () => {
   let store: any;

   beforeEach(() => {
      store = mockStore({
         hourlyWeatherForecast: {},
      });
   });

   it("should dispatch gethourlyWeatherForecastApi action and handle it", async () => {
      await store.dispatch(gethourlyWeatherForecastApi({ lat: "12", lon: "34" }));

      const actions = store.getActions();

      expect(actions[0].type).toEqual(gethourlyWeatherForecastApi.pending.type);
      expect(actions[1].type).toEqual(gethourlyWeatherForecastApi.fulfilled.type);
      expect(actions[1].payload).toBeDefined();
   });
});