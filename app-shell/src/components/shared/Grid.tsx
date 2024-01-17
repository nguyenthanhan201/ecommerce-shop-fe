import { ReactNode } from 'react';

type GridProps = {
  children: ReactNode;
  col: number;
  mdCol?: number;
  smCol?: number;
  gap?: number;
};

const Grid = (props: GridProps) => {
  const { children, gap, col, mdCol, smCol } = props;

  const style = {
    gap: gap ? `${gap}px` : '0'
  };

  const finalCol = col ? `grid-col-${col}` : '';
  const finalMdCol = col ? `grid-col-md-${mdCol}` : '';
  const finalSmCol = col ? `grid-col-sm-${smCol}` : '';

  return (
    <div className={`grid ${finalCol} ${finalMdCol} ${finalSmCol}`} style={style}>
      {children}
    </div>
  );
};

export default Grid;
