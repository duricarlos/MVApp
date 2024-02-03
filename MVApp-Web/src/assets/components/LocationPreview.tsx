import { useEffect, useState } from "react";

import { Loc } from "../../type.d";
import { Link } from "react-router-dom";

import { CONSTS } from '../../utils/const'


export default function LocationPreview() {
  //locations is an array of objects of type Location
  const [locations, setLocations] = useState<Loc[]>([]);

  useEffect(() => {
    const apiUrl = `${CONSTS.apiUrl}locations/`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((repos) => {
        setLocations(repos);
      });
  }, []);
  return (
      <ul role="list" className="divide-y divide-gray-100">
        {locations.map((item) => (
          <Link key={item.id} to={"/location/"+item.id}>
          <li
            key={item.id}
            className="flex justify-between gap-x-6 py-4 my-3  "
          >
            <div className="flex min-w-0 gap-x-4">
              {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" /> */}
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {item.Name}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {item.Notes.substring(0, 8)}...
                </p>
              </div>
            </div>
            <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">ID: {item.id}</p>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                       {/* Text below id          */}
              </p>
            </div>
          </li>
        </Link>
        ))}
      </ul>
  );
}
