import { useEffect, useState } from "react";
import { Loc, Sell } from "../../type.d";

import { CONSTS } from '../../utils/const'


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

export default function LocationInfo({ loc }: { loc: Loc }) {
  let mapUrl = `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${loc.Lat},%20${loc.Lng}+(My%20Business%20Name)&t=&z=14&ie=UTF8&iwloc=B&output=embed`;
  const [sells, setSells] = useState<Sell[]>(loc.sells);
  useEffect(() => {
    setSells(loc.sells);
  } , [loc.sells])
  return (
    <>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Location Name
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          {loc.Name}
        </p>
      </div>

      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Map</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <iframe width="100%" height={400} src={mapUrl}></iframe>
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Notes
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 whitespace-pre-line">
              {loc.Notes}
            </dd>
          </div>
          <br />
          <h3 className="text-center text-2xl font-bold">Add Sell</h3>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <div className="flex flex-col">
              <label
                htmlFor="notes"
                className="text-sm font-medium leading-6 text-gray-900"
              >
                Notes
              </label>
              <textarea
                name="notes"
                id="notes"
                className="mt-1 p-2 border border-gray-300 rounded-md h-60"
              />
            </div>
            <div className="flex flex-col mt-4">
              <label
                htmlFor="total"
                className="text-sm font-medium leading-6 text-gray-900"
              >
                Total
              </label>
              <input
                type="number"
                name="total"
                id="total"
                className="mt-1 p-2 border border-gray-300 rounded-md w-32"
                placeholder="20.00"
              />
            </div>
            <button
              className="mt-10 bg-blue-500 text-white p-2 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                // add sell
                let notes = (document.getElementById("notes") as HTMLInputElement).value
                let total = (document.getElementById("total") as HTMLInputElement).value
                let id = loc.id
                console.log(notes, total)
                const sell = {
                  notes: notes,
                  total: total,
                  id: id
                } as any
                const formData = new FormData();
                formData.append("notes", notes);
                formData.append("total", total);
                formData.append("location_id", id.toString());
                console.log(CONSTS.apiUrl + 'sells')

                fetch(CONSTS.apiUrl + 'sells', {
                  method: "POST",
                  headers: {
                    "Accept": "application/json",
                  },
                  body: formData
                })
                  .then((res) => res.json())
                  .then((repos) => {
                    //check if repos status is 200
                    if (repos.status === 200) {
                      console.log(repos.data);
                      alert("Sell added")
                      setSells([...sells, sell])
                    } else {
                      console.log(repos);
                    }
                  
                })
              }}
            >
              Add Sell
            </button>
          </div>
          <h3 className="text-center text-2xl font-bold">Sells</h3>
          <h6 className="text-center text-normal font-bold">Total: ${
            // @ts-ignore
            sells.map((sell) => sell.total).reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
          
          }</h6>
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
                    <td className="border px-1 py-2 whitespace-pre-line">{sell.notes}</td>
                    <td className="border px-1 py-2">${sell.total}</td>
                    <td className="border px-1 py-2 text-xs">
                      {formatDate(sell.created_at)}
                    </td>
                    <td className="border px1 py-2 h-auto" onClick={() => {
                      // delete sell

                      fetch(CONSTS.apiUrl + 'sells/' + sell.id, {
                        method: "DELETE",
                        headers: {
                          "Accept": "application/json",
                        }
                      })
                        .then((res) => res.json())
                        .then((repos) => {
                          //check if repos status is 200
                          if (repos.status === 200) {
                            console.log(repos.data);
                            alert("Sell deleted")
                            setSells(sells.filter((s) => s.id !== sell.id))
                          } else {
                            console.log(repos);
                          }
                        })

                    }}>
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
        </dl>
      </div>
    </>
  );
}
