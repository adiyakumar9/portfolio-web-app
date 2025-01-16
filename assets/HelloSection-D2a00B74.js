import{r as d,j as e,m as r,X as N,A as j}from"./index-0q3Rwk85.js";import{L as T}from"./loader-BcFwzXPy.js";import{S}from"./send-BmUkhbuF.js";const C=({onClose:b,initialMessage:c})=>{const[x,n]=d.useState([]),[i,u]=d.useState(""),[l,m]=d.useState(!1);d.useEffect(()=>{const t={text:c,sender:"user",id:Date.now()};n([t]),setTimeout(()=>{n(a=>[...a,{id:Date.now(),sender:"aditya",text:"typing...",isTyping:!0}]),setTimeout(()=>{n(a=>a.filter(s=>!s.isTyping).concat({text:`Thanks for reaching out! I'd love to chat about ${c}`,sender:"aditya",id:Date.now()}))},2e3)},500)},[c]);const p=()=>{m(!0),setTimeout(()=>{n(t=>t.map(a=>({...a,isClosing:!0})))},100),setTimeout(()=>{b(),m(!1)},500)},f=t=>{if(t.preventDefault(),!i.trim())return;const a={text:i,sender:"user",id:Date.now()};n(s=>[...s,a]),u(""),setTimeout(()=>{n(s=>[...s,{id:Date.now(),sender:"aditya",text:"typing...",isTyping:!0}]),setTimeout(()=>{n(s=>s.filter(h=>!h.isTyping).concat({text:"This is a placeholder response.",sender:"aditya",id:Date.now()}))},2e3)},500)},y={hidden:{opacity:0,x:"100%"},visible:{opacity:1,x:0},exit:{opacity:0,x:"100%",transition:{type:"spring",stiffness:300,damping:30,duration:.5}}},o={hidden:{opacity:0,y:20},visible:{opacity:1,y:0},exit:{opacity:0,y:l?-10:20,transition:{duration:l?.2:.3}}};return e.jsxs(r.div,{variants:y,initial:"hidden",animate:"visible",exit:"exit",className:"w-1/2 h-full flex flex-col justify-end p-8 border-l border-emerald-500/20 relative",children:[e.jsx("div",{className:"absolute top-4 right-4 z-50",children:e.jsx(r.button,{onClick:p,className:`p-2 rounded-full bg-emerald-500/10 border border-emerald-500/20
                   text-emerald-400 hover:bg-emerald-500/20 transition-all duration-300`,whileHover:{scale:1.1,rotate:90},whileTap:{scale:.9},disabled:l,children:e.jsx(N,{size:20})})}),e.jsx("div",{className:"flex-1 overflow-y-auto mb-4 space-y-4 z-10",children:e.jsx(j,{mode:"sync",children:x.map((t,a)=>e.jsx(r.div,{variants:o,initial:"hidden",animate:"visible",exit:"exit",className:`flex ${t.sender==="user"?"justify-end":"justify-start"}`,children:e.jsx("div",{className:`max-w-sm p-4 rounded-2xl ${t.isTyping?"bg-gray-800 text-emerald-400":t.sender==="user"?"bg-emerald-500/20 text-emerald-400 border border-emerald-500/20":"bg-emerald-500/10 text-white border border-emerald-500/20"}`,children:t.isTyping?e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(T,{size:16,className:"animate-spin"}),e.jsx("span",{children:"typing"})]}):t.text})},`${t.id}-${a}`))})}),e.jsxs("form",{onSubmit:f,className:"relative",children:[e.jsx("input",{type:"text",value:i,onChange:t=>u(t.target.value),placeholder:"Type your message...",className:`w-full px-6 py-4 bg-gray-900/50 border border-emerald-500/30 rounded-full text-white
                   placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2
                   focus:ring-emerald-500/20 transition-all duration-300`,disabled:l}),e.jsx(r.button,{type:"submit",whileHover:{scale:1.05},whileTap:{scale:.95},className:`absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-emerald-500/20 border border-emerald-500/30
                   rounded-full text-emerald-400 hover:text-white hover:bg-emerald-500
                   transition-all duration-300`,disabled:l,children:e.jsx(S,{size:20})})]})]})},$=()=>{const[b,c]=d.useState(""),[x,n]=d.useState(0),[i,u]=d.useState(!1),[l,m]=d.useState(""),p=["Front-end Developer","UI/UX Enthusiast","React Specialist","Problem Solver"];d.useEffect(()=>{let o="",t=0,a=!1,s;const h=()=>{const g=p[x];a?(o=g.substring(0,t-1),t--):(o=g.substring(0,t+1),t++),c(o);let v=a?50:100;!a&&t===g.length?(v=2e3,a=!0):a&&t===0&&(a=!1,n(w=>(w+1)%p.length),v=500),s=setTimeout(h,v)};return s=setTimeout(h,1e3),()=>clearTimeout(s)},[x]);const f=o=>{o.preventDefault(),l.trim()&&u(!0)},y=()=>{u(!1),m("")};return e.jsxs("section",{className:"relative min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 pt-16",children:[e.jsxs("div",{className:"absolute inset-0 overflow-hidden",children:[e.jsx("div",{className:"absolute w-96 h-96 -left-48 -top-48 bg-emerald-500/10 rounded-full blur-3xl animate-blob"}),e.jsx("div",{className:"absolute w-96 h-96 -right-48 -bottom-48 bg-blue-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"})]}),e.jsx("div",{className:"absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"}),e.jsxs("div",{className:`relative flex w-full h-[calc(100vh-4rem)] ${i?"justify-between":"justify-center"}`,children:[e.jsxs(r.div,{className:`text-center px-4 flex flex-col justify-center ${i?"w-1/2":"w-full"}`,animate:{width:i?"50%":"100%",x:0},transition:{type:"spring",stiffness:300,damping:30},children:[e.jsx(r.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6},children:e.jsx("p",{className:"text-gray-400 mb-6 font-mono text-lg",children:e.jsx(r.span,{initial:{opacity:0},animate:{opacity:1},transition:{delay:.2,duration:.6},children:"Hi all. I am"})})}),e.jsx(r.h1,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.4,duration:.6},className:"text-6xl md:text-8xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-200 to-emerald-400",children:"Aditya Kumar"}),e.jsxs(r.div,{initial:{opacity:0},animate:{opacity:1},transition:{delay:.8,duration:.6},className:"flex items-center justify-center font-mono text-xl md:text-2xl text-emerald-400",children:[e.jsx("span",{className:"mr-2",children:">"}),e.jsx("span",{children:b}),e.jsx("span",{className:"w-2 h-6 bg-emerald-400 animate-pulse ml-1"})]}),!i&&e.jsx(r.div,{initial:{opacity:0},animate:{opacity:1},transition:{delay:1.2,duration:.6},className:"mt-12",children:e.jsx("form",{onSubmit:f,className:"max-w-md mx-auto",children:e.jsxs("div",{className:"relative",children:[e.jsx("input",{type:"text",value:l,onChange:o=>m(o.target.value),placeholder:"What would you like to chat about? I'm all ears!",className:`w-full px-6 py-4 bg-gray-900/50 border border-emerald-500/30 rounded-full text-white 
                             placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 
                             focus:ring-emerald-500/20 transition-all duration-300`}),e.jsx("button",{type:"submit",className:`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-gradient-to-r 
                             from-emerald-500 to-blue-500 rounded-full text-white font-semibold
                             hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300`,children:"Send"})]})})})]}),e.jsx(j,{mode:"wait",children:i&&e.jsx(C,{onClose:y,initialMessage:l})})]})]})};export{$ as default};