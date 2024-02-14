
import { useEffect, useState } from 'react';
import Header from '../assets/components/Header'
import LocationPreview from '../assets/components/LocationPreview'
import Map from '../assets/components/Map'
import { CONSTS } from '../utils/const';
import { Loc } from '../type.d';

export default function Home() {
  const [locations, setLocations] = useState<Loc[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const apiUrl = `${CONSTS.apiUrl}locations/`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((repos) => {
        setLocations(repos);
        setTotal(repos.length - 1 ); // -1 to account the home location
      });
  }, []);
  return (
    <>
      <div className="min-h-full">
      <Header />


        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {/* Page title */}
              Location Lists: {total}
              </h1>
          </div>
        </header>
        <main>
          <div className="p-4 mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <Map locations={locations} />
            <LocationPreview locations={locations}/>
            
            </div>
        </main>
      </div>
    </>
  )
}
