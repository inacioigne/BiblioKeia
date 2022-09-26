class MarcInstance:
    def __init__(self, marcxml):
        self.marcxml = marcxml
        self.tag008 = marcxml.find("controlfield/[@tag='008']").text
        self.datafields = [datafield.get('tag') for datafield in marcxml.findall("datafield")]

    def Form(self):
        code = self.tag008[23]
        if code in [' ']:
            return 'nc'
        return False

    def Publication(self): 
        place = self.marcxml.find("datafield/[@tag='260']"\
                                "/subfield/[@code='a']").text
        place = place.rstrip().removesuffix(':').rstrip()

        publisher = self.marcxml.find("datafield/[@tag='260']"\
                                "/subfield/[@code='b']").text
        publisher = publisher.rstrip().removesuffix(',').rstrip()

        year = self.marcxml.find("datafield/[@tag='260']"\
                                "/subfield/[@code='c']").text
        year = year.rstrip().removesuffix('.')
        if '?' in year:
            year = year.replace('[', '').replace('?]', '')
        elif '[' in year:
            year = year.replace('[', '').replace(']', '')
        elif ']' in year:
            year = year.replace(']', '')
        elif 'c' in year:
            year = year.replace('c', '')

        publication = {'place': place, 'publisher': publisher, 'year': year}

        return publication
    
    def Extent(self):
        extent = self.marcxml.find("datafield/[@tag='300']"\
                                "/subfield/[@code='a']")
        if extent == None:
            return False
        else:
            extent = extent.text
            return extent

    def Serie(self):
        serie = self.marcxml.find("datafield/[@tag='490']"\
                                "/subfield/[@code='a']")
        volume = self.marcxml.find("datafield/[@tag='490']"\
                                "/subfield/[@code='v']")
        if serie == None:
            return False
        else:
            if volume == None:
                return serie.text
            return serie.text+volume.text

    def Note(self):
        note = self.marcxml.find("datafield/[@tag='500']"\
                                "/subfield/[@code='a']")
        if note == None:
            return False
        else:
            note = note.text
            return note
    
    def ResponsibilityStatement(self):
        responsibility = self.marcxml.find("datafield/[@tag='245']"\
                                "/subfield/[@code='c']")
        if responsibility == None:
            return False
        else:
            responsibility = responsibility.text
            return responsibility

        return responsibility

