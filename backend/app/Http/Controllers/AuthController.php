<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use App\Mail\ForgetMail;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

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


    public function ForgetPassword(Request $request)
    {
        $email = $request->input("email");

        // if (User::where('email', $email)->doesntExist()) {
        //     return response([
        //         'message' => 'Email Not Found'
        //     ], 404);
        // }

        // generate Random Token

        $token = rand(10, 100000);
        try {

            DB::table('password_resets')->insert([
                'email' => $email,
                'token' => $token
            ]);


            // Mail send to user
            Mail::to($email)->send(new ForgetMail($token));
            return response([
                'message' => 'Reset Passowrd Mail send on your email'
            ], 200);
        } catch (Exception $exception) {
            return response([
                'message' => $exception->getMessage()
            ], 400);
        }
    }



    public function ResetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        $email = $request->email;
        $token = $request->token;
        $password = Hash::make($request->password);

        $emailcheck = DB::table('password_resets')->where('email', $email)->first();
        $pincheck = DB::table('password_resets')->where('token', $token)->first();


        if (!$emailcheck) {
            return response([
                'message' => 'Email Not Found'
            ], 401);
        }
        if (!$pincheck) {
            return response([
                'message' => 'Pin Code Invalid'
            ], 401);
        }

        DB::table('users')->where('email', $email)->update(['password' => $password]);
        DB::table('password_resets')->where('email', $email)->delete();
        return response([
            'message' => 'Password Changed Successfully'
        ], 200);
    }
}

/* 
public function ResetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        $email = $request -> email;
        $token = $request -> token;
        $password = Hash::make($request -> password);

        $emailcheck = DB::table('password_resets')-> where('email', $email)->first();
        $pincheck = DB::table('password_resets')-> where('token', $token)->first();


        if (!$emailcheck){
            return response([
                'message' => 'Email Not Found'
            ], 401);
        } if(!$pincheck){
            return response([
                'message' => 'Pin Code Invalid'
            ], 401);
        }
         
        DB::table('users')-> where('email', $email)->update(['password' => $password]);
        DB::table('password_resets')-> where('email', $email)->delete();
        return response([
            'message' => 'Password Changed Successfully'
        ], 200);

    }
*/