<?php

use Illuminate\Database\Seeder;

class CourseStatusesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('course_statuses')->insert([
            'name' => "Unpublished",
        ]);
        DB::table('course_statuses')->insert([
            'name' => 'Published',
        ]);
    }
}
