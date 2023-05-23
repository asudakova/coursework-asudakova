import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/typingReduxHooks';
import { CurrentPlaceType, InfoForMarkerType } from '../../types';
import { useMapglContext } from '../../components/Map/MapglContext';
import { createMapMarkersArray } from '../../helpers/createMapMarkersArray';
import { useNavigate } from 'react-router-dom';
import { addFavPlace, removeFavPlace } from '../../redux/favorite/actions';
import PlaceExtraInfo from '../../components/PlaceExtraInfo/PlaceExtraInfo';

const PlacePage: React.FC = () => {
    const navigate = useNavigate();
    const { clusterer } = useMapglContext();
    let { placeId } = useParams<{ placeId: string }>();

    const { mapPlaces } = useAppSelector((state) => state.placesReducer);
    
    const curPlace: CurrentPlaceType = useAppSelector(
        (state) => state.placesReducer.mapPlaces[placeId as keyof typeof state.placesReducer.mapPlaces]
    );

    const favId = useAppSelector((state) => state.favoriteReducer.favId);
    const setFavId = new Set(favId);
    const [isFav, setIsFav] = useState(false);
    const { userUid } = useAppSelector((state) => state.authReducer);

    useEffect(() => {
        if (placeId) {
            setIsFav(setFavId.has(placeId));
        }
    }, [favId]);

    const dispatch = useAppDispatch();

    const handleFavClick = () => {
        if (placeId) {
            if (isFav) {
                setIsFav(!isFav);
                dispatch(removeFavPlace(placeId, userUid));
            } else {
                setIsFav(isFav);
                const newPlace = mapPlaces[placeId as keyof typeof mapPlaces];
                dispatch(addFavPlace(placeId, userUid, newPlace));
            }
        }
    };

    const { category, markerPlaces } = useAppSelector((state) => state.placesReducer);

    const markerCoords: InfoForMarkerType = {
        lat: curPlace?.latLon[1],
        lon: curPlace?.latLon[0],
    };

    if (clusterer !== undefined) {
        clusterer.load(createMapMarkersArray([markerCoords], 'one'));
    }

    const handleReturnToMainPageClick = () => {
        if (clusterer !== undefined) {
            clusterer.load(createMapMarkersArray(markerPlaces, 'main'));
        }
        navigate('/main');
    };

    return (
        <PlaceExtraInfo 
            handleReturnClick={handleReturnToMainPageClick}
            handleFavClick={handleFavClick}
            isFav={isFav}
            category={category}
            name={curPlace.name}
            shortName={curPlace.shortName}
            nameExtension={curPlace.nameExtension}
            description={curPlace.description}
            photo={curPlace.photo}
            rating={curPlace.rating}
            reviewsAmount={curPlace.reviewsAmount}
            address={curPlace.address}
            workingHours={curPlace.workingHours}
        />
    );
};

export default PlacePage;
