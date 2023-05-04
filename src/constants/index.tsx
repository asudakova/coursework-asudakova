import {
    food_inactive,
    food_active,
    ent_inactive,
    ent_active,
    hotel_inactive,
    hotel_active,
    attr_inactive,
    attr_active,
    cafe01,
    cafe02,
    cafe03
} from '../img'

type Category = {
    id: number,
    active: string,
    inactive: string,
    title: string
}

export const typesOfPlaces: Category[] = [
    {
        id: 1,
        active: food_active,
        inactive: food_inactive,
        title: 'Еда'
    },
    {
        id: 2,
        active: ent_active,
        inactive: ent_inactive,
        title: 'Развлечения'
    },
    {
        id: 3,
        active: hotel_active,
        inactive: hotel_inactive,
        title: 'Отели'
    },
    {
        id: 4,
        active: attr_active,
        inactive: attr_inactive,
        title: 'Достопримечательности'
    },
]

type Filter = {
    id: number,
    title: string
}

export const typesOfFilters: Filter[] = [
    {
        id: 1,
        title: 'Рядом'
    },
    {
        id: 2,
        title: 'Лучшие'
    },
    {
        id: 3,
        title: 'По алфавиту'
    },
    {
        id: 4,
        title: 'Новые'
    },
]

type PlaceCard = {
    id: number,
    rating: number,
    reviews: number,
    name: string,
    address: string,
    pic?: string,
    isFav: boolean
}

export const mockPlaces: PlaceCard[] = [
    {
        id: 1,
        rating: 5,
        reviews: 32,
        name: 'One price coffee',
        address: 'Малая Калужская, 1 к1',
        pic: cafe01,
        isFav: false
    },
    {
        id: 2,
        rating: 3,
        reviews: 12,
        name: 'Солнышко',
        address: 'Лестева, 7',
        pic: cafe02,
        isFav: true
    },
    {
        id: 3,
        rating: 5,
        reviews: 6,
        name: 'Хинкальная',
        address: 'Малая Ордынская, 21',
        pic: cafe03,
        isFav: false
    },
    {
        id: 4,
        rating: 4,
        reviews: 25,
        name: 'Югос',
        address: 'Орджоникидзе, 15',
        isFav: false
    },
]

