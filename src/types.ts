export type PlacesStateType = {
    mapPlaces: {};
    listIdPlaces: [];
    markerPlaces: InfoForMarkerType[] | [];
    totalCount: number;
    pageNumber: number;
    category: 'food' | 'ent' | 'hotels' | 'attr';
    sortBy: 'near' | 'best' | 'abc' | 'new';
    isLoading: boolean;
    error: string;
};

export type PlaceExtraInfoPropsType = {
    handleReturnClick: () => void;
    handleFavClick: () => void;
    isFav: boolean,
    category?: 'food' | 'ent' | 'hotels' | 'attr';
    name: string;
    shortName: string | null;
    nameExtension: string | null;
    description: string | null;
    photo: string;
    rating: number | null;
    reviewsAmount: number | null;
    address: string;
    workingHours: FormattedScheduleType
};

export type FavoriteStateType = {
    favId: string[] | [];
    favPlaces: {};
    isLoading: boolean;
    error: string;
};

export type CoordinatesStateType = {
    lngLat: number[];
    userLocation: number[];
    boundaries: {
        north: number;
        east: number;
        south: number;
        west: number;
    };
    isLoading: boolean;
    error: string;
};

export type MarkerTipStateType = {
    isHover: boolean;
    id: string;
    coordinates: number[];
};

export type OptionsType = {
    params: {
        q: string;
        locale: string;
        has_rating: string;
        fields: string;
        point1: string;
        point2: string;
        sort: string;
        page_size: string;
        page: string;
        key: string;
    };
};

export type AuthStateType = {
    userName: string;
    userUid: string;

    isSignupLoading: boolean;
    signupError: string;
    signupErrorforUser: string;

    isLoginLoading: boolean;
    loginError: string;
    loginErrorforUser: string;
};

export type CategoriesType = 'food' | 'ent' | 'hotels' | 'attr';

export type SortingType = 'near' | 'best' | 'abc' | 'new';

export type CategoryBtnType = {
    id: number;
    active: string;
    inactive: string;
    title: string;
    shortCut: CategoriesType;
};

export type FilterBtnType = {
    id: number;
    title: string;
    shortCut: SortingType;
};

export type ScheduleType = {
    Fri: {
        working_hours: [
            {
                from: string;
                to: string;
            }
        ];
    };
    Mon: {
        working_hours: [
            {
                from: string;
                to: string;
            }
        ];
    };
    Sat: {
        working_hours: [
            {
                from: string;
                to: string;
            }
        ];
    };
    Sun: {
        working_hours: [
            {
                from: string;
                to: string;
            }
        ];
    };
    Thu: {
        working_hours: [
            {
                from: string;
                to: string;
            }
        ];
    };
    Tue: {
        working_hours: [
            {
                from: string;
                to: string;
            }
        ];
    };
    Wed: {
        working_hours: [
            {
                from: string;
                to: string;
            }
        ];
    };
};

export type FormattedScheduleType = {
    Пн: [string, string];
    Вт: [string, string];
    Ср: [string, string];
    Чт: [string, string];
    Пт: [string, string];
    Сб: [string, string];
    Вс: [string, string];
};

export type CurrentPlaceType = {
    id: string;
    latLon: [number, number];
    name: string;
    nameExtension: string | null;
    shortName: string | null;
    address: string;
    rating: number | null;
    reviewsAmount: number | null;
    workingHours: FormattedScheduleType;
    description: string | null;
    photo: string;
};

export type FormattedPlacesInfoType = {
    total: string;
    places: CurrentPlaceType[];
};

export type InfoForMarkerType = {
    id?: string;
    lon: number;
    lat: number;
};

export type MarkerType = {
    coordinates: [number, number];
    userData?: string;
    size?: [number, number];
    icon?: string;
    hoverIcon?: string;
};

export type CategoryPropsType = {
    active: string;
    inactive: string;
    title: string;
    shortCut: CategoriesType;
};

export type FilterPropsType = {
    title: string;
    shortCut: SortingType;
};

export type PlaceCardPropsType = {
    name: string;
    address: string;
    rating: number | null;
    reviewsAmount: number | null;
    photo: string;
    id: string;
    isFavId?: boolean
};

export type FetchArgumentsType = {
    north: number;
    east: number;
    south: number;
    west: number;
    category: CategoriesType;
    sortBy: SortingType;
};

export type FetchNextPageArgumentsType = {
    north: number;
    east: number;
    south: number;
    west: number;
    category: CategoriesType;
    sortBy: SortingType;
    pageNumber: number;
};
