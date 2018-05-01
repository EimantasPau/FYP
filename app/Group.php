<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    protected $fillable = ['name'];
    protected $with = ['users', 'conversations'];

    public function users() {
        return $this->belongsToMany(User::class);
    }
    public function conversations() {
        return $this->hasMany(Conversation::class);
    }
}
