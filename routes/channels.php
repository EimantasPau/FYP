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
    return (int) $user->id === (int) $id;
});

Broadcast::channel('groups.{group}', function ($user, Group $group) {
    return $group->users()->where('user_id', $user->id);
});

//Broadcast::channel('group.{id}', function ($user, $id) {
//    return (int) $user->id === (int) $id;
//});


