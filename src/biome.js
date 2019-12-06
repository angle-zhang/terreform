import axios from 'axios';

export const initBiomeData = async () => {
  const res = await axios.get('/api/biome/');
  return res.data;
};

export const postDonation = async (biomeid, donation) => {
  const res = await axios.post(`/api/biome/${biomeid}/add`, {
    donation: { ...donation, timestamp: new Date().toISOString() }
  });
  return res.data;
};
