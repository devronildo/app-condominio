<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;


class UserController extends Controller
{
     public function update(Request $request){
           $array = ['error' => ''];

           $user = auth()->user();

            $rules = [
               'name' => 'min:2',
               'email' => 'email|unique:users,email',
               'cpf' => 'digits:11|unique:users,cpf',
               'password' => 'same:password_confirm',
               'password_confirm' => 'same:password'
            ];

            $validator = Validator::make($request->all(), $rules);

            if($validator->fails()){
                 $array['error'] = $validator->messages();
                 return $array;
            }

             $name = $request->input('name');
             $email = $request->input('email');
             $cpf = $request->input('cpf');
             $password = $request->input('password');
             $password_confirm = $request->input('password_confirm');

             $user = User::find($user->id);

             if($name){
                $user->name = $name;
             }

             if($email){
                $user->email = $email;
             }

             if($cpf){
                $user->cpf = $cpf;
             }

             if($password){
                $user->password = password_hash($password, PASSWORD_DEFAULT);
             }


             $user->save();

           return $array;
     }

     public function getMyUser(){
          $array =  ['error' => ''];

           $user = auth()->user();

           $info = User::find($user->id);

           $array[] = $info;


          return $array;
     }
}
