import axios from "axios";


export const BASE_URL = import.meta.env.VITE_node_environment === 'production'
    ? 'https://diskussion-forum-server-side.vercel.app'
    : 'http://localhost:3000';

console.log(`Current BASE_URL: ${BASE_URL}`);



export const uploadImageToImageServerAndGetUrl = async (imageFile) => {

    const formData = new FormData();
    formData.append('key', import.meta.env.VITE_imgbb_API_v1);
    formData.append('image', imageFile);

    try {
        const response = await axios.post('https://api.imgbb.com/1/upload',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

        if (response.status !== 200) await new Error('Error uploading image');

        // console.log('Image uploaded successfully:', response.data);
        return response.data.data.url;
    }
    catch (error) {
        console.error('Error uploading image:', error);
        return null;
    }
};
