export function hasAuthCookie(): boolean {
    if (typeof document === "undefined") {
        return false;
    }
    return document.cookie
        .split(";")
        .some((c) => c.trim().startsWith("hub_session="));
}

export function deleteAuthCookie() {
    if (typeof document !== "undefined") {
        // biome-ignore lint/suspicious/noDocumentCookie: Cookie deletion is required to clear active SSO session
        document.cookie =
            "hub_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }
}
