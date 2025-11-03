# backend/routes/stores.py
from flask import Blueprint, request, jsonify
from ..models import get_stores, create_store, delete_store, get_store_by_username
from ..config import Config

bp = Blueprint("stores", __name__)

@bp.get("/")
def list_stores():
    stores = get_stores()
    # Don't return passwords in the list
    for store in stores:
        store.pop("password", None)
    return jsonify(stores)

@bp.post("/")
def add_store():
    data = request.get_json()
    name = data.get("name")
    if not name:
        return jsonify({"error": "Store name is required"}), 400
    
    username = data.get("username")
    password = data.get("password")
    
    store_id = create_store(name, username, password)
    # Return store info without password
    store_info = {"id": store_id, "name": name}
    if username:
        store_info["username"] = username
    return jsonify(store_info), 201

@bp.post("/login")
def store_login():
    data = request.get_json()
    username = data.get("username", "").strip()
    password = data.get("password", "")
    
    if not username or not password:
        return jsonify({"error": "Username and password required"}), 400
    
    store = get_store_by_username(username)
    if store and store.get("password") == password:
        # Don't return password
        store.pop("password", None)
        return jsonify(store), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

@bp.delete("/")
def remove_store():
    data = request.get_json()
    name = data.get("name")
    if not name:
        return jsonify({"error": "Store name is required"}), 400
    
    success = delete_store(name)
    if success:
        return jsonify({"message": f"Store '{name}' deleted successfully"}), 200
    else:
        return jsonify({"error": f"Store '{name}' not found"}), 404

@bp.post("/manager/login")
def manager_login():
    """Manager login endpoint - validates credentials server-side"""
    data = request.get_json()
    username = data.get("username", "").strip()
    password = data.get("password", "")
    
    if not username or not password:
        return jsonify({"error": "Username and password required"}), 400
    
    # Validate against config (from environment variables in production)
    if username == Config.MANAGER_USERNAME and password == Config.MANAGER_PASSWORD:
        return jsonify({
            "role": "manager",
            "name": "Manager",
            "username": username
        }), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

