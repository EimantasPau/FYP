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
Route::post('/signin', 'UserController@signin')->name('login');
Route::get('/users', 'UserController@index');
Route::get('/user', 'UserController@user')->middleware('auth.jwt');
Route::post('/user', 'UserController@update')->middleware('auth.jwt');

Route::post('/skills', 'SkillController@store')->middleware('auth.jwt');
Route::delete('/skills/{skill}', 'SkillController@destroy')->middleware('auth.jwt');

Route::post('/education', 'EducationController@store')->middleware('auth.jwt');
Route::get('/education', 'EducationController@index')->middleware('auth.jwt');
Route::delete('/education/{education}', 'EducationController@destroy')->middleware('auth.jwt');
Route::put('/education/{education}', 'EducationController@update')->middleware('auth.jwt');

Route::post('/experience', 'ExperienceController@store')->middleware('auth.jwt');
Route::get('/experience', 'ExperienceController@index')->middleware('auth.jwt');
Route::delete('/experience/{experience}', 'ExperienceController@destroy')->middleware('auth.jwt');
Route::put('/experience/{experience}', 'ExperienceController@update')->middleware('auth.jwt');

Route::post('/courses/search', 'CourseController@search')->middleware('auth.jwt');
Route::post('/courses', 'CourseController@store')->middleware('auth.jwt');
Route::delete('/courses/{course}', 'CourseController@destroy')->middleware('auth.jwt');
Route::put('/courses/{course}', 'CourseController@update')->middleware('auth.jwt');

Route::post('/lessons/search', 'LessonController@search')->middleware('auth.jwt');
Route::post('/lessons', 'LessonController@store')->middleware('auth.jwt');
Route::post('/lessons/{lesson}', 'LessonController@update')->middleware('auth.jwt');
Route::delete('/lessons/{lesson}', 'LessonController@destroy')->middleware('auth.jwt');

Route::get('/coursetypes', 'CourseTypeController@index')->middleware('auth.jwt');

Route::post('/questions', 'QuestionController@store')->middleware('auth.jwt');
Route::get('/questions', 'QuestionController@index')->middleware('auth.jwt');

//Route::get('/conversations', 'ConversationController@index')->middleware('auth.jwt');
Route::post('/groups', 'GroupController@store')->middleware('auth.jwt');
Route::get('/groups', 'GroupController@index')->middleware('auth.jwt');

Route::post('/conversations', 'ConversationController@store')->middleware('auth.jwt');
