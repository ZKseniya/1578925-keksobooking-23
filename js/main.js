import {createSimilarAds} from './data-generator.js';
import {addFormsLocking, addFormValidation} from './form-processing.js';
import {addMapAndMarkers} from './map-processing.js';

const SIMILAR_AD_COUNT = 10;
const similarAds = new Array(SIMILAR_AD_COUNT).fill(null).map((element, index) => createSimilarAds(element, index));

addFormsLocking();
addMapAndMarkers(similarAds);
addFormValidation();
