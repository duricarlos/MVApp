import { useEffect, useState } from "react";
import Header from "../assets/components/Header";

import { Loc } from "../type.d";
import Map from "../assets/components/Map";

import { CONSTS } from "../utils/const";

function formatDate(date: string) {
  //format date to be more readable
  // MMM DD, YYYY HH:MM PM

  let d = new Date(date);
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  let minutesStr = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutesStr + " " + ampm;
  let month = d.toLocaleString("default", { month: "short" });
  let day = d.getDate();
  let year = d.getUTCFullYear().toString().slice(2);
  return month + " " + day + ", " + year + " " + strTime;
  // return new Date(date).toLocaleDateString();
}

export default function Report() {
    //new date today
    const [date, setDate] = useState(new Date());
//   const [date, setDate] = useState(new Date());
  const [locations, setLocations] = useState<Loc[]>([]);
  const [sells, setSells] = useState<any[]>([]);

  useEffect(() => {
    //https://mvapp.carlosduri.com/api/report?date=2024-02-14
    const apiUrl = `${CONSTS.apiUrl}report/?date=${
      date.toISOString().split("T")[0]
    }`;
    console.log(apiUrl);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((repos: any) => {
        console.log(repos);
        //repos is an array of sells
        setSells(repos.data);

        Object.entries(repos.data).forEach((element: any) => {
            console.log(element[1].location);
          //check if locations has the location (element[1].location)
          // if not, add it
          let location = locations.find(
            (loc) => loc.id === element[1].location_id
          );
          // console.log(location);
          if (!location) {
            // if not, add it
            location = {
              id: element[1].location.id,
              Name: element[1].location.Name,
              Lat: element[1].location.Lat,
              Lng: element[1].location.Lng,
              Notes: element[1].location.Notes,
              sells: [],
              // @ts-ignore
              Color: "#FF0000",
            };
            // @ts-ignore
            setLocations((locations) => [...locations, location]);
            // console.log(locations);
          }
          console.log();
        });
      });
  }, [date]);

  return (
    <>
      <div className="min-h-full">
        <Header />

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {/* Page title */}
              Report
            </h1>
            <br />
          </div>
        </header>
        <main>
          <section className="p-4 mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 items-center justify-center flex">
            {/* Sellect day to show all the sells of that day */}
            <div className="flex gap-2">
              <section
                onClick={() => {
                  setDate(new Date(date.setDate(date.getDate() - 1)));
                }}
              >
                {/* back button */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </section>
              <section>
                {/* current date */}
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  {date.toISOString().split("T")[0]}
                </h1>
              </section>
              <section
                onClick={() => {
                  setDate(new Date(date.setDate(date.getDate() + 1)));
                }}
              >
                {/* next date */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </section>
            </div>
          </section>
            <section className="p-4 mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 items-center justify-center flex">
            <Map locations={locations} />
            </section>
          <section className="p-4 mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 items-center justify-center flex">
            {/* Map of locations of the sells of the day */}
            {/* Table of sells */}
            <div>
            <h3 className="text-center text-2xl font-bold">Sells</h3>
            <h6 className="text-center text-normal font-bold">
              Total: $
              {
                // @ts-ignore
                sells
                  .map((sell) => sell.total)
                  .reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
              }
            </h6>
            <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="px-1 py-2">Notes</th>
                    <th className="px-1 py-2">Total</th>
                    <th className="px-1 py-2">Date</th>
                    <th className="px-1 py-2">Del.</th>
                  </tr>
                </thead>
                <tbody>
                  {sells.map((sell) => (
                    <tr key={sell.id}>
                      <td className="border px-1 py-2 whitespace-pre-line">
                        {sell.notes}
                      </td>
                      <td className="border px-1 py-2">${sell.total}</td>
                      <td className="border px-1 py-2 text-xs">
                        {formatDate(sell.created_at)}
                      </td>
                      <td
                        className="border px1 py-2 h-auto"
                        onClick={() => {
                          // delete sell

                          fetch(CONSTS.apiUrl + "sells/" + sell.id, {
                            method: "DELETE",
                            headers: {
                              Accept: "application/json",
                            },
                          })
                            .then((res) => res.json())
                            .then((repos) => {
                              //check if repos status is 200
                              if (repos.status === 200) {
                                console.log(repos.data);
                                alert("Sell deleted");
                                setSells(sells.filter((s) => s.id !== sell.id));
                              } else {
                                console.log(repos);
                              }
                            });
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 m-auto"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
