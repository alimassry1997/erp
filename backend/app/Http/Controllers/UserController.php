<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /** 
     * Get all Employees
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $employees = User::orderBy("status", "desc")->latest()
            ->whereNotIn("team_id", [1])
            ->get();
        return response()->json([
            "employees" => $employees,
        ]);
    }

    // save employee to db
    public function store(Request $request): JsonResponse
    {
        $employee = new User();
        $employee->first_name = $request->input("first_name");
        $employee->last_name = $request->input("last_name");
        $employee->email = $request->input("email");
        $employee->phone_number = $request->input("phone_number");

        // 'image' => 'required|image|mimes:jpeg,png,jpg|max:2048'
        if ($request->hasFile("image")) {
            $file = $request->file("image");
            $extension = $file->getClientOriginalExtension();
            $filename = time() . "." . $extension;
            $file->move("uploads/", $filename);
            $employee->picture = "uploads/" . $filename;
        }
        $employee->system_role_id = $request->input("system_role_id");
        if ($employee->system_role_id === "2") {
            $employee->team_id = 2;
        }
        $employee->save();
        return response()->json([
            "message" => "Employee Added Successfully",
        ]);
    }

    /**
     * Get specific user according to id
     * @param User $user
     * @return JsonResponse
     */
    public function show(User $user): JsonResponse
    {
        return response()->json([
            "team" => $user->team->users->count(),
            "user" => $user,
            
        ]);
    }

    // edit employee
    public function edit($id): JsonResponse
    {
        $employee = User::find($id);
        if ($employee) {
            return response()->json([
                "status" => 200,
                "employee" => $employee,
            ]);
        }

        return response()->json([
            "status" => 404,
            "message" => "Employee Does not Exist",
        ]);
    }

    public function update(Request $request, User $user): JsonResponse
    {
        $validator = Validator::make($request->all(), [

            "email" => "required|email",
            "password_confirmation" => "required|same:password",
        ]);
        $user->first_name = $request->input("first_name");
        $user->last_name = $request->input("last_name");
        $user->email = $request->input("email");
        $user->phone_number = $request->input("phone_number");

        if ($request->hasFile("image")) {
            $path = $user->picture;
            if (File::exists($path)) {
                File::delete($path);
            }
            $file = $request->file("image");
            $extension = $file->getClientOriginalExtension();
            $filename = time() . "." . $extension;
            $file->move("uploads/", $filename);
            $user->picture = "uploads/" . $filename;
        }

        if ($user->team_id != 1) {
            $user->update();
            return response()->json([
                "message" => "Employee Updated Successfully",
            ]);
        }

        if ($request->input("password")) {
            $user->password = Hash::make($request->input("password"));
        }

        if ($validator->fails()) {
            return response()->json(
                [
                    "message" => $validator,
                ],
                403
            );
        }

        $user->update();
        return response()->json([
            "message" => "Admin Updated Successfully",
        ]);
    }

    public function update_status(User $user): JsonResponse
    {
        if ($user->team_id !== 1) {
            $user->status = !$user->status;
            $user->save();
            if ($user->status === true) {
                return response()->json([
                    "message" => "Employee Activated",
                ]);
            }
            return response()->json([
                "message" => "Employee Deactivated",
            ]);
        }

        if ($user->team_id == 1 && $user->system_role_id == 1) {
            $user->status = !$user->status;
            $user->save();
            if ($user->status === true) {
                return response()->json([
                    "message" => "Admin Activated",
                ]);
            }
            return response()->json([
                "message" => "Admin Deactivated",
            ]);
        }
        return response()->json(
            [
                "message" => "Error Occurred",
            ],
            400
        );
    }

    /**
     * Get all Admins
     *
     */
    public function indexAdmin(): JsonResponse
    {
        $admins = User::orderBy("status", "desc")->latest()
            ->whereIn("system_role_id", [1])

            ->get();
        return response()->json([
            "message" => "Admins are here",
            "admins" => $admins,
        ]);
    }

    public function storeAdmin(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [

            "email" => "required|email",
            "password_confirmation" => "required|same:password",
        ]);
        $admin = new User();
        $admin->first_name = $request->input("first_name");
        $admin->last_name = $request->input("last_name");
        $admin->email = $request->input("email");
        $admin->phone_number = $request->input("phone_number");

        if ($request->hasFile("image")) {
            $file = $request->file("image");
            $extension = $file->getClientOriginalExtension();
            $filename = time() . "." . $extension;
            $file->move("uploads/", $filename);
            $admin->picture = "uploads/" . $filename;
        }
        $admin->system_role_id = $request->input("system_role_id");

        if ($admin->system_role_id === "1") {
            $admin->password = Hash::make($request->input("password"));
            $admin->team_id = 1;
        }

        if ($validator->fails()) {
            return response()->json(
                [
                    "message" => $validator,
                ],
                403
            );
        }
        $admin->save();
        return response()->json([
            "message" => "Admin Updated Successfully",
        ]);
    }
}
