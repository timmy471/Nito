import { Drawer } from 'antd';
import { IDetailDrawer } from 'types';
import { useWindowDimensions } from '@src/hooks';

export const DetailDrawer: React.FC<IDetailDrawer> = ({
  visible,
  height,
  children,
  handleClose,
  width = 500,
  smWidth,
  className,
}) => {
  const windowWidth = useWindowDimensions()?.width;

  const getDrawerWidth = () => {
    if (windowWidth) {
      return windowWidth < 800 ? smWidth || '75%' : width;
    }
    return width;
  };

  return (
    <>
      <Drawer
        placement={'right'}
        width={getDrawerWidth()}
        height={'100%'}
        closable={false}
        onClose={handleClose}
        className={`detail-drawer ${className ? className : ''}`}
        visible={visible}>
        {children}
      </Drawer>
    </>
  );
};
