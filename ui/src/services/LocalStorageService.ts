/**
 * A service to handle loading and storing local storage data.
 */
class LocalStorageService {

    /**
     * Saves local storage data value to given key.
     * @param {string} key
     * @param value
     */
    save(key: string, value: any) {
        localStorage.setItem(key, value);
    }

    /**
     * Loads local storage data value from given key.
     * @param {string} key
     */
    load(key: string): string | null {
        return localStorage.getItem(key);
    }

    /**
     * Clears all local storage data.
     */
    clear() {
        localStorage.clear();
    }
}

export default LocalStorageService