import {
    food_inactive,
    food_active,
    ent_inactive,
    ent_active,
    hotel_inactive,
    hotel_active,
    attr_inactive,
    attr_active
} from '../img'
import { CategoryBtnType, FilterBtnType } from '../types'

export const typesOfPlaces: CategoryBtnType[] = [
    {
        id: 1,
        active: food_active,
        inactive: food_inactive,
        title: 'Еда',
        shortCut: 'food',
    },
    {
        id: 2,
        active: ent_active,
        inactive: ent_inactive,
        title: 'Развлечения',
        shortCut: 'ent',
    },
    {
        id: 3,
        active: hotel_active,
        inactive: hotel_inactive,
        title: 'Отели',
        shortCut: 'hotels',
    },
    {
        id: 4,
        active: attr_active,
        inactive: attr_inactive,
        title: 'Достопримечательности',
        shortCut: 'attr',
    },
]

export const typesOfFilters: FilterBtnType[] = [
    {
        id: 1,
        title: 'Рядом',
        shortCut: 'near'
    },
    {
        id: 2,
        title: 'Лучшие',
        shortCut: 'best'
    },
    {
        id: 3,
        title: 'По алфавиту',
        shortCut: 'abc'
    },
    {
        id: 4,
        title: 'Новые',
        shortCut: 'new'
    },
]

export const categoryQueryParams = {
    food: 'еда',
    ent: 'развлечения',
    hotels: 'отели',
    attr: 'достопримечательности',
}

export const sortQueryParams = {
    near: 'distance',
    best: 'rating',
    abc: 'name',
    new: 'creation_time',
}


