import React, { useEffect, useRef, useState } from 'react';
import {
  APIProvider,
  Map,
  Marker,
  useMarkerRef,
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import { Polygon } from './polygon';
import { useRouter } from 'next/navigation';

const polygons = [
  {
    id: '1',
    name: 'Layout 1',
    availableSites: 10,
    coordinates: [
      { lat: 12.912718, lng: 77.765108 },
      { lat: 12.913109, lng: 77.765333 },
      { lat: 12.912832, lng: 77.76582 },
      { lat: 12.911977, lng: 77.765899 },
      { lat: 12.911878, lng: 77.765237 },
    ],
  },
  {
    id: '2',
    name: 'Layout 2',
    availableSites: 20,
    coordinates: [
      { lat: 12.913888, lng: 77.764054 },
      { lat: 12.913828, lng: 77.764548 },
      { lat: 12.912675, lng: 77.764301 },
      { lat: 12.91279, lng: 77.763716 },
    ],
  },
  {
    id: '3',
    name: 'Layout 3',
    avaiableSites: 0,
    coordinates: [
      { lat: 12.928434, lng: 77.758416 },
      { lat: 12.929929, lng: 77.759153 },
      { lat: 12.929945, lng: 77.758324 },
      { lat: 12.929414, lng: 77.758198 },
      { lat: 12.928912, lng: 77.757968 },
    ],
  },
];

export default function MapView({ layouts }) {
  const router = useRouter();
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState();
  const [markerRef, marker] = useAdvancedMarkerRef();

  const onModalOpenFn = (id) => {
    const temp = polygons.find((polygon) => polygon.id == id);
    setInfoWindowData(temp);
    setInfowindowOpen(true);
  };

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}>
      <Map
        defaultZoom={16}
        defaultCenter={{ lat: 12.9124, lng: 77.7655 }}
        mapId="bf51a910020fa25a">
        {polygons.map((polygon) => (
          <Polygon
            key={polygon.id}
            ref={markerRef}
            paths={polygon.coordinates}
            // onClick={() => router.push(`/property?id=65cf00fef901e992d94c892b`)}
            onClick={() => onModalOpenFn(polygon.id)}
            options={{
              strokeColor: polygon?.avaiableSites == 0 ? '#dc2626' : '#10b981',
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: polygon?.avaiableSites == 0 ? '#dc2626' : '#10b981',
              fillOpacity: 0.35,
            }}
          />
        ))}
        {/* <AdvancedMarker
          ref={markerRef}
          onClick={() => setInfowindowOpen(true)}
          position={{ lat: 12.9124, lng: 77.7655 }}
          title={'AdvancedMarker that opens an Infowindow when clicked.'}
        /> */}
        {infowindowOpen && (
          <InfoWindow
            anchor={marker}
            maxWidth={300}
            position={infoWindowData?.coordinates[0]}
            onCloseClick={() => setInfowindowOpen(false)}>
            <div className="flex justify-center text-center font-semibold text-slate-800 w-40">
              {infoWindowData?.name}
            </div>
            <div className="flex justify-center mt-2 ">
              <button
                className="rounded-lg bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                onClick={() => {
                  router.push(`/property?id=${infoWindowData?.id}`);
                }}>
                View Details
              </button>
            </div>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
}
