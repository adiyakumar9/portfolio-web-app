import{c as o,R as h,r as m,u as x,a as g,b as u,j as e,m as r,T as b,A as y}from"./index-0q3Rwk85.js";import{C as v}from"./code-CKCSRqLv.js";/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=o("Boxes",[["path",{d:"M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z",key:"lc1i9w"}],["path",{d:"m7 16.5-4.74-2.85",key:"1o9zyk"}],["path",{d:"m7 16.5 5-3",key:"va8pkn"}],["path",{d:"M7 16.5v5.17",key:"jnp8gn"}],["path",{d:"M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z",key:"8zsnat"}],["path",{d:"m17 16.5-5-3",key:"8arw3v"}],["path",{d:"m17 16.5 4.74-2.85",key:"8rfmw"}],["path",{d:"M17 16.5v5.17",key:"k6z78m"}],["path",{d:"M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z",key:"1xygjf"}],["path",{d:"M12 8 7.26 5.15",key:"1vbdud"}],["path",{d:"m12 8 4.74-2.85",key:"3rx089"}],["path",{d:"M12 13.5V8",key:"1io7kd"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=o("GitBranch",[["line",{x1:"6",x2:"6",y1:"3",y2:"15",key:"17qcm7"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["path",{d:"M18 9a9 9 0 0 1-9 9",key:"n2h4wq"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=o("Radio",[["path",{d:"M4.9 19.1C1 15.2 1 8.8 4.9 4.9",key:"1vaf9d"}],["path",{d:"M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5",key:"u1ii0m"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["path",{d:"M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5",key:"1j5fej"}],["path",{d:"M19.1 4.9C23 8.8 23 15.1 19.1 19",key:"10b0cb"}]]),p=[{id:"sde",title:"Software Development Engineer",company:"ITH Technologies Pvt. Ltd.",period:"Aug 2022 – Jan 2024",type:"full-time",icon:e.jsx(b,{className:"w-6 h-6"}),color:"#10B981",description:"Led frontend development for multiple client projects with a focus on performance optimization. Implemented responsive designs and reduced load times by 40% through code splitting and lazy loading.",technologies:["React","TypeScript","Next.js","Tailwind CSS"],highlights:["Led front-end development for multiple client projects","Implemented responsive designs and optimized performance","Collaborated with cross-functional teams"]},{id:"trainee",title:"Software Engineer Trainee",company:"ITH Technologies Pvt. Ltd.",period:"Feb 2022 – Aug 2022",type:"internship",icon:e.jsx(v,{className:"w-6 h-6"}),color:"#3B82F6",description:"Assisted in developing web applications using modern JavaScript frameworks. Learned and implemented industry best practices for code quality and performance.",technologies:["JavaScript","React","CSS","Git"],highlights:["Assisted in developing web applications","Learned and implemented best practices","Participated in code reviews and team meetings"]}],w=({experience:a,isActive:s,onClick:n,index:c})=>{const d={hidden:{opacity:0,y:10},visible:{opacity:1,y:0,transition:{duration:.4,ease:"easeOut"}}},l={hidden:{opacity:0,height:0},visible:{opacity:1,height:"auto",transition:{duration:.3,ease:"easeOut"}}};return e.jsx(r.div,{variants:d,initial:"hidden",whileInView:"visible",viewport:{once:!0,margin:"-100px"},className:`
        relative rounded-xl transition-all duration-500 ease-out
        ${s?"col-span-2 row-span-2":"col-span-1"}
      `,children:e.jsxs("div",{className:`
          h-full p-6 rounded-xl border backdrop-blur-sm transition-all duration-500 cursor-pointer
          ${s?"bg-gray-900/40 border-emerald-500/30 shadow-lg":"bg-gray-900/20 border-gray-800/30 hover:border-emerald-500/20 hover:bg-gray-900/30"}
        `,onClick:n,children:[e.jsx("div",{className:`
            absolute -left-3 w-6 h-6 rounded-full flex items-center justify-center
            transition-colors duration-300
            ${s?"bg-emerald-500":"bg-gray-800"}
            border-4 ${s?"border-emerald-500/20":"border-gray-900"}
          `,children:e.jsx("div",{className:"w-2 h-2 rounded-full bg-white"})}),e.jsxs("div",{className:"ml-4",children:[e.jsxs("div",{className:"flex items-start justify-between",children:[e.jsxs("div",{children:[e.jsxs("h3",{className:"text-xl font-bold text-white flex items-center gap-3",children:[e.jsx("span",{className:`
                  p-2 rounded-lg transition-colors duration-300
                  ${a.type==="full-time"?"bg-emerald-500/20":"bg-blue-500/20"}
                `,children:a.icon}),a.title]}),e.jsxs("div",{className:"flex items-center gap-2 mt-2",children:[e.jsx("span",{className:"text-emerald-400",children:a.company}),e.jsx("span",{className:"text-gray-500",children:"•"}),e.jsx("span",{className:"text-gray-400",children:a.period})]})]}),e.jsx(r.div,{animate:{rotate:s?90:0},transition:{duration:.3},className:"text-emerald-400",children:"→"})]}),e.jsx("div",{className:"flex flex-wrap gap-2 mt-4",children:a.technologies.map(t=>e.jsx("span",{className:`px-3 py-1 text-xs rounded-full bg-emerald-500/5 text-emerald-400 
                         border border-emerald-500/20 transition-all duration-300`,children:t},t))}),e.jsx(y,{children:s&&e.jsxs(r.div,{variants:l,initial:"hidden",animate:"visible",exit:"hidden",className:"mt-6 overflow-hidden",children:[e.jsx("p",{className:"text-gray-300 mb-4",children:a.description}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:a.highlights.map((t,i)=>e.jsxs("div",{className:`p-4 rounded-lg bg-gray-800/30 border border-gray-700/50
                               hover:border-emerald-500/20 transition-all duration-300`,children:[e.jsxs("div",{className:"text-emerald-400 mb-2",children:[i===0&&e.jsx(j,{className:"w-4 h-4"}),i===1&&e.jsx(N,{className:"w-4 h-4"}),i===2&&e.jsx(f,{className:"w-4 h-4"})]}),e.jsx("p",{className:"text-sm text-gray-300",children:t})]},t))})]})})]})]})})},k=()=>{const[a,s]=m.useState(p[0].id),n=m.useRef(null),{scrollYProgress:c}=x({target:n,offset:["start end","end start"]}),d={stiffness:100,damping:30,restDelta:.001},l=g(u(c,[0,.2,.8,1],[.5,1,1,.5]),d);return e.jsxs("section",{ref:n,className:"min-h-screen py-24 relative overflow-hidden",children:[e.jsxs("div",{className:"absolute inset-0 pointer-events-none",children:[e.jsx("div",{className:"absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.03] to-transparent"})]}),e.jsxs(r.div,{className:"max-w-6xl mx-auto px-4",style:{opacity:l},children:[e.jsxs("div",{className:"mb-16 relative",children:[e.jsx(r.div,{initial:{width:0},animate:{width:"100%"},transition:{duration:1,ease:"easeOut"},className:"absolute -left-4 top-1/2 h-px bg-gradient-to-r from-emerald-500/50 to-transparent"}),e.jsxs("h2",{className:"text-4xl font-mono font-bold relative inline-flex items-center",children:[e.jsx("span",{className:"text-emerald-400 mr-2",children:">"}),e.jsx("span",{className:"bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent",children:"experience"})]})]}),e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:"absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-emerald-500/20 to-transparent"}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8 pl-8",children:p.map((t,i)=>e.jsx(w,{experience:t,isActive:a===t.id,onClick:()=>s(t.id),index:i},t.id))})]})]})]})},C=h.memo(k);export{C as default};