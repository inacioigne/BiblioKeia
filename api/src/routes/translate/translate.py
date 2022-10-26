from fastapi import APIRouter
from src.routes.translate.makeTranslate import MakeTranslate

router = APIRouter()

@router.post("/{term}")
async def Translate(term):

    translator = MakeTranslate(
            source_language='en',
            target_language='pt',
            timeout=10
        )
    
    result = translator.translate(term)
    return {'translate': result}
    