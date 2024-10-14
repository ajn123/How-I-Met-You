<?php

namespace App\Http\Controllers;

use App\Enums\RolesEnum;
use App\Http\Filters\EventFilter;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class EventsController extends Controller
{
    public function index(Request $request, EventFilter $filter)
    {
        $events = Event::query();

        $events = $filter->apply($events)->with(['tags', 'socials', 'locations'])->inFuture()->paginate(10);

        return response()->json($events);
    }

    public function uploadImage(Request $request)
    {
        $path = $request->file('image')->store('events', 's3');
        Log::debug('image uploaded to: '.Storage::disk('s3')->url($path));

        return response()->json(['url' => Storage::disk('s3')->url($path)], 201);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): \Illuminate\Http\JsonResponse
    {

        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'date' => ['required', 'date'],
            'url' => ['sometimes', 'url'],
            'image_url' => ['sometimes', 'string']], );

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->validate()], 422);
        }

        //        if (! $request->user() || ! $request->user()->hasPermissionTo(RolesEnum::CREATE_EVENTS)) {
        //            return response()->json(['error' => 'Unauthorized'], 401);
        //        }

        if ($request->get('image_url')) {
            $urlName = rand(1, 100000).'/500/300final.jpg';
            Storage::put($urlName, ($request->get('image_url')));
            $request->merge(['image_url' => $urlName]);
        }

        $request->merge(['enabled' => false]);
        $event = Event::query()->create($request->all());

        //Log::debug('Event created: ' . $event->toJson());
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
