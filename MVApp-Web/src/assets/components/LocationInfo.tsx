import { Loc } from "../../type.d";

export default function LocationInfo({ loc }: { loc: Loc }) {
    let mapUrl = `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${loc.Lat},%20${loc.Lng}+(My%20Business%20Name)&t=&z=14&ie=UTF8&iwloc=B&output=embed`

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
              <iframe
                width="100%"
                height={400}
                src={mapUrl}
              >
              </iframe>
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Notes
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {loc.Notes}
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
}
