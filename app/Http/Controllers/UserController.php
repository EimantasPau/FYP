<?php

namespace App\Http\Controllers;

use App\File;
use App\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;


class UserController extends Controller
{

    public function index() {
        $users = User::with(['ownedCourses' => function($query){
            $query->where('status_id', 2);
        }])->where('isPublic', 1)->get();
        return response()->json([
            'tutors' => $users
        ],200);
    }

    public function signup(Request $request) {
        $messages = [
            'name.required' => "Please let us know your name.",
            'email.required' => "Your email address is needed.",
            'password.required' => "You should choose a password",
            'bio.required' => "Please tell us a little about yourself."
        ];
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'bio' => 'required',
            'password' => 'required'
        ],$messages);
        if ($validator->fails())  {
            return response()->json(["errors" => $validator->getMessageBag()->toArray()], 422);
        }

        $user = new User([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'role_id' => 1,
            'bio' => $request->input('bio'),
            'password' => bcrypt($request->input('password')),
        ]);

        $user->save();

        return response()->json([
            'message' => 'Successfully created user!',
            'user' => $user
        ],201);
    }

    public function signin(Request $request) {

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);
        if ($validator->fails())  {
            return response()->json(['errors' => $validator->getMessageBag()->toArray()], 422);
        }

        $credentials = $request->only('email', 'password');
        if(!$token = auth()->attempt($credentials)){
            return response()->json([
                'errors' => [
                    'invalid' => ['Invalid credentials!']
                ]
            ], 422)
                ;}

        return $this->respondWithToken($token);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'user' => auth()->user(),
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ], 200);
    }

    public function user() {
        $user = User::where('id',auth()->id())->with('ownedCourses')->get()->first();
        return response()->json([
            'user' => $user
        ]);
    }

    public function update(Request $request) {

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'bio' => 'required',
            'isPublic' => 'required'
        ]);

        if ($validator->fails())  {
            return response()->json(["errors" => $validator->getMessageBag()->toArray()], 422);
        }

        $userID = auth()->id();
        $user =User::findOrFail($userID);
        $user->name =  $request->input('name');
        $user->email = $request->input('email');
        $user->bio = $request->input('bio');
        $user->isPublic = $request->input('isPublic');
        $user->save();

        if($request->file('profile_image')){
            if($user->file) {
                Storage::delete($user->file->file_path);
                File::destroy($user->file->id);
            }
            $file = $request->file('profile_image');
            $ext = $file->getClientOriginalExtension();
            $fileName = md5(time()). ".$ext";
            $path = $file->storePublicly('avatars');
            $file = new File();
            $file->file_name = $fileName;
            $file->file_path = $path;

            $user->file()->save($file);
        }

        $user = User::findOrFail($userID);

        return response()->json([
            'message' => 'Successfully updated user!',
            'user' => $user
        ],200);
    }
}
