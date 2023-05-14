import { MarkerType } from "../types";
import { mapMarkerTag } from "../img";

export const createMapMarkersArray = (arr: []) => {
    if (!arr.length) {
        return []
    }
    const markersArr: MarkerType[] = [];
    arr.map((place => {
        const curMarker = {
            coordinates: place,
            icon: mapMarkerTag,
        }
        markersArr.push(curMarker);
    }))
    return markersArr;
}