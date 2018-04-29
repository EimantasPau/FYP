<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    protected $with = ['file'];
    public function course() {
        return $this->belongsTo(Course::class);
    }

    public function file() {
        return $this->morphOne('App\File', 'fileable');
    }
}
