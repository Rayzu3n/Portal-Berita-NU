<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    public function index(): Response
    {
        $news = News::with(['category', 'user'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/News/Index', [
            'news' => $news,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/News/Create');
    }

    public function store()
    {
        //
    }

    public function show(News $news)
    {
        //
    }

    public function edit(News $news): Response
    {
        return Inertia::render('Admin/News/Edit', [
            'news' => $news,
        ]);
    }

    public function update(News $news)
    {
        //
    }

    public function destroy(News $news)
    {
        //
    }
}
