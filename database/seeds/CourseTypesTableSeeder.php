<?php

use Illuminate\Database\Seeder;

class CourseTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('course_types')->insert([
            'name' => 'Video',
        ]);
        DB::table('course_types')->insert([
            'name' => 'Text',
        ]);
        DB::table('course_types')->insert([
            'name' => 'Live',
        ]);
    }
}
