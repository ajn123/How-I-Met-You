<?php

namespace App\Http\Middleware;

use Closure;
use http\Client\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;

class ApiRequest
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): \Illuminate\Http\JsonResponse
    {

        Log::debug("token:" . $request->bearerToken());
        Log::debug("config token:" . config('API_TOKEN'));

        if ($request->bearerToken() && $request->bearerToken() === env('API_TOKEN')) {
            return $next($request);
        }

        return response()->json(['error' => 'Unauthorized'], 401);

    }
}
