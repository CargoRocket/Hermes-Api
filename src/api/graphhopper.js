import axios from 'axios';
import graphhopper from '../config/graphhopper.json';

export const requestRoute = async (from, to, profile, lang) => {
  return axios.get(`${graphhopper.url}${graphhopper.route}?locale=${lang}&point=${from.join(',')}&point=${to.join(',')}&points_encoded=false&details=road_class&details=max_speed&instructions=true&profile=${profile}`)
}

export const requestInfo = async () => {
  return axios.get(`${graphhopper.url}${graphhopper.info}`);
}