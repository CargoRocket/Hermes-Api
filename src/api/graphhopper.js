import axios from 'axios';
import graphhopper from '../config/graphhopper.json';

export const requestRoute = async (from, to, vias, profile, lang, bicycle_width = null, bicycle_length = null) => {

  const endpointUrl = new URL(`${graphhopper.url}${graphhopper.route}`);

  endpointUrl.searchParams.append('locale', lang);
  endpointUrl.searchParams.append('point', from.join(','));
  vias.forEach((via) => endpointUrl.searchParams.append('point', via.join(',')));
  endpointUrl.searchParams.append('point', to.join(','));
  endpointUrl.searchParams.append('points_encoded', 'false');
  endpointUrl.searchParams.append('instructions', 'true');
  endpointUrl.searchParams.append('profile', profile);
  if (bicycle_width) {
    endpointUrl.searchParams.append('bicycle_width', bicycle_width);
  }
  if (bicycle_length) {
    endpointUrl.searchParams.append('bicycle_width', bicycle_width);
  }
  return axios.get(endpointUrl.href)
}

export const requestInfo = async () => {
  return axios.get(`${graphhopper.url}${graphhopper.info}`);
}