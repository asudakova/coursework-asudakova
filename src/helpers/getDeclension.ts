export const getDeclension = (count: number) => {
    count %= 100;
    if (count >= 5 && count <= 20) {
        return 2;
    }

    count %= 10;
    if (count === 1) {
        return 0;
    }

    if (count >= 2 && count <= 4) {
        return 1;
    }

    return 2;
};