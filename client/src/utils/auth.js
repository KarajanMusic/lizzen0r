export const isAdmin = false;

export function isAuthenticated() {
    return window.GoogleAuth ? window.GoogleAuth.isSignedIn.get() : false;
}

export function getAuthHeader() {
    const token = window.GoogleAuth.currentUser.get();
    console.log(token);
    return 'Bearer ' + token;
}
