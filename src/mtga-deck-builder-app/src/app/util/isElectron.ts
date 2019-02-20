// https://github.com/electron/electron/issues/2288
export function isElectron() {
    // Renderer process
    if (typeof window !== 'undefined' && typeof (window as any).process === 'object' && (window as any).process!.type === 'renderer') {
        return true;
    }

    // Main process
    if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!(process.versions as any).electron) {
        return true;
    }

    // Detect the user agent when the `nodeIntegration` option is set to true
    if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
        return true;
    }

    return false;
}
