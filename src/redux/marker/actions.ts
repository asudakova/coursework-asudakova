import { AppDispatch } from '../store';
import { markerSlice } from './slice';

export const setMarkerTip = (id: string, coordinates: number[]) => (dispatch: AppDispatch) => {
    dispatch(markerSlice.actions.markerShowTip({ id, coordinates }));
};

export const unsetMarkerTip = () => (dispatch: AppDispatch) => {
    dispatch(markerSlice.actions.markerHideTip());
};
