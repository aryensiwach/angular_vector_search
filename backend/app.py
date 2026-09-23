import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
from search_engine.searcher import ImageSearcher
from search_engine.embedder import ImageEmbedder
from search_engine.vector_index import VectorIndex

app = Flask(__name__)
CORS(app)

app.config['UPLOAD_FOLDER'] = 'static/uploads'
DB_FOLDER = 'static/db_images'


searcher = ImageSearcher(index_path='index.faiss', paths_path='image_paths.npy')

@app.route('/search', methods=['POST'])
def search():
    try:
        file = request.files.get('file')
        if not file:
            return jsonify({'error': 'No file uploaded'}), 400
            
       
        query_path = "temp_query_image.jpg"
        file.save(query_path)
        
      
        results = searcher.search(query_path, k=10)
        
        # URL formatting
        image_urls = [f"http://localhost:5000/{path.replace(os.sep, '/')}" for path in results]
        return jsonify({'results': image_urls})
        
    except Exception as e:
       
        print(f"\n PYTHON ERROR: {str(e)}\n")
        return jsonify({'error': str(e)}), 500

@app.route('/api/build-index', methods=['POST'])
def build_index():
    embedder = ImageEmbedder()
    vector_index = VectorIndex(embedder)
    vector_index.build(DB_FOLDER)
    vector_index.save('index.faiss', 'image_paths.npy')
    
    global searcher
    searcher = ImageSearcher(index_path='index.faiss', paths_path='image_paths.npy')
    return jsonify({'message': 'Vector Model Updated Successfully!'})

@app.route('/static/db_images/<filename>')
def serve_db_image(filename):
    return send_from_directory(DB_FOLDER, filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)