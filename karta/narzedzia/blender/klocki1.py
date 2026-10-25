# Sposób 1 – klocki z Blendera z cieniem: każdy element osłony i ramy osobno, neutralnie jasny,
# z cieniem rzucanym na tło (shadow catcher) i maską koloru. Składane w przeglądarce w całe okno.
# python s1.py <out> [probki]
import bpy, bmesh, math, os, sys
OUT = sys.argv[1]; PROBKI = int(sys.argv[2]) if len(sys.argv) > 2 else 48
PX = 800   # px na metr
N = .8     # neutralna jasność (kolor = mnożenie)

def scena():
    bpy.ops.wm.read_factory_settings(use_empty=True); MASKA.clear()
    sc = bpy.context.scene
    sc.render.engine = 'CYCLES'; sc.cycles.device = 'CPU'; sc.cycles.samples = PROBKI; sc.cycles.use_denoising = True
    sc.render.film_transparent = True; sc.render.image_settings.file_format = 'PNG'; sc.render.image_settings.color_mode = 'RGBA'
    sc.view_settings.view_transform = 'AgX'; sc.view_settings.exposure = -.3
    w = bpy.data.worlds.new('w'); sc.world = w; w.use_nodes = True
    bg = w.node_tree.nodes['Background']; bg.inputs['Color'].default_value = (.9, .93, 1, 1); bg.inputs['Strength'].default_value = .7
    bpy.ops.object.light_add(type='SUN'); s = bpy.context.object
    s.data.energy = 3.2; s.data.angle = math.radians(6)
    s.rotation_euler = (math.radians(58), 0, math.radians(-28))   # z lewej u góry, z przodu: cienie w prawo-dół
    bpy.ops.object.camera_add(location=(0, -5, 0)); c = bpy.context.object
    c.data.type = 'ORTHO'; c.rotation_euler = (math.radians(90), 0, 0); sc.camera = c
    return sc

def mat(n, kol=(N, N, N), rough=.45, metal=0., coat=0., sheen=0., fala=None, kol_ok=True):
    m = bpy.data.materials.new(n); m.use_nodes = True; nt = m.node_tree; b = nt.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (*kol, 1); b.inputs['Roughness'].default_value = rough; b.inputs['Metallic'].default_value = metal
    if coat: b.inputs['Coat Weight'].default_value = coat
    if sheen: b.inputs['Sheen Weight'].default_value = sheen
    if fala:
        kier, skala, sila = fala
        t = nt.nodes.new('ShaderNodeTexWave'); t.wave_type = 'BANDS'; t.bands_direction = kier; t.inputs['Scale'].default_value = skala
        t.inputs['Distortion'].default_value = 0
        bp = nt.nodes.new('ShaderNodeBump'); bp.inputs['Strength'].default_value = sila
        nt.links.new(t.outputs[0], bp.inputs['Height']); nt.links.new(bp.outputs['Normal'], b.inputs['Normal'])
    m['kol'] = kol_ok; return m

def box(sx, sy, sz, loc, m, bev=.002):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc); o = bpy.context.object
    o.scale = (sx, sy, sz); bpy.ops.object.transform_apply(scale=True)
    if bev: md = o.modifiers.new('b', 'BEVEL'); md.width = min(bev, sx / 2.2, sy / 2.2, sz / 2.2); md.segments = 3
    o.data.materials.append(m); return o

def profil(pts, dl, loc, m, gladki=True):
    """przekrój (y głębokość, z wysokość) wyciągnięty wzdłuż X"""
    me = bpy.data.meshes.new('p'); bm = bmesh.new()
    a = [bm.verts.new((-dl / 2, y, z)) for y, z in pts]; b = [bm.verts.new((dl / 2, y, z)) for y, z in pts]
    for i in range(len(pts)):
        j = (i + 1) % len(pts); bm.faces.new((a[i], a[j], b[j], b[i]))
    bm.faces.new(a[::-1]); bm.faces.new(b); bm.normal_update(); bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new('p', me); bpy.context.collection.objects.link(o); o.location = loc; o.data.materials.append(m)
    for p in me.polygons: p.use_smooth = gladki
    md = o.modifiers.new('b', 'BEVEL'); md.width = .001; md.segments = 2
    return o

def lapacz(y, w=4, h=4):
    """tło łapiące cień (niewidoczne, zostaje tylko cień)"""
    bpy.ops.mesh.primitive_plane_add(size=1, location=(0, y, 0), rotation=(math.radians(90), 0, 0)); o = bpy.context.object
    o.scale = (w, h, 1); o.is_shadow_catcher = True; o['lapacz'] = 1; return o

