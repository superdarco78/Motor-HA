# Zdjęcia bram (Canva): {typ}-zam.webp (zamknięta) i {typ}-tlo.webp (to samo zdjęcie bez skrzydła).
# Skrzydło = różnica obu zdjęć → {typ}-skrzydlo.webp z przezroczystością; ramka skrzydła → src/bramy_zdj.js.
# Użycie (z katalogu karta/): python3 narzedzia/bramy.py ŹRÓDŁO
import json, sys, os, glob
import numpy as np, cv2
from PIL import Image
zr, cel = sys.argv[1], '../custom_components/motor_ha/www/bramy'
R = {}
for f in sorted(glob.glob(os.path.join(zr, '*-zam.webp'))):
    t = os.path.basename(f)[:-9]
    z = np.array(Image.open(f).convert('RGB')).astype(int); tl = np.array(Image.open(os.path.join(zr, t + '-tlo.webp')).convert('RGB')).astype(int)
    d = np.abs(z - tl).max(axis=2)
    m = (d > 28).astype(np.uint8)
    m = cv2.morphologyEx(m, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
    n, l, st, _ = cv2.connectedComponentsWithStats(m)
    duze = [i for i in range(1, n) if st[i, 4] > m.size * .002]
    m = np.isin(l, duze).astype(np.uint8)
    m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8))
    # wypełnij dziury w środku skrzydła (szczeliny między lamelami też należą do skrzydła)
    cs, _ = cv2.findContours(m, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cv2.drawContours(m, cs, -1, 1, -1)
    if t != 'szlaban':   # skrzydło bramy i drzwi garażu to prostokąt (ciemne rogi zlewają się z ciemnym wnętrzem garażu)
        ys, xs = np.where(m > 0); m[:] = 0; m[ys.min():ys.max() + 1, xs.min():xs.max() + 1] = 1
    a = cv2.GaussianBlur((m * 255).astype(np.uint8), (3, 3), 0)
    H, W = m.shape; ys, xs = np.where(m > 0)
    R[t] = [round(xs.min() / W, 4), round(ys.min() / H, 4), round((xs.max() + 1 - xs.min()) / W, 4), round((ys.max() + 1 - ys.min()) / H, 4)]
    rgba = np.dstack([z.astype(np.uint8), a])
    Image.fromarray(rgba, 'RGBA').save(os.path.join(cel, t + '-skrzydlo.webp'), quality=88)
    Image.open(os.path.join(zr, t + '-tlo.webp')).convert('RGB').save(os.path.join(cel, t + '-tlo.webp'), quality=88)
    Image.open(f).convert('RGB').save(os.path.join(cel, t + '-zam.webp'), quality=88)
open('src/bramy_zdj.js', 'w').write('// Wygenerowane przez narzedzia/bramy.py – ramka skrzydła na zdjęciu bramy (www/bramy): [x, y, szer., wys.]\nexport const BRAMY_ZDJ = ' + json.dumps(R) + ';\n')
print(json.dumps(R))
