<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SeatsStoreRequest extends FormRequest
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
            'halls_id' => 'exists:halls,id',
            'row' => 'integer|max:25',
            'seat' => 'integer|max:25',
            'types_id' => 'exists:types,id'
        ];
    }
}
