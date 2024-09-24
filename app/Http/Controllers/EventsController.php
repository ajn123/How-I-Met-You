<?php

namespace App\Http\Controllers;

use App\Enums\RolesEnum;
use App\Http\Requests\EventRequest;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EventsController extends Controller
{
    public function index()
    {
        $events = Event::all();

        return response()->json($events);
    }

    public function store(EventRequest $request): \Illuminate\Http\JsonResponse
    {
        if (! $request->user() || ! $request->user()->hasPermissionTo(RolesEnum::CREATE_EVENTS)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $event = $request->user()->events()->create($request->all());

        return response()->json($event, 201);
    }

    public function show(Event $event)
    {
        if (! $event) {
            return response()->json(['error' => 'Event not found'], 404);
        }

        return response()->json($event);
    }

    public function update(Request $request, Event $event)
    {
        if (! $event) {
            return response()->json(['error' => 'Event not found'], 404);
        }

        $event->update($request->all());

        return response()->json($event);
    }

    public function destroy(Request $request, Event $event)
    {
        if (! $event) {
            return response()->json(['error' => 'Event not found'], 404);
        }
        if ( $request->user()->id != $event->user_id || ! $request->user()->hasPermissionTo(RolesEnum::DELETE_EVENTS)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $event->delete();

        return response()->json(null, 204);
    }
}
