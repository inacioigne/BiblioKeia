
def create_doc(workMarc, instanceMarc, itemsMarc, type, shelf, count):

    doc = {
        'id': count,
        'call': workMarc.Chamada(),
        'shelf': shelf,
        'title': workMarc.Title().get('label').rstrip().removesuffix('/').rstrip(),
        'responsibilities': instanceMarc.ResponsibilityStatement(),
        'place': instanceMarc.Publication().get('place'),
        'publisher': instanceMarc.Publication().get('publisher'),
        'year': instanceMarc.Publication().get('year'),
        'subject': [subject.get('label').removesuffix('.') for subject in workMarc.Subjects()],
        'type': type,
        'items': [item.get('register') for item in itemsMarc.Items()]
    }
    if workMarc.PrimaryContribution():
        doc.update(author=workMarc.PrimaryContribution().get('person'))
    if instanceMarc.Serie():
        doc.update(serie=instanceMarc.Serie())

    return doc


