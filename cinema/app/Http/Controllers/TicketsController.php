<?php

namespace App\Http\Controllers;

use App\Models\Tickets;
use App\Http\Resources\TicketsResource;
use App\Http\Requests\TicketsStoreRequest;

class TicketsController extends Controller
{
    public function store(TicketsStoreRequest $request)
    {
        $data = $request->validated();

        $tickets = Tickets::create($data);

        return new TicketsResource($tickets);
    }

    /**
     * Показать все сессии относящиеся к конкретному UUID
     */
    public function showTicketsBySession($uuid)
    {
        $data = Tickets::where('uuid', $uuid)->get()->toArray();
        return $data;
    }

    /**
     * Показать все билеты относящиеся к конкретному session_id
     */
    public function showSeatsBySession($session_id, $date)
    {
        $data = Tickets::where('date', $date)->where('sessions_id', $session_id)->get()->toArray();
        return $data;
    }
}
