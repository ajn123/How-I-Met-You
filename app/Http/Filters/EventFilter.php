<?php

namespace App\Http\Filters;

use App\Models\Event;
use Illuminate\Database\Eloquent\Builder;

class EventFilter extends QueryFilter
{

    public function tags($value): Builder
    {
        return $this->builder->whereHas("tags", function ($q) use ($value) {
            $q->whereIn("name", explode(',', $value));
        });
    }

    public function searchName($value)
    {
        return $this->builder->where("name", "like", "%{$value}%");
    }

}
