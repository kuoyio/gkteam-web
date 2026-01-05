export const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/site/privacy",
  "/site/terms",
  "/site/changelog",
];

export const AUTH_ERROR_CODES = {
  NOT_LOGIN: "A0101",
  NOT_PERMISSION: "A0102",
  NOT_ROLE: "A0103",
  REFRESH_TOKEN_EXPIRED: "A0104",
  REFRESH_TOKEN_INVALID: "A0105",
  AUTH_ACCOUNT_FREEZE: "A0106",
  AUTH_PASSWORD_INCORRECT: "A0107",
  AUTH_USER_NOT_FOUND: "A0108",
  AUTH_TEMP_LOCKED: "A0109",
} as const;

export const REQUIRE_RELOGIN_CODES: readonly string[] = [
  AUTH_ERROR_CODES.NOT_LOGIN,
  AUTH_ERROR_CODES.REFRESH_TOKEN_EXPIRED,
  AUTH_ERROR_CODES.REFRESH_TOKEN_INVALID,
];

export const TOKEN_MAX_AGE = {
  ACCESS_TOKEN: 30 * 60,
  REFRESH_TOKEN: 30 * 24 * 60 * 60,
};

export const isPublicRoute = (pathname: string): boolean =>
  PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
