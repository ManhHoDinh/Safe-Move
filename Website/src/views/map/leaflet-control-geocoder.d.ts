declare module "leaflet-control-geocoder" {
  import * as L from "leaflet";

  export interface Geocoder {
    geocode(query: string, callback: (results: any[]) => void): void;
    reverse(latlng: L.LatLng, callback: (results: any[]) => void): void;
  }

  export function nominatim(): Geocoder;

  export default L.Control.Geocoder;
}
