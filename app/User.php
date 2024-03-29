<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;
    protected $with = ['file', 'skills', 'education', 'experience'];
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'role_id', 'bio'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function skills() {
        return $this->hasMany(Skill::class);
    }

    public function education() {
        return $this->hasMany(Education::class);
    }

    public function experience() {
        return $this->hasMany(Experience::class);
    }

    public function ownedCourses() {
        return $this->hasMany(Course::class);
    }

    public function file() {
        return $this->morphOne('App\File', 'fileable');
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function groups(){
        return $this->belongsToMany('App\Group');
    }
    public function getJWTCustomClaims()
    {
        return [];
    }
}
