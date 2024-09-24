<?php

namespace App\Http\Controllers;

use App\Enums\RolesEnum;
use App\Http\Requests\EventRequest;
use App\Models\Event;
use Illuminate\Http\Request;

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

    public function show($id)
    {
        $event = Event::find($id);
        if (! $event) {
            return response()->json(['error' => 'Event not found'], 404);
        }

        return response()->json($event);
    }

    public function update(Request $request, $id)
    {
        $event = Event::find($id);
        if (! $event) {
            return response()->json(['error' => 'Event not found'], 404);
        }

        $event->update($request->all());

        return response()->json($event);
    }

    public function destroy($id)
    {
        $event = Event::find($id);
        if (! $event) {
            return response()->json(['error' => 'Event not found'], 404);
        }
        $event->delete();

        return response()->json(null, 204);
    }
}
