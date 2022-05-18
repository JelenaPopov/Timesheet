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
      weekDays.push(
        <td key={i}>
          <div className="week-day-number">{i}</div>
          <div className="week-day-hours">Hours: 0</div>
        </td>
      );
      if(i % 7 === 0 && i !== 0){
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
        <div className="container current-mounth-container">
          <div className="row">
            <div className="col-2">
              <button className="btn bold previous-month" onClick={() => { }}>&lt; Previous mounth</button>
            </div>
            <div className="col-8">
              <span className="current-month bold">{currentDate.format('MMM').toUpperCase()}</span>
            </div>
            <div className="col-2">
              <button className="btn bold next-btn next-month" onClick={() => { }}>Next mounth &gt;</button>
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

      </div>
    </div>
  )
}
