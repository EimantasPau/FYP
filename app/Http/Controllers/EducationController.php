<?php

namespace App\Http\Controllers;

use App\Education;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
class EducationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
//        $education = Education::whereUserId(auth()->id());
        $education = Education::where('user_id', auth()->id())->get();
        return response()->json([
            'education' => $education
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
            'started_on.required' => "The starting date is required."
        ];
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'institution' => 'required',
            'classification' => 'required',
            'started_on' => 'required|date'
        ], $messages);
        if ($validator->fails())  {
            return response()->json(['errors' => $validator->getMessageBag()->toArray()], 422);
        }

        $education = new Education();
        $education->institution = $request->input('institution');
        $education->classification = $request->input('classification');
        $education->name = $request->input('name');
        $education->started_on = $request->input('started_on');

        if($request->has('finished_on')){
            $education->finished_on = $request->input('finished_on');
        }

        $user = User::findOrFail(auth()->id());
        $user->education()->save($education);

        return response()->json([
            'message' => 'Successfully created education!',
            'education' => $education
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
            'institution' => 'required',
            'classification' => 'required',
            'name' => 'required',
            'started_on' => 'required|date'
        ]);
        if ($validator->fails())  {
            return response()->json(['errors' => $validator->getMessageBag()->toArray()], 422);
        }
        $education = Education::findOrFail($id);
        $education->institution = $request->input('institution');
        $education->name = $request->input('name');
        $education->classification = $request->input('classification');
        $education->started_on = $request->input('started_on');

        if($request->has('finished_on')){
            $education->finished_on = $request->input('finished_on');
        }

        $user = User::findOrFail(auth()->id());
        $user->education()->save($education);

        return response()->json([
            'message' => 'Successfully updated education!',
            'education' => $education
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
        $education = Education::findOrFail($id);
        if($education->user_id == auth()->id()){
            $education->delete();
        }
    }
}
