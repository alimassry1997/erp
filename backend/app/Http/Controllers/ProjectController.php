<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Team;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use JsonException;
use Carbon\Carbon;

class ProjectController extends Controller
{
    /**
     * Get All Projects
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $projects = Project::withCount("teams")
            ->orderBy("status", "ASC")
            ->latest()
            ->get();
        return response()->json([
            "projects" => $projects,
        ]);
    }

    /**
     * Create a new project record
     * @throws JsonException
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            "name" => "required|unique:projects",
        ]);
        $inputs["name"] = $request["name"];
        $inputs["slug"] = Str::slug($request["name"], "-");
        $project = Project::create($inputs);
        if ($request["teams"]) {
            $teams = json_decode(
                $request["teams"],
                false,
                512,
                JSON_THROW_ON_ERROR
            );
            $id_teams = [];
            foreach ($teams as $team) {
                $id_teams[] = $team->value;
            }
            $teams_database = Team::findOrFail($id_teams);
            $project->teams()->attach($teams_database);
        }
        return response()->json([
            "message" => "Project Added Successfully",
        ]);
    }

    /**
     * Get Single Project
     */
    public function show(Project $project): JsonResponse
    {
        return response()->json([
            "project" => $project,
            "related_teams" => $project->teams,
        ]);
    }

    /**
     * Change Status of the project
     * @param Project $project
     * @return JsonResponse
     */
    public function update_status(Project $project): JsonResponse
    {
        $project->status = !$project->status;
        if ($project->status === true) {
            $project->finished_at = Carbon::now();
            $project->save();
            return response()->json([
                "message" => "Project Deactivated",
            ]);
        }
        $project->finished_at = null;
        $project->save();
        return response()->json([
            "message" => "Project Activated",
        ]);
    }

    /**
     * Assignment for employees in project
     * @throws JsonException
     */
    public function assign_employees(
        Project $project,
        Request $request
    ): JsonResponse {
        $request->validate([
            "assignments" => ["required", "string"],
        ]);
        $count = 0;
        $assignments = json_decode(
            $request["assignments"],
            false,
            512,
            JSON_THROW_ON_ERROR
        );
        $roles = [];
        foreach ($assignments as $assignment) {
            $roles[] = $assignment->role;
        }
        $employees = [];
        foreach ($assignments as $assignment) {
            $employees[] = $assignment->user_id;
        }
        $employees_database = User::findOrFail($employees);
        $project->users()->attach($employees_database, ["role_id" => 1]);
        foreach ($employees_database as $employee) {
            foreach ($employee->projects as $proj) {
                $proj->pivot->update(["role_id" => $roles[$count]]);
                $count++;
            }
        }
        return response()->json([
            "message" => "Assignment was successful",
        ]);
    }

    /**
     * Edit a specific project
     * @param Request $request
     * @param Project $project
     * @return JsonResponse
     */
    public function update(Request $request, Project $project): JsonResponse
    {
        $request->validate([
            "name" => [
                "required",
                Rule::unique("projects")->ignore($project->id),
            ],
        ]);
        $inputs["name"] = $request["name"];
        $inputs["slug"] = Str::slug($request["name"], "-");
        $project->update($inputs);
        return response()->json([
            "message" => "Project Successfully Updated",
        ]);
    }

    /**
     * Delete a Project
     * @param Project $project
     * @return JsonResponse
     */
    public function destroy(Project $project): JsonResponse
    {
        if ($project->teams()->exists()) {
            return response()->json(
                [
                    "message" =>
                        "Project has teams, please remove all teams to delete.",
                ],
                403
            );
        }
        $project->delete();
        return response()->json([
            "message" => "Project Deleted Successfully",
        ]);
    }
}
