import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "./assets/components/Header";

import { Loc } from "./type.d";
import LocationInfo from "./assets/components/LocationInfo";

import { CONSTS } from './utils/const'


export default function LocationPage() {
  const { locationId } = useParams();

  const defaultLocation: Loc = {
    id: -1,
    Name: "loading...",
    Lat: 0,
    Lng: 0,
    Notes: "loading...",
    sells: [],
  };
  const [location, setLocation] = useState<Loc>(defaultLocation);

  useEffect(() => {
    const apiUrl = `${CONSTS.apiUrl}locations/${locationId}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((repos) => {
        //check if repos status is 200

        if (repos.status === 200) {
          console.log(repos.data);
          setLocation(repos.data);
        } else {
          console.log(repos);
        }
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
              {location?.Name}
            </h1>
            <br />
            <Link  to={"/edit/" + locationId} >
              <button
                type="button"
                className="rounded-md bg-cyan-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Edit
              </button>
            </Link>
            <Link to={"/del/" + locationId} className="px-4">
              <button
                type="button"
                className="rounded-md bg-red-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Delete
              </button>
            </Link>
          </div>
            
        </header>
        <main>
          <div className="p-4 mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <LocationInfo loc={location} />
          </div>
        </main>
      </div>
      {/*  */}
    </>
  );
}
