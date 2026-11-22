import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
const scene=new THREE.Scene();scene.background=new THREE.Color(0x93c8e9);scene.fog=new THREE.Fog(0x93c8e9,65,180);
const camera=new THREE.PerspectiveCamera(65,innerWidth/innerHeight,.1,300);
const renderer=new THREE.WebGLRenderer({antialias:true});renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;document.body.appendChild(renderer.domElement);
scene.add(new THREE.HemisphereLight(0xffffff,0x65714b,2));
const sun=new THREE.DirectionalLight(0xfff0d4,2.3);sun.position.set(30,50,20);sun.castShadow=true;scene.add(sun);
const mat=(color,rough=.7)=>new THREE.MeshStandardMaterial({color,roughness:rough});
const M={grass:mat(0x5d9a54),road:mat(0x343a42),white:mat(0xf3eadb),gold:mat(0xc99c37),black:mat(0x17191d),brown:mat(0x9a6335),fur:mat(0xf1e5c9),pink:mat(0xe9b7a9),glass:mat(0x253d53,.25),green:mat(0x2c713f),brick:mat(0xc8b59a),blue:mat(0x597dba),red:mat(0xa84436)};
function box(w,h,d,m,x,y,z){let o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;scene.add(o);return o}
function sphere(r,m,x,y,z,sx=1,sy=1,sz=1){let o=new THREE.Mesh(new THREE.SphereGeometry(r,18,14),m);o.position.set(x,y,z);o.scale.set(sx,sy,sz);o.castShadow=true;scene.add(o);return o}
function ground(){box(220,.2,220,M.grass,0,-.12,0);box(100,.18,10,M.road,0,0,35);box(10,.18,100,M.road,35,0,0);for(let i=-45;i<50;i+=9){box(4,.04,.25,mat(0xe9e3cc),i,.02,35)}}
ground();
function tree(x,z){box(.5,3,.5,mat(0x704a2b),x,1.5,z);sphere(2.2,M.green,x,4,z);sphere(1.5,mat(0x3f8a45),x+1,4.3,z+.3)}
for(let x=-45;x<=45;x+=10){tree(x,-24);tree(x,23)}
function building(x,z,w,d,h,color){box(w,h,d,mat(color),x,h/2,z);for(let y=2;y<h-1;y+=3)for(let xx=-w/2+1;xx<w/2-1;xx+=3)box(1.1,1.5,.08,M.glass,x+xx,y,z-d/2-.05)}
building(-20,-8,12,12,13,0xe0d3bd);building(-38,-8,10,12,18,0xafa8a0);building(-20,55,14,15,20,0xd5d7d9);building(52,10,14,14,15,0xc9b69b);building(53,48,13,13,22,0x9caec0);
function mansion(){box(23,1,17,M.white,0,.5,-8);box(20,8,15,M.white,0,5,-8);box(28,1,3,M.gold,0,9.2,-8);box(6,5,4,M.white,0,11,-8);box(4,1,4,M.gold,0,13.6,-8);for(let x of [-8,-4,4,8])box(1,7,1,M.white,x,4.5,-.2);box(4,4,.3,M.black,0,3,-.42);box(2.8,3,.15,M.gold,0,3,-.62);box(12,.3,8,mat(0x9acfe7),0,.2,-25);box(13,.4,9,M.white,0,.1,-25);for(let x of [-12,12]){box(1,4,1,M.gold,x,2,-8);sphere(.7,M.gold,x,4.4,-8)}}
mansion();
function makeLion(name,fur,outfit,x,z,role='lion'){let g=new THREE.Group();scene.add(g);g.position.set(x,0,z);const torso=new THREE.Mesh(new THREE.CapsuleGeometry(.48,.9,6,12),outfit);torso.position.y=1.45;torso.castShadow=true;g.add(torso);const head=sphere(.48,fur,0,2.35,0,1,1,1);g.add(head);if(role!=='panther'){let mane=sphere(.65,mat(0xd5c49c),0,2.35,-.12,1,1,1);g.add(mane);head.position.z=.12;let muzzle=sphere(.24,M.white,0,2.2,.42,1, .65,1);g.add(muzzle);sphere(.12,M.black,0,2.28,.61).parent=g;for(let sx of [-.23,.23]){sphere(.12,fur,sx,2.65,.08).parent=g;sphere(.055,M.black,sx,2.36,.38).parent=g}}else{for(let sx of [-.22,.22]){sphere(.12,M.black,sx,2.65,.05).parent=g;sphere(.05,M.gold,sx,2.34,.35).parent=g}}
for(let sx of [-.3,.3]){let leg=box(.23,.85,.23,outfit,x+sx,0.45,z);leg.parent=g;leg.position.set(sx,.45,0);let arm=box(.2,.75,.2,outfit,x+sx*1.7,1.55,z);arm.parent=g;arm.position.set(sx*1.6,1.5,0)}
let tail=new THREE.Mesh(new THREE.CylinderGeometry(.07,.09,.9,8),fur);tail.position.set(.55,.9,-.3);tail.rotation.z=-.5;g.add(tail);g.userData={name,role};return g}
const sheru=makeLion('Sheru',M.fur,M.white,0,4);sheru.scale.set(1.15,1.15,1.15);
const wife=makeLion('Wife',M.fur,mat(0xf5e8d0),-5,3);wife.scale.set(.86,.94,.86);
const cub=makeLion('Cub',M.fur,M.white,-7,5);cub.scale.set(.55,.6,.55);
const mom=makeLion('Mother',M.fur,mat(0xe8dec8),-9,3);mom.scale.set(.85,.9,.85);
const panther=makeLion('Kaal Bhai',M.black,M.black,6,4,'panther');panther.scale.set(1.05,1.1,1.05);
for(let i=0;i<3;i++){let bg=makeLion('Bodyguard',M.brown,M.black,9+i*2,2+i*2);bg.scale.set(.9,1,.9)}
// car
const car=new THREE.Group();scene.add(car);box(3,.7,5,mat(0x142f66),0,.7,0).parent=car;box(2.6,.8,2.5,M.glass,0,1.35,-.2).parent=car;for(let x of [-1.25,1.25])for(let z of [-1.6,1.6]){let wheel=new THREE.Mesh(new THREE.CylinderGeometry(.48,.48,.28,18),M.black);wheel.rotation.z=Math.PI/2;wheel.position.set(x,.48,z);wheel.castShadow=true;car.add(wheel)}car.position.set(3,0,12);
const marker=sphere(.35,M.gold,0,.6,0);marker.position.set(-3,.65,2);marker.material.emissive=new THREE.Color(0x553300);
let balance=100000000,mission=0,driving=false,day=true,donations=0;let saved={};
const missions=['Explore your mansion and meet your family','Visit the market','Help a person in need','Take Kaal Bhai for a ride','Return home'];
const $=id=>document.getElementById(id);function cash(){ $('cash').textContent=balance.toLocaleString('en-IN');}
function toast(s){let t=$('toast');t.textContent=s;t.style.display='block';setTimeout(()=>t.style.display='none',2300)}
function setMission(){ $('missionText').textContent=missions[mission%missions.length];}
cash();setMission();
const phone=$('phonePanel');$('phoneToggle').onclick=()=>phone.classList.toggle('hidden');document.querySelector('.close').onclick=()=>phone.classList.add('hidden');
document.querySelectorAll('[data-app]').forEach(b=>b.onclick=()=>app(b.dataset.app));
function app(a){let c=$('appContent');let html='';
if(a==='bank')html=`<div class="appCard">Sheru Royal Bank<br><b>Balance: ₹${balance.toLocaleString('en-IN')}</b><p class="small">Virtual game currency only</p></div><button onclick="window.donate(10000)">Donate ₹10,000</button><button onclick="window.donate(50000)">Donate ₹50,000</button>`;
if(a==='messages')html='<div class="appCard">📩 Wife: Come home, dinner is ready!<br>🐈‍⬛ Kaal: Bhai, market chalte hain.<br>👮 Bodyguard: Sir, car ready.</div>';
if(a==='contacts')html='<div class="appCard">Wife · Maa · Cub · Kaal Bhai · Bodyguard</div><button onclick="window.callPerson(\'Wife\')">Call Wife</button><button onclick="window.callPerson(\'Kaal Bhai\')">Call Kaal Bhai</button>';
if(a==='map')html='<div class="appCard">📍 Mansion · Market · Park · Hospital · Police Station</div><button onclick="window.gotoMarket()">Go to Market</button><button onclick="window.gotoPark()">Go to Park</button>';
if(a==='missions')html=`<div class="appCard">${missions.map((m,i)=>`${i+1}. ${m} ${i<mission?'✅':''}`).join('<br>')}</div><button onclick="window.nextMission()">Next mission</button>`;
if(a==='garage')html='<div class="appCard">Royal SUV · Blue Luxury Sedan<br>Vehicle: parked by mansion gate</div><button onclick="window.toggleCar()">Enter/Exit vehicle</button>';
if(a==='help')html='<div class="appCard">Helping missions: donate money through bank app. Donations reduce virtual balance and count toward kindness score.</div><button onclick="window.donate(10000)">Help a family ₹10,000</button>';
if(a==='settings')html=`<div class="appCard">Graphics prototype settings</div><button onclick="window.toggleDay()">Toggle Day / Night</button><button onclick="window.save()">Save game</button><button onclick="window.load()">Load game</button>`;
c.innerHTML=html}
window.donate=n=>{if(balance<n){toast('Not enough virtual money');return}balance-=n;donations+=n;cash();toast('Donation sent! You helped a family.');app('bank')};
window.callPerson=n=>toast('Calling '+n+'… (simulation)');window.gotoMarket=()=>{sheru.position.set(-20,0,0);toast('Arrived near Market')};window.gotoPark=()=>{sheru.position.set(18,0,45);toast('Arrived at Park')};window.nextMission=()=>{mission++;setMission();toast('Mission updated!');app('missions')};window.toggleCar=()=>{driving=!driving;toast(driving?'Driving mode on':'Exited car')};window.toggleDay=()=>{day=!day;scene.background=new THREE.Color(day?0x93c8e9:0x111d36);sun.intensity=day?2.3:.35;toast(day?'Daytime':'Nighttime')};window.save=()=>{localStorage.setItem('sheruSave',JSON.stringify({balance,mission,donations,day}));toast('Game saved')};window.load=()=>{let s=JSON.parse(localStorage.getItem('sheruSave')||'null');if(s){balance=s.balance;mission=s.mission;donations=s.donations;day=s.day;cash();setMission();toast('Save loaded')}else toast('No save found')};
let keys={};addEventListener('keydown',e=>{keys[e.key.toLowerCase()]=true;if(e.key===' '){e.preventDefault();}if(e.key.toLowerCase()==='e')interact();if(e.key.toLowerCase()==='f')driving=!driving});
addEventListener('keyup',e=>keys[e.key.toLowerCase()]=false);
let joy={x:0,y:0,active:false};const j=$('joy'),knob=$('joyKnob');j.addEventListener('pointerdown',e=>{joy.active=true;j.setPointerCapture(e.pointerId);moveJoy(e)});j.addEventListener('pointermove',e=>{if(joy.active)moveJoy(e)});j.addEventListener('pointerup',()=>{joy.active=false;joy.x=joy.y=0;knob.style.left='32px';knob.style.top='32px'});j.addEventListener('pointercancel',()=>{joy.active=false;joy.x=joy.y=0});
function moveJoy(e){let r=j.getBoundingClientRect(),dx=e.clientX-r.left-r.width/2,dy=e.clientY-r.top-r.height/2,len=Math.hypot(dx,dy),max=34;if(len>max){dx=dx/len*max;dy=dy/len*max}joy.x=dx/max;joy.y=dy/max;knob.style.left=(32+dx)+'px';knob.style.top=(32+dy)+'px'}
let run=false;$('run').onclick=()=>{run=!run;$('run').classList.toggle('active',run)};$('interact').onclick=interact;$('enterCar').onclick=()=>{driving=!driving;toast(driving?'Entered luxury car':'Exited car')};
function interact(){if(sheru.position.distanceTo(wife.position)<3||sheru.position.distanceTo(mom.position)<3||sheru.position.distanceTo(cub.position)<3){toast('Family interaction ❤️')}else if(sheru.position.distanceTo(panther.position)<3){toast('Kaal Bhai: Chal bhai, city ghoomte hain!')}else if(sheru.position.distanceTo(marker.position)<3){mission++;setMission();toast('Mission complete!')}else toast('Nothing nearby')}
let clock=new THREE.Clock();
function update(dt){let speed=(run?8:4)*dt;let dx=joy.x+(keys.a||keys.arrowleft?-1:0)+(keys.d||keys.arrowright?1:0),dz=joy.y+(keys.w||keys.arrowup?-1:0)+(keys.s||keys.arrowdown?1:0);if(driving){car.position.x+=dx*speed*2;car.position.z+=dz*speed*2;sheru.position.copy(car.position);sheru.position.y=0}else{sheru.position.x+=dx*speed;sheru.position.z+=dz*speed;sheru.position.y=0}
sheru.position.x=Math.max(-90,Math.min(90,sheru.position.x));sheru.position.z=Math.max(-90,Math.min(90,sheru.position.z));if(Math.abs(dx)+Math.abs(dz)>.05)sheru.rotation.y=Math.atan2(dx,dz);camera.position.lerp(new THREE.Vector3(sheru.position.x,5.8,sheru.position.z+9),.1);camera.lookAt(sheru.position.x,1.5,sheru.position.z);marker.position.y=.55+Math.sin(clock.elapsedTime*2)*.2}
function animate(){requestAnimationFrame(animate);let dt=Math.min(clock.getDelta(),.05);update(dt);renderer.render(scene,camera)}animate();addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
$('loading').style.display='none';
