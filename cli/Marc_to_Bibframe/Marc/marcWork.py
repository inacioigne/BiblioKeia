class MarcWork:
    def __init__(self, marcxml): 
        self.marcxml = marcxml
        self.leader = marcxml.find('leader').text
        self.tag008 = marcxml.find("controlfield/[@tag='008']").text
        self.cdd = marcxml.find("datafield/[@tag='082']"\
                                "/subfield/[@code='a']")
        self.chamada = marcxml.find("datafield/[@tag='090']"\
                                "/subfield/[@code='a']").text
        self.datafields = [datafield.get('tag') for datafield in marcxml.findall("datafield")]
    #LEADER
    def Status(self):
        status = self.leader[5]

        return status
    
    def Type(self):
        type = self.leader[6]
        code = {'a': 'http://id.loc.gov/vocabulary/contentTypes/txt'}

        return code[type]

    #008
    def creationDate(self):     
        date = self.tag008[:6]
        yy = date[:2]
        mm = date[2:4]
        dd = date[4:]
        if int(yy) < 50:
            cc = "20"
        else:
            cc = "19"

        return f'{cc}{yy}-{mm}-{dd}'
    
    def Language(self):
        code = self.tag008[35:38]
        return code

    def Classification(self):
        if self.cdd == None:
            return self.chamada
        else:
            return self.cdd.text


    #Books
    def IllustrativeContent(self):
        code = self.tag008[18:22]
        if code == '    ':
            return False

        return code

    def Audience(self):
        codes = {
            'f': {'code': 'spe', 'label': 'Specialized'},
            'e': {'code': 'adu', 'label': 'adult'},
            'g': {'code': 'gen', 'label': 'General'}
            }
        code = self.tag008[22]
        if code in ['|', ' ']:
            return False
        
        return codes[code]

    def Contents(self):
        code = self.tag008[24:28]
        if code == '    ':
            return False

        return code

    def GovernmentPublication(self):
        code = self.tag008[28]
        if code == ' ':
            return False

        return code

    def ConferencePublication(self):
        code = self.tag008[29]
        if code == '0':
            return False

        return code

    def Festschrift(self):
        code = self.tag008[30]
        if code == '0':
            return False

        return code

    def Index(self):
        code = self.tag008[31]
        if code == '0':
            return False

        return code

    def LiteraryForm(self):
        code = self.tag008[33]
        if code == '0':
            return False

        return code

    def Biography(self):
        code = self.tag008[34]
        if code in [' ', '|'] :
            return False

        return code
    
    def Cutter(self):
        cutter = self.marcxml.find("datafield/[@tag='090']"\
                                "/subfield/[@code='b']").text
        chamada = f'{self.cdd} {cutter}'
        return cutter

    def PrimaryContribution(self): 
        if '100' in self.datafields:
            person = self.marcxml.find("datafield/[@tag='100']"\
                                "/subfield/[@code='a']").text
            date = self.marcxml.find("datafield/[@tag='100']"\
                                "/subfield/[@code='d']")
            if date != None:
                name = f'{person}{date.text}'
                return {'name': name,
                    'person': person.rstrip().removesuffix(','),
                    'agent': 'Agent100'}
            else:
                return {'name': person,
                    'person': person.rstrip().removesuffix(','),
                    'agent': 'Agent100'}

        elif '110' in self.datafields:
            corporate = self.marcxml.find("datafield/[@tag='110']"\
                                "/subfield/[@code='a']").text
            b = self.marcxml.find("datafield/[@tag='110']"\
                                "/subfield/[@code='b']")
            if b != None:
                corporate = corporate+' '+b.text
                
            return {'name': corporate,
                    'agent': 'Agent110'}
        elif '111' in self.datafields:
            meeting = self.marcxml.find("datafield/[@tag='111']"\
                                "/subfield/[@code='a']").text
            n = self.marcxml.find("datafield/[@tag='111']"\
                                "/subfield/[@code='n']")
            d = self.marcxml.find("datafield/[@tag='111']"\
                                "/subfield/[@code='d']")
            c = self.marcxml.find("datafield/[@tag='111']"\
                                "/subfield/[@code='c']")
            if n != None:
                meeting = meeting+n.text
            if d != None:
                meeting = meeting+d.text
            if c != None:
                meeting = meeting+c.text            
            return {'name': meeting,
                    'agent': 'Agent111'}
        else:
            return False       
    
    def Contributions(self):
        contributions = self.marcxml.findall("datafield/[@tag='700']")
        if len(contributions) > 0:
            contributions = [contribution.find("subfield/[@code='a']").text for contribution in contributions]
            return contributions
        else:
            return False

    def Title(self):
        title1 = self.marcxml.find("datafield/[@tag='245']"\
                        "/subfield/[@code='a']").text
        label = title1
        title = title1.rstrip()
        if title.endswith('/'):
            title = title.removesuffix('/')
            title = title.rstrip()
            #return title
        elif title.endswith(':'):
            title = title.removesuffix(':')
            title = title.rstrip()

        subtitle1 = self.marcxml.find("datafield/[@tag='245']"\
                        "/subfield/[@code='b']")
        if subtitle1 != None:
            label = title1+subtitle1.text
            subtitle = subtitle1.text.rstrip() 
            if subtitle.endswith('/'):
                subtitle = subtitle.removesuffix('/')
                subtitle = subtitle.rstrip()
        else:
            subtitle = False               
        
        mainTitle = {
            'title': title, 
            'subtitle': subtitle,
            'label': label
            }

        return mainTitle

    def Subjects(self):
        subjects = self.marcxml.findall(f"datafield/[@tag='650']")
        subjectsList = list() 
        for subject in subjects:
            labelList = list()
            subfield = {'sub': dict()}
            for i in subject:
                if i.attrib['code'] not in ['4','9']:
                    
                    text = i.text.rstrip()
                    text = text.removesuffix('.')
                    labelList.append(text)
                    subfield['sub'][i.attrib['code']] = text
            subfield['label'] =  '--'.join(labelList)
            subjectsList.append(subfield)

        return subjectsList
    
    def SubjectsPlace(self):
        subjects = self.marcxml.findall(f"datafield/[@tag='651']")
        if len(subjects) == 0:
            return False
        subjectsList = list() 
        for subject in subjects:
            labelList = list()
            subfield = {'sub': dict()}
            for i in subject:
                if i.attrib['code'] != '9':
                    labelList.append(i.text)
                    text = i.text.rstrip()
                    text = text.removesuffix('.')
                    subfield['sub'][i.attrib['code']] = text
            subfield['label'] =  '--'.join(labelList)
            subjectsList.append(subfield)

        return subjectsList
    
  
