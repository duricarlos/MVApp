<?php

namespace App\Http\Controllers;

use App\Models\Constant;
use Illuminate\Http\Request;

class ConstantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $constant = Constant::all();
        //retirn $locations as json
        return response()->json($constant);
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
    }

    /**
     * Display the specified resource.
     */
    public function show(Constant $constant)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Constant $constant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Constant $constant)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Constant $constant)
    {
        //
    }
}
