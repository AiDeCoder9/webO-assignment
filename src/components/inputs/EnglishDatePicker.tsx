import React, { useEffect, useMemo, useRef, useState } from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateProps extends ReactDatePickerProps {
  className?: string;
  wrapperClassName?: string;
  handleChange: (date: any) => void;
  handleBlur?: () => void;
}
const EnglishDatePicker = (props: DateProps) => {
  const { id, className, wrapperClassName = '', value, isClearable, handleChange, ...args } = props;
  const _calendar: any = useRef<DatePicker>();

  const [selectedDate, setselectedDate] = useState<Date | null | undefined>(null);
  // If invalid date
  useEffect(() => {
    try {
      if (value) {
        const date = new Date(value);
        const currentValue = date.getTime() ? date : null;
        setselectedDate(currentValue);
      } else {
        setselectedDate(null);
      }
    } catch (e) {
      setselectedDate(null);
    }
  }, [value]);

  function range(start: number, end: number) {
    return Array(end - start + 1)
      .fill(start)
      .map((_, idx) => start + idx);
  }

  const currentDate = new Date();
  const startYear = 1920;

  const years = range(startYear, currentDate.getFullYear() + 50);

  // const years = [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000];
  const months = useMemo(
    () => [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    []
  );

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(months[new Date().getMonth()]);

  useEffect(() => {
    if (selectedDate) {
      const currentDate = new Date(selectedDate);
      setSelectedYear(currentDate.getFullYear());
      setSelectedMonth(months[currentDate.getMonth()]);
    }
  }, [selectedDate, months]);

  return (
    <div className="form-control-icon rft">
      <DatePicker
        isClearable={isClearable}
        ref={_calendar}
        id={id}
        autoComplete={'off'}
        wrapperClassName={`${wrapperClassName} d-block`}
        className={className}
        selected={selectedDate}
        onChangeRaw={(e) => e.preventDefault()} //Disables input
        renderCustomHeader={({ changeYear, changeMonth }) => (
          <div>
            <select
              value={selectedYear}
              onChange={({ target: { value } }) => {
                changeYear(+value);
                setSelectedYear(+value);
              }}>
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={selectedMonth}
              onChange={({ target: { value } }) => {
                changeMonth(months.indexOf(value));
                setSelectedMonth(value);
              }}>
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
        {...args}
      />
      {isClearable && selectedDate && (
        <i
          className="ic-close"
          role="button"
          style={{ marginRight: '20px' }}
          onClick={() => handleChange(null)}></i>
      )}
      <i className="ic-calendar" role="button" onClick={() => _calendar.current?.setOpen(true)}></i>
    </div>
  );
};

export default EnglishDatePicker;
