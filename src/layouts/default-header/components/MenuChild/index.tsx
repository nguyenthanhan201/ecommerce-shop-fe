import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { memo } from 'react';
type MenuChildProps = {
  childrenItems: any;
  setIsChangedDropdown: (value: boolean) => void;
};

const MenuChild = ({ childrenItems, setIsChangedDropdown }: MenuChildProps) => {
  return (
    <>
      <p className='dropdown_item' onClick={() => setIsChangedDropdown(false)} role='presentation'>
        <ArrowBackIosNewOutlinedIcon sx={{ fontSize: '80% !important' }} />
        Quay lại
      </p>
      {childrenItems[0].map((item: any, index: number) => {
        console.log(item.func);
        return (
          <p className='dropdown_item' key={index} onClick={item.func} role='presentation'>
            <span>{item.title}</span>
          </p>
        );
      })}
    </>
  );
};

export default memo(MenuChild);
