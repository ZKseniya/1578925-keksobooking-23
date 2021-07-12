import {removeFormsLocking} from './form-processing.js';
import {createAd} from './creating-ads.js';

const addMapAndMarkers = (similarAds) => {
  const coordinates = document.querySelector('#address');
  const map = L.map('map-canvas')
    .on('load', () => {
      removeFormsLocking();
    })
    .setView({
      lat: 35.6895,
      lng: 139.692,
    }, 12);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl:'./img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainMarker = L.marker(
    {
      lat: 35.6895,
      lng: 139.692,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainMarker.addTo(map);

  mainMarker.on('moveend', (evt) => {
    const currentСoordinates = evt.target.getLatLng();
    coordinates.value = `lat: ${currentСoordinates.lat.toFixed(5)}, lng: ${currentСoordinates.lng.toFixed(4)}`;
  });

  const similarPinIcon = L.icon ({
    iconUrl:'./img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
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

export {addMapAndMarkers};


