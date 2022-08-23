
def Add_doc(workMarc, instanceMarc, marcItems, count):
    doc = {
        'id': count,
        'title': workMarc.Title().get('label').rstrip().removesuffix('/').rstrip(),
        'author': workMarc.PrimaryContribution().get('person'),
        'responsibilities': instanceMarc.ResponsibilityStatement(),
        'place': instanceMarc.Publication().get('place'),
        'publisher': instanceMarc.Publication().get('publisher'),
    }
    if instanceMarc.Serie():
        doc.update(serie=instanceMarc.Serie())

    return doc


