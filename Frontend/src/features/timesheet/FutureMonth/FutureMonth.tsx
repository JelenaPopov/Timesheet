import moment, { Moment } from 'moment';
import { TimesheetDay } from '../TimesheetDay/TimesheetDay';

interface IProps {
    currentDate: Moment,
    startDate: Moment,
    weeklyWorkingHours: number,
    onViewLogs: (day: Moment) => void
}

export const FutureMonth = ({currentDate, startDate, weeklyWorkingHours, onViewLogs}: IProps) => {
    const weeks = [];
    let weekDays = [];
    for (let i = 0; i < 35; i++) {
        weekDays.push(
            <TimesheetDay key={i} currentDate={currentDate} selectedDate={moment(startDate).add(i, 'd')}
                hours={0} weeklyWorkingHours={weeklyWorkingHours} onViewLogs={onViewLogs} />
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
