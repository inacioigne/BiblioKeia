def MakeRWO(identifiesRWO):

    listRWO = [f'<{i}>' for i in identifiesRWO]

    return ", ".join(listRWO)
