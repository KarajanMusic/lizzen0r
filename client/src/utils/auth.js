export const isAdmin = false;
export function isAuthenticated () {
    return window.GoogleAuth ? window.GoogleAuth.isSignedIn.get() : false;
};