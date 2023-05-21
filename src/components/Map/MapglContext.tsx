import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { Clusterer } from '@2gis/mapgl-clusterer';

const MapglContext = createContext<{
    clusterer?: Clusterer;
    mapgl?: typeof mapgl;
    mapglInstance?: mapgl.Map;
    setMapglContext: Dispatch<SetStateAction<MapContextState>>;
}>({
    clusterer: undefined,
    mapgl: undefined,
    mapglInstance: undefined,
    setMapglContext: () => {},
});

interface MapContextState {
    clusterer?: Clusterer;
    mapglInstance?: mapgl.Map;
    mapgl?: typeof mapgl;
}

export function useMapglContext() {
    return useContext(MapglContext);
}

export function MapglContextProvider({ children }: { children: ReactNode }) {
    const [{ clusterer, mapglInstance, mapgl }, setMapglContext] = useState<MapContextState>({
        clusterer: undefined,
        mapglInstance: undefined,
        mapgl: undefined,
    });
    return (
        <MapglContext.Provider value={{ clusterer, mapgl, mapglInstance, setMapglContext }}>
            {children}
        </MapglContext.Provider>
    );
}
