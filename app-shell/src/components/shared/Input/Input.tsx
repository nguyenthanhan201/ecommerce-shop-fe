import { FormControl, Select } from '@mui/material';
import dynamic from 'next/dynamic';
import React from 'react';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface InputProps extends FormControlProps {
  type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'editor' | 'select';
  name?: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  multiple?: boolean | undefined;
  error?: any;
  value?: any;
  required?: boolean;
  disabled?: boolean;
  listSelecte?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      name,
      label,
      defaultValue,
      placeholder,
      // className,
      multiple,
      error,
      value,
      required,
      disabled,
      onChange,
      onBlur,
      style = {},
      // listSelecte,
      children,
      ...props
    }: InputProps,
    ref
  ) => {
    return (
      <>
        <div className='input'>
          {label ? (
            <label className='input__label' htmlFor=''>
              {label}
            </label>
          ) : null}
          {type === 'select' ? (
            <FormControl fullWidth>
              <Select {...props} defaultValue={defaultValue} multiple={multiple}>
                {children}
              </Select>
            </FormControl>
          ) : type === 'editor' ? (
            <ReactQuill
              onChange={onChange as any}
              placeholder={placeholder}
              theme='snow'
              value={value}
            />
          ) : (
            <input
              className='input__field'
              defaultValue={defaultValue || undefined}
              disabled={disabled}
              name={name}
              onBlur={onBlur}
              onChange={onChange}
              placeholder={placeholder}
              ref={ref}
              required={required}
              style={{ ...style }}
              type={type}
              value={value || undefined}
              {...props}
            />
          )}
        </div>
        {/* Checking if there is an error and if there is, it will display the error message. */}
        {error ? <p className='input__err'>{error}</p> : null}
      </>
    );
  }
);

Input.displayName = 'Input';
export default Input;
