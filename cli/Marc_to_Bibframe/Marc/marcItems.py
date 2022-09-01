class MarcItems:
    def __init__(self, marcxml):
        self.items = marcxml.findall(
            "datafield/[@tag='952']")
            #/subfield/[@code='p']")
        
    def Items(self):
        items = [
            {
                'register': item.find("subfield/[@code='p']").text.rstrip(),
                'creationDate': item.find("subfield/[@code='d']").text,
                'callnumber': item.find("subfield/[@code='o']").text
            }
             for item in self.items]
        return items