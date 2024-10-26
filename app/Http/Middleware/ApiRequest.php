<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ApiRequest
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {

        // if ($request->host() != 'localhost') {
        //     return response('', 400);
        // }

        return $next($request);
    }
}
