<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'date',
        'user_id',
    ];

    protected $casts = [
        'date' => 'datetime',
    ];

    /**
     * The user that owns the event
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
