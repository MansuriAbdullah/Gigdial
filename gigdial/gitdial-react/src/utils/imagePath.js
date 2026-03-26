export const getFullImagePath = (path) => {
    if (!path) return '';
    if (typeof path !== 'string') return '';
    if (path.startsWith('http') || path.startsWith('data:')) return path;

    // Remove leading slash or localhost if any (for cleanup of old data)
    let cleanPath = path;
    if (cleanPath.includes('localhost:5000')) {
        cleanPath = cleanPath.split('localhost:5000')[1];
    }

    if (cleanPath.startsWith('/')) {
        cleanPath = cleanPath.substring(1);
    }

    // Ensure backslashes are replaced with forward slashes
    const normalizedPath = cleanPath.replace(/\\/g, '/');

    // Handle Backend URL for production
    const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
    
    // If backendUrl is provided, ensure it doesn't have a trailing slash
    const base = backendUrl.endsWith('/') ? backendUrl.slice(0, -1) : backendUrl;
    
    return base ? `${base}/${normalizedPath}` : `/${normalizedPath}`;
};
