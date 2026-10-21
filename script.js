(function(){
  // Toggle kunci jawaban
  var btn=document.getElementById("toggle");
  btn.addEventListener("click",function(){
    var on=document.body.classList.toggle("tampil");
    btn.textContent=on?"Sembunyikan kunci jawaban":"Tampilkan kunci jawaban";
    btn.setAttribute("aria-pressed",on);
  });
  // Editor kode interaktif
  document.querySelectorAll("pre[data-run]").forEach(function(pre){
    var box=document.createElement("div");box.className="runner";
    var ta=document.createElement("textarea");
    ta.value=pre.textContent.trim();ta.spellcheck=false;
    ta.rows=ta.value.split("\n").length+1;
    ta.setAttribute("aria-label","Editor kode");
    var b=document.createElement("button");b.className="run";b.textContent="Jalankan kode";
    var out=document.createElement("div");out.className="out";out.setAttribute("aria-live","polite");
    b.addEventListener("click",function(){
      out.textContent="";
      var log=function(){
        out.textContent+=Array.prototype.map.call(arguments,String).join(" ")+"\n";
      };
      try{
        new Function("console","prompt",ta.value)({log:log},function(m){return window.prompt(m);});
      }catch(e){out.textContent+="Error: "+e.message;}
    });
    box.appendChild(ta);box.appendChild(b);box.appendChild(out);
    pre.replaceWith(box);
  });
})();
