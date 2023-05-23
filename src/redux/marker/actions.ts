import { AppDispatch } from '../store';
import { markerSlice } from './slice';

export const setMarkerTip = (meta: string, id: string, coordinates: number[]) => (dispatch: AppDispatch) => {
    dispatch(markerSlice.actions.markerShowTip({ id, coordinates, meta }));
};

export const unsetMarkerTip = () => (dispatch: AppDispatch) => {
    dispatch(markerSlice.actions.markerHideTip());
};
