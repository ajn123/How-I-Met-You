<?php

namespace App\Http\Controllers;

use App\Enums\RolesEnum;
use App\Http\Filters\EventFilter;
use App\Http\Requests\EventRequest;
use App\Models\Event;
use Illuminate\Http\Request;

class EventsController extends Controller
{
    public function index(Request $request, EventFilter $filter)
    {
        $events = Event::query();

        $events = $filter->apply($events)->with(['tags', 'socials', 'locations'])->inFuture()->paginate(10);

        return response()->json($events);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EventRequest $request): \Illuminate\Http\JsonResponse
    {
        //        if (! $request->user() || ! $request->user()->hasPermissionTo(RolesEnum::CREATE_EVENTS)) {
        //            return response()->json(['error' => 'Unauthorized'], 401);
        //        }
        $event = Event::create($request->all());

        return response()->json([
            'data' => $event,
            'message' => 'Event created successfully',
        ], 201);
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
        if ($request->user()->id != $event->user_id) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $event->update($request->all());

        return response()->json($event);
    }

    /**
     * Delete an event.  Can only be done by the creator. and if you have the delete
     * events permission.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Request $request, Event $event)
    {
        if (! $event) {
            return response()->json(['error' => 'Event not found'], 404);
        }
        if ($request->user()->id != $event->user_id || ! $request->user()->hasPermissionTo(RolesEnum::DELETE_EVENTS)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $event->delete();

        return response()->json(null, 204);
    }
}
