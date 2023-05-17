import { MarkerType } from '../types';
import { mapMarkerTag, mapMarkerTagHover } from '../img';

export const createMapMarkersArray = (arr: [[number, number]]) => {
    if (!arr.length) {
        return [];
    }
    const markersArr: MarkerType[] = [];
    arr.map((place) => {
        const curMarker = {
            coordinates: place,
            icon: mapMarkerTag,
            hoverIcon: mapMarkerTagHover,
        };
        markersArr.push(curMarker);
    });
    return markersArr;
};
