<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        //        $credentials = $request->validate([
        //            "email" => ["required", "email"],
        //            "password" => ["required"],
        //        ]);
        if (!Auth::attempt($request->only("email", "password"))) {
            return response()->json(
                [
                    "message" => "Invalid login details",
                ],
                401
            );
        }
        $user = User::where("email", $request["email"])
            ->where("system_role_id", "=", 3)
            ->orWhere("system_role_id", "=", 2)
            ->firstOrFail();
        $token = $user->createToken("auth_token")->plainTextToken;
        return response()->json([
            "user" => $user,
            "access_token" => $token,
            "token_type" => "Bearer",
        ]);
    }
}
