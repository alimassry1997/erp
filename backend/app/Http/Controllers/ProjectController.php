<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Role;
use App\Models\Team;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use JsonException;

class ProjectController extends Controller
{
    /**
     * Get All Projects
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $projects = Project::withCount("teams")
            ->latest()
            ->orderBy("status", "ASC")
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
        $roles_database = Role::findOrFail($roles);
        $project->assignments()->attach($employees_database);
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
        $project->delete();
        return response()->json([
            "message" => "Project Deleted Successfully",
        ]);
    }
}
