<?php

namespace App\Http\Controllers;

use App\Experience;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ExperienceController extends Controller
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
            'description' => 'required',
            'started_on' => 'required|date'
        ], $messages);
        if ($validator->fails())  {
            return response()->json(['errors' => $validator->getMessageBag()->toArray()], 422);
        }

        $experience = new Experience();
        $experience->institution = $request->input('institution');
        $experience->description = $request->input('description');
        $experience->name = $request->input('name');
        $experience->started_on = $request->input('started_on');

        if($request->has('finished_on')){
            $experience->finished_on = $request->input('finished_on');
        }

        $user = User::findOrFail(auth()->id());
        $user->experience()->save($experience);

        return response()->json([
            'message' => 'Successfully created experience!',
            'experience' => $experience
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
        $messages = [
            'started_on.required' => "The starting date is required."
        ];
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'institution' => 'required',
            'description' => 'required',
            'started_on' => 'required|date'
        ], $messages);
        if ($validator->fails())  {
            return response()->json(['errors' => $validator->getMessageBag()->toArray()], 422);
        }

        $experience =  Experience::findOrFail($id);
        $experience->institution = $request->input('institution');
        $experience->description = $request->input('description');
        $experience->name = $request->input('name');
        $experience->started_on = $request->input('started_on');

        if($request->has('finished_on')){
            $experience->finished_on = $request->input('finished_on');
        }

        $user = User::findOrFail(auth()->id());
        $user->experience()->save($experience);

        return response()->json([
            'message' => 'Successfully updated experience!',
            'experience' => $experience
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
        $experience = Experience::findOrFail($id);
        if($experience->user_id == auth()->id()){
            $experience->delete();
        }
    }
}
