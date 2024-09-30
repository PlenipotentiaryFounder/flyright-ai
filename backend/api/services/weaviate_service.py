import weaviate
from weaviate.auth import AuthApiKey
from weaviate import WeaviateClient
import logging

# Initialize the Weaviate client with your Weaviate Cloud cluster URL and API key
client = weaviate.Client(
    url="https://gecejvo1r1sirw4mkrkiw.c0.us-west3.gcp.weaviate.cloud",
    auth_client_secret=weaviate.AuthApiKey(api_key="hAaAxbOgjVc7YQOzRpU8KF48dqAennNmGoXU")  # Replace "your-api-key" with your actual API key
)

logger = logging.getLogger('api')

def test_weaviate_connection():
    try:
        client.is_ready()  # Check if Weaviate is ready
        return "Connected to Weaviate Cloud successfully!"
    except Exception as e:
        return f"Failed to connect to Weaviate Cloud: {e}"

# Ensure you have the correct function definition for search_weaviate
def search_weaviate(query):
    logger.debug('Initializing Weaviate client')
    client = WeaviateClient(
        url="http://localhost:8080",  # Update with your Weaviate instance URL
        auth_client_secret=AuthApiKey(api_key="your_api_key")  # Update with your API key
    )
   # Your search logic here
    result = client.query.get("YourClassName", ["property1", "property2"]).with_where({
        "path": ["property"],
        "operator": "Equal",
        "valueString": query
    }).do()
    return result
    logger.debug('Weaviate client initialized')

    try:
        logger.debug(f'Searching Weaviate with query: {query}')
        result = client.query.get("YourClassName", ["property1", "property2"]).with_where({
            "path": ["property"],
            "operator": "Equal",
            "valueString": query
        }).do()
        logger.debug(f'Search result: {result}')
        return result
    except Exception as e:
        logger.error(f'Error during Weaviate search: {e}')
        raise
