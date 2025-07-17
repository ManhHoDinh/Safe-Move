import React, { ReactNode } from "react";
import {
  BrowserRouter as Router,
  Routes as Routing,
  Route,
  Link,
} from "react-router-dom";
import Dashboard from "./views/camera";
import Map from "./views/map";
import SignIn from "./views/signIn";
import { MdOutlineDashboard } from "react-icons/md";
import { IoMapOutline } from "react-icons/io5";
import FloodInformation from "./views/flood-information";

export interface IRoute {
  name: string;
  icon: ReactNode;
  path: string;
  component?: ReactNode;
  children?: { path: string; component: ReactNode }[];
}

export const routes: IRoute[] = [
  {
    name: "Dashboard",
    icon: <MdOutlineDashboard />,
    path: "/dashboard",
    component: <Dashboard />,
  },
  {
    name: "Map",
    icon: <IoMapOutline />,
    path: "/map",
    component: <Map />,
  },
];

function MainRoutes() {
  return (
    <Routing>
      <Route path="/" element={<Dashboard />} />
      <Route path="/map" element={<Map />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/flood-information" element={<FloodInformation />} />
    </Routing>
  );
}

export default MainRoutes;
