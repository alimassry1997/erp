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
            "status" => 404,
            "message" => "Employee Does not Exist",
        ]);
    }



}



public function update(Request $request, $id){
    $employee = User::find($id);
    if($employee){


    $employee -> first_name = $request->input('first_name');
    $employee -> last_name = $request->input('last_name');
    $employee -> email = $request->input('email');
    $employee -> phone_number = $request->input('phone_number');

     if($request-> hasFile('image')){
        $path = $employee->picture;
        if(File::exists($path))
        {
           File::delete($path);
        }
        $file = $request ->file('image');
        $extension = $file -> getClientOriginalExtension();
        $filename= time() .'.'.$extension;
        $file->move('uploads/',$filename);
        $employee->picture = 'uploads/'.$filename;
     }
    $employee -> system_role_id = $request->input('system_role_id');
    $employee-> update();
    return response()->json([
        'status' => 200,
        'message' => 'Employee Updated Successfully',
       ]);
    } else{
        return response()->json([
            'status' => 404,
            'message' => 'Employee Not Found',
           ]);
    }
}

// public function status_update($id) {

//     $emp_status = User::find($id)->select('status');
//       if($emp_status === 1){
//         $status = 0;
//       } else {
//         $status = 1;
//       }

//       $value = array('status' => $status);
//       $emp_status -> update()->where('id', $id);
//       return response()->json([
//         'status' => 200,
//         'message' => 'Status Updated Successfully',
//        ]);
// }


}
