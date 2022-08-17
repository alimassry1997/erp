<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;

class UserController extends Controller
{
    /**
     * Get all Employees
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $employees = User::latest()
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

    // edit employee
    public function edit($id): JsonResponse
    {
        $employee = User::find($id);
        if ($employee) {
            return response()->json([
                "status" => 200,
                "employee" => $employee,
            ]);
        } else {
            return response()->json([
                "status" => 404,
                "message" => "Employee Does not Exist",
            ]);
        }
    }

    public function update(Request $request, User $user): JsonResponse
    {

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

        $user->update();
        if ($user->team_id != 1) {
            return response()->json([
                "message" => "Employee Updated Successfully",
            ]);
        } else {
            return response()->json([
                "message" => "Admin Updated Successfully",
            ]);
        }

        return response()->json([
            "status" => 404,
            "message" => "User Not Found",
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
        } else if ($user->team_id == 1 && $user->system_role_id == 1) {
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
    }

    /**
     * Get all Admins
     * 
     */
    public function indexAdmin(): JsonResponse
    {
        $admins = User::latest()
            ->whereIn("system_role_id", [1])
            ->get();
        return response()->json([
            "message" => "Admins are here",
            "admins" => $admins,
        ]);
    }


    public function storeAdmin(Request $request): JsonResponse
    {
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
            $admin->password = $request->input("password");
            $admin->team_id = 1;
        }
        $admin->save();
        return response()->json([
            "message" => "Admin Added Successfully",
        ]);
    }

    // public function updateAdmin(Request $request, User $user): JsonResponse
    // {
    //     if ($user) {
    //         $user->first_name = $request->input("first_name");
    //         $user->last_name = $request->input("last_name");
    //         $user->email = $request->input("email");
    //         $user->phone_number = $request->input("phone_number");

    //         if ($request->hasFile("image")) {
    //             $path = $user->picture;
    //             if (File::exists($path)) {
    //                 File::delete($path);
    //             }
    //             $file = $request->file("image");
    //             $extension = $file->getClientOriginalExtension();
    //             $filename = time() . "." . $extension;
    //             $file->move("uploads/", $filename);
    //             $user->picture = "uploads/" . $filename;
    //         }
    //         $user->system_role_id = $request->input("system_role_id");
    //         $user->update();
    //         return response()->json([
    //             "message" => "Employee Updated Successfully",
    //         ]);
    //     }

    //     return response()->json([
    //         "status" => 404,
    //         "message" => "Employee Not Found",
    //     ]);
    // }
       //
}
