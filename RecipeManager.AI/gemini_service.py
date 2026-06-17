from google import genai
from dotenv import load_dotenv

load_dotenv()

client = genai.Client()


def get_recipe_json(schema: str, transcript: str, categories: str, tags: str) -> str:
    prompt = f"""
You are an expert recipe extraction system.

Your task is to convert a YouTube cooking video transcript into a JSON object conforming EXACTLY to the following schema:

{schema}

Allowed categories:
{categories}

Allowed tags:
{tags}

Rules:
1. Output ONLY valid JSON.
2. Do NOT wrap the JSON in markdown code fences.
3. Do NOT include explanations or additional text.
4. The output must be directly deserializable into the provided schema.
5. Categories must be selected ONLY from the allowed categories list.
6. Tags must be selected ONLY from the allowed tags list.
7. Select at most 3 categories.
8. Select at most 6 tags.
9. Number instruction steps sequentially starting from 1.
10. Combine duplicate ingredients into a single entry.
11. If a quantity is not explicitly mentioned, use quantity = 0 and unit = "".
12. Prefer quantity = 0 over guessing.
13. Only include ingredients explicitly mentioned in the transcript.
14. Only include cooking steps explicitly mentioned in the transcript.
15. Do NOT invent missing ingredients, quantities, or sub-recipes.
16. Preserve the recipe name from the transcript if mentioned; otherwise infer a reasonable name.
17. Use only these units when applicable:
    g, kg, ml, l, tsp, tbsp, cup, piece.

Transcript:
{transcript}
"""

    response = client.models.generate_content(
        model="gemini-3.1-flash-lite",
        contents=prompt
    )

    return response.text if response.text else ""
