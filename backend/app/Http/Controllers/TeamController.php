<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    /**
     * Get All Teams with their respective employees
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $teams = Team::withCount("users")
            ->get()
            ->except(["id", 1]);
        return response()->json([
            "teams" => $teams,
        ]);
    }
}
