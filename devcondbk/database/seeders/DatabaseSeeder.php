<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('units')->insert([
            'name' => 'APT 107',
            'id_owner' => '1'
        ]);
        DB::table('units')->insert([
            'name' => 'APT 98',
            'id_owner' => '1'
        ]);
        DB::table('units')->insert([
            'name' => 'APT 103',
            'id_owner' => '0'
        ]);
        DB::table('units')->insert([
            'name' => 'APT 85',
            'id_owner' => '0'
        ]);
        DB::table('areas')->insert([
            'allowed' => '1',
            'title' => 'Academia',
            'cover' => 'gym.jpg',
            'days' => '1,2,4,5',
            'start_time' => '06:00:00',
            'end_time' => '22:00:00',
        ]);
        DB::table('areas')->insert([
            'allowed' => '1',
            'title' => 'Piscina',
            'cover' => 'pool.jpg',
            'days' => '1,2,3,4,5',
            'start_time' => '08:00:00',
            'end_time' => '17:00:00',
        ]);

        DB::table('areas')->insert([
            'allowed' => '1',
            'title' => 'Churrasqueira',
            'cover' => 'barbecue.jpg',
            'days' => '4,5,6',
            'start_time' => '08:00:00',
            'end_time' => '17:00:00',
        ]);

        DB::table('walls')->insert([
           'title' =>  'Título de Aviso  de Teste',
           'body' => 'Lorem Ispum neon neon leon submit mit',
           'datecreated' => '2021-01-14 10:00:00'
        ]);

        DB::table('walls')->insert([
            'title' =>  'Aviso importante para todos',
            'body' => 'A piscina está em manutenção, amanhã volta tudo ao normal',
            'datecreated' => '2021-01-12 12:00:00'
         ]);


    }
}
