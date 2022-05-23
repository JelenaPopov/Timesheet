import './TimesheetDay.css';
import { Moment } from "moment";

interface IProps {
    currentDate: Moment,
    selectedDate: Moment,
    hours: number,
    weeklyWorkingHours: number,
    onViewLogs: (day: Moment) => void
}

export const TimesheetDay = (props: IProps) => {
    const { currentDate, selectedDate, hours, weeklyWorkingHours, onViewLogs } = props;
    let tdClassName = "week-day";
    let hoursClassName = "white-week-day-hours";
    let disabled = false;

    if (currentDate.isBefore(selectedDate)) {
        tdClassName = "disabled-week-day";
        hoursClassName = "disabled-week-day-hours";
        disabled = true;
    } else if (hours > 0 && hours < (weeklyWorkingHours / 5)) {
        hoursClassName = "red-week-day-hours";
    } else if (hours > 0 && hours >= (weeklyWorkingHours / 5)) {
        hoursClassName = "green-week-day-hours";
    }

    return (
        <td key={selectedDate.format("D")} className={tdClassName}>
            <div className={`week-day-number ${disabled ? "disabled" : ""}`}>{selectedDate.format("D") + "."}</div>
            <div className={`week-day-hours ${hoursClassName}`}>
                <button className="btn btn-link hours-btn" onClick={() => onViewLogs(selectedDate)} disabled={disabled}>
                    Hours: {hours}
                </button>
            </div>
        </td>
    )
}
