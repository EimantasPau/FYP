<?php

namespace App\Http\Controllers;

use App\CourseType;
use Illuminate\Http\Request;

class CourseTypeController extends Controller
{
    public function index() {
        $types = CourseType::all();
        return response()->json([
            'types' => $types
        ], 200);

    }
}
