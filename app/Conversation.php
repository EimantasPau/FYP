<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    protected $fillable = ['group_id', 'user_id', 'message'];

    public function user() {
        return $this->belongsTo(User::class);
    }

}
