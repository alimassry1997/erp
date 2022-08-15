<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SkillController;
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
 * Public Access
 */
Route::post("/login", [AuthController::class, "login"]);

/**
 * Private Routes
 */
Route::group(["middleware" => ["auth:sanctum"]], static function () {
    /**
     * Skills Routes
     */
    Route::get("/skills", [SkillController::class, "index"]);
    Route::post("/skills", [SkillController::class, "store"]);
    Route::get("/skills/{skill}", [SkillController::class, "show"]);
    Route::put("/skills/{skill}", [SkillController::class, "update"]);
    Route::delete("/skills/{skill}", [SkillController::class, "destroy"]);

    /**
     * Teams Routes
     */
    Route::get("/teams", [TeamController::class, "index"]);
    Route::post("/teams", [TeamController::class, "store"]);
    Route::get("/teams/{team}", [TeamController::class, "show"]);
    Route::put("/teams/{team}", [TeamController::class, "update"]);
    Route::delete("/teams/{team}", [TeamController::class, "destroy"]);
    Route::get("/teams/filter/{team}", [TeamController::class, "filterByTeam"]);

    /**
     * Employees Routes
     */
    Route::get("/employees", [UserController::class, "index"]);
    Route::post("/employees", [UserController::class, "store"]);
    Route::get("/employees/{user}", [UserController::class, "edit"]);
});
