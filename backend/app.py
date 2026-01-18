from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient 
from bson import ObjectId

app = Flask(__name__)
CORS(app)

# MongoDB Connection
client = MongoClient("mongodb://localhost:27017/")
db = client['rtsp_overlay_db']
overlays_collection = db['overlays']

# Helper function to format MongoDB data for the Frontend
def format_overlay(overlay):
    return {
        "_id": str(overlay["_id"]),
        "content": overlay.get("content", ""),
        "type": overlay.get("type", "text"),
        "position": overlay.get("position", {"x": 0, "y": 0}),
        "size": overlay.get("size", {"width": 150, "height": 50})
    }

# 1. READ: Get all overlays
@app.route('/api/overlays', methods=['GET'])
def get_overlays():
    overlays = list(overlays_collection.find())
    return jsonify([format_overlay(o) for o in overlays])

# 2. CREATE: Add a new overlay
@app.route('/api/overlays', methods=['POST'])
def add_overlay():
    data = request.json
    result = overlays_collection.insert_one(data)
    return jsonify({"_id": str(result.inserted_id)}), 201

# 3. UPDATE: Change position or size
@app.route('/api/overlays/<id>', methods=['PUT'])
def update_overlay(id):
    data = request.json
    overlays_collection.update_one({"_id": ObjectId(id)}, {"$set": data})
    return jsonify({"msg": "Updated successfully"})

# 4. DELETE: Remove an overlay
@app.route('/api/overlays/<id>', methods=['DELETE'])
def delete_overlay(id):
    overlays_collection.delete_one({"_id": ObjectId(id)})
    return jsonify({"msg": "Deleted successfully"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)