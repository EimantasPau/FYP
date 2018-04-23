<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();
        for($i = 0; $i<10; $i++){
            DB::table('users')->insert([
                'name' => $faker->name(),
                'email' => $faker->email(),
                'role_id' => '1',
                'bio' => $faker->paragraph(6),
                'password' => '',
                'created_at' => $faker->dateTimeBetween('-6 month', '6 month'),
            ]);
        }
    }
}
