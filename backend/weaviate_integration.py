import weaviate

client = weaviate.Client("http://localhost:8080")

def generate_questions(scenario_text):
    response = client.query.get("Question").with_near_text({"concepts": [scenario_text]}).do()
    return response['data']['Get']['Question']

def evaluate_answer(question_text, user_answer):
    response = client.query.get("Answer").with_near_text({"concepts": [question_text, user_answer]}).do()
    return response['data']['Get']['Answer']