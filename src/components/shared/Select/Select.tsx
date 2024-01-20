import { FormControl, InputLabel, Select as SelectMUI } from '@mui/material';
import React from 'react';

interface SelectProps extends FormControlProps {
  defaultValue?: string | string[];
  label?: string;
  error?: any;
  multiple?: boolean;
}

const Select = React.forwardRef(
  ({ defaultValue, label, error, children, multiple, ...props }: SelectProps, _ref) => {
    return (
      <FormControl className='input' error={error} fullWidth style={{ marginTop: '20px' }}>
        <InputLabel>{label}</InputLabel>
        <SelectMUI {...props} defaultValue={defaultValue} multiple={multiple}>
          {children}
        </SelectMUI>
        {/* Checking if there is an error and if there is, it will display the error message. */}
        {error ? <p className='input__err'>{error}</p> : null}
      </FormControl>
    );
  }
);

Select.displayName = 'Select';

export default Select;
