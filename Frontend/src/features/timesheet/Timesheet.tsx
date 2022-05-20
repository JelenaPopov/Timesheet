import React, { useState } from 'react';
import './Timesheet.css';
import moment from 'moment';

export const TimeSheet = () => {
  const [currentDate, setCurrentDate] = useState(moment());

  const renderDays = () => {
    const dateFormat = "dddd";
    const weeks = [];
    let weekDays = [];
    for (let i = 1; i < 36; i++) {
      let val = i + ".";
      if (i === 34 || i === 35) {
        weekDays.push(
          <td key={i} className="disabled-week-day">
            <div className="week-day-number">{val}</div>
            <div className="week-day-hours disabled-week-day-hours">Hours: 0</div>
          </td>
        );
      } else if (i === 23 || i === 24 || i === 15) {
        weekDays.push(
          <td key={i} className="week-day">
            <div className="week-day-number">{val}</div>
            <div className="week-day-hours white-week-day-hours">Hours: 0</div>
          </td>
        );
      } else if (i % 9 !== 0) {
        weekDays.push(
          <td key={i} className="week-day">
            <div className="week-day-number">{val}</div>
            <div className="week-day-hours green-week-day-hours">Hours: 0</div>
          </td>
        );
      } else {
        weekDays.push(
          <td key={i} className="week-day">
            <div className="week-day-number">{val}</div>
            <div className="week-day-hours red-week-day-hours">Hours: 0</div>
          </td>
        );
      }

      if (i % 7 === 0 && i !== 0) {
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
              <button className="previous-month-btn" onClick={() => { }} title="Previous month">
                <i
                  className="bi bi-arrow-left-circle previous-month-icon">
                </i>
              </button>
            </div>
            <div className="col-4 current-month bold">
              {currentDate.format('MMM').toUpperCase()} &nbsp;{currentDate.format('YYYY').toUpperCase()}
            </div>
            <div className="col-4">
              <button className="next-month-btn" onClick={() => { }} title="Next month">
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
            {renderDays()}
          </tbody>
        </table>
        <div className="container total-hours-container">
          <div className="row">
            <div className="col-10">
              &nbsp;
            </div>
            <div className="col-2">
              <span className="total-hours bold">Total hours: 90</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
