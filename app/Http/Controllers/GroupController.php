<?php

namespace App\Http\Controllers;

use App\Events\GroupCreated;
use App\Group;
use App\User;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    public function index() {
        $user_id = auth()->id();
        $userWithGroups = User::find($user_id)->groups()->with('users')->get();
//        $groups = Group::whereHas('users', function ($query) use ($user_id){
//            $query->where('user_id', $user_id);
//        });
        return response()->json([
            'groups' => $userWithGroups
        ]);
    }

    public function store(Request $request)
    {
        $user_id = $request->input('user_id');
        $userWith = User::findOrFail($user_id);
        $currentUser = User::findOrFail(auth()->id());
        $existingUserGroups = User::find($currentUser->id)->groups()->with('users')->get();
        foreach($existingUserGroups as $group){
            foreach($group->users as $user){
                if($user->id == $userWith->id){
                    return response()->json(['errors' => 'Group between users already exists'], 422);
                }
            }
        }
        $group = new Group();
        $users = [$userWith->id, $currentUser->id];
        $group->save();
        $group->users()->attach($users);

        $groupWithUsers = Group::findOrFail($group->id);
        broadcast(new GroupCreated($group));
        return response()->json([
            'group' => $groupWithUsers
        ]);
    }
}
