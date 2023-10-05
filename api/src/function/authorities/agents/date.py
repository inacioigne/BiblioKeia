def BirthDate(request):

    if request.birthDayDate and request.birthMonthDate and request.birthYearDate:
        date = f"{request.birthYearDate}-{request.birthMonthDate}-{request.birthDayDate}"
        birthDate = f"""madsrdf:birthDate "{date}" ;"""
        return birthDate 
    elif request.birthMonthDate and request.birthYearDate:
        date = f"{request.birthMonthDate}-{request.birthYearDate}"
        birthDate = f"""madsrdf:birthDate "{date}" ;"""
        return birthDate 
    elif request.birthYearDate:
        birthDate = f"""madsrdf:birthDate "{request.birthYearDate}" ;"""
        return birthDate 
    else:
        return ""
    
def DeathDate(request):

    if request.deathDayDate and request.deathMonthDate and request.deathYearDate:
        date = f"{request.deathYearDate}-{request.deathMonthDate}-{request.deathDayDate}"
        deathDate = f"""madsrdf:deathDate "{date}" ;"""
        return deathDate 
    elif request.deathMonthDate and request.deathYearDate:
        date = f"{request.deathMonthDate}-{request.deathYearDate}"
        deathDate = f"""madsrdf:deathDate "{date}" ;"""
        return deathDate 
    elif request.deathYearDate:
        deathDate = f"""madsrdf:deathDate "{request.deathYearDate}" ;"""
        return deathDate 
    else:
        return ""

