import sys
import os 
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))
import pytest
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_flag_enabled():
    response = client.post(
        "/evaluate/",
        json={
            "flag_key": "AI chat",
            "environment_id": 1,
            "user_id": 94
        }
    )

    assert response.status_code == 200
    assert response.json()["enabled"] == True


def test_environment_flag():
    response = client.post(
        "/evaluate/",
        json={
            "flag_key": "new_login",
            "environment_id": 2,
            "user_id": 49
        }
    )

    assert response.status_code == 200
    assert response.json()["enabled"] == True


def test_disabled_flag():
    response = client.post(
        "/evaluate/",
        json={
            "flag_key": "dark_mode",
            "environment_id": 3,
            "user_id": 34
        }
    )

    assert response.status_code == 200
    assert response.json()["enabled"] == False


def test_empty_user_context():
    response = client.post(
        "/evaluate/",
        json={
            "flag_key": "AI chat",
            "environment_id": 1
        }
    )

    assert response.status_code == 200
    assert response.json()["enabled"] == True