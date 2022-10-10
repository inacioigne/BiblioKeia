
def Create_doc(workMarc, instanceMarc, itemsMarc, type, shelf, count):

    doc = {
        'id': count,
        'call': workMarc.Classification()+" "+workMarc.Cutter(),
        'shelf': shelf,
        'title': workMarc.Title().get('label').rstrip().removesuffix('/').rstrip(),
        'responsibilities': instanceMarc.ResponsibilityStatement(),
        'place': instanceMarc.Publication().get('place'),
        'publisher': instanceMarc.Publication().get('publisher'),
        'subject': [subject.get('label').removesuffix('.') for subject in workMarc.Subjects()],
        'type': type,
        'language': workMarc.Language(),
        'items': [item.get('register') for item in itemsMarc.Items()]
    }

    #Autor
    if workMarc.PrimaryContribution():
        doc.update(author=workMarc.PrimaryContribution().get('person'))
    
    #Serie
    if instanceMarc.Serie():
        serie = instanceMarc.Serie().get('serie')
        volume = instanceMarc.Serie().get('volume')
        doc.update(serie=serie)
        doc.update(numSerie=volume)
    
    #Publicação
    if instanceMarc.Publication().get('year') not in ['s.n.', '19--']:
        doc.update(year=instanceMarc.Publication().get('year'))
    if workMarc.Note():
        notes = list()
        for note in workMarc.Note():
            notes.append(note.get('label'))
        doc.update(notes=notes)
    if instanceMarc.Extent():
        pages = instanceMarc.Extent() 
        pages = pages.replace('p.', 'páginas')
        doc.update(pages=pages)

        


    return doc


 