import numpy as np,glob,os,cv2,json,sys
from PIL import Image
R='/home/user/okno-ha-integracja/custom_components/motor_ha/www/rodzaje/'
SEED=json.load(open('seedy.json')) if os.path.exists('seedy.json') else {}
def maska(t):
    a=cv2.imread(R+t+'.webp'); h,w=a.shape[:2]
    lab=cv2.cvtColor(cv2.medianBlur(a,3),cv2.COLOR_BGR2LAB).astype(float)
    cfg=SEED.get(t,{}); pts=cfg.get('p',[[.5,.25]]); prog=cfg.get('d',28)
    pts=[(int(px*w),int(py*h)) for px,py in pts]
    dE=np.full((h,w),999.)
    for x,y in pts:
        ref=lab[y-2:y+3,x-2:x+3].reshape(-1,3).mean(0); dE=np.minimum(dE,np.sqrt(((lab-ref)**2).sum(2)))
    bg=lab[2:6,2:6].reshape(-1,3).mean(0); dB=np.sqrt(((lab-bg)**2).sum(2))
    m=np.full((h,w),cv2.GC_PR_BGD,np.uint8)
    m[dE<prog]=cv2.GC_PR_FGD
    m[dB<8]=cv2.GC_BGD; m[:3,:]=m[-3:,:]=cv2.GC_BGD; m[:,:3]=m[:,-3:]=cv2.GC_BGD
    for x,y in pts: m[max(0,y-3):y+4,max(0,x-3):x+4]=cv2.GC_FGD
    bgm=np.zeros((1,65));fgm=np.zeros((1,65))
    cv2.grabCut(a,m,None,bgm,fgm,4,cv2.GC_INIT_WITH_MASK)
    f=np.where((m==1)|(m==3),255,0).astype(np.uint8)
    # tylko spójna część z ziarnem
    n,lbl=cv2.connectedComponents(f)
    ids={lbl[y,x] for x,y in pts}-{0}
    if ids and not cfg.get('wszystko'): f=np.where(np.isin(lbl,list(ids)),255,0).astype(np.uint8)
    if cfg.get('box'):
        b=np.zeros((h,w),np.uint8)
        for x0,y0,x1,y1 in cfg['box']: b[int(y0*h):int(y1*h),int(x0*w):int(x1*w)]=255
        f=b if cfg.get('tylko') else np.minimum(f,b)
    if cfg.get('poly'):
        b=np.zeros((h,w),np.uint8); cv2.fillPoly(b,[np.array([[int(px*w),int(py*h)] for px,py in cfg['poly']],np.int32)],255); f=b; f[dB<12]=0
    for x0,y0,x1,y1 in cfg.get('bez',[]): f[int(y0*h):int(y1*h),int(x0*w):int(x1*w)]=0
    f=cv2.GaussianBlur(f,(3,3),0)
    return f
def prz(t,f,col):
    a=np.asarray(Image.open(R+t+'.webp').convert('RGB')).astype(float); w=f.astype(float)[...,None]/255
    L=a.mean(2)[...,None]; Lf=(L*w).sum()/max(w.sum(),1)
    nowy=np.clip(np.array(col,float)*(1+1.8*(L-Lf)/max(Lf,1)),0,255)
    return (a*(1-w)+nowy*w).astype('uint8')
if __name__=='__main__':
    typy=sys.argv[1].split(',') if len(sys.argv)>1 else sorted(os.path.basename(p)[:-5] for p in glob.glob(R+'*.webp'))
    K=(200,40,40); W=6
    o=Image.new('RGB',(W*2*196,((len(typy)+W-1)//W)*178),'white')
    from PIL import ImageDraw; d=ImageDraw.Draw(o)
    typy=[t for t in typy if not SEED.get(t,{}).get('brak')]
    o=Image.new('RGB',(W*2*196,((len(typy)+W-1)//W)*178),'white'); d=ImageDraw.Draw(o)
    for i,t in enumerate(typy):
        f=maska(t); X=(i%W)*392; Y=(i//W)*178
        o.paste(Image.open(R+t+'.webp').convert('RGB'),(X,Y)); o.paste(Image.fromarray(prz(t,f,K)),(X+194,Y)); d.text((X+2,Y+163),t,fill='black')
        os.makedirs('maski',exist_ok=True); cv2.imwrite('maski/'+t+'.png',f)
    o.save('maski.png'); print(o.size)
