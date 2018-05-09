<?php

namespace App\Http\Controllers;

use App\Course;
use App\File;
use App\Lesson;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
class LessonController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $lessons = Lesson::whereUserId(auth()->id());
        return response()->json([
            'lessons' => $lessons
        ]);
    }

    public function search(Request $request){
        $lesson_id = $request->input('lesson_id');
        $lesson = Lesson::findOrFail($lesson_id);
        return response()->json([
            'lesson' => $lesson
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

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'content' => 'required',
            'course_id' => 'required'
        ]);
        if ($validator->fails())  {
            return response()->json(['errors' => $validator->getMessageBag()->toArray()], 422);
        }

        $lesson = new Lesson();
        $lesson->content = $request->input('content');
        $lesson->name = $request->input('name');
        $course_id = $request->input('course_id');

        $user = User::findOrFail(auth()->id());
        $course = Course::findOrFail($course_id);

        if($course->user_id != auth()->id()){
            return response()->json([
                'message' => 'Unauthorized'
            ]);
        }

        $course->lessons()->save($lesson);

        if($file = $request->file('file')){
            $file = $request->file('file');
            $ext = $file->getClientOriginalExtension();
            $fileName = md5(time()). ".$ext";
            $path = $file->storePublicly('lessons');
            $file = new File();
            $file->file_name = $fileName;
            $file->file_path = $path;

            $lesson->file()->save($file);
        }

        return response()->json([
            'message' => 'Successfully created lesson!',
            'lesson' => $lesson->makeHidden('course')
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
        //
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
            'content' => 'required'
        ]);
        if ($validator->fails())  {
            return response()->json(['errors' => $validator->getMessageBag()->toArray()], 422);
        }
        $lesson = Lesson::findOrfail($id);
        $lesson->content = $request->input('content');
        $lesson->name = $request->input('name');

        if($lesson->course->user_id != auth()->id()){
            return response()->json([
                'message' => 'Unauthorized'
            ]);
        }

        $lesson->save();

        if($file = $request->file('file')){

            if($file = $lesson->file) {
                Storage::delete($file->file_path);
                $lesson->file()->delete();
            }
            $file = $request->file('file');
            $ext = $file->getClientOriginalExtension();
            $fileName = md5(time()). ".$ext";
            $path = $file->storePublicly('lessons');
            $file = new File();
            $file->file_name = $fileName;
            $file->file_path = $path;

            $lesson->file()->save($file);
        }

        return response()->json([
            'message' => 'Successfully updated lesson!',
            'lesson' => $lesson->makeHidden('course')
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
        $lesson = Lesson::findOrFail($id);
        if($lesson->course->user_id != auth()->id()){
            return response()->json([
                'message' => 'Unauthorized'
            ]);
        }
        if($lesson->file) {
            Storage::delete($lesson->file->file_path);
        }
        $lesson->file()->delete();
        $lesson->delete();
    }
}
