import { request } from './api';

// POST local images - based on local files
// Choose this method if the images you want to identify are accessible locally.

// GET remote images - based on the images URLs
// Choose this method if the images you want to identify are hosted online and you have their URLs.

const plantNetURL = 'https://my-api.plantnet.org/v2';

export const getPlantTip = (imgUrl: string, APIkey: string) => {
  return request(
    `${plantNetURL}/identify/all?images=${imgUrl}&organs=auto&include-related-images=false&no-reject=false&nb-results=1&lang=en&type=kt&api-key=${APIkey}`
  );
};
