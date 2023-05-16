import places from './places.json';
import places2 from './places_sortByName.json';

const promiseResponse = (data: any) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 500);
    });

export const mockPlaces = () => promiseResponse(places);

export const mockPlacesNext = () => promiseResponse(places2);
