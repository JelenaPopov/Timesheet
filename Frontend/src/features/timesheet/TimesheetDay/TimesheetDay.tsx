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

    const day = (tdClassName: string, hoursClassName: string, disabled: boolean = false) => {
        const disabledClass = disabled ? "disabled":"";
        return (
            <td key={selectedDate.format("DD")} className={tdClassName}>
                <div className={`week-day-number ${disabledClass}`}>{selectedDate.format("DD") + "."}</div>
                <div className={`week-day-hours ${hoursClassName}`}>
                    <button className="btn btn-link hours-btn" onClick={() => onViewLogs(selectedDate)} disabled={disabled}>
                        Hours: {hours}
                    </button>
                </div>
            </td>
        );
    }

    return (
        <>
            {
                (() => {
                    if (currentDate.isBefore(selectedDate)) {
                        return (
                            day("disabled-week-day", "disabled-week-day-hours", true)
                        )
                    } else if (hours > 0 && hours < (weeklyWorkingHours / 5)) {
                        return (
                            day("week-day", "red-week-day-hours")
                        )
                    } else if (hours > 0 && hours >= (weeklyWorkingHours / 5)) {
                        return (
                            day("week-day", "green-week-day-hours")
                        )
                    } else {
                        return (
                            day("week-day", "white-week-day-hours")
                        )
                    }
                })()
            }
        </>
    )
}
