import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Defining the public routes
const publicRoutes = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  // Se la rotta NON è pubblica...
  if (!publicRoutes(req)) {
    // 1. Estraiamo userId e la funzione di redirect
    const { userId, redirectToSignIn } = await auth();
    
    // 2. Se non c'è un utente loggato, reindirizza al login
    if (!userId) {
      return redirectToSignIn();
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}