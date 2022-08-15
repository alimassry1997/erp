<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
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

    /**
     * Get A specific users according to their team
     * @param Team $team
     * @return JsonResponse
     */
    public function filterByTeam(Team $team): JsonResponse
    {
        return response()->json([
            "employees" => $team
                ->users()
                ->select("email", "first_name")
                ->get(),
        ]);
    }

    /**
     * Edit a specific team
     * @param Request $request
     * @param Team $team
     * @return JsonResponse
     * @throws JsonException
     */
    public function update(Request $request, Team $team): JsonResponse
    {
        $request->validate([
            "name" => ["required", Rule::unique("teams")->ignore($team->id)],
        ]);
        $inputs["name"] = $request["name"];
        $inputs["slug"] = Str::slug($request["name"], "-");
        $team->update($inputs);
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
        if ($request["removedEmployees"]) {
            $employee_to_remove = json_decode(
                $request["removedEmployees"],
                false,
                512,
                JSON_THROW_ON_ERROR
            );
            $search_for_email_and_remove = [];
            foreach ($employee_to_remove as $employee) {
                $search_for_email_and_remove[] = $employee->value;
            }
            User::whereIn("email", $search_for_email_and_remove)->update([
                "team_id" => 2,
            ]);
        }

        return response()->json([
            "message" => "Team Successfully Updated",
        ]);
    }
}
