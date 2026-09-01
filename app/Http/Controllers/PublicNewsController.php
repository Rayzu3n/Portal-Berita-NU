<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\News;
use Illuminate\Http\Request;
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
            'categories' => $this->publishedCategories(),
        ]);
    }

    public function index(Request $request): Response
    {
        $search = trim((string) $request->string('search'));
        $category = trim((string) $request->string('category'));

        $news = News::query()
            ->with(['category:id,name,slug', 'user:id,name'])
            ->where('status', 'published')
            ->whereNotNull('published_at')
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($query) use ($search) {
                    $query->where('title', 'like', "%{$search}%")
                        ->orWhere('excerpt', 'like', "%{$search}%")
                        ->orWhere('content', 'like', "%{$search}%");
                });
            })
            ->when($category !== '', fn ($query) => $query->whereHas(
                'category',
                fn ($query) => $query->where('slug', $category),
            ))
            ->latest('published_at')
            ->paginate(9)
            ->withQueryString();

        return Inertia::render('News/Index', [
            'news' => $news,
            'filters' => [
                'search' => $search,
                'category' => $category,
            ],
            'categories' => $this->publishedCategories(),
        ]);
    }

    public function show(News $news): Response
    {
        abort_unless($news->status === 'published' && $news->published_at, 404);

        $news->load(['category:id,name,slug', 'user:id,name']);

        $related = News::query()
            ->with(['category:id,name,slug'])
            ->where('status', 'published')
            ->whereNotNull('published_at')
            ->whereKeyNot($news->id)
            ->when($news->category_id, fn ($query) => $query->where('category_id', $news->category_id))
            ->latest('published_at')
            ->take(3)
            ->get();

        return Inertia::render('News/Show', [
            'news' => $news,
            'related' => $related,
        ]);
    }

    private function publishedCategories()
    {
        return Category::query()
            ->whereHas('news', fn ($query) => $query
                ->where('status', 'published')
                ->whereNotNull('published_at'))
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);
    }
}
