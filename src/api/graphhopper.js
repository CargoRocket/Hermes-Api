import axios from 'axios';
import graphhopper from '../config/graphhopper.json';

const requestRoute = async (from, to, profile) => {
  return axios.get(`${graphhopper.url}${graphhopper.route}?locale=de&point=${from.join(',')}&point=${to.join(',')}&points_encoded=false&details=road_class&details=max_speed&instructions=true&profile=${profile}`)
}

export const requestBikeRoute = async (from, to, next) => {
  try {
    const result = await requestRoute(from, to, 'bike');
    return result.data;
  } catch (error) {
    error.status = 500;
    error.description = 'Network request failed!';
    next(error);
  }
}

export const requestCargobikeRoute = async (from, to, next) => {
  try {
    const result =  await requestRoute(from, to, 'cargobike');
    return result.data;
  } catch (error) {
    error.status = 500;
    error.description = 'Network request failed!';
    next(error);
  }
}