import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DatepickerComponent = ({ onChange, className }) => {
  const [startDate, setStartDate] = useState(new Date());
  useEffect(() => {
    onChange(startDate);
  }, [startDate]);

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      className={className}
    />
  );
};

export default DatepickerComponent;
