import {
    createContext,
    useContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
} from 'react';
import { Clusterer } from '@2gis/mapgl-clusterer';

const MapglContext = createContext<{
    clusterer?: Clusterer;
    setMapglContext: Dispatch<SetStateAction<MapContextState>>;
}>({
    clusterer: undefined,
    setMapglContext: () => {},
});

interface MapContextState {
    clusterer?: Clusterer;
}

export function useMapglContext() {
    return useContext(MapglContext);
}

export function MapglContextProvider({ children }: { children: ReactNode }) {
    const [{ clusterer }, setMapglContext] = useState<MapContextState>({
        clusterer: undefined,
    });
    return (
        <MapglContext.Provider value={{ clusterer, setMapglContext }}>
            {children}
        </MapglContext.Provider>
    );
}
