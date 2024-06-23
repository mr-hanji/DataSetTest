import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  handleSubmit,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginBottom: "20px", textAlign: "center" }}
    >
      <label style={{ marginRight: "10px" }}>
        <span style={{ marginRight: "10px" }}>Start Date:</span>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy-MM-dd"
          className="date-picker"
          calendarClassName="dark-calendar"
        />
      </label>
      <label style={{ marginLeft: "10px", marginRight: "10px" }}>
        <span style={{ marginRight: "10px" }}>End Date:</span>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="yyyy-MM-dd"
          className="date-picker"
          calendarClassName="dark-calendar"
        />
      </label>
      <button
        type="submit"
        style={{
          marginLeft: "10px",
          padding: "5px 10px",
          borderRadius: "5px",
        }}
      >
        Fetch Data
      </button>
    </form>
  );
};

export default DateRangePicker;
