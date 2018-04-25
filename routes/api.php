<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/signup', 'UserController@signup');
Route::post('/signin', 'UserController@signin');
Route::get('/users', 'UserController@index');
Route::get('/user', 'UserController@user')->middleware('auth.jwt');
Route::post('/user', 'UserController@update')->middleware('auth.jwt');

Route::post('/skills', 'SkillController@store')->middleware('auth.jwt');
Route::delete('/skills/{skill}', 'SkillController@destroy')->middleware('auth.jwt');

Route::post('/education', 'EducationController@store')->middleware('auth.jwt');
Route::get('/education', 'EducationController@index')->middleware('auth.jwt');
Route::delete('/education/{education}', 'EducationController@destroy')->middleware('auth.jwt');
Route::put('/education/{education}', 'EducationController@update')->middleware('auth.jwt');
