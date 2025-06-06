// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-defaulticon-compatibility';
// import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

// const LocationMarker = ({ position }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (position) {
//       map.setView(position, 16); // Zoom to user position
//     }
//   }, [position, map]);

//   return position ? <Marker position={position}></Marker> : null;
// };

// const LiveTracking = () => {
//   const [position, setPosition] = useState(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       const watchId = navigator.geolocation.watchPosition(
//         (pos) => {
//           setPosition([pos.coords.latitude, pos.coords.longitude]);
//         },
//         (err) => {
//           console.error('Geolocation error:', err);
//         },
//         { enableHighAccuracy: true, maximumAge: 0 }
//       );

//       return () => navigator.geolocation.clearWatch(watchId);
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   }, []);

//   return (
//     <div style={{ height: '300px', borderRadius: '10px', overflow: 'hidden' }}>
//       <MapContainer center={[0, 0]} zoom={13} style={{ height: '100%', width: '100%' }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <LocationMarker position={position} />
//       </MapContainer>
//     </div>
//   );
// };

//  export default LiveTracking;


import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet icon path issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const RecenterMap = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 15);
    }
  }, [position, map]);
  return null;
};

const LiveTracking = () => {
  const [position, setPosition] = useState(null);


  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        (err) => console.error('Geolocation error:', err),
        { enableHighAccuracy: true, maximumAge: 0 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      console.error('Geolocation not supported');
    }
  }, []);

  return (
    <div className="relative w-full h-screen">
      {/* Map */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
        <MapContainer
          center={position || [33.6844, 73.0479]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          />
          {position && (
            <>
              <Marker position={position} />
              <RecenterMap position={position} />
            </>
          )}
        </MapContainer>
      </div>

      {/* Uber logo */}
      <img
        className="w-18 absolute right-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Logo is loading"
        srcset=""
      />
     
    </div>
  );
};

export default LiveTracking;
