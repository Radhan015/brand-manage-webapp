<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

// PRD R14 #4: the whole UI in Indonesian (default) or English, chosen per session.
class SetLocale
{
    public const LOCALES = ['id', 'en'];

    public function handle(Request $request, Closure $next): Response
    {
        $locale = $request->session()->get('locale');
        app()->setLocale(in_array($locale, self::LOCALES, true) ? $locale : 'id');

        return $next($request);
    }
}
