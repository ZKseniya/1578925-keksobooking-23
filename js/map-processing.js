import {removeFormsLocking} from './form-processing.js';
import {createAd} from './creating-ads.js';

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

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  const currentСoordinates = evt.target.getLatLng();
  coordinates.value = `${currentСoordinates.lat.toFixed(5)}, ${currentСoordinates.lng.toFixed(4)}`;
});

const addMapAndMarkers = (similarAds) => {

  initMap();

  const similarPinIcon = L.icon ({
    iconUrl: SimilarMarkerOptions.ICONIMAGE,
    iconSize: [SimilarMarkerOptions.ICONSIZE.width, SimilarMarkerOptions.ICONSIZE.height],
    iconAnchor: [SimilarMarkerOptions.ANCHORSIZE.width, SimilarMarkerOptions.ANCHORSIZE.height],
  });

  similarAds.forEach((similarAd) => {
    const similarMarker = L.marker(
      {
        lat: similarAd.location.lat,
        lng: similarAd.location.lng,
      },
      {
        icon: similarPinIcon,
      });

    similarMarker
      .addTo(map)
      .bindPopup(
        createAd(similarAd),
        {
          keepInView: true,
        },
      );
  });
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

export {addMapAndMarkers, resetMap};
export {addDefaultCoordinates};


