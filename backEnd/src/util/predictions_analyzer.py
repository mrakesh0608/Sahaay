def predictions_analyzer(predictions, classes):
    pred_dict = {}

    for x in classes:
        pred_dict[classes[x]] = predictions[0][x]

    dict_dis = sorted(pred_dict.items(), key=lambda x: x[1], reverse=True)
    dict_dis = dict(sorted(pred_dict.items(), key=lambda x: x[1], reverse=True)[:3])
    # print(dict_dis)

    label = str(max(dict_dis, key=dict_dis.get))
    accuracy = float(round(dict_dis[label], 2))

    return [label, accuracy]
