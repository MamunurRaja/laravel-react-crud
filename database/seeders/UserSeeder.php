<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Mamunur Rahman Raja',
            'email' => 'raja.mamunur@gmail.com',
            'password' => Hash::make('12345678'),
           ]); 

        DB::table('users')->insert([
            'name' => 'Saalif Raja',
            'email' => 'raja.mamunur@yahoo.com',
            'password' => Hash::make('12345678'),
           ]); 

        DB::table('users')->insert([
            'name' => 'Shamia Lumpa',
            'email' => 'raja.mamunur@hotmail.com',
            'password' => Hash::make('12345678'),
           ]); 
    }
}
