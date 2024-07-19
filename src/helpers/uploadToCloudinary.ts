import cloudinary from '@/cloudinaryConfig/cloudinaryConfig';

const uploadFileToCloudinary = async (file:any) => {
  try {
    const result = await cloudinary.v2.uploader.upload(file, {
      folder: 'uploads', 
    });
    return result;
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    throw new Error('File upload to Cloudinary failed');
  }
};

export default uploadFileToCloudinary;
