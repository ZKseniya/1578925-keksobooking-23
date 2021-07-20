import {removeFormsLocking} from './form-processing.js';
import {createAd} from './creating-ads.js';
import {addFilterMarkers} from './filters.js';
import {debounce} from './utils/debounce.js';

const MapDefaultOptions = {
  LAT : 35.6895,
  LNG : 139.692,
  ZOOM : 12,
  TILEURL : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  TILEATTR : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

const MainMarkerOptions = {
  ICONSIZE : {
    width : 52,
    height : 52,
  },
  ANCHORSIZE : {
    width : 26,
    height : 52,
  },
  ICONIMAGE : './img/main-pin.svg',
};

const SimilarMarkerOptions = {
  ICONSIZE : {
    width : 40,
    height : 40,
  },
  ANCHORSIZE : {
    width : 20,
    height : 40,
  },
  ICONIMAGE : './img/pin.svg',
};

const SIMILAR_ADS_COUNT = 10;
const RERENDER_DELAY = 500;

const coordinates = document.querySelector('#address');
const map = L.map('map-canvas');

const addDefaultCoordinates = () => {
  coordinates.value = `${MapDefaultOptions.LAT}, ${MapDefaultOptions.LNG}`;
};

const initMap = () => {
  map.on('load', () => {
    removeFormsLocking();
  })
    .setView({
      lat: MapDefaultOptions.LAT,
      lng: MapDefaultOptions.LNG,
    }, MapDefaultOptions.ZOOM);
  L.tileLayer(
    MapDefaultOptions.TILEURL,
    {
      attribution: MapDefaultOptions.TILEATTR,
    },
  ).addTo(map);

};

const mainPinIcon = L.icon({
  iconUrl: MainMarkerOptions.ICONIMAGE,
  iconSize: [MainMarkerOptions.ICONSIZE.width, MainMarkerOptions.ICONSIZE.height],
  iconAnchor: [MainMarkerOptions.ANCHORSIZE.width, MainMarkerOptions.ANCHORSIZE.height],
});

const mainMarker = L.marker(
  {
    lat: MapDefaultOptions.LAT,
    lng: MapDefaultOptions.LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const markersGroup = L.layerGroup();

mainMarker.addTo(map);

mainMarker.on('move', (evt) => {
  const currentСoordinates = evt.target.getLatLng();
  coordinates.value = `${currentСoordinates.lat.toFixed(5)}, ${currentСoordinates.lng.toFixed(4)}`;
});

const createMarkers = (shortAdsList) => {
  const similarPinIcon = L.icon ({
    iconUrl: SimilarMarkerOptions.ICONIMAGE,
    iconSize: [SimilarMarkerOptions.ICONSIZE.width, SimilarMarkerOptions.ICONSIZE.height],
    iconAnchor: [SimilarMarkerOptions.ANCHORSIZE.width, SimilarMarkerOptions.ANCHORSIZE.height],
  });

  shortAdsList.forEach((similarAd) => {

    const similarMarker = L.marker(
      {
        lat: similarAd.location.lat,
        lng: similarAd.location.lng,
      },
      {
        icon: similarPinIcon,
      });

    similarMarker
      .addTo(markersGroup)
      .bindPopup(
        createAd(similarAd),
        {
          keepInView: true,
        },
      );
  });

  markersGroup.addTo(map);
};

const addMarkers = (similarAds) => {
  const filtersForm = document.querySelector('.map__filters');

  const shortAdsList = similarAds.slice(0, SIMILAR_ADS_COUNT);

  createMarkers(shortAdsList);

  filtersForm.addEventListener('change', () => {
    markersGroup.clearLayers();
    addFilterMarkers(similarAds);
  });
};

const addMapAndMarkers = (similarAds) => {

  initMap();

  addMarkers(similarAds);
};

const resetMap = () => {
  map.setView({
    lat: MapDefaultOptions.LAT,
    lng: MapDefaultOptions.LNG,
  }, MapDefaultOptions.ZOOM);

  mainMarker.setLatLng(
    {
      lat: MapDefaultOptions.LAT,
      lng: MapDefaultOptions.LNG,
    },
  );
};

export {createMarkers, addMapAndMarkers, resetMap};
export {addDefaultCoordinates};


