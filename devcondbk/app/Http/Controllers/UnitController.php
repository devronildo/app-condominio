<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Models\Unit;
use App\Models\UnitPeople;
use App\Models\UnitVehicle;
use App\Models\UnitPet;


class UnitController extends Controller
{
     public function getInfo($id){
          $array = ['error' => ''];

             $unit = Unit::find($id);

              if($unit){
                $people = UnitPeople::where('id_unit', $id)->get();
                $vehicles = UnitVehicle::where('id_unit', $id)->get();
                $pets = UnitPet::where('id_unit', $id)->get();

                foreach($people as $pKey => $pValue){
                    $people[$pKey]['birthdate'] = date('d/m/Y', strtotime($pValue['birthdate']));
                }

                 $array['people'] = $people;
                 $array['vehicles'] = $vehicles;
                 $array['pets'] = $pets;

              }else{
                   $array['error'] = 'Propriedade inexistente';
                   return $array;
              }


          return $array;
     }

     public function addPerson($id, Request $request){
        $array = ['error' => ''];

         $validator = Validator::make($request->all(), [
              'name' => 'required',
              'birthdate' => 'required|date'
         ]);

         if(!$validator->fails()){
              $name = $request->input('name');
              $birthdate = $request->input('birthdate');

              $newPerson = new UnitPeople();
              $newPerson->id_unit = $id;
              $newPerson->name = $name;
              $newPerson->birthdate = $birthdate;
              $newPerson->save();

         }else{
             $array['error'] = $validator->errors()->first();
             return $array;
         }




        return $array;
     }

     public function addVehicle($id, Request $request){
        $array = ['error' => ''];

         $validator = Validator::make($request->all(), [
              'title' => 'required',
              'color' => 'required',
              'plate' => 'required'
         ]);

         if(!$validator->fails()){
              $title = $request->input('title');
              $color = $request->input('color');
              $plate = $request->input('plate');

              $newVehicle = new UnitVehicle();
              $newVehicle->id_unit = $id;
              $newVehicle->title = $title;
              $newVehicle->color = $color;
              $newVehicle->plate = $plate;
              $newVehicle->save();

         }else{
             $array['error'] = $validator->errors()->first();
             return $array;
         }


        return $array;
     }

     public function addPet($id, Request $request){
        $array = ['error' => ''];

         $validator = Validator::make($request->all(), [
              'name' => 'required',
              'race' => 'required',
         ]);

         if(!$validator->fails()){
              $name = $request->input('name');
              $race = $request->input('race');

              $newPet = new unitPet();
              $newPet->id_unit = $id;
              $newPet->name = $name;
              $newPet->race = $race;
              $newPet->save();

         }else{
             $array['error'] = $validator->errors()->first();
             return $array;
         }


        return $array;
     }

     public function removePerson($id, Request $request){
        $array = ['error' => ''];

          $idItem = $request->input('id');

           if($idItem){
              UnitPeople::where('id', $idItem)
               ->where('id_unit', $id)
               ->delete();

           }else{
              $array['error'] = 'ID inexistente';
           }



        return $array;
     }

     public function removeVehicle($id, Request $request){
        $array = ['error' => ''];

          $idItem = $request->input('id');

           if($idItem){
              UnitVehicle::where('id', $idItem)
               ->where('id_unit', $id)
               ->delete();

           }else{
              $array['error'] = 'ID inexistente';
           }



        return $array;
     }


     public function removePet($id, Request $request){
        $array = ['error' => ''];

          $idItem = $request->input('id');

           if($idItem){
              UnitPet::where('id', $idItem)
               ->where('id_unit', $id)
               ->delete();

           }else{
              $array['error'] = 'ID inexistente';
           }



        return $array;
     }


}
