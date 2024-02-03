<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get( '/locations', 'App\Http\Controllers\LocationController@index' );
Route::post( '/locations', 'App\Http\Controllers\LocationController@store' );
Route::get( '/locations/{location}', 'App\Http\Controllers\LocationController@show' );
Route::put( '/locations/{location}', 'App\Http\Controllers\LocationController@update' );
Route::delete( '/locations/{location}', 'App\Http\Controllers\LocationController@destroy' );

Route::get('/constants', 'App\Http\Controllers\ConstantController@index');