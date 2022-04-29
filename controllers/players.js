import axios from 'axios';

export const getPlayer = async (name, req, res) => {
  try {
    const { data } = await axios.get(`https://api.pubg.com/shards/steam/players?filter[playerNames]=${name}`, {
      headers: {
        ACCEPT: 'application/vnd.api+json',
        Authorization: process.env.PUBG_API_KEY,
      },
    });
    // res.status(200).json(data);
    return data;
  } catch (error) {
    // res.status(500).json({ message: 'Something went wrong.' });
    console.log(error.message);
  }
};
