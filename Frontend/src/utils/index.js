export class LocalStorage {
    // Get a value from local storage by key
    static get(key) {
        const value = localStorage.getItem(key);
        if (value) {
            try {
                return JSON.parse(value);
            } catch (err) {
                return null;
            }
        }
        return null;
    }

    // Set a value in local storage by key
    static set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    // Remove a value from local storage by key
    static remove(key) {
        localStorage.removeItem(key);
    }

    // Clear all items from local storage
    static clear() {
        localStorage.clear();
    }
}
