<?php

namespace App\Http\Filters;

use App\Models\Event;
use Illuminate\Database\Eloquent\Builder;

class EventFilter extends QueryFilter
{

    public function tags(Builder $builder, $value): Builder
    {
        return $builder->whereHas("tags", function ($q) use ($value) {
            $q->whereIn("name", explode(',', $value));
        });
    }

}
