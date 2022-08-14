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
            ->whereNotIn("id", [1, 2])
            ->get();
        return response()->json([
            "teams" => $teams,
        ]);
    }

    public function store(Request $request)
    {
        dump($request);
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

    public function filterByTeam(Team $team): JsonResponse
    {
        return response()->json([
            "employees" => $team
                ->users()
                ->select("email", "first_name")
                ->get(),
        ]);
    }
}
