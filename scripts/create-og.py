"""Optional development helper: regenerate the committed social card with Pillow."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
root = Path(__file__).resolve().parent.parent
image = Image.new('RGB', (1200,630), '#f5f7fc')
d = ImageDraw.Draw(image)
fonts = Path('/System/Library/Fonts/Supplemental')
def font(size, serif=False):
    return ImageFont.truetype(str(fonts / ('Georgia.ttf' if serif else 'Arial.ttf')), size)
d.rounded_rectangle((62,55,105,101), radius=9, fill='#315bda')
d.text((72,57),'K',font=font(33),fill='white')
d.text((120,58),'Knowdexia.',font=font(34),fill='#17243c')
d.text((62,163),'Turn your documents into',font=font(59),fill='#17243c')
d.text((62,235),'searchable, connected',font=font(59),fill='#315bda')
d.text((62,307),'knowledge.',font=font(59),fill='#17243c')
d.text((65,416),'Search by meaning. Ask across documents. Verify the source.',font=font(26),fill='#59667b')
d.line((65,494,1135,494),fill='#dce3ef',width=2)
for x,label in [(65,'DOCUMENTS'),(350,'KNOWLEDGE'),(660,'ANSWERS'),(960,'SOURCES')]:
    d.text((x,534),label,font=font(19),fill='#315bda')
image.save(root/'og.png', optimize=True)
