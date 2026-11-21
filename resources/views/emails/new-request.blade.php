@php
    $fmt = fn ($d) => $d ? \Illuminate\Support\Carbon::parse($d)->locale('id')->translatedFormat('d F Y') : '-';
    $range = fn ($a, $b) => $a == $b || ! $b ? $fmt($a) : $fmt($a) . ' – ' . $fmt($b);
@endphp
<x-mail::message>
# Request konten baru

Ada request baru di SiMaCo yang perlu ditinjau.

<x-mail::table>
| | |
|:--|:--|
| **Nama acara** | {{ $req->event_name }} |
| **Pemohon** | {{ $req->user?->name }} ({{ $req->user?->email }}) |
| **Tipe proyek** | {{ $req->projectType?->name ?? '-' }} |
| **Jenis konten** | {{ $req->content_type === 'series' ? 'Konten Series: ' . $req->serial_name : 'Sekali Tayang' }} |
| **Tanggal acara** | {{ $range($req->event_start_date, $req->event_end_date) }} |
| **Tenggat konten** | {{ $fmt($req->content_deadline) }} |
| **Platform** | {{ $req->platforms->pluck('name')->join(', ') ?: '-' }} |
</x-mail::table>

**Deskripsi:**
{{ $req->description }}

<x-mail::button :url="$url">
Lihat Detail Request
</x-mail::button>

Email ini boleh diteruskan ke staf yang akan ditugaskan.

Salam,<br>
SiMaCo – Branding Fakultas Informatika
</x-mail::message>
