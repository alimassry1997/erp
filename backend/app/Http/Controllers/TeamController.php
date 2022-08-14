<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use JsonException;
use Illuminate\Support\Str;

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

    /**
     * Create a new team record and assign employees to it if you want
     * @throws JsonException
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            "name" => "required|unique:teams",
        ]);
        $inputs["name"] = $request["name"];
        $inputs["slug"] = Str::slug($request["name"], "-");
        $team = Team::create($inputs);
        if ($request["employees"]) {
            $employees = json_decode(
                $request["employees"],
                false,
                512,
                JSON_THROW_ON_ERROR
            );
            $emails_of_employees = [];
            foreach ($employees as $employee) {
                $emails_of_employees[] = $employee->value;
            }
            User::whereIn("email", $emails_of_employees)->update([
                "team_id" => $team->id,
            ]);
        }
        return response()->json([
            "message" => "Team Added Successfully",
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
