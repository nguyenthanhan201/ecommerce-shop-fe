import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Dispatch, SetStateAction, useCallback, useRef } from 'react';

import Button from '@/components/shared/Button';
import { category, colors, prices, size } from '@/utils/index';

import { FilterType } from '../CataLogPage';
import CatalogFilterItem from './CatalogFilterItem';

const initFilter = {
  category: [],
  color: [],
  size: [],
  prices: []
};

type CatalogFilterProps = {
  filter: FilterType;
  setFilter: Dispatch<SetStateAction<FilterType>>;
};

const CatalogFilter = ({ filter, setFilter }: CatalogFilterProps) => {
  const filterRef = useRef<any>(null);
  let newCategory: Array<any>, newColor: Array<any>, newSize: Array<any>, newPrice: Array<any>;

  const filterSelect = (type: any, checked: any, item: any) => {
    if (checked) {
      switch (type) {
        case 'CATEGORYSLUG':
          setFilter((prevState: any) => ({
            ...prevState,
            category: [...prevState.category, item.categorySlug]
          }));
          break;
        case 'COLOR':
          setFilter((prevState: any) => ({
            ...prevState,
            color: [...prevState.color, item.color]
          }));
          break;
        case 'SIZE':
          setFilter((prevState: any) => ({
            ...prevState,
            size: [...prevState.size, item.size]
          }));
          break;
        case 'PRICE':
          setFilter((prevState: any) => ({
            ...prevState,
            prices: [...prevState.prices, item.price]
          }));
          break;
        default:
      }
    } else {
      switch (type) {
        case 'CATEGORYSLUG':
          newCategory = filter.category.filter((e: unknown) => e !== item.categorySlug);
          setFilter((prevState: any) => ({
            ...prevState,
            category: newCategory
          }));
          break;
        case 'COLOR':
          newColor = filter.color.filter((e: any) => e !== item.color);
          setFilter((prevState: any) => ({
            ...prevState,
            color: newColor
          }));
          break;
        case 'SIZE':
          newSize = filter.size.filter((e: any) => e !== item.size);
          setFilter((prevState: any) => ({
            ...prevState,
            size: newSize
          }));
          break;
        case 'PRICE':
          newPrice = filter.prices.filter((e: any) => e !== item.price);
          setFilter((prevState: any) => ({
            ...prevState,
            prices: newPrice
          }));
          break;
        default:
      }
    }
  };

  const clearFilter = useCallback(() => {
    setFilter(initFilter);
  }, []);

  const showHideFilter = useCallback(() => {
    if (filterRef.current) {
      filterRef.current.classList.toggle('active');
    }
  }, []);

  return (
    <>
      <div className='catalog_filter' ref={filterRef}>
        <div className='catalog_filter_close' onClick={() => showHideFilter()} role='presentation'>
          <KeyboardArrowLeftIcon fontSize='inherit' />
        </div>
        <div className='catalog_filter_widget'>
          <div className='catalog_filter_widget_title'>Giá</div>
          <div className='catalog_filter_widget_content'>
            <CatalogFilterItem
              customValueInclude='price'
              filter={filter.prices}
              filterContent={prices}
              filterSelect={filterSelect}
            />
          </div>
        </div>
        <div className='catalog_filter_widget'>
          <div className='catalog_filter_widget_title'>danh mục sản phẩm</div>
          <div className='catalog_filter_widget_content'>
            <CatalogFilterItem
              customValueInclude='categorySlug'
              filter={filter.category}
              filterContent={category}
              filterSelect={filterSelect}
            />
          </div>
        </div>
        <div className='catalog_filter_widget'>
          <div className='catalog_filter_widget_title'>màu sắc</div>
          <div className='catalog_filter_widget_content'>
            <CatalogFilterItem
              customValueInclude='color'
              filter={filter.color}
              filterContent={colors}
              filterSelect={filterSelect}
            />
          </div>
        </div>
        <div className='catalog_filter_widget'>
          <div className='catalog_filter_widget_title'>kích thước</div>
          <div className='catalog_filter_widget_content'>
            <CatalogFilterItem
              customValueInclude='size'
              filter={filter.size}
              filterContent={size}
              filterSelect={filterSelect}
            />
          </div>
        </div>
        <div className='catalog_filter_widget'>
          <div className='catalog_filter_widget_content'>
            <Button onClick={clearFilter} size='sm'>
              xóa bộ lọc
            </Button>
          </div>
        </div>
      </div>
      <div className='catalog_filter_toggle'>
        <Button onClick={() => showHideFilter()} size='sm'>
          bộ lọc
        </Button>
      </div>
    </>
  );
};

export default CatalogFilter;
