import { FormattedScheduleType, ScheduleType } from '../types';

const days = {
    Mon: 'Пн',
    Tue: 'Вт',
    Wed: 'Ср',
    Thu: 'Чт',
    Fri: 'Пт',
    Sat: 'Сб',
    Sun: 'Вс',
};

export const formatWorkingHours = (schedule: ScheduleType) => {
    const workingHours: FormattedScheduleType = {
        Пн: ['', ''],
        Вт: ['', ''],
        Ср: ['', ''],
        Чт: ['', ''],
        Пт: ['', ''],
        Сб: ['', ''],
        Вс: ['', ''],
    };
    if (!schedule) {
        return workingHours;
    }
    Object.keys(schedule).map((day) => {
        const currentDayHours = schedule[day as keyof typeof schedule];
        if (currentDayHours?.working_hours) {
            const from = currentDayHours.working_hours[0].from;
            const to = currentDayHours.working_hours[0]?.to;
            const dayName = days[day as keyof typeof schedule];
            workingHours[dayName as keyof typeof workingHours] = [from, to];
        }
    });
    return workingHours;
};
