<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class MoviesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'img_url' => $this->img ? URL::to($this->img) : null,
            'title' => $this->title,
            'description' => $this->description,
            'duration' => $this->duration,
            'origin' => $this->origin,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
