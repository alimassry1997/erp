<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;


class UserController extends Controller
{
    // save employee to db
     public function store(Request $request){
        $employee = new User;
        $employee -> first_name = $request->input('first_name');
        $employee -> last_name = $request->input('last_name');
        $employee -> email = $request->input('email');
        $employee -> phone_number = $request->input('phone_number');
        $employee -> system_role_id = $request->input('system_role_id');
        $employee-> save();

        return response()->json([
            'status' => 200,
            'message' => 'Employee Added Successfully', 
           ]);
     }




    // get employee list from db
    public function index(){
        
           $employees = User::all();
           return response()->json([
            'status' => 200,
            'employees' => $employees, 
           ]);
    }



}
