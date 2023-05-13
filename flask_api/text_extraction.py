import pytesseract
from PIL import Image

image = Image.open("IMG-3666.PNG")
text = pytesseract.image_to_string(image)
print(text)
