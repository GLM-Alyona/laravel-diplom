<?php

namespace App\Http\Controllers;

use App\Http\Resources\TypesResource;
use App\Models\Types;
use App\Http\Requests\TypesStoreRequest;
use App\Http\Requests\TypesUpdateRequest;

class TypesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return TypesResource::collection(
            Types::orderBy('id', 'desc')->paginate(5)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TypesStoreRequest $request)
    {
        $data = $request->validated();

        $type = Types::create($data);

        return new TypesResource($type);
    }

    /**
     * Display the specified resource.
     */
    public function show(Types $type)
    {
        return new TypesResource($type);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TypesUpdateRequest $request, Types $type)
    {
        $data = $request->validated();

        $type->update($data);

        return new TypesResource($type);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Types $type)
    {
        $type->delete();
        return response('', 204);
    }
}
