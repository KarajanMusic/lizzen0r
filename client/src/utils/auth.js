export const isAdmin = false;

export function isAuthenticated() {
    return window.GoogleAuth ? window.GoogleAuth.isSignedIn.get() : false;
}

export function getAuthHeader() {
    console.log(window.GoogleAuth.currentUser.get().Zi.access_token);
    return 'Bearer ' + window.GoogleAuth.currentUser.get().Zi.access_token;
}
