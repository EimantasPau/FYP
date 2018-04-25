<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    protected $fillable = ['institution', 'classification', 'started_on', 'finished_on', 'name'];
}