from easyocr import Reader
import cv2
import argparse
import json
import numpy as np


def cleanup_text(text):
	# strip out non-ASCII text so we can draw the text on the image
	# using OpenCV
	return "".join([c if ord(c) < 128 else "" for c in text]).strip()

class TextMatchEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, TextMatch):
            return obj.to_json()
        return json.JSONEncoder.default(self, obj)

class TextMatch:
    def __init__(self, prob, text, bbox):
        self.probability = prob
        self.text = text
        self.bbox = bbox
	
    def to_json(self):
        return { 
            "probability": round(self.probability, 4), 
            "text": self.text, 
            "bbox": self.bbox 
        }

ap = argparse.ArgumentParser()
ap.add_argument("-i", "--image", required=True)

args = vars(ap.parse_args())

image = cv2.imread(args["image"])

# print("[INFO] OCR'ing input image...")
reader = Reader(['en'], gpu=False)
results = reader.readtext(image, width_ths=1.0, ycenter_ths=0.8, height_ths=0.8, slope_ths=1.0)
filename = args["image"].split('/')[-1]

jsonData = {
	'filename': filename,
}

#output = []
for (bbox, text, prob) in results:
	# unpack the bounding box
	(tl, tr, br, bl) = bbox
	tl = (int(tl[0]), int(tl[1]))
	tr = (int(tr[0]), int(tr[1]))
	br = (int(br[0]), int(br[1]))
	bl = (int(bl[0]), int(bl[1]))
	
	#output.append(TextMatch(prob, text, [tl, tr, br, bl]))


	coords = "[{}]".format(', '.join(map(str, [tl, tr, br, bl])))
    #display the OCR'd text and associated probability
	print("[INFO] {:.4f}: {} -- {}".format(prob, text, coords))
	
	cv2.rectangle(image, tl, br, (0, 255, 0), 2)
	cv2.putText(image, text, (tl[0], tl[1] - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)

#jsonData['output'] = output
#print(json.dumps(jsonData, indent=2, cls=TextMatchEncoder))

# show the output image
cv2.imshow("Image", image)
cv2.waitKey(0)