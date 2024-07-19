import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublicPath = path==='/login' || path ==='/signup' || path === '/forgotpassword'
    const token = request.cookies.get('token')?.value || ''
    if(path ==='/verifyemail'){
      return
    }
    if(path ==='/'){
      return
    }
    if(path ==='/resetpassword'){
      return
    }
    if(path ==='/guide'){
      return
    }
    if(isPublicPath && token){
    return NextResponse.redirect(new URL('/', request.nextUrl))
    }
    if((!isPublicPath && !token)){
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}
 
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/verifyemail',
    '/forgotpassword',
    '/resetpassword',
    '/otherlogins',
    '/guide',
    '/mysnippets',
    '/test',
  ]
}