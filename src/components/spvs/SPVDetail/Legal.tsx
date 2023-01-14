import { ISPVDocument } from 'types';
import { assets } from '@src/assets';
import { getDocName } from '@src/helpers';
import { Typography, Button } from '@src/components';

interface IProps {
  documents: ISPVDocument[];
}

export const Legal: React.FC<IProps> = ({ documents }) => {
  return (
    <div className='detail-container'>
      {documents.map((doc, key: number) => (
        <div
          className='d-flex justify-content-between align-items-between mb-2 legal-docs'
          key={key}>
          <div className='d-flex align-items-center'>
            <img src={assets.FileIcon.src} alt={assets.FileIcon.alt} height={40} width={40} />
            <Typography className='ml-2 mr-1 mb-0' variant='body7'>
              {getDocName(doc.template)}
            </Typography>
          </div>
          <div>
            {doc.url && (
              <a href={doc.url} target='_blank' rel='noopener noreferrer'>
                <Button label='Review' variant='secondary' />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
