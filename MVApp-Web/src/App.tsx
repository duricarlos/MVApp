
import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage'
import LocationPage from './LocationPage'
// import FormPage from './assets/components/LocationForm'
import FormPage from './FormPage'

import { CONSTS } from './utils/const'


fetch(`${CONSTS.apiUrl}constants/`)
  .then((response) => response.json())
  .then((data) => {
    console.log("Success:", data);
  })



export default function Example() {
  return (
    // <HomePage/>
    <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/location/:locationId" element={<LocationPage />} />
          <Route path="/add" element={<FormPage type='add'/>} />
          <Route path="/edit/:locationId" element={<FormPage type='edit'/>} />
          <Route path="/del/:locationId" element={<FormPage type='del'/>} />

    </Routes>
  )
}
