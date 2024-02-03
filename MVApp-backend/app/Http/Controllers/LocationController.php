<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $locations = Location::all();
        //retirn $locations as json
        return response()->json($locations);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $location = new Location();
        $location->Name = $request->Name;
        $location->Lat = $request->Lat;
        $location->Lng = $request->Lng;
        $location->Notes = $request->Notes;
        $location->save();
        //return $location as json
        $data = [
            'status' => 200,
            'message' => 'Location created successfully',
            'data' => $location
        ];
        return response()->json($data);
    }

    /**
     * Display the specified resource.
     */
    public function show($location)
    {
        //
        // $location = Location::find($location->id)->first();
        $location = Location::where('id', $location)->first();

        $data = [
            'status' => 200,
            'message' => 'Location retrieved successfully',
            'data' => $location
        ];
        if (!$location) {
            $data = [
                'status' => 404,
                'message' => 'Location not found',
                'data' => []
            ];
        }
        return response()->json($data);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Location $location)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Location $location)
    {
        //
        $locationUpdate = Location::find($location->id)->update($request->all());
        $data = [
            'status' => 200,
            'message' => 'Location updated successfully',
            'data' => $locationUpdate
        ];

        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Location $location)
    {
        //
        $location = Location::find($location->id)->delete();
        $data = [
            'status' => 200,
            'message' => 'Location deleted successfully',
            'data' => $location
        ];
        return response()->json($data);
    }
}
