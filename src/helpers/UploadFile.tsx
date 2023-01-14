import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const S3_BUCKET = process.env.NEXT_PUBLIC_S3_BUCKET_NAME || '';
const REGION = process.env.NEXT_PUBLIC_S3_REGION || '';

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_S3_ACCES_KEY_ID || '',
  secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY || '',
});

const s3Instance = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const UploadFile = async (file: File | any) => {
  const params = {
    Body: file,
    Bucket: S3_BUCKET,
    Key: uuidv4(),
    ContentType: file?.type,
  };

  try {
    const data = await s3Instance.upload(params).promise();
    return { success: true, location: data.Location };
  } catch (err) {
    return { success: false, location: '' };
  }
};

export default UploadFile;
