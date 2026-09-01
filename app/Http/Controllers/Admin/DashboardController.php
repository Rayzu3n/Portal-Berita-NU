<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use App\Models\Resident;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalNews' => News::count(),
                'publishedNews' => News::where('status', 'published')->count(),
                'draftNews' => News::where('status', 'draft')->count(),
                'totalResidents' => Resident::count(),
            ],
            'latestNews' => News::with('category')
                ->latest()
                ->take(5)
                ->get(['id', 'title', 'category_id', 'status', 'created_at']),
        ]);
    }
}
