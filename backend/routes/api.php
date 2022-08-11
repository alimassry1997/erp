<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TeamController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
/**
 * Login Route
 */
Route::post("/login", [AuthController::class, "login"]);

/**
 * Teams Routes
 */
Route::get("/teams", [TeamController::class, "index"]);

Route::middleware("auth:sanctum")->get("/user", function (Request $request) {
    return $request->user();
});
