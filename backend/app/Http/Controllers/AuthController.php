<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
	public function login(Request $request): \Illuminate\Http\JsonResponse
	{
		$credentials = $request->validate([
			"email" => ["required", "email"],
			"password" => ["required"],
		]);
		if (!Auth::attempt($credentials)) {
			return response()->json(
				[
					"message" => "Invalid login details",
				],
				401
			);
		}
		$user = User::where("email", $request["email"])->firstOrFail();
		$token = $user->createToken("auth_token")->plainTextToken;
		return response()->json([
			"user" => $user,
			"access_token" => $token,
		]);
	}
}
