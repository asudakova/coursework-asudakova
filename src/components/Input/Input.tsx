import React, { useState, useRef, useEffect, useCallback } from 'react';
//@ts-ignore
import debounce from 'lodash.debounce';
//@ts-ignore
import { UilSearch, UilMapMarker, UilTimes } from '@iconscout/react-unicons';
import { useAppDispatch } from '../../redux/typingReduxHooks';
import { fetchCoordinates, getUserLocation } from '../../redux/coordinates/actions';
import styles from './Input.module.css'

const Input: React.FC = () => {
    const dispatch = useAppDispatch();

    const [cityInput, setCityInput] = useState<string>('');
    const [debouncedInputValue, setDebouncedInputValue] = useState<string>('');

    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCityInput(event.target.value);
        debouceInput(event.target.value);
    }

    const debouceInput = useCallback(
        debounce((str: string) => {
            setDebouncedInputValue(str);
        }, 700),
        []
    )

    useEffect(() => {
        if (debouncedInputValue !== '') {
            dispatch(fetchCoordinates(debouncedInputValue));
        }
    }, [debouncedInputValue]);

    const handleClearClick = () => {
        setDebouncedInputValue('');
        setCityInput('');
        inputRef.current?.focus();
    }

    const handleLocationClick = () => {
        dispatch(getUserLocation())
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.search}>
                <UilSearch
                    className={styles.searchIcon}
                />
                <input
                    ref={inputRef}
                    value={cityInput}
                    onChange={handleInputChange}
                    type="text"
                    className={styles.input}
                    placeholder='Введите город...'
                />
                <UilTimes
                    onClick={handleClearClick}
                    className={styles.clearBtn}
                />
            </div>
            <UilMapMarker
                onClick={handleLocationClick}
                className={styles.locationBtn}
            />
        </div>
    );
};

export default Input;