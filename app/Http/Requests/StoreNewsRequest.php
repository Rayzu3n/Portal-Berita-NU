<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreNewsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],

            'category_id' => [
                'required',
                'integer',
                Rule::exists('categories', 'id'),
            ],

            'excerpt' => ['nullable', 'string'],

            'content' => ['required', 'string'],

            'cover_image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:5120',
            ],

            'status' => [
                'required',
                Rule::in(['draft', 'published']),
            ],

            'published_at' => [
                'nullable',
                'date',
            ],
        ];
    }
}
