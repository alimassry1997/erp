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
        $employee -> picture = $request->input('picture');
        $employee-> save();


        // $request->validate([
        //     'first_name' => 'required',
        //     'last_name' => 'required',
        //     'email' => 'required',
        //     'phone_number' => 'required|integer',
        //     'system_role_id' => 'required',
        //     'picture' => 'required|mimes:jpg,png,jpeg|max:5048',
        // ]);

    //    if($request->hasFile('picture')){
    //     $employee['picture']= $request->file('picture') -> store('upassets', 'public');
    //    }

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

public function edit($id){
    $employee = User::find($id);
    if($employee){

    
    return response()->json([
        'status' => 200,
        'employee' => $employee ,
       ]);
    } else{
        return response()->json([
            'status' => 404,
            'message' => 'Employee Does not Exist',
           ]);
    }
}
}
