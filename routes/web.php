<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//-------------Customer-----------------------
Route::get('index',"CustomerController@index")->name('index')->middleware('auth');
Route::post('store', "CustomerController@store")->name('store');
Route::get ('show', "CustomerController@ShowClients")->name('show');
Route::get('update/{id}', "CustomerController@update")->name('update');
Route::get('destroy/{id}',"CustomerController@DeleteClientAction")->name('destroyAction');




Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');




