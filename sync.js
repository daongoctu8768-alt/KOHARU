// Firebase-backed stand-in for the claude.use("db"/"user") API the page's sync code expects.
(function(){
  const cfg=window.FIREBASE_CONFIG;
  if(!cfg){window.claude={use:async()=>null};return}
  const V="10.12.2",B="https://www.gstatic.com/firebasejs/"+V+"/";
  let uidResolve;const uidReady=new Promise(r=>uidResolve=r);
  const fb=(async()=>{
    const [app,auth,fs]=await Promise.all([import(B+"firebase-app.js"),import(B+"firebase-auth.js"),import(B+"firebase-firestore.js")]);
    const a=app.initializeApp(cfg);
    const au=auth.getAuth(a);
    const db=fs.initializeFirestore(a,{localCache:fs.persistentLocalCache()});
    const btn=document.getElementById("login"),out=document.getElementById("logout");
    btn.onclick=async()=>{const p=new auth.GoogleAuthProvider();
      try{await auth.signInWithPopup(au,p)}catch(e){await auth.signInWithRedirect(au,p)}};
    out.onclick=async()=>{await auth.signOut(au);location.reload()};
    auth.getRedirectResult(au).catch(()=>{});
    auth.onAuthStateChanged(au,u=>{btn.hidden=!!u;out.hidden=!u;if(u)uidResolve(u.uid)});
    return {fs,db};
  })();
  const dbShim={collection(path){return{
    doc(id){return{set:async d=>{const {fs,db}=await fb;await fs.setDoc(fs.doc(db,path,id),d)}}},
    onSnapshot(next,err){let un=null,stop=false;
      fb.then(({fs,db})=>{if(stop)return;un=fs.onSnapshot(fs.collection(db,path),qs=>next({docs:qs.docs.map(d=>({id:d.id,exists:true,data:()=>d.data()}))}),e=>err&&err(e))}).catch(e=>err&&err(e));
      return()=>{stop=true;un&&un()}}}}};
  window.claude={use:async n=>{
    try{await fb}catch(e){return null}
    if(n==="user")return{id:()=>uidReady};
    if(n==="db")return dbShim;
    return null}};
})();
