import { AppDispatch } from '../store';
import { favoriteSlice } from './slice';
import { db } from '../../firebase';
import {
    query,
    collection,
    onSnapshot,
    updateDoc,
    doc,
    arrayUnion,
    arrayRemove,
    deleteField,
} from 'firebase/firestore';

export const getUserFavPlaces = (userUid: string) => (dispatch: AppDispatch) => {
    dispatch(favoriteSlice.actions.favPlacesFetching());
    try {
        const q = query(collection(db, 'usersFavs'));
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.id == userUid) {
                    const { places, placesId } = doc.data();
                    dispatch(favoriteSlice.actions.favPlacesFetchingSuccess({ places, placesId }));
                }
            });
        });
    } catch (e) {
        if (e instanceof Error) {
            dispatch(favoriteSlice.actions.favPlacesFetchingError(e.message));
        }
    }
};

export const addFavPlace =
    (placeId: string, userUid: string, newPlace: {}) => async (dispatch: AppDispatch) => {
        await updateDoc(doc(db, 'usersFavs', userUid), {
            placesId: arrayUnion(placeId),
            [`places.${placeId}`]: newPlace,
        });
        const q = query(collection(db, 'usersFavs'));
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.id == userUid) {
                    const { places, placesId } = doc.data();
                    dispatch(favoriteSlice.actions.favPlacesAddNew({ places, placesId }));
                }
            });
        });
    };

export const removeFavPlace = (placeId: string, userUid: string) => async (dispatch: AppDispatch) => {
    await updateDoc(doc(db, 'usersFavs', userUid), {
        placesId: arrayRemove(placeId),
        [`places.${placeId}`]: deleteField(),
    });
    const q = query(collection(db, 'usersFavs'));
    onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.id == userUid) {
                const { places, placesId } = doc.data();
                dispatch(favoriteSlice.actions.favPlacesDeleteOne({ places, placesId }));
            }
        });
    });
};
