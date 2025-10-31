import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Database } from '@/types/database'

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient<Database>({ req, res })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    // Auth sayfalarına erişim kontrolü
    if (req.nextUrl.pathname.startsWith('/dashboard') && !session) {
        return NextResponse.redirect(new URL('/giris', req.url))
    }

    if (req.nextUrl.pathname.startsWith('/giris') && session) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return res
}

export const config = {
    matcher: ['/dashboard/:path*', '/giris', '/kayit']
}