import { useState } from 'react';
import './Timesheet.css';
import moment, { Moment } from 'moment';
import { useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { LoggedMonth } from './LoggedMonth/LoggedMonth';
import { FutureMonth } from './FutureMonth/FutureMonth';

export const Timesheet = () => {
  const navigate = useNavigate();
  const currentDate = useState(moment())[0];
  const [selectedMonth, setSelectedMonth] = useState(moment());
  const [startDate, setStartDate] = useState(moment().startOf("month").startOf("isoWeek"));
  const [totalSum, setTotalSum] = useState(0);

  const authInfo = useAppSelector((state) => state.auth);
  const weeklyWorkingHours = authInfo?.user ? authInfo.user.weeklyWorkingHours : 0;

  const prevMonth = () => {
    const month = moment(selectedMonth).add(-1, 'M');
    setSelectedMonth(moment(selectedMonth).add(-1, 'M'));
    setStartDate(moment(month).startOf("month").startOf("isoWeek"));
  }

  const nextMonth = () => {
    const month = moment(selectedMonth).add(1, 'M');
    setSelectedMonth(moment(selectedMonth).add(1, 'M'));
    setStartDate(moment(month).startOf("month").startOf("isoWeek"))
  }

  const onViewLogs = (day: Moment) => {
    const dayValue = day.format("yyyy-MM-DD");
    navigate(`/logged-hours?day=${dayValue}`);
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
            {startDate.isAfter(currentDate) && <FutureMonth currentDate={currentDate} startDate = {startDate} weeklyWorkingHours = {weeklyWorkingHours} onViewLogs={onViewLogs}/>}
            {!startDate.isAfter(currentDate) && <LoggedMonth currentDate={currentDate} startDate = {startDate} weeklyWorkingHours = {weeklyWorkingHours} onViewLogs={onViewLogs} setTotalSum = {setTotalSum}/>}
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
