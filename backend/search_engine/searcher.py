import faiss
import numpy as np
from .embedder import ImageEmbedder

class ImageSearcher:
    def __init__(self, index_path, paths_path):
        self.embedder = ImageEmbedder()
        try:
            self.index = faiss.read_index(index_path)
            self.image_paths = np.load(paths_path, allow_pickle=True)
            print("Index loaded.")
        except:
            self.index = None
            self.image_paths = None
            print("No index found. Pehle train model par click karna hoga.")

    def search(self, query_image_path, k=10):
        if not self.index:
            return []
        query_vector = self.embedder.embed(query_image_path)
        if query_vector is None:
            return []
        query_vector_np = np.array([query_vector]).astype('float32')
        distances, indices = self.index.search(query_vector_np, k)
        results = [self.image_paths[i] for i in indices[0]]
        return results