# Ramki masek osłon (www/rodzaje/maski/*.png) → src/ramki.js: gdzie na zdjęciu rodzaju jest sama osłona (x, y, szer., wys. w ułamkach).
# Kreator nakłada ten wycinek zdjęcia na szyby wybranego układu. Uruchamiać po maski.py (z katalogu karta/).
import glob, json, os
import numpy as np
from PIL import Image
R = {}
for f in sorted(glob.glob('../custom_components/motor_ha/www/rodzaje/maski/*.png')):
    m = np.array(Image.open(f).convert('L')) > 127
    if not m.any(): continue
    H, W = m.shape; ys, xs = np.where(m)
    R[os.path.basename(f)[:-4]] = [round(xs.min() / W, 4), round(ys.min() / H, 4), round((xs.max() + 1 - xs.min()) / W, 4), round((ys.max() + 1 - ys.min()) / H, 4)]
open('src/ramki.js', 'w').write('// Wygenerowane przez narzedzia/ramki.py – gdzie na zdjęciu rodzaju jest osłona (maska): [x, y, szer., wys.]\nexport const RAMKI = ' + json.dumps(R) + ';\n')
print(len(R))
