<?php

namespace App\Http\Controllers;

use App\Course;
use App\CourseTags;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }


    public function search(Request $request) {
        $course = Course::findOrFail($request->input('course_id'));
        return response()->json([
            'course' => $course
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $messages = [
            'type_id.required' => "Please select course type."
        ];
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
            'type_id' => 'required'
        ], $messages);
        if ($validator->fails())  {
            return response()->json(['errors' => $validator->getMessageBag()->toArray()], 422);
        }

        $course = new Course();
        $course->name = $request->input('name');
        $course->description = $request->input('description');
        $course->type_id = $request->input('type_id');

        $user = User::findOrFail(auth()->id());
        $user->ownedCourses()->save($course);

        if($request->has('tags')){
            $tags = $request->input('tags');
            for($i = 0; $i< count($tags); $i++){
                $tag = new CourseTags();
                $tag->name = $tags[$i];
                $tag->course_id = $course->id;
                $course->tags()->save($tag);
            }
        }


        $courseWithRelations = Course::findOrFail($course->id);

        return response()->json([
            'message' => 'Successfully created course!',
            'course' => $courseWithRelations
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
        ]);
        if ($validator->fails())  {
            return response()->json(['errors' => $validator->getMessageBag()->toArray()], 422);
        }

        $course = Course::findOrFail($id);
        $course->name = $request->input('name');
        $course->description = $request->input('description');
        $course->type_id = $request->input('type_id');

        if($request->has('status_id')){
            $course->status_id = $request->input('status_id');
        }

        $user = User::findOrFail(auth()->id());
        $user->ownedCourses()->save($course);

        if($request->has('tags')){
            CourseTags::whereCourseId($course->id)->delete();
            $tags = $request->input('tags');
            for($i = 0; $i< count($tags); $i++){
                $tag = new CourseTags();
                $tag->name = $tags[$i];
                $tag->course_id = $course->id;
                $course->tags()->save($tag);
            }
        }

        $courseWithRelations = Course::findOrFail($course->id);

        return response()->json([
            'message' => 'Successfully created course!',
            'course' => $courseWithRelations
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $course = Course::findOrFail($id);
        if($course->user_id == auth()->id()){
            $course->delete();
        }
    }
}
