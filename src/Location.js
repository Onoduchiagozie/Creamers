import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export default function useLocation() {
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState('Lagos, Nigeria');
    const [loadingLocation, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                // Request permission
                const { status } = await Location.requestForegroundPermissionsAsync();

                if (status !== 'granted') {
                    setError('Permission denied');
                    setLoading(false);
                    return;
                }

                // Get current location
                const loc = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.Balanced,
                });

                setLocation(loc);

                // Reverse geocode to get address
                const [place] = await Location.reverseGeocodeAsync({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                });

                if (place) {
                    const formattedAddress = `${place.city || place.district || place.subregion}, ${place.country}`;
                    setAddress(formattedAddress);
                }
            } catch (e) {
                setError(e.message);
                console.error('Location error:', e);
            } finally {
                setLoading(false);
            }
        })();
    }, []);
console.log(".....................................................",location,address);
    return { location, address, loadingLocation, error };
}