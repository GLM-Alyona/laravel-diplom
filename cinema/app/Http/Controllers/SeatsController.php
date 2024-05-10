<?php

namespace App\Http\Controllers;

use App\Http\Resources\SeatsResource;
use App\Http\Requests\SeatsStoreRequest;
use App\Http\Requests\SeatsUpdateRequest;
use App\Models\Seats;

class SeatsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return SeatsResource::collection(
            Seats::orderBy('id', 'desc')
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SeatsStoreRequest $request)
    {
        $data = $request->all();

        // Получаем массив из мест кинозала и разбираем его
        if (is_array($data)) {
            foreach ($data as $item) {
                for ($i = 0; $i < count($item); $i++) {
                    $seat = Seats::create($item[$i]);
                }
            }
        }
        return response('Success', 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($hall_id)
    {
        $data = Seats::where('halls_id', $hall_id)->get()->toArray();
        return $data;
    }
    public function default($hall_id)
    {
        $data = Seats::where('halls_id', $hall_id)->where('types_id', 1)->get()->toArray();
        return $data;
    }
    public function vip($hall_id)
    {
        $data = Seats::where('halls_id', $hall_id)->where('types_id', 2)->get()->toArray();
        return $data;
    }
    public function showByID($id)
    {
        $data = Seats::where('id', $id)->get()->toArray();
        return $data;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($halls_id)
    {
        Seats::where('halls_id', $halls_id)->delete();

        return response('', 204);
    }
}
