<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{
    use HasFactory;
    protected $fillable = ["name", "slug"];

    /**
     * Get the users for role.
     */
    public function users(): BelongsToMany
    {
        return $this->BelongsToMany(User::class, "assignments")
            ->withPivot("project_id", "end_date")
            ->withTimestamps();
    }

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName(): string
    {
        return "slug";
    }
}
