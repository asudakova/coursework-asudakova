import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/typingReduxHooks';
import { CurrentPlaceType, InfoForMarkerType } from '../../types';
import { useMapglContext } from '../../components/Map/MapglContext';
import { createMapMarkersArray } from '../../helpers/createMapMarkersArray';
import { useNavigate } from 'react-router-dom';
import { addFavPlace, removeFavPlace } from '../../redux/favorite/actions';
import PlaceExtraInfo from '../../components/PlaceExtraInfo/PlaceExtraInfo';

const FavPlaceInfoPage: React.FC = () => {
    const navigate = useNavigate();
    const { mapglInstance, clusterer } = useMapglContext();
    let { placeId } = useParams<{ placeId: string }>();

    const { mapPlaces } = useAppSelector((state) => state.placesReducer);

    const { favId, favPlaces } = useAppSelector((state) => state.favoriteReducer);
    const setFavId = new Set(favId);

    const curPlace: CurrentPlaceType = favPlaces[placeId as keyof typeof favPlaces];

    if (mapglInstance) {
        mapglInstance.setCenter(curPlace?.latLon);
    }

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
                navigate('/main/favorite');
            } else {
                setIsFav(isFav);
                const newPlace = mapPlaces[placeId as keyof typeof mapPlaces];
                dispatch(addFavPlace(placeId, userUid, newPlace));
            }
        }
    };

    const markerCoords: InfoForMarkerType = {
        lat: curPlace?.latLon[1],
        lon: curPlace?.latLon[0],
    };

    if (clusterer !== undefined) {
        clusterer.load(createMapMarkersArray([markerCoords], 'one'));
    }

    const handleReturnToFavPageClick = () => {
        navigate('/main/favorite');
    };

    return (
        <PlaceExtraInfo
            handleReturnClick={handleReturnToFavPageClick}
            handleFavClick={handleFavClick}
            isFav={isFav}
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

export default FavPlaceInfoPage;
