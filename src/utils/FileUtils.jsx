import { fileUploadApi } from "../apis/axios";
import { ErrorToast } from '../components/Toast'
export const upload = async (file) => {
    if (!file) {
      return null;
    }
  
    const readFileAsDataURL = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };
  
    try {
      const result = await readFileAsDataURL(file);
      const base64String = result.split(',')[1];
  
      const formData = {
        action: 'upload',
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        fileData: base64String
      };
  
      const response = await fileUploadApi.post("", JSON.stringify(formData));
      const fileId = response.data.fileUrl.id;
      const url = `https://lh3.googleusercontent.com/d/${fileId}`;
      return url;
    } catch (error) {
      ErrorToast("Error uploading file!");
      return null;
    }
  };
  