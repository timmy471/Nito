import { Modal } from 'antd';
import { IModal } from 'types';
import { Button } from '@src/components';

export const CustomModal: React.FC<IModal> = ({
  header,
  btnText,
  imageSrc,
  visibility,
  subheader,
  footerText,
  className,
  handleOk,
  handleCancel,
  footerTextClick,
}) => {
  const baseClass = `custom-modal ${className}`;

  return (
    <div>
      <Modal
        centered
        className={baseClass}
        visible={visibility}
        onOk={handleOk}
        footer={null}
        closable={false}
        onCancel={handleCancel}>
        <div className='content'>
          {imageSrc && <img src={imageSrc} alt={'Modal Icon'} height={200} width={200} />}
          <h3>{header}</h3>
          <span>{subheader}</span>
          <Button onClick={handleOk} label={btnText} className='modal-btn' />
          {footerText && <a onClick={footerTextClick}>{footerText}</a>}
        </div>
      </Modal>
    </div>
  );
};

CustomModal.defaultProps = {
  btnText: 'Continue',
  header: 'Info',
};
