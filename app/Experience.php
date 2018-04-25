<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $fillable = ['description', 'classification', 'started_on', 'finished_on', 'name'];
}
