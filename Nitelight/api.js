import axios from 'axios';

const API_URL = 'http://192.168.0.16:8000/';

export const getVenues = async () => {
    try {
        console.log('Fetching venues...');
        const response = await axios.get(`${API_URL}venues/`);
        const data = response.data.map(venue => ({
            ...venue,
        }));
        console.log('Data received:', data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export const fetchVenueDetails = async (venueId) => {
    const url = `${API_URL}venues/${venueId}/`; // Ensure URL is correct
    console.log("Calling API:", url); // This should match your Django endpoint
  
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching venue details:', error);
      return null;
    }
  };