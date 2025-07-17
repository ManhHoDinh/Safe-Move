import { EInformationStatus, EStatus } from "./enum";

export interface ISelectValue {
  value: string;
  label: string;
}

export interface Coordinates {
  type: string;
  coordinates: number[];
}

export interface ICamera {
  _id: string;
  id: string;
  name: string;
  loc: Coordinates;
  values: Record<string, string>;
  dist: string;
  ptz: boolean;
  angle?: number;
  liveviewUrl: string;
  isEnabled: boolean;
  lastModified: Date;
}

export interface IFloodInformation {
  _id: string;
  userName: string;
  userId: string;
  longtitude: number;
  latitude: number;
  date: Date;
  locationName: string;
  status: EInformationStatus;
  floodLevel: number;
  url: string;
  modelDetectFloodLevel?: number;
  message?: string;
}
