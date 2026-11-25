import axios from 'axios';
import { PRICING_CATALOG_URL, parsePricingCatalog } from './pricingCatalog.mjs';

const processData = async () => {
  const { data } = await axios.get(PRICING_CATALOG_URL);
  return parsePricingCatalog(data);
};

export default processData;
