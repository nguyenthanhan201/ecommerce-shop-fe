import CheckBox from "@/components/shared/CheckBox";
import { memo } from "react";

type Props = {
  filter: any;
  filterSelect: (type: any, checked: any, item: any) => void;
  filterContent: any;
  customValueInclude?: string;
};

const CatalogFilterItem = ({ filter, filterContent, filterSelect, customValueInclude }: Props) => {
  // useEffect(() => {
  // }, [customValueInclude]);
  return (
    <>
      {filterContent.map((item: any, index: number) => (
        <div className='catalog_filter_widget_content_item' key={index}>
          <CheckBox
            checked={filter.includes(customValueInclude ? item[customValueInclude] : item.value)}
            label={item.display}
            onChange={(input: any) =>
              filterSelect(customValueInclude?.toUpperCase(), input.checked, item)
            }
          />
        </div>
      ))}
    </>
  );
};

export default memo(CatalogFilterItem);
