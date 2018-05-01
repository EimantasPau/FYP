<?php

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/


use App\Group;

Broadcast::channel('users.{id}', function ($user, $id) {
    return true;
});

Broadcast::channel('groups.{group}', function ($user, Group $group) {
    foreach($group->users as $user){
        if($user->id == $user->id)
            return true;
    }
    return true;
});

//Broadcast::channel('group.{id}', function ($user, $id) {
//    return (int) $user->id === (int) $id;
//});


