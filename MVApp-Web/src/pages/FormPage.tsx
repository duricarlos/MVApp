import Header from "../assets/components/Header";
import LocationForm from "../assets/components/LocationForm";


export default function FormPage({type} : {type: string}) {
  return (
    <>
      <div className="min-h-full">
        <Header />

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 id="page-title" className="text-3xl font-bold tracking-tight text-gray-900">
              {/* Page title */}
            </h1>
          </div>
        </header>
        <main>
          <div className="p-4 mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <LocationForm type={type}/>
          </div>
        </main>
      </div>
      {/*  */}
    </>
  );
}
