import { MarkerType, InfoForMarkerType } from '../types';
import { mapMarkerTag, mapMarkerTagHover } from '../img';

export const createMapMarkersArray = (arr: InfoForMarkerType[]) => {
    if (!arr.length) {
        return [];
    }
    const markersArr: MarkerType[] = [];
    arr.map((place) => {
        const curMarker: MarkerType = {
            coordinates: [place.lon, place.lat],
            size: [28, 28],
            userData: place.id,
            icon: mapMarkerTag,
            hoverIcon: mapMarkerTagHover,
        };
        markersArr.push(curMarker);
    });
    return markersArr;
};
