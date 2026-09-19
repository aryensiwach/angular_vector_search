from sentence_transformers import SentenceTransformer
from PIL import Image
import numpy as np

class ImageEmbedder:
    def __init__(self):
        print("AI model (CLIP) load ho raha hai...")
        self.model = SentenceTransformer('clip-ViT-B-32')
        print("Model loaded.")

    def embed(self, image_path):
        try:
            image = Image.open(image_path).convert("RGB")
            embedding = self.model.encode(image)
            return embedding.tolist()
        except Exception as e:
            print(f"Error in embedding {image_path}: {e}")
            return None