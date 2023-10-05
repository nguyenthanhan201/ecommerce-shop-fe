import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { ElementRef, useRef } from 'react';

type CheckBoxProps = {
  label: string;
  checked: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckBox = (props: CheckBoxProps) => {
  const { label, onChange, checked } = props;
  const inputRef = useRef<ElementRef<'input'> | null>(null);

  // const onChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   onChange && onChange(event.target.checked, event);
  // };

  return (
    <label className='custom-checkbox'>
      <input checked={checked} onChange={onChange} ref={inputRef} type='checkbox' />
      <span className='custom-checkbox_checkmark'>
        <CheckOutlinedIcon fontSize='inherit' />
      </span>
      {label}
    </label>
  );
};

export default CheckBox;
