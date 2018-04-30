<?php

namespace App\Http\Controllers;

use App\Lesson;
use App\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if($id = $request->input('lesson_id')){
            $questions = Question::whereLessonId($id)->with('user')->orderBy('created_at', 'desc')->get();
            return response()->json([
                'questions' => $questions
            ]);
        }
        return response()->json([
            'questions' => Question::all()
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
            'body' => 'required',
            'lesson_id' => 'required'
        ]);
        if ($validator->fails())  {
            return response()->json(['errors' => $validator->getMessageBag()->toArray()], 422);
        }
        $question = new Question();
        $question->body = $request->input('body');
        $question->user_id = auth()->id();

        $lesson = Lesson::findOrFail($request->input('lesson_id'));
        $lesson->questions()->save($question);


        $storedQuestion = Question::whereId($question->id)->with('user')->get();
        return response()->json([
            'message' => 'Successfully created question!',
            'question' => $storedQuestion
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
