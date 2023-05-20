import { formatWorkingHours } from './formatWorkingHours';

export const createEntityMap = (entities: any) => {
    return entities.reduce(
        (result: any, entity: any) => {
            result.mapPlaces[entity.id] = {
                id: entity.id || null,
                latLon: [entity.point?.lon, entity.point?.lat] || null,
                name: entity.name || null,
                nameExtension: entity.name_ex?.extension || null,
                shortName:
                    entity.name_ex?.short_name ||
                    entity.name_ex?.primary ||
                    null,
                address: entity.address_name || null,
                rating: entity.reviews?.general_rating || null,
                reviewsAmount: entity.reviews?.general_review_count || null,
                workingHours: formatWorkingHours(entity.schedule),
                description: entity.ads?.article || null,
                photo: entity.external_content[0]?.main_photo_url || null,
            };
            result.markerPlaces.push({
                id: entity.id,
                lon: entity.point?.lon,
                lat: entity.point?.lat,
            });
            result.listIdPlaces.push(entity.id);
            return result;
        },
        {
            mapPlaces: {},
            listIdPlaces: [],
            markerPlaces: [],
        }
    );
};
