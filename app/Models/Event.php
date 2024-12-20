<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Event extends Model
{
    use HasFactory;

    const PAGINATION_SIZE = 10;

    protected $fillable = [
        'name',
        'description',
        'date',
        'user_id',
        'url',
        'enabled',
        'image_url',
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

    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function locations()
    {
        return $this->belongsToMany(Location::class);
    }

    public function socials()
    {
        return $this->hasMany(Social::class);
    }

    public function scopeSearchTags($query, ...$tags): \Illuminate\Support\Collection
    {
        return Tag::with('events')
            ->whereIn('name', $tags)
            ->get()
            ->pluck('events')
            ->flatten()
            ->unique('id');
    }

    public function scopeInFuture(Builder $query): Builder
    {
        return $query->where('date', '>=', now()->toDateString())->orderBy('date');
    }

    public function scopeEnabled(Builder $query): Builder
    {
        return $query->where('enabled', true);
    }
}
