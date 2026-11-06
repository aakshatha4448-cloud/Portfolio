/* Mobile navigation */
(function(){
  var c=document.getElementById('navchk'),b=document.getElementById('menu'),l=document.getElementById('links');
  function sync(){b.setAttribute('aria-expanded',c.checked?'true':'false')}
  function set(o){c.checked=o;sync()}
  c.addEventListener('change',sync);
  l.addEventListener('click',function(e){if(e.target.tagName==='A')set(false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false)});
  document.addEventListener('click',function(e){if(!b.contains(e.target)&&!l.contains(e.target)&&e.target!==c)set(false)});
  window.addEventListener('resize',function(){if(window.innerWidth>760)set(false)});
})();

/* Link Guard demo modal */
(function(){
  var m=document.getElementById('lgmodal'),f=document.getElementById('lgframe'),c=document.getElementById('lgclose'),last=null;
  function open(e){e.preventDefault();last=document.activeElement;if(!f.getAttribute('src'))f.setAttribute('src','linkguard/index.html');m.classList.add('open');document.body.style.overflow='hidden';c.focus()}
  function close(){m.classList.remove('open');document.body.style.overflow='';if(last)last.focus()}
  document.querySelectorAll('[data-lg]').forEach(function(a){a.addEventListener('click',open)});
  c.addEventListener('click',close);
  m.addEventListener('click',function(e){if(e.target===m)close()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&m.classList.contains('open'))close()});
})();

/* Resume modal */
(function(){
  var m=document.getElementById('rmodal'),c=document.getElementById('rclose'),
      v=document.getElementById('rview'),d=document.getElementById('rdl'),last=null;
  function open(e){
    e.preventDefault();last=document.activeElement;
    m.classList.add('open');document.body.style.overflow='hidden';v.focus();
  }
  function close(){
    m.classList.remove('open');document.body.style.overflow='';
    if(last)last.focus();
  }
  document.querySelectorAll('[data-resume]').forEach(function(b){b.addEventListener('click',open)});
  c.addEventListener('click',close);
  v.addEventListener('click',function(){m.classList.remove('open')});
  d.addEventListener('click',function(){setTimeout(close,400)});
  m.addEventListener('click',function(e){if(e.target===m)close()});
  document.addEventListener('keydown',function(e){
    if(!m.classList.contains('open'))return;
    if(e.key==='Escape')close();
    if(e.key==='Tab'){
      var f=[c,d,d],i=f.indexOf(document.activeElement);
      if(e.shiftKey&&i<=0){e.preventDefault();f[2].focus()}
      else if(!e.shiftKey&&i===2){e.preventDefault();f[0].focus()}
    }
  });
})();

/* Resume share / download */
(function(){
  // Phones: use the native share/save sheet (Save to Files, Drive, WhatsApp...) because many phone browsers ignore the download attribute.
  var coarse=window.matchMedia&&window.matchMedia('(pointer:coarse)').matches;
  if(!coarse||!navigator.share||!navigator.canShare)return;
  var el=document.querySelectorAll('[data-dl]');
  // Fetch the PDF up front so navigator.share() can run inside the click gesture.
  fetch('assets/resume.pdf').then(function(r){return r.blob()}).then(function(b){
    var f=new File([b],'Akshatha_P_Resume.pdf',{type:'application/pdf'});
    if(!navigator.canShare({files:[f]}))return;
    el.forEach(function(a){a.addEventListener('click',function(e){
      e.preventDefault();
      navigator.share({files:[f],title:'Akshatha P - Resume'}).catch(function(err){
        if(err&&err.name==='AbortError')return;
        var t=document.createElement('a');t.href='assets/resume.pdf';t.download='Akshatha_P_Resume.pdf';document.body.appendChild(t);t.click();t.remove();
      });
    })});
  }).catch(function(){});
})();
