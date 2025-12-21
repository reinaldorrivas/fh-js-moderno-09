(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();const l=[];for(let e=0;e<256;++e)l.push((e+256).toString(16).slice(1));function x(e,t=0){return(l[e[t+0]]+l[e[t+1]]+l[e[t+2]]+l[e[t+3]]+"-"+l[e[t+4]]+l[e[t+5]]+"-"+l[e[t+6]]+l[e[t+7]]+"-"+l[e[t+8]]+l[e[t+9]]+"-"+l[e[t+10]]+l[e[t+11]]+l[e[t+12]]+l[e[t+13]]+l[e[t+14]]+l[e[t+15]]).toLowerCase()}let w;const b=new Uint8Array(16);function E(){if(!w){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");w=crypto.getRandomValues.bind(crypto)}return w(b)}const T={};function C(e,t,r){let n;{const o=Date.now(),s=E();v(T,o,s),n=q(s,T.msecs,T.seq,t,r)}return t??x(n)}function v(e,t,r){return e.msecs??=-1/0,e.seq??=0,t>e.msecs?(e.seq=r[6]<<23|r[7]<<16|r[8]<<8|r[9],e.msecs=t):(e.seq=e.seq+1|0,e.seq===0&&e.msecs++),e}function q(e,t,r,n,o=0){if(e.length<16)throw new Error("Random bytes length must be >= 16");if(!n)n=new Uint8Array(16),o=0;else if(o<0||o+16>n.length)throw new RangeError(`UUID byte range ${o}:${o+15} is out of buffer bounds`);return t??=Date.now(),r??=e[6]*127<<24|e[7]<<16|e[8]<<8|e[9],n[o++]=t/1099511627776&255,n[o++]=t/4294967296&255,n[o++]=t/16777216&255,n[o++]=t/65536&255,n[o++]=t/256&255,n[o++]=t&255,n[o++]=112|r>>>28&15,n[o++]=r>>>20&255,n[o++]=128|r>>>14&63,n[o++]=r>>>6&255,n[o++]=r<<2&255|e[10]&3,n[o++]=e[11],n[o++]=e[12],n[o++]=e[13],n[o++]=e[14],n[o++]=e[15],n}class S{constructor(t){this.id=C(),this.description=t,this.done=!1,this.createdAt=new Date}}const d={All:"all",Completed:"completed",Pending:"pending"};Object.freeze(d);const i={todos:[],filter:d.All};Object.seal(i);const A=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=d.All}=JSON.parse(localStorage.getItem("state"));e.forEach(r=>{i.todos.push(new S(r.description))}),e.forEach((r,n)=>{r.done&&(i.todos[n].done=!0)}),i.filter=t},m=()=>{localStorage.setItem("state",JSON.stringify(i))},P=(e=d.All)=>{switch(e){case d.All:return structuredClone(i.todos);case d.Completed:return i.todos.filter(t=>t.done);case d.Pending:return i.todos.filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid.`)}},O=e=>{if(!e)throw new Error("Description is required.");i.todos.push(new S(e)),m()},k=e=>{i.todos=i.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),m()},I=e=>{i.todos=i.todos.filter(t=>t.id!==e),m()},M=()=>{i.todos=i.todos.filter(e=>!e.done),m()},R=(e=d.All)=>{if(e!==d.All&&e!==d.Completed&&e!==d.Pending)throw new Error(`Option ${e} is not valid.`);i.filter=e,m()},D=()=>i.filter,a={addTodo:O,deleteCompleted:M,deleteTodo:I,getCurrentFilter:D,getTodos:P,initStore:A,setFilter:R,toggleTodo:k},F=`<section class="todoapp">
  <header class="header">
    <h1>Tareas</h1>
    <input
      id="new-todo-input"
      type="text"
      class="new-todo"
      placeholder="¿Qué necesita ser hecho?"
      autofocus
    />
  </header>

  <!-- This section should be hidden by default and shown when there are todos -->
  <section class="main">
    <input id="toggle-all" class="toggle-all" type="checkbox" />
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list"></ul>
  </section>

  <!-- This footer should hidden by default and shown when there are todos -->
  <footer class="footer">
    <!-- This should be "0 items left" by default -->
    <span class="todo-count"
      ><strong id="pending-count">0</strong> pendiente(s)</span
    >
    <!-- Remove this if you don't implement routing -->
    <ul class="filters">
      <li>
        <a class="selected filtro" href="#/">Todos</a>
      </li>
      <li>
        <a class="filtro" href="#/active">Pendientes</a>
      </li>
      <li>
        <a class="filtro" href="#/completed">Completados</a>
      </li>
    </ul>
    <!-- Hidden if no completed items are left ↓ -->
    <button class="clear-completed">Borrar completados</button>
  </footer>
</section>

<footer class="info">
  <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
  <!-- Change this out with your name and url ↓ -->
  <p>Modificado por <a href="https://github.com/reinaldorrivas">René Rivas</a></p>
  <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>
</footer>
`,H=`<div class="view">
  <input class="toggle" type="checkbox" />
  <label></label>
  <button class="destroy"></button>
</div>
<input type="text" class="edit" />
`,N=e=>{if(!e)throw new Error("A TODO object is required.");const{done:t,description:r,id:n}=e,o=document.createElement("li");return o.innerHTML=H,o.dataset.id=n,o.querySelector(".toggle").checked=t,o.querySelector("label").textContent=r,o.querySelector("label").htmlFor=n,o.querySelector(".edit").id=n,o.querySelector(".edit").name=n,t&&o.classList.add("completed"),o};let y;const $=e=>{if(y||(y=document.body.querySelector(e)),!y)throw new Error(`Element ${e} not found`);y.innerHTML=a.getTodos(d.Pending).length};let g;const U=(e,t=[])=>{if(g||(g=document.body.querySelector(e)),!g)throw new Error(`Element ${e} not found`);g.innerHTML="",t.forEach(r=>{g.append(N(r))})},p={TodoList:".todo-list",NewTodoInput:"#new-todo-input",ClearCompleted:".clear-completed",FiltersList:".filters",PendingCountLabel:"#pending-count"},V=e=>{const t=()=>{$(p.PendingCountLabel)},r=()=>{const c=a.getTodos(a.getCurrentFilter());U(p.TodoList,c),t()};(()=>{const c=document.body.querySelector(e);c.innerHTML=F,r()})();const n=document.querySelector(p.NewTodoInput),o=document.querySelector(p.TodoList),s=document.querySelector(p.ClearCompleted),u=document.querySelector(p.FiltersList);n.addEventListener("keyup",c=>{c.keyCode!==13||!c.target.value.trim()||(a.addTodo(c.target.value),r(),c.target.value="")}),o.addEventListener("click",c=>{const h=c.target.closest("[data-id]");switch(c.target.className){case"toggle":a.toggleTodo(h.dataset.id);break;case"destroy":a.deleteTodo(h.dataset.id);break}r()}),u.addEventListener("click",c=>{const h=c.target.getAttribute("href");switch(u.querySelectorAll(".filtro").forEach(f=>{const L=f.getAttribute("href");h===L?f.classList.add("selected"):f.classList.remove("selected")}),h){case"#/":a.setFilter(d.All);break;case"#/active":a.setFilter(d.Pending);break;case"#/completed":a.setFilter(d.Completed);break}r()}),s.addEventListener("click",()=>{a.deleteCompleted(),r()})};a.initStore();V("#app");
