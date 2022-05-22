import { useState } from 'react';
import './Timesheet.css';
import moment, { Moment } from 'moment';
import { TimesheetDay } from './TimesheetDay/TimesheetDay';
import { useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { MonthWithLoggedHours } from './MonthWithLoggedHours/MonthWithLoggedHours';

export const Timesheet = () => {
  const navigate = useNavigate();
  const currentDate = useState(moment())[0];
  const [selectedMonth, setSelectedMonth] = useState(moment());
  const [startDate, setStartDate] = useState(moment(moment().startOf("month")).startOf("isoWeek"));
  const [totalSum, setTotalSum] = useState(0);

  const authInfo = useAppSelector((state) => state.auth);
  const weeklyWorkingHours = authInfo?.user ? authInfo.user.weeklyWorkingHours : 0;

  const prevMonth = () => {
    const month = moment(selectedMonth).add(-1, 'M');
    setSelectedMonth(moment(selectedMonth).add(-1, 'M'));
    setStartDate(moment(moment(month).startOf("month")).startOf("isoWeek"));
  }

  const nextMonth = () => {
    const month = moment(selectedMonth).add(1, 'M');
    setSelectedMonth(moment(selectedMonth).add(1, 'M'));
    setStartDate(moment(moment(month).startOf("month")).startOf("isoWeek"))
  }

  const onViewLogs = (day: Moment) => {
    const dayValue = day.format("yyyy-MM-DD");
    navigate(`/logged-hours?day=${dayValue}`);
  }

  const renderDaysInFuture = () => {
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
    return <>{weeks}</>;
  }
  
  return (
    <div className="card">
      <div className="card-header container">
        <h4 className="card-title">Timesheet</h4>
      </div>
      <div className="card-body">
        <div className="container current-month-container">
          <div className="row">
            <div className="col-4">
              <button className="previous-month-btn" onClick={prevMonth} title="Previous month">
                <i
                  className="bi bi-arrow-left-circle previous-month-icon">
                </i>
              </button>
            </div>
            <div className="col-4 current-month bold">
              {selectedMonth.format('MMMM').toUpperCase()} &nbsp;{selectedMonth.format('YYYY').toUpperCase()}
            </div>
            <div className="col-4">
              <button className="next-month-btn" onClick={nextMonth} title="Next month">
                <i
                  className="bi bi-arrow-right-circle next-month-icon">
                </i>
              </button>
            </div>
          </div>
        </div>
        <table className="timesheet-table">
          <thead>
            <tr className="timesheet-header">
              <th scope="col">MONDAY</th>
              <th scope="col">TUESDAY</th>
              <th scope="col">WEDNESDAY</th>
              <th scope="col">THRUSDAY</th>
              <th scope="col">FRIDAY</th>
              <th scope="col">SATURDAY</th>
              <th scope="col">SUNDAY</th>
            </tr>
          </thead>
          <tbody>
            {startDate.isAfter(currentDate) && renderDaysInFuture()}
            {!startDate.isAfter(currentDate) && <MonthWithLoggedHours currentDate={currentDate} startDate = {startDate} weeklyWorkingHours = {weeklyWorkingHours} onViewLogs={onViewLogs} setTotalSum = {setTotalSum}/>}
          </tbody>
        </table>
        <div className="container total-hours-container">
          <div className="row">
            <div className="col-8">
              &nbsp;
            </div>
            <div className="col-4">
              <span className="total-hours bold">Total hours: {totalSum}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
