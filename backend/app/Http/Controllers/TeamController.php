<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    public function index()
    {
        $teams = Team::with("users")
            ->get()
            ->except(["id", 1]);
        return response()->json([
            "teams" => $teams,
        ]);
    }
}
