import { CurrentPlaceType, MarkerType } from '../types';
import { mapMarkerTag, mapMarkerTagHover } from '../img';

export const createFavMarkers = (
    arrId: string[],
    placesInfo: { [name: string]: CurrentPlaceType },
    type: string
) => {
    if (!arrId.length) {
        return [];
    }
    const markers: MarkerType[] = [];
    arrId.map((id: string) => {
        markers.push({
            coordinates: placesInfo[id].latLon,
            size: [28, 28],
            userData: `${type},${id}`,
            icon: mapMarkerTag,
            hoverIcon: mapMarkerTagHover,
        });
    });
    return markers;
};
