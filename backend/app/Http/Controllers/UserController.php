<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;



class UserController extends Controller
{
    // save employee to db
     public function store(Request $request){
            $employee = new User;
            $employee -> first_name = $request->input('first_name');
            $employee -> last_name = $request->input('last_name');
            $employee -> email = $request->input('email');
            $employee -> phone_number = $request->input('phone_number');

             if($request-> hasFile('image')){
                $file = $request ->file('image');
                $extension = $file -> getClientOriginalExtension();
                $filename= time() .'.'.$extension;
                $file->move('uploads/',$filename);
                $employee->picture = 'uploads/'.$filename;
             }
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


    // edit employee
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
