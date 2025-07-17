import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import BlueMarkerIcon from "../../images/blueMarker.png";
import RedMarkerIcon from "../../images/redMarker.png";
import { SelectBar } from "../../components/SelectBar";
import { EStatus } from "../../utils/enum";
import { getListCameraService } from "../../services/camera.service";
import { ICamera } from "../../utils/types";
import { SearchBar } from "../../components/SearchBar";
import { useGlobalContext } from "../../utils/globalContext";

// interface Camera {
//   _id: string;
//   id: string;
//   name: string;
//   loc: {
//     type: string;
//     coordinates: [number, number]; // [longitude, latitude]
//   };
//   values: {
//     ip: string;
//   };
//   dist: string;
//   ptz: boolean;
//   angle: number;
//   liveviewUrl: string;
// }

const CAMERA_API_URL =
  "https://api.notis.vn/v4/cameras/bybbox?lat1=11.160767&lng1=106.554166&lat2=9.45&lng2=128.99999";

const CameraMap: React.FC = () => {
  const { setTitle } = useGlobalContext();
  setTitle("Camera Map");
  const [cameras, setCameras] = useState<ICamera[]>([]);
  const [timestamp, setTimestamp] = useState(Date.now());
  const data = [
    { value: EStatus.ALL, label: "All" },
    { value: EStatus.ACTIVE, label: "Active" },
    { value: EStatus.INACTIVE, label: "Inactive" },
  ];
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<EStatus>(EStatus.ALL);

  const getCameraList = async () => {
    try {
      const isEnabled =
        filter === EStatus.ACTIVE
          ? true
          : filter === EStatus.INACTIVE
          ? false
          : undefined;
      const cameraList = await getListCameraService({ isEnabled, search });
      setCameras(cameraList);
      return data;
    } catch (error) {
      console.error("Error fetching camera list:", error);
      return [];
    }
  };

  useEffect(() => {
    getCameraList();
  }, [filter, search]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimestamp(Date.now());
    }, 12000);

    return () => clearInterval(intervalId);
  }, []);

  const blueIcon = new L.Icon({
    iconUrl: BlueMarkerIcon,
    iconSize: [27, 43],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const redIcon = new L.Icon({
    iconUrl: RedMarkerIcon,
    iconSize: [27, 43],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const onSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(e.target.value);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flex: 1,
        flexDirection: "column",
        gap: 15,
      }}
    >
      <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        {" "}
        <SearchBar onSearchChange={onSearchChange} />
        <SelectBar
          options={data}
          defaultValue={EStatus.ALL}
          setSelectedValue={setFilter}
        />
      </div>
      <MapContainer
        center={[10.80498476893258, 106.75270736217499]}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {cameras.map((camera) => {
          const {
            _id: camera_id,
            name,
            loc,
            dist,
            ptz,
            angle,
            values,
            isEnabled,
          } = camera;
          const [longitude, latitude] = loc.coordinates;

          return (
            <Marker
              key={camera_id}
              position={[latitude, longitude]}
              icon={isEnabled === true ? blueIcon : redIcon}
            >
              <Popup>
                <div>
                  <h3>{camera_id}</h3>
                  <h3>{name}</h3>
                  <p>{dist}</p>
                  <p>PTZ: {ptz ? "Yes" : "No"}</p>
                  <p>Angle: {angle}</p>
                  <p>Camera IP: {values.ip}</p>
                  <img
                    src={`http://giaothong.hochiminhcity.gov.vn/render/ImageHandler.ashx?id=${camera_id}&t=${timestamp}`}
                    alt="detail"
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default CameraMap;
