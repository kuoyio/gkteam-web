class CookieUtil {
  static get(name: string): string | null {
    if (typeof document === "undefined") return null;
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [key, value] = cookie.trim().split("=");
      if (key === name) return decodeURIComponent(value);
    }
    return null;
  }

  static isLoggedIn(): boolean {
    return !!this.get("accessToken");
  }

  static remove(name: string): void {
    if (typeof document === "undefined") return;
    document.cookie = `${name}=; path=/; max-age=0`;
  }
}

export default CookieUtil;
