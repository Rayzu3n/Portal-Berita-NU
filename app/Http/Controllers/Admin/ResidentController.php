<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Resident;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ResidentController extends Controller
{
    public function index(): Response
    {
        $residents = Resident::latest()->paginate(15);

        return Inertia::render('Admin/Residents/Index', [
            'residents' => $residents,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Residents/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'nik' => ['nullable', 'string', 'max:50', 'unique:residents,nik'],
            'gender' => ['nullable', 'in:male,female'],
            'address' => ['nullable', 'string'],
            'phone' => ['nullable', 'string', 'max:30'],
            'position' => ['nullable', 'string', 'max:255'],
            'organization' => ['nullable', 'string', 'max:255'],
            'status' => ['required', 'string', 'max:50'],
        ]);

        Resident::create($data);

        return to_route('warga.index')
            ->with('success', 'Data warga berhasil ditambahkan.');
    }

    public function show(Resident $warga): Response
    {
        return Inertia::render('Admin/Residents/Show', [
            'resident' => $warga,
        ]);
    }

    public function edit(Resident $warga): Response
    {
        return Inertia::render('Admin/Residents/Edit', [
            'resident' => $warga,
        ]);
    }

    public function update(
        Request $request,
        Resident $warga
    ): RedirectResponse {
        $data = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'nik' => [
                'nullable',
                'string',
                'max:50',
                'unique:residents,nik,'.$warga->id,
            ],
            'gender' => ['nullable', 'in:male,female'],
            'address' => ['nullable', 'string'],
            'phone' => ['nullable', 'string', 'max:30'],
            'position' => ['nullable', 'string', 'max:255'],
            'organization' => ['nullable', 'string', 'max:255'],
            'status' => ['required', 'string', 'max:50'],
        ]);

        $warga->update($data);

        return to_route('warga.index')
            ->with('success', 'Data warga berhasil diperbarui.');
    }

    public function destroy(Resident $warga): RedirectResponse
    {
        $warga->delete();

        return to_route('warga.index')
            ->with('success', 'Data warga berhasil dihapus.');
    }
}
