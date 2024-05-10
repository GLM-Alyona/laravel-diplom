<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SessionsStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'movies_id' => 'exists:movies,id',
            'halls_id' => 'exists:halls,id',
            'sessionStart' => 'date_format:H:i',
            'duration' => 'numeric',
            'sessionEnd' => 'date_format:H:i'
        ];
    }
}
