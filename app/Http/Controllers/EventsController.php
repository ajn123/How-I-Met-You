<?php

namespace App\Http\Controllers;

use App\Enums\RolesEnum;
use App\Http\Filters\EventFilter;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

/**
 * @OA\Info(title="Event API", version="1.0")
 * @OA\SecurityScheme(
 *     securityScheme="bearerAuth",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT"
 * )
 */
class EventsController extends Controller
{
    /**
     * @OA\Get(
     *     path="api/events",
     *     summary="Get all events",
     *     @OA\Response(response=200, description="List of events")
     * )
     */
    public function index(Request $request, EventFilter $filter)
    {
        $events = Event::query();

        $events = $filter->apply($events)->with(['tags', 'socials', 'locations'])->inFuture()->paginate(Event::PAGINATION_SIZE);

        return response()->json($events);
    }

    public function uploadImage(Request $request)
    {
        $path = $request->file('image')->store('events', 's3');
        Log::debug('image uploaded to: ' . Storage::disk('s3')->url($path));

        return response()->json(['url' => Storage::disk('s3')->url($path)], 201);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @OA\Post(
     *     path="api/events",
     *     summary="Create a new event",
     *     @OA\Response(response=201, description="Event created successfully")
     * )
     */
    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'date' => ['required', 'date'],
            'url' => ['sometimes', 'url'],
            'location' => ['sometimes', 'string', 'max:255'],
            'image_url' => ['sometimes', 'string'],
        ],);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->validate()], 422);
        }

        //        if (! $request->user() || ! $request->user()->hasPermissionTo(RolesEnum::CREATE_EVENTS)) {
        //            return response()->json(['error' => 'Unauthorized'], 401);
        //        }

        if ($request->get('image_url') && ! str_starts_with($request->get('image_url'), 'https://')) {
            $image_url = Storage::disk('s3')->url($request->get('image_url'));
        } else {
            $image_url = $request->get('image_url');
        }

        $event = Event::query()->create($request->only(['name', 'description', 'date', 'url']));
        $event->update(['image_url' => $image_url]);
        if ($request->get('location')) {
            $event->locations()->create(['name' => $request->get('location')]);
        }

        //Log::debug('Event created: ' . $event->toJson());
        return response()->json([
            'data' => $event,
            'message' => 'Event created successfully',
        ], 201);
    }


    /**
     * @OA\Get(
     *     path="api/events/{id}",
     *     summary="Get an event",
     *     @OA\Response(response=200, description="Event details")
     * )
     */
    public function show(Event $event)
    {
        if (! $event) {
            return response()->json(['error' => 'Event not found'], 404);
        }

        return response()->json($event);
    }

    /**
     * @OA\Put(
     *     path="api/events/{id}",
     *     summary="Update an event",
     *     @OA\Response(response=200, description="Event updated successfully")
     * )
     */
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
     * @OA\Delete(
     *     path="api/events/{id}",
     *     summary="Delete an event",
     *     @OA\Response(response=204, description="Event deleted successfully")
     * )
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
