# Maski ram (www/rodzaje/ramy/*.png, www/ui/ramy/u*.png): biały = rama okna na zdjęciu z Canvy; kreator i karta
# przemalowują ją na wybrany kolor ramy. Uruchamiać po maski.py (z katalogu karta/): python3 narzedzia/ramy.py
import numpy as np,glob,os,cv2
W=os.path.join(os.path.dirname(os.path.abspath(__file__)),'../../custom_components/motor_ha/www/')
def rama(src, maska=None, grubosc=7.5):
    a=cv2.imread(src); h,w=a.shape[:2]
    lab=cv2.cvtColor(a,cv2.COLOR_BGR2LAB).astype(float)
    bg=np.concatenate([lab[:4,:].reshape(-1,3),lab[-4:,:].reshape(-1,3),lab[:,:4].reshape(-1,3),lab[:,-4:].reshape(-1,3)])
    bgc=np.median(bg,0); dB=np.sqrt(((lab-bgc)**2).sum(2))
    # tło: spójne z brzegiem i podobne do koloru tła
    chrom=np.sqrt((lab[...,1]-bgc[1])**2+(lab[...,2]-bgc[2])**2)
    podob=((dB<9)|((chrom<6)&(lab[...,0]>bgc[0]-55)&(lab[...,0]<bgc[0]+5))).astype(np.uint8)
    n,lbl=cv2.connectedComponents(podob)
    brzeg=set(np.unique(np.concatenate([lbl[0],lbl[-1],lbl[:,0],lbl[:,-1]])))-{0}
    tlo=np.isin(lbl,list(brzeg))
    # cień pod produktem też tło (szary, mało nasycony, trochę ciemniejszy)
    fg=~tlo
    s=np.zeros((h,w),bool)
    if maska is not None and os.path.exists(maska):
        s=cv2.dilate((cv2.imread(maska,0)>60).astype(np.uint8),np.ones((3,3)),1)>0
    fgu=fg.astype(np.uint8)
    pier=(fgu-cv2.erode(fgu,np.ones((7,7),np.uint8)))>0
    pier&=~s
    # kolor ramy: najczęstszy kolor przy obrysie produktu (bez osłony)
    px=lab[pier]
    m=np.zeros((h,w),bool)
    if len(px)>=20: m=_ref(lab,px,fg,s,pier,h,w,grubosc)
    return _reszta(m,s,maska,h,w)
def _ref(lab,px,fg,s,pier,h,w,grubosc):
    L0=px[:,0]; hist=np.histogram(L0,bins=16,range=(0,256))[0]; k=hist.argmax()
    sel=px[(L0>=k*16-8)&(L0<k*16+24)]; ref=np.median(sel,0)
    dR=np.sqrt(((lab-ref)**2*np.array([1,2,2])).sum(2))
    prog=14 if ref[0]>170 else 26
    m=fg&~s&(dR<prog)
    if ref[0]>170: m&=lab[...,0]>=ref[0]-7
    n,lbl,st,_=cv2.connectedComponentsWithStats(m.astype(np.uint8))
    keep=np.zeros(n,bool)
    for i in range(1,n):
        if st[i,4]>=25 and (pier&(lbl==i)).any(): keep[i]=True
    m=keep[lbl]
    if ref[0]>170:
        dt=cv2.distanceTransform(m.astype(np.uint8),cv2.DIST_L2,3)
        gr=cv2.dilate((dt>grubosc).astype(np.uint8),np.ones((17,17),np.uint8))>0
        m&=~gr
    return m
def _reszta(m,s,maska,h,w):
    # osłona z prowadnicami w masce (rolety zewnętrzne): prowadnice i parapet pod szybą = rama
    if s.any():
        sm=(cv2.imread(maska,0)>127)
        ys,xs=np.where(sm); y0,y1,x0,x1=ys.min(),ys.max(),xs.min(),xs.max()
        dz=(~sm).astype(np.uint8); dz[:y0,:]=0; dz[y1+1:,:]=0; dz[:,:x0]=0; dz[:,x1+1:]=0
        n2,l2,st2,_=cv2.connectedComponentsWithStats(dz)
        best=None
        for i in range(1,n2):
            x,y,ww,hh,a=st2[i]
            if a>0.04*(x1-x0)*(y1-y0) and x>x0+1 and x+ww<x1 and (best is None or a>st2[best][4]): best=i
        if best is not None:
            x,y,ww,hh,a=st2[best]
            zaslona=np.zeros((h,w),bool); zaslona[:y,x:x+ww]=True; zaslona[:y0+int(.12*(y1-y0)),:]=True
            m|=sm&~zaslona&~(cv2.dilate(dz*0+(l2==best).astype(np.uint8),np.ones((3,3)))>0)
    m=cv2.morphologyEx(m.astype(np.uint8)*255,cv2.MORPH_OPEN,np.ones((2,2),np.uint8))
    return cv2.GaussianBlur(m,(3,3),0)
BEZ_RAMY = {  # zdjęcia, na których rama nie jest oknem (markizy na ścianie, bramy, parasol…) – kolor ramy ich nie zmienia
    'firana', 'markiza', 'markiza_kasetowa', 'markiza_otwarta', 'markiza_polkasetowa', 'markiza_wolnostojaca', 'markiza_volant',
    'markizeta_dach', 'markizoleta', 'parasol', 'zadaszenie', 'swietlik', 'okno_plaskie', 'dach_msl',
    'furtka', 'garaz_boczna', 'garaz_skrzydlowa', 'przesuwna', 'segmentowa', 'skrzydlowa', 'szlaban', 'uchylna', 'roletowa'}
if __name__=='__main__':
    os.makedirs(W+'rodzaje/ramy',exist_ok=True); os.makedirs(W+'ui/ramy',exist_ok=True)
    n=0
    for p in sorted(glob.glob(W+'rodzaje/*.webp')):
        t=os.path.basename(p)[:-5]
        if t in BEZ_RAMY: continue
        f=rama(p,W+'rodzaje/maski/'+t+'.png')
        if (f>127).sum()<40: continue
        cv2.imwrite(W+'rodzaje/ramy/'+t+'.png',f); n+=1
    for i in range(1,9):
        cv2.imwrite(W+f'ui/ramy/u{i}.png',rama(W+f'ui/u{i}.webp',None,10)); n+=1
    print(n)
