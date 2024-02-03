import { useEffect, useState } from "react";
import { CONSTS } from '../../utils/const'

function getLocationHandleClick({setNotificacionData}: {setNotificacionData: any}) {
  setNotificacionData({
    message: "Getting location...",
    styles: notificationStyles.info,
  })
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      (document.getElementById("Lat") as HTMLInputElement).value =
        latitude.toString();
      (document.getElementById("Lng") as HTMLInputElement).value =
        longitude.toString();
      setNotificacionData({
        message: "Location found",
        styles: notificationStyles.success,
      })
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}


function sendFormHandleClick({ type, setNotificacionData }: { type: string, setNotificacionData: any }) {
  const Name = (document.getElementById("Name") as HTMLInputElement).value;
  const id = (document.getElementById("id") as HTMLInputElement).value;
  const Lat = (document.getElementById("Lat") as HTMLInputElement).value;
  const Lng = (document.getElementById("Lng") as HTMLInputElement).value;
  const Notes = (document.getElementById("Notes") as HTMLInputElement).value;
  const data = { Name, Lat, Lng, Notes };

  const methodType =
    type === "add" ? "POST" : type === "edit" ? "PUT" : "DELETE";
  const url =
    type === "add"
      ? `${CONSTS.apiUrl}locations/`
      : type === "edit"
      ? `${CONSTS.apiUrl}locations/${id}`
      : `${CONSTS.apiUrl}locations/${id}`;
  console.log(data);
  console.log(url);
  fetch(url, {
    method: methodType,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      setNotificacionData({
        message: data.message,
        styles: notificationStyles.success,
      })
    })
    .catch((error) => {
      console.error("Error:", error);
      setNotificacionData({
        message: error.message,
        styles: notificationStyles.error,
      })
    });
}


const notificationStyles = {
  success: "p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50",
  error: "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50",
  info: "p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50",
}

export default function LocationForm({ type }: { type: string }) {
  const [notificacionData, setNotificacionData] = useState({
    message: "",
    styles: "",
  });
  

  const title =
    type === "add"
      ? "Add Location"
      : type === "edit"
      ? "Edit Location"
      : "Delete Location";

  useEffect(() => {
    if (type === "edit" || type === "del") {
      const id = window.location.pathname.split("/")[2];
      fetch(`${CONSTS.apiUrl}locations/${id}`)
        .then((response) => response.json())
        .then((data) => {
          //check if the data status is 200
          console.log(data);
          if (data.status === 200) {
            (document.getElementById("id") as HTMLInputElement).value =
              data.data.id;
            (document.getElementById("Name") as HTMLInputElement).value =
              data.data.Name;
            (document.getElementById("Lat") as HTMLInputElement).value =
              data.data.Lat;
            (document.getElementById("Lng") as HTMLInputElement).value =
              data.data.Lng;
            (document.getElementById("Notes") as HTMLInputElement).value =
              data.data.Notes;
              setNotificacionData({
                message: "Location found",
                styles: notificationStyles.success,
              })
          } else {
            console.log("Error:", data);
              setNotificacionData({
                message: data.message,
                styles: notificationStyles.error,
              })
          }
        });
    }
  }, []);
  return (
    <form>
      <div className="space-y-12">
        <div
          className={notificacionData.styles}
          role="alert"
        >
          <span className="font-medium">{notificacionData.message}</span>
        </div>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            {title}
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="Name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                ID
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="id"
                  id="id"
                  disabled={true}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="Name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="Name"
                  id="Name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="Lat"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Latitude
              </label>
              <div className="mt-2">
                <input
                  type="string"
                  name="Lat"
                  id="Lat"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="Lng"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Longitude
              </label>
              <div className="mt-2">
                <input
                  type="string"
                  name="Lng"
                  id="Lng"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => getLocationHandleClick({setNotificacionData})}
              className="rounded-md bg-cyan-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get Location
            </button>

            <div className="sm:col-span-3">
              <label
                htmlFor="Lng"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Notes
              </label>
              <div className="mt-2">
                <textarea
                  name="Notes"
                  id="Notes"
                  className="block resize w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => sendFormHandleClick({ type, setNotificacionData })}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {type === "add" ? "Add" : type === "edit" ? "Edit" : "Delete"}
        </button>
      </div>
    </form>
  );
}
