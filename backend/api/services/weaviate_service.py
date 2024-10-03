import weaviate
import os
from weaviate.embedded import EmbeddedOptions
from django.conf import settings
from contextlib import contextmanager
from weaviate import Client

@contextmanager
def weaviate_client():
    client = None
    try:
        client = weaviate.connect_to_wcs(
            cluster_url=settings.WEAVIATE_URL,
            auth_credentials=weaviate.auth.AuthApiKey(settings.WEAVIATE_API_KEY)
        )
        print("Weaviate client initialized successfully")
        yield client
    except Exception as e:
        print(f"Error initializing Weaviate client: {e}")
        yield None
    finally:
        if client:
            client.close()
            print("Weaviate client connection closed")

# Remove the global client variable

def search_weaviate(query):
    with weaviate_client() as client:
        if client is None:
            return {"error": "Weaviate client not initialized"}
        try:
            result = client.query.get("YourClassName", ["property1", "property2"]).with_near_text({"concepts": [query]}).do()
            return result
        except Exception as e:
            return {"error": f"Error searching Weaviate: {str(e)}"}

def chat_with_weaviate(message):
    with weaviate_client() as client:
        if client is None:
            return {"error": "Weaviate client not initialized"}
        try:
            # Implement your chat logic here
            # This is a placeholder response
            return {"response": f"Received message: {message}"}
        except Exception as e:
            return {"error": f"Error chatting with Weaviate: {str(e)}"}

def mockoral_with_weaviate(question):
    if client is None:
        initialize_weaviate_client()
    try:
        # Implement your mockoral logic here
        # This is a placeholder response
        return {"response": f"Received question: {question}"}
    except Exception as e:
        return {"error": f"Error in mockoral with Weaviate: {str(e)}"}

def initialize_weaviate_client():
    global client
    client = Client("http://localhost:8080")  # Replace with your Weaviate server URL
