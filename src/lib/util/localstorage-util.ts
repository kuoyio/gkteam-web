class LocalStorageUtil {
  static set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  static setJson<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get(key: string): string | null {
    return localStorage.getItem(key);
  }

  static getJson<T>(key: string): T | null {
    const json = localStorage.getItem(key);
    if (!json) return null;
    try {
      return JSON.parse(json) as T;
    } catch {
      return null;
    }
  }

  static remove(key: string): void {
    localStorage.removeItem(key);
  }

  static clear(): void {
    localStorage.clear();
  }
}

export default LocalStorageUtil;
