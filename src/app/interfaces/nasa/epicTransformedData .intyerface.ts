export interface EpicTransformedData {
  imageUrl: string;
  identifier: string;
  date: Date;
  centroid_coordinates:  CentroidCoordinates;
}

export interface CentroidCoordinates {
  lat: number;
  lon: number;
}
