<?php

namespace App\Events;

use App\Group;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class GroupCreated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $group;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Group $group)
    {
        $this->group = $group;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        $channels = [];

        foreach ($this->group->users as $user) {
            array_push($channels, new PresenceChannel('users.' . $user->id));
        }

        return $channels;
    }
}
