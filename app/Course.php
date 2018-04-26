<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = ['name', 'description', 'type_id'];
    protected $with = ['tags', 'type', 'status'];

    public function tags() {
        return $this->hasMany(CourseTags::class);
    }
    public function type() {
        return $this->belongsTo(CourseType::class);
    }

    public function status() {
        return $this->belongsTo(CourseStatus::class);
    }
}
