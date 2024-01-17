/* eslint-disable jsx-a11y/label-has-associated-control */
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

import Img from './Img/Img';

const SlideBanner = () => {
  return (
    <div className='center'>
      <div className='carousel-wrapper'>
        <input defaultChecked={true} id='slide1' name='controls' type='radio' />
        <input id='slide2' name='controls' type='radio' />
        <input id='slide3' name='controls' type='radio' />
        <input id='slide4' name='controls' type='radio' />
        <input id='slide5' name='controls' type='radio' />

        <label className='nav-dot' htmlFor='slide1' />
        <label className='nav-dot' htmlFor='slide2' />
        <label className='nav-dot' htmlFor='slide3' />
        <label className='nav-dot' htmlFor='slide4' />
        <label className='nav-dot' htmlFor='slide5' />

        {Array(5)
          .fill(0)
          .map((_, index) => (
            <label className='left-arrow' htmlFor={`slide${index + 1}`} key={index}>
              <ArrowBackOutlinedIcon fontSize='inherit' />
            </label>
          ))}
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <label className='right-arrow' htmlFor={`slide${index + 1}`} key={index}>
              <ArrowForwardOutlinedIcon fontSize='inherit' />
            </label>
          ))}

        <div className='carousel'>
          <ul>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <li key={index}>
                  <Img alt='yolo-banner' layout='fill' src='/images/banner.png' />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SlideBanner;
