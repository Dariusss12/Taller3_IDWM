<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LoginController;

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

Route::post('/login',[LoginController::class,'login']);
Route::post('/register',[UserController::class,'registerUser']);
Route::get('/validate',[UserController::class,'validateToken']);


Route::middleware('jwt.verified')->group(function(){
    Route::put('/users/{user}',[UserController::class,'update']);
    Route::put('/users/{user}/changePassword',[UserController::class,'changePassword']);
    Route::post('/logout', [LoginController::class, 'logout']);
});
