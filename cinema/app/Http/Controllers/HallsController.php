<?php

namespace App\Http\Controllers;

use App\Http\Resources\HallsResource;
use App\Models\Halls;
use App\Http\Requests\HallsStoreRequest;
use App\Http\Requests\HallsUpdateRequest;

class HallsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return HallsResource::collection(
            Halls::orderBy('id', 'desc')->paginate(5)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(HallsStoreRequest $request)
    {
        $data = $request->validated();

        $hall = Halls::create($data);

        return new HallsResource($hall);
    }

    /**
     * Display the specified resource.
     */
    public function show($hall_id)
    {
        $data = Halls::where('id', $hall_id)->get()->toArray();
        return $data;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(HallsUpdateRequest $request, Halls $hall)
    {
        $data = $request->validated();

        $hall->update($data);

        return new HallsResource($hall);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Halls $hall)
    {
        $hall->delete();
        return response('', 204);
    }
}
