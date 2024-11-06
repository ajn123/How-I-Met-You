<?php

namespace App\Http\Controllers;

use App\Models\Tag;

/**
 * @OA\Info(title="Tag API", version="1.0")
 */
class TagsController extends Controller
{
    /**
     * @OA\Get(
     *     path="api/tags",
     *     summary="Get all tags",
     *     @OA\Response(response=200, description="List of tags")
     * )
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        return response()->json(Tag::all());
    }
}
