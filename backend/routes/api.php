<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TeamController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

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
Route::get("/teams/{team}", [TeamController::class, "show"]);

/**
 * Employees Routes
 */
Route::get("/employees", [UserController::class, "index"]);
Route::post("/employees", [UserController::class, "store"]);
Route::get("/employees/{user}", [UserController::class, "edit"]);