MASKA = {}
def maska_mat(b):
    if b in MASKA: return MASKA[b]
    m = bpy.data.materials.new('mk'); m.use_nodes = True; nt = m.node_tree; nt.nodes.clear()
    e = nt.nodes.new('ShaderNodeEmission'); e.inputs['Color'].default_value = (1, 1, 1, 1) if b else (0, 0, 0, 1)
    o = nt.nodes.new('ShaderNodeOutputMaterial'); nt.links.new(e.outputs[0], o.inputs['Surface']); MASKA[b] = m; return m

def render(sc, nazwa, w, h, cx=0, cz=0):
    pw, ph = round(w * PX), round(h * PX)
    cam = sc.camera; cam.location = (cx, -5, cz); cam.data.ortho_scale = max(w, h); cam.data.sensor_fit = 'HORIZONTAL' if w >= h else 'VERTICAL'
    sc.render.resolution_x, sc.render.resolution_y = pw, ph
    sc.render.filepath = os.path.join(OUT, nazwa + '.png'); bpy.ops.render.render(write_still=True)
    # maska: biały = przemalować (osłona / rama), czarny = zostawić
    stare = {}
    for o in bpy.data.objects:
        if o.type != 'MESH': continue
        if o.get('lapacz'): o.hide_render = True; continue
        stare[o.name] = [s.material for s in o.material_slots]
        for s in o.material_slots: s.material = maska_mat(bool(s.material.get('kol', True)))
    sun = [o for o in bpy.data.objects if o.type == 'LIGHT'][0]; sun.hide_render = True
    bgs = sc.world.node_tree.nodes['Background'].inputs['Strength']; st = bgs.default_value; bgs.default_value = 0
    sc.cycles.samples = 4; sc.cycles.use_denoising = False
    sc.render.filepath = os.path.join(OUT, nazwa + '-m.png'); bpy.ops.render.render(write_still=True)
    sc.cycles.samples = PROBKI; sc.cycles.use_denoising = True; sun.hide_render = False; bgs.default_value = st
    for o in bpy.data.objects:
        if o.get('lapacz'): o.hide_render = False
        if o.name in stare:
            for s, m in zip(o.material_slots, stare[o.name]): s.material = m
    print('KLOCEK', nazwa, pw, ph)

def ramka(ow, oh, band, d, y, m, bev=.003):
    for sx, sz, x, z in [(ow, band, 0, oh / 2 - band / 2), (ow, band, 0, -oh / 2 + band / 2), (band, oh - 2 * band, -ow / 2 + band / 2, 0), (band, oh - 2 * band, ow / 2 - band / 2, 0)]:
        box(sx, d, sz, (x, y, z), m, bev)

# -------- rama (PCV, widok na wprost; to samo z zewnątrz i od środka) --------
def ramy():
    sc = scena(); mR = mat('rama', rough=.32, coat=.3); mG = mat('uszcz', (.03, .03, .03), .7, kol_ok=False)
    # ościeżnica 1×1 m, pas 70 mm, z fazką; cień pada na mur i na skrzydło
    ramka(1, 1, .07, .07, 0, mR, .004); ramka(1.004, 1.004, .004, .02, -.03, mG, 0)   # cienka uszczelka przy murze
    lapacz(.06); render(sc, 'oscieznica', 1.08, 1.08)
    sc = scena(); mR = mat('rama', rough=.32, coat=.3); mG = mat('uszcz', (.03, .03, .03), .7, kol_ok=False)
    # skrzydło: pas 62 mm wystający 8 mm, listwa przyszybowa 18 mm cofnięta, czarna uszczelka przy szybie
    ramka(1, 1, .062, .07, -.008, mR, .005); ramka(1 - .124, 1 - .124, .018, .03, -.012, mR, .003)
    ramka(1 - .16, 1 - .16, .003, .01, -.005, mG, 0)
    lapacz(.02); render(sc, 'skrzydlo', 1.06, 1.06)
    sc = scena(); mA = mat('klamka', (.85, .85, .86), .25, metal=.9, kol_ok=False)
    box(.034, .03, .07, (0, -.03, 0), mA, .01); box(.028, .028, .13, (0, -.06, -.05), mA, .012)
    lapacz(.0); render(sc, 'klamka', .12, .26, 0, -.04)

# -------- roleta natynkowa (z zewnątrz): skrzynka ze skosem, pancerz PA39, prowadnice, listwa --------
def natynkowa():
    sc = scena(); mS = mat('skrz', rough=.4, metal=.3, coat=.2)
    k = [(0, -.165), (0, 0), (-.165, 0), (-.165, -.12), (-.12, -.165)]   # przekrój: tył przy murze (y=0), skos u dołu z przodu
    profil([(y, z) for y, z in k], .6, (0, 0, .0825), mS)
    for s in (-1, 1): profil([(y, z) for y, z in [(.002, -.167), (.002, .002), (-.168, .002), (-.168, -.121), (-.122, -.168)]], .006, (s * .303, 0, .0825), mat('zasl', (.5, .5, .5), .5, kol_ok=False))
    lapacz(.0); render(sc, 'nat_skrzynka', .7, .32, 0, -.02)
    sc = scena(); mP = mat('prof', rough=.42, metal=.35, fala=('Z', 3000, .02))
    ph = .039
    for i in range(-5, 14):   # pancerz: wypukłe profile 39 mm, kadr = 8 profili (powtarza się w pionie)
        pts = [(-.009 * math.sin(t / 10 * math.pi), -ph / 2 + ph * .96 * t / 10) for t in range(11)] + [(.002, ph / 2 - .002), (.006, ph / 2 - .006), (.006, -ph / 2 + .006), (.002, -ph / 2)]
        profil(pts, 1.0, (0, 0, i * ph - 4 * ph + ph / 2), mP)
    lapacz(.03); render(sc, 'nat_pancerz', .8, 8 * ph)
    sc = scena(); mS = mat('skrz', rough=.4, metal=.3, coat=.2); mK = mat('kanal', (.04, .04, .045), .8, kol_ok=False)
    box(.053, .06, .6, (0, -.01, 0), mS, .004); box(.014, .05, .62, (.012, -.03, 0), mK, .002)   # prowadnica 53×60, szczotka w kanale
    lapacz(.03); render(sc, 'nat_prowadnica', .1, .3)
    sc = scena(); mS = mat('skrz', rough=.4, metal=.3, coat=.2); mG = mat('guma', (.03, .03, .03), .8, kol_ok=False)
    box(.6, .024, .045, (0, -.005, .01), mS, .005); box(.59, .016, .008, (0, -.005, -.016), mG, .002)
    lapacz(.03); render(sc, 'nat_listwa', .7, .1)

# -------- roleta w kasecie (od środka): kaseta z zaokrąglonym frontem, tkanina, wąskie prowadnice, listwa --------
def kasetowa():
    sc = scena(); mK = mat('kas', rough=.35, coat=.25); mZ = mat('zasl', (.62, .62, .62), .5, kol_ok=False)
    pts = [(0, -.05)] + [(-.045 + .012 * (1 - math.cos(a)), -.05 + .05 * (a / (math.pi / 2))) for a in [i * math.pi / 2 / 8 for i in range(9)]] + [(0, 0)]
    pts = [(0, -.055), (-.03, -.055)] + [(-.03 - .018 * math.sin(a), -.055 + .0275 * (1 - math.cos(a)) * 2) for a in [i * math.pi / 12 for i in range(1, 7)]] + [(-.03, 0), (0, 0)]
    profil(pts, .6, (0, 0, .0275), mK)
    for s in (-1, 1): box(.008, .052, .058, (s * .304, -.024, 0), mZ, .003)
    lapacz(.02); render(sc, 'kas_kaseta', .7, .12)
    sc = scena(); mT = mat('tk', rough=.9, sheen=.6, fala=('X', 700, .9))
    box(1.0, .002, .6, (0, 0, 0), mT, 0); lapacz(.03); render(sc, 'kas_tkanina', .8, .3)
    sc = scena(); mK = mat('kas', rough=.35, coat=.25)
    profil([(0, -.0), (0, .016), (-.012, .016), (-.012, .013), (-.004, .013), (-.004, 0)], .6, (0, 0, 0), mK)   # prowadnica 16 mm (pionowo)
    bpy.context.object.rotation_euler = (0, math.radians(90), 0)
    lapacz(.03); render(sc, 'kas_prowadnica', .05, .3)
    sc = scena(); mK = mat('kas', rough=.35, coat=.25); mL = mat('lin', (.9, .9, .9), .3, metal=.6, kol_ok=False)
    profil([(0, -.006), (-.016, -.006), (-.02, 0), (-.016, .006), (0, .006)], .6, (0, 0, 0), mK)
    for x in (-.012, .012):   # łańcuszek kulkowy
        for i in range(30): bpy.ops.mesh.primitive_uv_sphere_add(radius=.0022, location=(.33 + x, -.02, .02 - i * .005)); bpy.context.object.data.materials.append(mL)
    lapacz(.03); render(sc, 'kas_listwa', .7, .05)

if __name__ == '__main__':
  os.makedirs(OUT, exist_ok=True)
  for f in sys.argv[3].split(',') if len(sys.argv) > 3 else ['ramy', 'natynkowa', 'kasetowa']: globals()[f]()
