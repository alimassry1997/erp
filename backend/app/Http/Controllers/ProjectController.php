<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class ProjectController extends Controller
{
    /**
     * Get All Projects
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $projects = Project::latest()
            ->orderBy("status", "ASC")
            ->get();
        return response()->json([
            "projects" => $projects,
        ]);
    }

    /**
     * Create a new project record
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            "name" => "required|unique:projects",
        ]);
        $inputs["name"] = $request["name"];
        $inputs["slug"] = Str::slug($request["name"], "-");
        Project::create($inputs);
        return response()->json([
            "message" => "Project Added Successfully",
        ]);
    }

    /**
     * Get Single Project
     */
    public function show(Project $project): Project
    {
        return $project;
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
