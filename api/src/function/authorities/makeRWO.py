def MakeRWO(identifiesRWO):

    listRWO = [f'<{i.uri}>' for i in identifiesRWO]

    return ", ".join(listRWO)
