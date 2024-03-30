'use client';
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';
import React from 'react';
import { useMemo, useState } from 'react';
const GOOGLE_MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
export default function MapView() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
  });
  const center = useMemo(
    () => ({ lat: 12.939525555477744, lng: 77.73138458855705 }),
    []
  );
  const [mapRef, setMapRef] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState();

  const markers = [
    { address: 'Obel Villas', lat: 12.939525555477744, lng: 77.73138458855705 },
    {
      address: 'Halasahalli Layout',
      lat: 12.92928781121957,
      lng: 77.7583750464287,
    },
    {
      address: 'Katherguppe Layout',
      lat: 12.912284797208201,
      lng: 77.76543445706841,
    },
  ];
  const onMapLoad = (map) => {
    setMapRef(map);
    const bounds = new google.maps.LatLngBounds();
    markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);
  };

  const handleMarkerClick = (id, lat, lng, address) => {
    mapRef?.panTo({ lat, lng });
    setInfoWindowData({ id, address });
    setIsOpen(true);
  };

  const customMarker = {
    path: 'M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805',
    fillColor: 'red',
    fillOpacity: 2,
    strokeWeight: 1,
    rotation: 0,
    scale: 1,
  };
  return (
    <div className=" w-full max-w-[96rem] mx-auto">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-full">
          <div className="flex flex-col ">
            <div className="w-full h-full">
              <div className="h-100v w-100v ">
                {!isLoaded ? (
                  <h1>Loading...</h1>
                ) : (
                  <GoogleMap
                    mapContainerClassName="w-full h-full"
                    onLoad={onMapLoad}
                    onClick={() => setIsOpen(false)}
                    // center={center}
                    // zoom={16}>
                  >
                    {markers.map(({ address, lat, lng }, ind) => (
                      <Marker
                        key={ind}
                        position={{ lat, lng }}
                        // icon={customMarker}
                        onClick={() => {
                          handleMarkerClick(ind, lat, lng, address);
                        }}>
                        {isOpen && infoWindowData?.id === ind && (
                          <InfoWindow
                            onCloseClick={() => {
                              setIsOpen(false);
                            }}>
                            <>
                              <div className="flex font-semibold text-slate-800 dark:text-slate-100">
                                {infoWindowData.address}
                              </div>

                              <div className="flex justify-center">
                                <span className="text-xs  font-medium rounded-full text-center px-2.5 py-1 mt-1 bg-emerald-100 dark:bg-emerald-400/30 text-emerald-600 dark:text-emerald-400">
                                  Available
                                </span>
                              </div>
                            </>
                          </InfoWindow>
                        )}
                      </Marker>
                    ))}
                  </GoogleMap>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
