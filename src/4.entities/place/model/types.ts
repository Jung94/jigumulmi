// Response
type FetchSubwayListResponse = {
  id: number;
  isMain: boolean | null;
  stationName: string;
  subwayStationLineList: { id: number; lineNumber: string; }[] | null;
}[]

export type {
  FetchSubwayListResponse,
}