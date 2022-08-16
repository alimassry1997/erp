<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Termwind\Components\Raw;

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

Route::post("/login", [AuthController::class, "login"]);

Route::middleware("auth:sanctum")->get("/user", function (Request $request) {
    return $request->user();
});

// Add Employee
Route::post('add-employee', [UserController::class, 'store']);


// View all the employees
Route::get('employees', [UserController::class, 'index']);

// Get the Employee Info
Route::get('edit-employee/{id}', [UserController::class, 'edit']);

// Update the Employee
Route::post('update-employee/{id}', [UserController::class, 'update']);

// update status 
// Route::get('update-status/{id}', [UserController::class, 'status_update']);


Route::post('add-role', [RoleController::class, 'store']);


