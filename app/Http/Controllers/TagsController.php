<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;

class TagsController extends Controller
{
    public function index(): \Illuminate\Http\JsonResponse
    {
        return response()->json(Tag::all());
    }
}
