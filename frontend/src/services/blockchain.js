import axios from 'axios';

export const createBlock = async (data, token) => {
  try {
    const response = await axios.post(
      'http://localhost:5001/api/v1/block/mine',
      data,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const listBlocks = async () => {
  try {
    const response = await axios.get('http://localhost:5001/api/v1/blockchain');
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
