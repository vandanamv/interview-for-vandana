import axios from 'axios';

const API_URL_LAUNCHES = 'https://api.spacexdata.com/v4/launches';
const API_URL_LAUNCHPADS = 'https://api.spacexdata.com/v4/launchpads';
const API_URL_ROCKETS = 'https://api.spacexdata.com/v4/rockets';

export const fetchLaunches = async () => {
  try {
    const response = await axios.get(API_URL_LAUNCHES);
    return response.data;
  } catch (error) {
    console.error('Error fetching launch data:', error);
    return [];
  }
};

export const fetchLaunchpads = async () => {
  try {
    const response = await axios.get(API_URL_LAUNCHPADS);
    return response.data;
  } catch (error) {
    console.error('Error fetching launchpad data:', error);
    return [];
  }
};

export const fetchRockets = async () => {
  try {
    const response = await axios.get(API_URL_ROCKETS);
    return response.data;
  } catch (error) {
    console.error('Error fetching rocket data:', error);
    return [];
  }
};

