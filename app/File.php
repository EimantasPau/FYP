<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected $fillable = ['file_name', 'file_path'];
    public function fileable() {
        return $this->morphTo();
    }

}
