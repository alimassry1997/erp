<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Login Process that checks for email and password and returns $user and their token
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            "email" => ["required", "email"],
            "password" => ["required"],
        ]);
        $check_if_active = array_merge($credentials, ["status" => "1"]);
        if (!Auth::attempt($check_if_active)) {
            return response()->json(
                [
                    "message" => "Invalid login details",
                ],
                401
            );
        }
        $user = Auth::user();
        $token = $user->createToken("auth_token")->plainTextToken;
        return response()->json([
            "user" => $user->only([
                "first_name",
                "picture",
                "system_role_id",
                "email",
            ]),
            "access_token" => $token,
        ]);
    }
}
