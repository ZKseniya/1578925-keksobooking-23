import {createSimilarAds} from './data-generator.js';
import {createAd} from './creating-ads.js';
import {addFormsLocking, removeFormsLocking} from './form-processing.js';

const SIMILAR_AD_COUNT = 10;
const similarAds = new Array(SIMILAR_AD_COUNT).fill(null).map((element, index) => createSimilarAds(element, index));

const map = document.querySelector('#map-canvas');

map.appendChild(createAd(similarAds[0]));

addFormsLocking();
removeFormsLocking;
