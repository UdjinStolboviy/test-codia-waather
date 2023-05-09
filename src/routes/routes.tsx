import { Navigate, Route, Routes } from "react-router-dom";
import CityInfo from "../pages/cityInfo/cityInfo";
import Home from "../pages/home/home";

export const Router = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="*" element={<Navigate to="/" />} />
    <Route path="/detail-info/:city" element={<CityInfo />} />
  </Routes>
);
