import re
import json

activityMap = {
    "navigate": {
        "label": "Navigate to Location",
        "match": [
            ["start"]
        ]
    },
    "offer": {
        "label": "Offer Recieved",
        "match": [
            ["new offer"]
        ]
    },
    "business": {
        "label": "Arrive at Business",
        "match": [
            ["arrived", "success"],
            ["pick up"]
        ]
    },
    "recieved": {
        "label": "Order Recieved",
        "match": [
            ["order summary"],
            ["got order", "success"]
        ]
    },
    "customer": {
        "label": "Arrive at Customer",
        "match": [
            ["pick up from"],
            ["arrived"]
        ]
    },
    "complete": {
        "label": "Complete Delivery",
        "match": [
            ["pick up from"],
            ["swipe to deliver", "success"]
        ]
    },
    "delayed": {
        "label": "Order Delayed",
        "match": [
            ["order is not ready"]
        ]
    },
    "tasks": {
        "label": "Task List",
        "match": [
            ["task list"]
        ]
    },
    "activity": {
        "label": "Earnings Activity",
        "match": [
            ["earnings activity"],
            ["all orders"]
        ]
    },
    "start": {
        "label": "Start Shift",
        "match": [
            ["status"],
            ["pause offers"]
        ]
    },
    "earnings": {
        "label": "Earnings",
        "match": [
            ["earnings"]
        ]
    },
    "stats": {
        "label": "Account Stats",
        "match": [
            ["david todd"]
        ]
    },
    "vehicle": {
        "label": "Vehicle Activity",
        "match": [
            ["since start"]
        ]
    },
}

def matchText(imageText, matchTerms):
    matchResults = []
    
    for i in range(len(matchTerms)):
        term = matchTerms[i]
        if isinstance(term, list):
            matches = matchText(imageText, term)
            result = any(matches)
            matchResults.append(result)
        else:
            print("-- Searching for term: ", term)
            result = re.search(term, imageText, re.IGNORECASE)
            matchResults.append(result)
            if result:
                break
    
    return matchResults 

def matchActivity(imageText):
    label=None
    activity = iter(activityMap.items())
    for current in activity:
        print("Looking for match in ", current[0])
        matches = matchText(imageText, current[1]["match"])
        print("-- Match Results: ", matches)
        if (all(matches)):
            label = current[0]
            break
    
    return label

# keys = activityMap.keys()
# for key in keys:
#     print('("{}"),'.format(key))

with open('../output/earnings-page.json', 'r') as f:
    data = json.load(f)

textList = [o["text"] for o in data["output"]]
imageText = ','.join(textList)

print(imageText)

label = matchActivity(imageText)

print("The matched label is:", label)