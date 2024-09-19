import weaviate

# Initialize the Weaviate client with your Weaviate Cloud cluster URL and API key
client = weaviate.Client(
    url="https://gecejvo1r1sirw4mkrkiw.c0.us-west3.gcp.weaviate.cloud",
    auth_client_secret=weaviate.AuthApiKey(api_key="hAaAxbOgjVc7YQOzRpU8KF48dqAennNmGoXU")  # Replace "your-api-key" with your actual API key
)

def test_weaviate_connection():
    try:
        client.is_ready()  # Check if Weaviate is ready
        return "Connected to Weaviate Cloud successfully!"
    except Exception as e:
        return f"Failed to connect to Weaviate Cloud: {e}"
