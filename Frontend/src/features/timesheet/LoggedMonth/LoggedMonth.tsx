import moment, { Moment } from 'moment';
import { TimesheetDay } from '../TimesheetDay/TimesheetDay';
import { useGetAllLoggedHoursForSomePeriodQuery } from '../../logged-hours/loggedHoursSlice';
import { useEffect } from 'react';

interface IProps {
    currentDate: Moment,
    startDate: Moment,
    weeklyWorkingHours: number,
    onViewLogs: (day: Moment) => void,
    setTotalSum: (sum: number) => void
}

export const LoggedMonth = ({currentDate, startDate, weeklyWorkingHours, onViewLogs, setTotalSum}: IProps) => {
    const {
        data: loggedHours = [],
        isLoading, isSuccess
    } = useGetAllLoggedHoursForSomePeriodQuery({ startDate: startDate.format("yyyy-MM-DD"), endDate: moment(startDate).add(34, 'd').format("yyyy-MM-DD") });

    useEffect(() => {
        if (!isLoading && isSuccess) {
            const sum = loggedHours.reduce((total, currentValue) => total = total + currentValue.hours, 0);
            setTotalSum(sum);
        }
    });

    const getLoggedHoursSum = (day: Moment) => {
        const dayValue = day.format("yyyy-MM-DD");
        const dayLoggedHours = loggedHours.filter(el => el.created === dayValue);
        const sum = dayLoggedHours.reduce((total, currentValue) => total = total + currentValue.hours, 0);
        return sum;
    }

    const weeks = [];
    let weekDays = [];
    for (let i = 0; i < 35; i++) {
        weekDays.push(
            <TimesheetDay key={i} currentDate={currentDate} selectedDate={moment(startDate).add(i, 'd')}
                hours={getLoggedHoursSum(moment(startDate).add(i, 'd'))} weeklyWorkingHours={weeklyWorkingHours} onViewLogs={onViewLogs} />
        );
        if ((i + 1) % 7 === 0 && i !== 0) {
            weeks.push(
                <tr key={i}>{weekDays}</tr>
            );
            weekDays = [];
        }
    }

    return (
        <>
            {weeks}
        </>
    )
}
