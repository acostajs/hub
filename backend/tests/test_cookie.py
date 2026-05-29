from fastapi import Response

from app.core.config import settings
from app.core.cookie import delete_sso_cookie, set_sso_cookie


def test_set_sso_cookie():
    response = Response()
    token = "mock-jwt-token-string"
    set_sso_cookie(response, token)

    cookie_header = response.headers.get("set-cookie")
    assert cookie_header is not None
    assert f"hub_session={token}" in cookie_header
    assert f"Domain={settings.COOKIE_DOMAIN}" in cookie_header
    assert "HttpOnly" in cookie_header
    assert "Secure" in cookie_header
    assert "samesite=lax" in cookie_header.lower()


def test_delete_sso_cookie():
    response = Response()
    delete_sso_cookie(response)

    cookie_header = response.headers.get("set-cookie")
    assert cookie_header is not None
    # Deleting sets key to empty and sets Max-Age=0 / expires in past
    assert "hub_session=" in cookie_header
    assert f"Domain={settings.COOKIE_DOMAIN}" in cookie_header
    assert "max-age=0" in cookie_header.lower() or "expires=" in cookie_header.lower()
