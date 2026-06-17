import json
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from youtube_transcript_api import YouTubeTranscriptApi


from transcript_service import get_transcript
from gemini_service import get_recipe_json

app = FastAPI()


class YoutubeRequest(BaseModel):
    youtube_url: str
    categories: list[str]
    tags: list[str]


class IngredientResponse(BaseModel):
    ingredientName: str
    quantity: float
    unit: str


class InstructionResponse(BaseModel):
    stepNumber: int
    description: str


class CreateRecipeRequest(BaseModel):
    recipeName: str
    ingredients: list[IngredientResponse]
    instructions: list[InstructionResponse]
    categories: list[str]
    tags: list[str]


@app.post("/extract-recipe")
def extract_recipe(request: YoutubeRequest) -> CreateRecipeRequest:
    ytt_api = YouTubeTranscriptApi()

    try:
        transcript = get_transcript(ytt_api, request.youtube_url)

        if not transcript:
            raise HTTPException(
                status_code=400,
                detail="Transcript not available."
            )
        
        schema = json.dumps(CreateRecipeRequest.model_json_schema(), indent=2)
        categories = json.dumps(request.categories)
        tags = json.dumps(request.tags)
        recipe_json = get_recipe_json(schema, transcript, categories, tags)
        recipe_dict = json.loads(recipe_json)
        recipe = CreateRecipeRequest.model_validate(recipe_dict)

        return recipe

    except HTTPException:
        raise
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )