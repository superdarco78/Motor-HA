# Sposób 1 – pozostałe klocki dla wszystkich rodzajów. python s2.py <out> <probki> [funkcja,...]
import math, os, sys, bpy
from klocki1 import scena, mat, box, profil, lapacz, render, ramka, N
OUT = sys.argv[1]

def walec(r, dl, loc, m, os_='X', v=32):
    bpy.ops.mesh.primitive_cylinder_add(radius=r, depth=dl, location=loc, vertices=v); o = bpy.context.object
    if os_ == 'X': o.rotation_euler = (0, math.radians(90), 0)
    bpy.ops.object.shade_smooth(); o.data.materials.append(m); return o

def kula(r, loc, m):
    bpy.ops.mesh.primitive_uv_sphere_add(radius=r, location=loc, segments=16, ring_count=8); o = bpy.context.object
    bpy.ops.object.shade_smooth(); o.data.materials.append(m); return o

def siatka(verts, faces, m, gladki=True):
    me = bpy.data.meshes.new('s'); me.from_pydata(verts, [], faces); me.update()
    o = bpy.data.objects.new('s', me); bpy.context.collection.objects.link(o); o.data.materials.append(m)
    for p in me.polygons: p.use_smooth = gladki
    return o

def plachta(fz, w, z0, z1, n=200, y0=0., m=None, fx=None, nx=2, x0=None, gladki=True):
    """powierzchnia: y = fz(z) (+ fx(x)), x od -w/2 do w/2"""
    x0 = -w / 2 if x0 is None else x0
    V, F = [], []
    for i in range(n + 1):
        z = z0 + (z1 - z0) * i / n
        for j in range(nx + 1):
            x = x0 + w * j / nx; V.append((x, y0 + fz(z) + (fx(x) if fx else 0), z))
    for i in range(n):
        for j in range(nx):
            a = i * (nx + 1) + j; F.append((a, a + 1, a + nx + 2, a + nx + 1))
    return siatka(V, F, m, gladki)

ALU = lambda: mat('alu', (.78, .79, .8), .3, metal=.8, kol_ok=False)
CZ = lambda: mat('czarny', (.03, .03, .03), .7, kol_ok=False)

# ---------- okno: listwa-klamka okna dachowego, siłownik łańcuchowy ----------
def okno():
    sc = scena(); mR = mat('rama', rough=.32, coat=.3); mA = ALU()
    box(.6, .04, .06, (0, -.02, 0), mR, .01); box(.42, .03, .028, (0, -.05, -.004), mA, .012)   # listwa z nawiewnikiem
    for i in range(14): box(.012, .01, .02, (-.13 + i * .02, -.04, .022), CZ(), .002)
    lapacz(.0); render(sc, 'dach_klamka', .7, .12)
    sc = scena(); mS = mat('sil', (.85, .85, .85), .35, kol_ok=False)
    box(.36, .045, .05, (0, -.025, 0), mS, .01); box(.05, .03, .03, (0, -.06, -.015), ALU(), .006)
    lapacz(.0); render(sc, 'silownik', .45, .1)
    sc = scena(); mK = mat('kop', (.92, .95, 1), .05, kol_ok=False)
    bpy.ops.mesh.primitive_uv_sphere_add(radius=.5, location=(0, 0, 0)); o = bpy.context.object; o.scale = (1, .25, .35); bpy.ops.object.shade_smooth()
    o.data.materials.append(mK); lapacz(.05); render(sc, 'kopula', 1.1, .4, 0, .1)

# ---------- rolety wewnętrzne: góry, listwy, prowadnice, tkaniny ----------
def rol_wew():
    sc = scena(); mT = mat('tk', rough=.9, sheen=.6, fala=('X', 700, .9))
    walec(.032, .6, (0, -.035, 0), mT)
    for s in (-1, 1): box(.016, .06, .075, (s * .31, -.03, 0), mat('wsp', (.92, .92, .92), .4, kol_ok=False), .006)
    lapacz(.0); render(sc, 'rol_rura', .7, .12)
    sc = scena(); mK = mat('kas', rough=.35, coat=.25)
    box(.6, .075, .085, (0, -.04, 0), mK, .004); box(.62, .07, .09, (0, -.035, 0), mat('zasl', (.6, .6, .6), .5, kol_ok=False), .003)
    box(.6, .076, .085, (0, -.041, 0), mK, .004)
    lapacz(.0); render(sc, 'rol_kwadrat', .7, .14)
    sc = scena(); mD = mat('drewno', (.55, .4, .25), .55, fala=('X', 60, .15), kol_ok=False)
    box(.62, .04, .045, (0, -.02, 0), mD, .004); lapacz(.0); render(sc, 'rol_belka', .7, .09)
    sc = scena(); mA = mat('aludach', (.72, .73, .74), .3, metal=.7, kol_ok=False)
    box(.6, .05, .07, (0, -.03, 0), mA, .006); lapacz(.0); render(sc, 'rol_kaseta_dach', .7, .12)
    # listwy dolne
    sc = scena(); mK = mat('kas', rough=.35, coat=.25)
    profil([(0, -.006), (-.016, -.006), (-.02, 0), (-.016, .006), (0, .006)], .6, (0, 0, 0), mK)
    lapacz(.03); render(sc, 'rol_listwa', .7, .05)
    sc = scena(); mK = mat('kas', rough=.35, coat=.25); box(.6, .03, .04, (0, -.016, 0), mK, .006)
    lapacz(.03); render(sc, 'rol_listwa_ciezka', .7, .07)
    sc = scena(); mA = mat('aludach', (.72, .73, .74), .3, metal=.7, kol_ok=False)
    box(.6, .03, .035, (0, -.016, 0), mA, .006); box(.14, .03, .02, (0, -.04, -.012), mat('uch', (.5, .5, .52), .3, metal=.8, kol_ok=False), .008)
    lapacz(.03); render(sc, 'rol_listwa_dach', .7, .08)
    # prowadnice (pionowe klocki .3 m)
    sc = scena(); mK = mat('kas', rough=.35, coat=.25); box(.045, .05, .6, (0, -.025, 0), mK, .004); box(.008, .04, .62, (.02, -.03, 0), mat('cien', (.15, .15, .15), .8, kol_ok=False), .002)
    lapacz(.03); render(sc, 'rol_prow_u', .09, .3)
    sc = scena(); mK = mat('kas', rough=.35, coat=.25); box(.03, .04, .6, (0, -.02, 0), mK, .004); box(.004, .03, .62, (.01, -.03, 0), CZ(), .001)
    lapacz(.03); render(sc, 'rol_prow_zip', .07, .3)
    sc = scena(); mA = mat('aludach', (.72, .73, .74), .3, metal=.7, kol_ok=False); box(.03, .04, .6, (0, -.02, 0), mA, .004)
    lapacz(.03); render(sc, 'rol_prow_dach', .07, .3)
    # tkaniny (pasy .3 m, powtarzane w pionie)
    sc = scena(); mB = mat('bl', rough=.75, sheen=.3, fala=('X', 300, .25)); box(1.0, .002, .6, (0, 0, 0), mB, 0)
    lapacz(.03); render(sc, 'rol_blackout', .8, .3)
    sc = scena(); mS = mat('scr', rough=.85, fala=('X', 1600, .4)); box(1.0, .002, .6, (0, 0, 0), mS, 0)
    lapacz(.03); render(sc, 'rol_screen', .8, .3)
    sc = scena(); mB = mat('bam', (.85, .8, .62), .5, coat=.3)
    for i in range(-2, 40): walec(.0035, 1.0, (0, -.004, -.15 + i * .0075 + .00375), mB, v=12)
    for x in (-.25, .25): box(.003, .012, .7, (x, -.01, 0), mat('nic', (.3, .25, .15), .8, kol_ok=False), 0)
    lapacz(.03); render(sc, 'rol_bambus', .8, .3)

# ---------- rolety zewnętrzne: skrzynki i pancerze ----------
def rol_zew():
    sc = scena(); mS = mat('skrz', rough=.4, metal=.3, coat=.2)
    walec(.1, .6, (0, -.1, 0), mS, v=64)
    for s in (-1, 1): walec(.102, .006, (s * .303, -.1, 0), mat('zasl', (.5, .5, .5), .5, kol_ok=False), v=64)
    lapacz(.0); render(sc, 'okr_skrzynka', .7, .3, 0, -.03)
    sc = scena(); mS = mat('klapa', rough=.5, metal=.2)
    box(.6, .02, .06, (0, -.01, 0), mS, .003); lapacz(.0); render(sc, 'nad_klapa', .7, .1)
    sc = scena(); mP = mat('prof', rough=.42, metal=.35, fala=('Z', 3000, .02)); ph = .045
    for i in range(-5, 14):   # profil ekstrudowany: płaski z fazami, ciężki
        pts = [(-.012, -ph / 2 + .004), (-.014, -ph / 2 + .008), (-.014, ph / 2 - .008), (-.012, ph / 2 - .004), (.002, ph / 2 - .002), (.006, ph / 2 - .006), (.006, -ph / 2 + .006), (.002, -ph / 2)]
        profil(pts, 1.0, (0, 0, i * ph - 4 * ph + ph / 2), mP)
    lapacz(.03); render(sc, 'pancerz_ext', .8, 8 * ph)

# ---------- plisy, plaster, rzymska ----------
def har():
    sc = scena(); mA = mat('szyna', rough=.35, metal=.3, coat=.2)
    profil([(0, -.011), (-.02, -.011), (-.022, -.008), (-.022, .008), (-.02, .011), (0, .011)], .6, (0, 0, 0), mA)
    lapacz(.03); render(sc, 'har_szyna', .7, .06)
    def falda(nazwa, skok, gl, ostra=True, n=10, miekka=False):
        sc = scena(); mT = mat('pl', rough=.85, sheen=.5, fala=('X', 500, .3))
        def fz(z):
            t = (z / skok) % 1
            return -gl * (1 - abs(2 * t - 1)) if not miekka else -gl * math.sin(math.pi * t) ** .7
        plachta(fz, 1.0, -skok * (n / 2 + 2), skok * (n / 2 + 2), n=(n + 4) * (24 if miekka else 2), m=mT, gladki=miekka)
        lapacz(.03); render(sc, nazwa, .8, skok * n)
    falda('plisa', .03, .012, n=10)
    falda('plaster', .04, .02, n=8)
    falda('rzymska_faldy', .08, .045, n=4, miekka=True)

# ---------- żaluzje: lamele pochylone z drabinkami i pakiet ----------
def lam():
    def tile(nazwa, gl, skok, kat, fL, drab=None, tasma=None, luk=0, n=8, zew=False):
        sc = scena(); mL = fL(); drab = drab and drab(); tasma = tasma and tasma()
        for i in range(-3, n + 3):
            z = -skok * n / 2 + (i + .5) * skok
            if luk:
                pts = []
                for k in range(13):
                    u = -1 + 2 * k / 12; pts.append((u * gl / 2, luk * (1 - u * u)))
                pts = pts + [(y + .0012, zz - .0012) for y, zz in pts[::-1]]
                o = profil([(y, zz) for y, zz in pts], 1.0, (0, 0, z), mL)
            else:
                o = box(1.0, gl, .0012 if not tasma else .004, (0, 0, z), mL, .0005)
            o.rotation_euler = (math.radians(kat), 0, 0)
        for x in (-.3, .3):
            if tasma: box(.025, .002, skok * (n + 6), (x, -gl / 2 - .003, 0), tasma, 0)
            elif drab:
                for y in ((-gl / 2 - .002, gl / 2 + .002) if zew else (-gl / 2 - .002,)): box(.0025, .0025, skok * (n + 6), (x, y, 0), drab, 0)
        lapacz(.06); render(sc, nazwa, .8, skok * n)
    def pakiet(nazwa, gl, gr, fL, n=12):
        sc = scena(); mL = fL()
        for i in range(n): box(1.0, gl, gr * .8, (0, 0, -gr * n / 2 + (i + .5) * gr), mL, .0005)
        lapacz(.06); render(sc, nazwa, .8, gr * n)
    mL = lambda: mat('lam', rough=.35, metal=.45); sz = lambda: mat('sznur', (.85, .85, .83), .9, kol_ok=False)
    tile('zal25', .025, .021, -35, mL, drab=sz); pakiet('zal25_pak', .025, .0035, mL)
    mD = lambda: mat('drew', rough=.6, fala=('X', 40, .1)); tas = lambda: mat('tasma', (.82, .8, .76), .9, kol_ok=False)
    tile('zal50', .05, .042, -35, mD, tasma=tas); pakiet('zal50_pak', .05, .007, mD)
    mC = lambda: mat('c80', rough=.4, metal=.35); lin = lambda: mat('linka', (.05, .05, .05), .7, kol_ok=False)
    tile('c80', .08, .072, -30, mC, drab=lin, luk=.009, zew=True); pakiet('c80_pak', .08, .012, mC)
    tile('z90', .09, .08, -25, mC, drab=lin, zew=True); pakiet('z90_pak', .09, .013, mC)
    tile('f80', .08, .072, -20, mC, drab=lin, zew=True)
    tile('pergola_lam', .16, .14, -60, mC, n=6)
    sc = scena(); mS = mat('szyna', rough=.35, metal=.3, coat=.2); box(.6, .03, .03, (0, -.015, 0), mS, .004)
    lapacz(.03); render(sc, 'zal_szyna', .7, .06)
    sc = scena(); mC = mat('c80', rough=.4, metal=.35); box(.6, .1, .09, (0, -.05, 0), mC, .006)
    lapacz(.0); render(sc, 'fas_skrzynka', .7, .14)
    sc = scena(); mC = mat('c80', rough=.4, metal=.35); profil([(0, -.012), (-.04, -.012), (-.045, -.006), (-.045, .006), (-.04, .012), (0, .012)], .6, (0, 0, 0), mC)
    lapacz(.03); render(sc, 'fas_listwa', .7, .06)
    sc = scena(); mC = mat('c80', rough=.4, metal=.35); box(.026, .05, .6, (0, -.025, 0), mC, .004); box(.006, .04, .62, (0, -.05, 0), CZ(), .001)
    lapacz(.03); render(sc, 'fas_prowadnica', .07, .3)

# ---------- pionowe, panele, zasłony ----------
def pion():
    sc = scena(); mT = mat('tk', rough=.9, sheen=.6, fala=('Z', 500, .6)); box(.089, .002, .6, (0, 0, 0), mT, 0)
    for zz in (-.29,): box(.08, .006, .01, (0, -.004, zz), mat('obc', (.9, .9, .9), .4, kol_ok=False), .002)
    lapacz(.02); render(sc, 'pion_lamela', .12, .3)
    sc = scena(); mT = mat('tk', rough=.9, sheen=.6, fala=('Z', 500, .6)); box(.3, .002, .6, (0, 0, 0), mT, 0)
    lapacz(.02); render(sc, 'panel_tk', .34, .3)
    sc = scena(); mS = mat('szyna', rough=.35, metal=.3, coat=.2); box(.6, .04, .04, (0, -.02, 0), mS, .004)
    lapacz(.03); render(sc, 'pion_szyna', .7, .07)
    sc = scena(); mK = mat('karnisz', (.35, .33, .3), .3, metal=.8, kol_ok=False)
    walec(.012, .6, (0, -.06, 0), mK)
    for s in (-1, 1): kula(.022, (s * .31, -.06, 0), mK); box(.012, .06, .012, (s * .26, -.03, 0), mK, .004)
    lapacz(.0); render(sc, 'karnisz', .7, .07)
    for nazwa, fala, amp in (('zas_tk', 'z', .022), ('zas_wave', 'w', .035)):
        sc = scena(); mT = mat('zt', rough=.95, sheen=.6, fala=('Z', 400, .4))
        okres = .1 if fala == 'z' else .12
        fx = (lambda x: -amp * (.5 + .5 * math.cos(2 * math.pi * x / okres)) ** (1.6 if fala == 'z' else 1))
        plachta(lambda z: 0, 1.0, -.4, .4, n=2, m=mT, fx=fx, nx=200)
        lapacz(.05); render(sc, nazwa, .6, .3)

# ---------- okiennice ----------
def okien():
    sc = scena(); mD = mat('ok', rough=.55, fala=('X', 50, .08))
    w, h = .45, .6
    for x in (-w / 2 + .03, w / 2 - .03): box(.06, .03, h + .2, (x, 0, 0), mD, .004)
    a = math.radians(40)
    for i in range(-6, 20):   # lamelka 50×5 mm pochylona o 40°
        pts = [(-.025 * math.cos(a) - .0025 * math.sin(a), -.025 * math.sin(a) + .0025 * math.cos(a)), (.025 * math.cos(a) - .0025 * math.sin(a), .025 * math.sin(a) + .0025 * math.cos(a)),
               (.025 * math.cos(a) + .0025 * math.sin(a), .025 * math.sin(a) - .0025 * math.cos(a)), (-.025 * math.cos(a) + .0025 * math.sin(a), -.025 * math.sin(a) - .0025 * math.cos(a))]
        profil(pts[::-1], w - .1, (0, .012, -h / 2 + i * .045), mD, gladki=False)
    lapacz(.04); render(sc, 'okien_skrz', .5, .45)
    sc = scena(); mD = mat('ok', rough=.55, fala=('X', 50, .08)); box(.45, .03, .06, (0, 0, 0), mD, .004)
    lapacz(.04); render(sc, 'okien_poprzeczka', .5, .09)

# ---------- markizy, pergole, żagiel, parasol, zadaszenie ----------
def mark():
    sc = scena(); mK = mat('mkas', (.85, .85, .85), .35, coat=.3, kol_ok=False)
    profil([(0, -.08), (-.12, -.08), (-.16, -.04), (-.16, .02), (-.1, .07), (0, .07)], .6, (0, 0, 0), mK)
    for s in (-1, 1): profil([(0, -.082), (-.122, -.082), (-.162, -.04), (-.162, .022), (-.1, .072), (0, .072)], .006, (s * .303, 0, 0), mat('zasl', (.6, .6, .6), .5, kol_ok=False))
    lapacz(.0); render(sc, 'mark_kaseta', .7, .24, 0, -.02)
    sc = scena(); mT = mat('mt', rough=.85, sheen=.4, fala=('X', 300, .2))
    walec(.05, .6, (0, -.08, 0), mT)
    box(.6, .025, .04, (0, -.012, .06), mat('wsp', (.85, .85, .85), .35, kol_ok=False), .004)
    for s in (-1, 1): box(.03, .1, .12, (s * .29, -.05, .02), mat('wsp', (.85, .85, .85), .35, kol_ok=False), .006)
    lapacz(.0); render(sc, 'mark_rura', .7, .2)
    sc = scena(); mT = mat('mt', rough=.85, sheen=.4, fala=('X', 300, .2)); box(1.0, .002, .6, (0, 0, 0), mT, 0)
    lapacz(.03); render(sc, 'mark_tk', .8, .3)
    sc = scena(); mK = mat('mkas', (.85, .85, .85), .35, coat=.3, kol_ok=False)
    profil([(0, -.03), (-.05, -.03), (-.06, 0), (-.05, .03), (0, .03)], .6, (0, 0, 0), mK)
    lapacz(.06); render(sc, 'mark_listwa', .7, .09)
    sc = scena(); mT = mat('mt', rough=.85, sheen=.4, fala=('X', 300, .2))
    V, F = [], []; n = 120   # falbana z falistym dołem
    for i in range(n + 1):
        x = -.5 + i / n; V += [(x, 0, 0), (x, 0, -.12 - .025 * abs(math.sin(x * math.pi * 10)))]
    for i in range(n): F.append((2 * i, 2 * i + 2, 2 * i + 3, 2 * i + 1))
    siatka(V, F, mT, False); lapacz(.03); render(sc, 'mark_volant', .8, .2, 0, -.07)
    sc = scena(); mK = mat('mkas', (.85, .85, .85), .35, coat=.3, kol_ok=False)
    box(.035, .035, .6, (0, -.02, 0), mK, .006); lapacz(.03); render(sc, 'slup', .08, .3)
    sc = scena(); mT = mat('mt', rough=.85, sheen=.4, fala=('X', 300, .2))   # kosz (markiza koszowa): półkopuła z żebrami
    bpy.ops.mesh.primitive_uv_sphere_add(radius=.5, location=(0, 0, 0), segments=64, ring_count=32); o = bpy.context.object
    o.scale = (1, .6, .55); bpy.ops.object.shade_smooth(); o.data.materials.append(mT)
    bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='DESELECT'); bpy.ops.object.mode_set(mode='OBJECT')
    for v in o.data.vertices: v.select = v.co.y > .01 or v.co.z < 0
    bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.delete(type='VERT'); bpy.ops.object.mode_set(mode='OBJECT')
    lapacz(.05); render(sc, 'mark_kosz', 1.1, .35, 0, .14)
    sc = scena(); mT = mat('mt', rough=.85, sheen=.4, fala=('X', 300, .2))   # żagiel: trójkąt napięty
    siatka([(-.5, -.1, .25), (.5, -.3, .3), (0, 0, -.3)], [(0, 1, 2)], mT, False); lapacz(.1); render(sc, 'zagiel', 1.1, .7)
    sc = scena(); mT = mat('mt', rough=.85, sheen=.4, fala=('X', 300, .2))   # parasol: czasza z 8 klinami
    V = [(0, 0, .18)]; F = []
    for i in range(17):
        a = math.pi * i / 16; V.append((-.5 * math.cos(a), -.5 * math.sin(a) * .3 - .02, (-.02 if i % 2 else 0)))
    for i in range(16): F.append((0, i + 1, i + 2))
    siatka(V, F, mT, False); walec(.012, .9, (0, -.05, -.4), mat('mszt', (.4, .4, .4), .3, metal=.8, kol_ok=False), os_='Z')
    lapacz(.05); render(sc, 'parasol', 1.1, 1.0, 0, -.25)
    sc = scena(); mS = mat('szk', (.85, .92, .95), .05, kol_ok=False); mK = mat('mkas', (.85, .85, .85), .35, coat=.3, kol_ok=False)
    box(.6, .3, .012, (0, -.15, .0), mS, .002); box(.6, .04, .03, (0, -.3, -.01), mK, .004)
    lapacz(.0); render(sc, 'zadaszenie', .7, .12)

if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    for f in (sys.argv[3].split(',') if len(sys.argv) > 3 else ['okno', 'rol_wew', 'rol_zew', 'har', 'lam', 'pion', 'okien', 'mark']): globals()[f]()
