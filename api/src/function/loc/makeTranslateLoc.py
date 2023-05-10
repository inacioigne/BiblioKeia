from src.routes.translate.makeTranslate import MakeTranslate

def MakeTranslateLoc(subject):
    translator = MakeTranslate(
            source_language='en',
            target_language='pt',
            timeout=10
        )
    for k, v in subject:
        if k == 'elementList':
            for j in v:
                term = j.elementValue.value
                result = translator.translate(term)
                j.elementValue.value = result.capitalize()
                j.elementValue.lang = 'pt'
    if subject.note:
        note = translator.translate(subject.note)
        subject.note = note
    return subject


