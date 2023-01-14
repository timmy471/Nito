import { Modal } from 'antd';
import { IAssetModalProps } from 'types';
import { Typography, Button } from '@src/components';

export const AssetModal: React.FC<IAssetModalProps> = ({
  isModalVisible,
  onCancel,
  handlePublishConfirm,
  loading,
  assetStatus,
}) => {
  return (
    <div className='modal'>
      <Modal
        centered
        className='auth-modal'
        visible={isModalVisible}
        footer={null}
        closable={false}>
        <div className='mx-auto text-center'>
          <Typography variant='body1'>Confirm Publishment</Typography>
          <Typography state='secondary'>
            Are you sure you want to {assetStatus === 'published' ? 'Unpublish' : 'Publish'}{' '}
            this Asset?
          </Typography>

          <div className='d-flex justify-content-center mt-3'>
            <Button
              label='Cancel'
              size='sm'
              variant='secondary'
              className='mr-3'
              onClick={onCancel}
            />
            <Button
              label={assetStatus === 'published' ? 'Unpublish' : 'Publish'}
              className='ml-3'
              onClick={handlePublishConfirm}
              loading={loading}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
