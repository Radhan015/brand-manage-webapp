<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

// PRD R3: a login lasts at most N hours even when the user stays active (the idle limit is SESSION_LIFETIME).
class AbsoluteSessionTimeout
{
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {
            $started = $request->session()->get('auth_started_at');

            if (! $started) {
                // Sessions from before this rule existed: start counting now
                $request->session()->put('auth_started_at', now()->timestamp);
            } elseif (now()->timestamp - $started > config('simaco.session_absolute_minutes') * 60) {
                Auth::logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();

                return redirect()->route('login')->with('status', __('Sesi Anda sudah berakhir. Silakan login kembali.'));
            }
        }

        return $next($request);
    }
}
