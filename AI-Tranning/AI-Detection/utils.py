ID2LABEL = {0: "person", 1: "bicycle", 2:"car", 3:"motocycle", 5:"bus", 7:"truck"} 
PALETTE = (2 ** 11 - 1, 2 ** 15 - 1, 2 ** 20 - 1)

MODEL_PATH = "model_data/yolov8m.pt"

# MODEL_PATH = "model_data/best.pt"

AUTHEN_ACCOUNT = 'accountService.json'

def compute_color_for_labels(label):

    if label == 0: # person
        color = (85, 45, 255)
    elif label == 2: # Car
        color = (222, 82, 175)
    elif label == 3: # Motobike
        color = (0, 204, 255)
    elif label == 5: # Bus
        color = (0, 149, 255)
    else:
        color = [int((p * (label ** 2 - label + 1)) % 255) for p in PALETTE]
    return tuple(color)