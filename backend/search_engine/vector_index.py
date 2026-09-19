import os
import faiss
import numpy as np
from tqdm import tqdm
from .embedder import ImageEmbedder

class VectorIndex:
    def __init__(self, embedder: ImageEmbedder):
        self.embedder = embedder
        self.index = None
        self.image_paths = []

    def build(self, image_folder: str):
        self.image_paths = [os.path.join(image_folder, f) for f in os.listdir(image_folder) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
        if not self.image_paths:
            print("Folder me koi image nahi hai.")
            return

        all_embeddings = []
        for path in tqdm(self.image_paths, desc="Vectorizing"):
            embedding = self.embedder.embed(path)
            if embedding is not None:
                all_embeddings.append(embedding)

        embeddings_np = np.array(all_embeddings).astype('float32')
        dimension = embeddings_np.shape[1]
        self.index = faiss.IndexFlatL2(dimension)
        self.index.add(embeddings_np)

    def save(self, index_path: str, paths_path: str):
        if self.index:
            faiss.write_index(self.index, index_path)
            np.save(paths_path, self.image_paths)