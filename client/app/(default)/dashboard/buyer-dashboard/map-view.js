'use client';
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useState } from 'react';
const GOOGLE_MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
export default function MapView2({ layouts }) {
  const router = useRouter();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
  });
  const [mapRef, setMapRef] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState();
  const [markers, setMarkers] = useState([]);
  // const center = useMemo(
  //   () => ({ lat: layouts[0]?.location?.long, lng: layouts[0]?.location?.lat }),
  //   [layouts]
  // );

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

  useEffect(() => {
    if (layouts) {
      const markers = layouts.map((layout) => ({
        address: layout.name,
        lat: layout.location?.long,
        lng: layout.location?.lat,
        id: layout._id,
      }));
      setMarkers(markers);
    }
  }, [layouts]);
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
                    center={{
                      lat: 12.912516973158983,
                      lng: 77.76556536425828,
                    }}
                    zoom={10}>
                    {markers?.map(({ address, lat, lng, id }, ind) => (
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
                              <div className="flex font-semibold text-slate-800">
                                {infoWindowData.address}
                              </div>
                              <div className="flex justify-center mt-2 ">
                                <button
                                  className="rounded-lg bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                                  onClick={() => {
                                    router.push(`/property?id=${id}`);
                                  }}>
                                  View Layout
                                </button>
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
