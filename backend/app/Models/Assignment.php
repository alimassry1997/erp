<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Assignment extends Model
{
    /**
     * Get the role that belongs to this assignment.
     */
    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }
}
