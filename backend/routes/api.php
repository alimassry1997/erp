<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoleController;
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
     * Roles Routes
     */
    Route::get("/roles", [RoleController::class, "index"]);
    Route::post("/roles", [RoleController::class, "store"]);
    Route::get("/roles/{role}", [RoleController::class, "show"]);
    Route::put("/roles/{role}", [RoleController::class, "update"]);
    Route::delete("/roles/{role}", [RoleController::class, "destroy"]);

    /**
     * Projects Routes
     */
    Route::get("/projects", [ProjectController::class, "index"]);
    Route::post("/projects", [ProjectController::class, "store"]);
    Route::post("/projects/assignments/{project}", [
        ProjectController::class,
        "assign_employees",
    ]);
    Route::put("/projects/{project}/status", [
        ProjectController::class,
        "update_status",
    ]);
    Route::get("/projects/filter/{project}", [
        ProjectController::class,
        "filterByProject",
    ]);
    Route::get("/projects/{project}", [ProjectController::class, "show"]);
    Route::put("/projects/{project}", [ProjectController::class, "update"]);
    Route::delete("/projects/{project}", [ProjectController::class, "destroy"]);

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
    Route::post("/employees/skills/{employee}", [
        UserController::class,
        "store_skills",
    ]);
    Route::get("/employees/skills/{employee}", [
        UserController::class,
        "read_skills",
    ]);
    Route::get("/employees/{user}", [UserController::class, "show"]);
    Route::get("edit-employee/{id}", [UserController::class, "edit"]);
    Route::put("/user/{user}", [UserController::class, "update"]);
    Route::put("/user/{user}/status", [UserController::class, "update_status"]);

    /**
     * Admins Routes
     */
    Route::get("/admins", [UserController::class, "indexAdmin"]);
    Route::post("/admins", [UserController::class, "storeAdmin"]);
});
