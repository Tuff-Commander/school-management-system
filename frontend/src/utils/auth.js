export const isAuthenticated = () => {
    // Check if the user is logged in (e.g., by checking localStorage or a token)
    const token = localStorage.getItem("token");
    return !!token;
};