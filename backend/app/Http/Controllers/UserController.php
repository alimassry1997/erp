<?php

namespace App\Http\Controllers;

use App\Models\User;


class UserController extends Controller
{
    // get employee list from db
    public function index(){
        
           $employees = User::all();
           return response()->json([
            'status' => 200,
            'employees' => $employees, 
           ]);
    }
}
