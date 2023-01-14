import { Drawer } from 'antd';
import { IDrawer } from 'types';

export const MobileFilter: React.FC<IDrawer> = ({
  visible,
  height,
  children,
  handleClose,
}) => {
  return (
    <>
      <Drawer
        placement={'bottom'}
        width={500}
        height={height}
        closable={false}
        onClose={handleClose}
        className='mobile-filter-drawer'
        visible={visible}>
        {children}
      </Drawer>
    </>
  );
};
