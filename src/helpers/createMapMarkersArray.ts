import { MarkerType, InfoForMarkerType } from '../types';
import { mapMarkerTag, mapMarkerTagHover } from '../img';

export const createMapMarkersArray = (arr: InfoForMarkerType[], type: string) => {
    if (!arr.length) {
        return [];
    }
    const markersArr: MarkerType[] = [];
    arr.map((place) => {
        const curMarker: MarkerType = {
            coordinates: [place.lon, place.lat],
            size: [28, 28],
            userData: `${type},${place.id}`,
            icon: mapMarkerTag,
            hoverIcon: mapMarkerTagHover,
        };
        markersArr.push(curMarker);
    });
    return markersArr;
};
