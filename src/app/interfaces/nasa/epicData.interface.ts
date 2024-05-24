export interface EpicData {
  identifier:            string;
  caption:               string;
  image:                 string;
  version:               string;
  centroid_coordinates:  CentroidCoordinates;
  dscovr_j2000_position: J2000Position;
  lunar_j2000_position:  J2000Position;
  sun_j2000_position:    J2000Position;
  attitude_quaternions:  AttitudeQuaternions;
  date:                  Date;
  coords:                Coords;
}

export interface AttitudeQuaternions {
  q0: number;
  q1: number;
  q2: number;
  q3: number;
}

export interface CentroidCoordinates {
  lat: number;
  lon: number;
}

export interface Coords {
  centroid_coordinates:  CentroidCoordinates;
  dscovr_j2000_position: J2000Position;
  lunar_j2000_position:  J2000Position;
  sun_j2000_position:    J2000Position;
  attitude_quaternions:  AttitudeQuaternions;
}

export interface J2000Position {
  x: number;
  y: number;
  z: number;
}
