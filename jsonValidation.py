import json
import jsonschema
from jsonschema import validate

annotationSchema = {
    "type": "object",
    "properties": {
        "x_min": {"type": "number"},
        "y_min": {"type": "number"},
        "x_max": {"type": "number"},
        "y_max": {"type": "number"},
        "class_id": {"type": "number"},
    },
}

def jsonValidation(data):
    try:
        validate(instance=data, schema = annotationSchema)
    except jsonschema.exceptions.ValidationError as e:
        return False
    return True


data = json.loads('{"x_min": 5, "y_min": 5, "x_max": 5, "y_max": 5, "class_id": 0}')
print("JSON data input: ")
print(data)

if jsonValidation(data):
    print("JSON is valid")
else:
    print("JSON is invalid")

data = json.loads('{"x_min": "This is text.", "y_min": 5, "x_max": 5, "y_max": 5, "class_id": 0}')
print("JSON data input: ")
print(data)

if jsonValidation(data):
    print("JSON is valid")
else:
    print("JSON is invalid")