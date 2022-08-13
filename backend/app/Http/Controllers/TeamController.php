<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    /**
     * Get All Teams with their employees count
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $teams = Team::withCount("users")
            ->latest()
            ->whereNotIn("id", [1])
            ->get();
        return response()->json([
            "teams" => $teams,
        ]);
    }

    /**
     * Get specific team according to id
     * @param Team $team
     * @return JsonResponse
     */
    public function show(Team $team): JsonResponse
    {
        $team->users;
        return response()->json([
            "team" => $team,
        ]);
    }
}
