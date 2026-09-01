<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\News;
use Inertia\Inertia;
use Inertia\Response;

class PublicNewsController extends Controller
{
    public function home(): Response
    {
        $published = News::query()
            ->with(['category:id,name,slug', 'user:id,name'])
            ->where('status', 'published')
            ->whereNotNull('published_at')
            ->latest('published_at');

        $featured = (clone $published)->first();

        $latest = $published
            ->when($featured, fn ($query) => $query->whereKeyNot($featured->id))
            ->take(6)
            ->get();

        return Inertia::render('Home', [
            'featured' => $featured,
            'latest' => $latest,
            'categories' => Category::query()
                ->whereHas('news', fn ($query) => $query->where('status', 'published'))
                ->orderBy('name')
                ->get(['id', 'name', 'slug']),
        ]);
    }

    public function show(News $news): Response
    {
        abort_unless($news->status === 'published' && $news->published_at, 404);

        $news->load(['category:id,name,slug', 'user:id,name']);

        return Inertia::render('News/Show', [
            'news' => $news,
        ]);
    }
}
