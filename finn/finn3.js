/* Finn 3 fuer profino: Feder als Figur (Begleiter, Themenfarbe je Bereich), Panel, Zustaende, minimierte Leiste, Light/Dark.
   Keine Abhaengigkeiten. */
(function(){
'use strict';
var MODE=window.FINN_MODE||'portal';
var USER='Florian';
var reduce=false;try{reduce=matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){}
var FEATHER='M7.2318 37.1773C7.7537 35.3115 8.5408 32.6857 9.5965 28.8895C14.1984 28.0744 16.1024 29.5374 19.0247 23.7044C16.6532 24.5157 13.7938 22.1996 13.9468 21.1945C14.1015 20.1913 20.5989 21.9184 24.854 15.1658C19.4905 16.4882 17.7752 13.5774 18.4671 13.1385C20.0634 12.1239 24.8013 12.7167 27.3275 9.9674C28.6297 8.5519 29.24 5.111 28.7096 3.8836C28.0738 2.3997 24.1944 0.1862 22.0558 0.3952C19.9172 0.6023 16.5631 9.4962 15.5669 9.4278C14.5741 9.3575 14.3718 5.4416 16.1092 1.8031C14.2783 2.7094 10.9225 5.5252 9.8702 7.9325C7.9101 12.4108 10.0538 22.6879 9.367 23.0527C8.6785 23.4194 6.3648 18.3388 5.6746 16.0341C4.7311 19.5662 4.709 23.104 7.4647 27.8027C6.426 30.8864 5.8582 34.4356 5.7715 36.2406C5.7307 37.6827 7.0023 37.9924 7.2318 37.1773Z';

/* ---------- Styles ---------- */
var css=`
:root{--f2-ring:linear-gradient(90deg,#FF4A4A,#FF2F8E 55%,#C94CFF);--f2-a:#ff4a4a;--f2-b:#ff2f8e;--f2-c:#c94cff;--f2-grad:linear-gradient(200deg,var(--f2-a),var(--f2-b) 55%,var(--f2-c));
 --f2-bg:#ffffff;--f2-soft:var(--tint,#f4f7f9);--f2-fill:var(--muted,#e6eef2);--f2-line:var(--line,#dae5e9);--f2-ink:var(--ink,#003647);--f2-ink2:var(--ink-2,#495b63);--f2-ink3:var(--ink-3,#72848b);
 --f2-shadow:0 40px 90px -24px rgba(0,34,49,.32),0 0 0 1px rgba(0,34,49,.06);--f2-orb:#ffffff}
html[data-theme=dark]{--f2-bg:#0f222a;--f2-soft:#15303a;--f2-fill:#1b3944;--f2-line:rgba(255,255,255,.1);--f2-ink:#e7eff2;--f2-ink2:#a9bcc3;--f2-ink3:#7f959d;--f2-shadow:0 40px 90px -24px rgba(0,0,0,.7),0 0 0 1px rgba(255,255,255,.07);--f2-orb:#0f222a}
.f2-launch{position:fixed;right:max(24px,env(safe-area-inset-right,0px));bottom:calc(24px + env(safe-area-inset-bottom,0px));z-index:85;display:flex;align-items:center;gap:12px;border:0;background:none;padding:0;cursor:pointer;font:inherit;transition:opacity .3s var(--ease),transform .45s var(--ease)}
.f2-launch .f2-orb{width:64px;height:64px;border-radius:50%;background:var(--f2-orb);box-shadow:var(--f2-shadow);position:relative;flex:none;transition:transform .45s var(--ease)}
.f2-launch:hover .f2-orb{transform:scale(1.06)}
.f2-launch .fl{order:-1;max-width:0;overflow:hidden;white-space:nowrap;opacity:0;padding:0;height:40px;display:flex;align-items:center;border-radius:999px;background:var(--f2-bg);color:var(--f2-ink);font-size:var(--t-small,.94rem);box-shadow:var(--f2-shadow);transition:max-width .5s var(--ease),opacity .3s var(--ease),padding .5s var(--ease)}
.f2-launch:hover .fl,.f2-launch:focus-visible .fl,.f2-launch.nudge .fl{max-width:280px;opacity:1;padding:0 18px}
.f2-launch.hide{opacity:0;transform:translateY(12px) scale(.9);pointer-events:none}
.f2-orb canvas,.f2-hero canvas{position:absolute;inset:0;width:100%;height:100%;display:block}
.f2-orb canvas{border-radius:50%}
.f2-launch .f2-dot{position:absolute;top:4px;right:4px;width:10px;height:10px;border-radius:50%;background:var(--f2-b);border:2px solid var(--f2-orb)}
.f2{position:fixed;right:max(24px,env(safe-area-inset-right,0px));bottom:calc(24px + env(safe-area-inset-bottom,0px));z-index:87;width:min(344px,calc(100vw - 32px));max-height:min(600px,calc(100dvh - 48px));display:flex;flex-direction:column;border-radius:var(--r-media,24px);background:var(--f2-bg);color:var(--f2-ink);box-shadow:var(--f2-shadow);transform-origin:100% 100%;opacity:0;transform:translateY(16px) scale(.96);pointer-events:none;visibility:hidden;transition:opacity .3s var(--ease),transform .5s var(--ease),visibility 0s .5s;overflow:hidden;font-family:var(--font)}
.f2.open{opacity:1;transform:none;pointer-events:auto;visibility:visible;transition:opacity .3s var(--ease),transform .5s var(--ease),visibility 0s}
.f2-hd{display:flex;align-items:center;gap:10px;padding:10px 8px 0 16px;flex:none}
.f2-hd .lg{width:20px;height:22px;flex:none}
.f2-hd .nm{flex:1;min-width:0;line-height:1.25}.f2-hd .nm b{display:block;font-weight:400;font-size:var(--t-meta,1rem)}.f2-hd .nm small{color:var(--f2-ink2);font-size:var(--t-caption,.78rem)}
.f2-ib{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;color:var(--f2-ink2);transition:background-color .2s var(--ease),color .2s var(--ease)}
.f2-ib:hover{background:var(--f2-soft);color:var(--f2-ink)}.f2-ib svg{width:18px;height:18px}
.f2-body{flex:1 1 auto;min-height:0;overflow-y:auto;padding:0 16px 8px;scrollbar-width:thin;scrollbar-color:var(--f2-line) transparent}
.f2-view{display:flex;flex-direction:column;gap:12px;animation:f2In .45s var(--ease) both}
@keyframes f2In{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.f2-hero{position:relative;height:clamp(90px,15vh,130px);margin:0 -16px -6px;flex:none;transition:height .6s var(--ease)}
.f2-hero.sm{height:clamp(64px,10vh,88px)}
.f2-state{position:absolute;left:50%;bottom:4px;transform:translateX(-50%);font-size:var(--t-caption,.78rem);color:var(--f2-ink3);letter-spacing:.02em;opacity:0;transition:opacity .3s}
.f2-hero.talk .f2-state{opacity:1}
.f2-hi{text-align:center;display:flex;flex-direction:column;align-items:center;gap:4px}
.f2-hi h2{font-size:1.4rem;font-weight:200;letter-spacing:-.01em;line-height:1.1}
.f2-hi p{color:var(--f2-ink2);font-size:var(--t-small,.94rem);line-height:1.4;max-width:32ch;text-wrap:balance}
.f2-ctx{display:inline-flex;align-items:center;gap:8px;max-width:100%;background:var(--f2-soft);border-radius:999px;padding:6px 14px;font-size:var(--t-caption,.78rem);color:var(--f2-ink2)}
.f2-ctx svg{width:14px;height:14px;flex:none}.f2-ctx span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.f2-prim{display:flex;align-items:center;gap:12px;width:100%;text-align:left;padding:12px 12px 12px 16px;border-radius:18px;background:var(--f2-soft);position:relative;transition:background-color .25s var(--ease),transform .2s var(--ease)}
.f2-prim::before{content:"";position:absolute;inset:0;border-radius:inherit;padding:1px;background:var(--f2-ring);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}
.f2-prim:hover{background:var(--f2-fill)}.f2-prim:active{transform:scale(.99)}
.f2-prim .t{flex:1;min-width:0}.f2-prim .e{display:block;font-size:var(--t-eyebrow,.82rem);letter-spacing:.1em;text-transform:uppercase;background:var(--f2-grad);-webkit-background-clip:text;background-clip:text;color:transparent}
.f2-prim b{display:block;font-weight:400;font-size:1rem;margin:1px 0}.f2-prim small{color:var(--f2-ink2);font-size:.86rem;line-height:1.4;display:block}
.f2-go{width:40px;height:40px;border-radius:50%;background:var(--f2-grad);color:#fff;display:grid;place-items:center;flex:none;box-shadow:0 8px 20px -8px rgba(255,47,142,.6)}
.f2-go svg{width:18px;height:18px}
.f2-or{display:flex;align-items:center;gap:12px;font-size:var(--t-caption,.78rem);letter-spacing:.1em;text-transform:uppercase;color:var(--f2-ink3)}.f2-or::before,.f2-or::after{content:"";flex:1;height:1px;background:var(--f2-line)}
.f2-chips{display:flex;flex-wrap:wrap;gap:6px}
.f2-chip{min-height:34px;padding:0 13px;border-radius:999px;border:1px solid var(--f2-line);font-size:.86rem;color:var(--f2-ink);text-align:left;transition:border-color .2s,background-color .2s}
.f2-chip:hover{border-color:var(--f2-ink3);background:var(--f2-soft)}
.f2-ask{display:flex;align-items:center;gap:8px;border-radius:999px;background:var(--f2-soft);padding:4px 4px 4px 16px;min-height:44px;margin-top:4px;transition:box-shadow .2s}
.f2-ask{position:relative}.f2-ask input:focus-visible{outline:none}
.f2-ask:focus-within{box-shadow:none!important;outline:none!important}
.f2-ask:focus-within::before{content:"";position:absolute;inset:0;border-radius:inherit;padding:1px;background:var(--f2-ring);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}
.f2-ask input{flex:1;min-width:0;border:0;outline:0;background:none;font:inherit;font-size:var(--t-small,.94rem);color:var(--f2-ink)}
.f2-ask input::placeholder{color:var(--f2-ink3)}
.f2-ask button{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;background:var(--f2-fill);color:var(--f2-ink2);flex:none;transition:background .25s var(--ease),color .25s}
.f2-ask:focus-within button,.f2-ask.has button{background:var(--f2-grad);color:#fff}
.f2-ask button svg{width:18px;height:18px}
.f2-ki{flex:none;text-align:center;font-size:.68rem;color:var(--f2-ink3);padding:4px 16px 10px}
.f2-view.chatting>:is(.f2-hi,.f2-prim,.f2-or,.f2-chips,.f2-sug){display:none}
.f2-view.chatting>.f2-hero{display:none}
.f2-view.chatting{padding-top:20px}
.f2-dm{display:flex;flex-direction:column;gap:10px;padding:14px;border-radius:18px;background:var(--f2-soft);position:relative;animation:f2In .35s var(--ease) both}
.f2-dm::before{content:"";position:absolute;inset:0;border-radius:inherit;padding:1px;background:var(--f2-ring);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}
.f2-dm .hd,.f2-pc{display:flex;align-items:center;gap:10px}.f2-dm .hd b,.f2-pc b{display:block;font-weight:400;font-size:var(--t-small,.94rem)}.f2-dm .hd small,.f2-pc small{display:block;color:var(--f2-ink2);font-size:var(--t-caption,.78rem)}
.f2-dm .e{font-size:var(--t-eyebrow,.82rem);letter-spacing:.1em;text-transform:uppercase;color:var(--f2-ink3)}
.f2-av{width:34px;height:34px;border-radius:50%;background:var(--f2-fill);display:grid;place-items:center;font-size:.72rem;flex:none;color:var(--f2-ink)}
.f2-dm textarea.f2-field{height:auto;min-height:120px;field-sizing:content;max-height:30vh}
.f2-note{font-size:.72rem;color:var(--f2-ink3);display:flex;gap:6px;align-items:center}.f2-note::before{content:"";width:10px;height:12px;flex:none;background:var(--f2-grad);-webkit-mask:var(--f2-mask) center/contain no-repeat;mask:var(--f2-mask) center/contain no-repeat}
.f2-pcs{display:flex;flex-direction:column;gap:6px;align-self:stretch}
.f2-pc{padding:8px 8px 8px 10px;border-radius:14px;background:var(--f2-soft)}.f2-pc>div{flex:1;min-width:0}
.f2-pc .f2-chip{min-height:32px;padding:0 12px;background:var(--f2-bg)}
.bub .f2-tag{display:flex;align-items:center;gap:5px;margin-top:6px;font-size:.7rem;opacity:.75}.bub .f2-tag::before{content:"";width:12px;height:14px;flex:none;background:var(--f2-grad);-webkit-mask:var(--f2-mask) center/contain no-repeat;mask:var(--f2-mask) center/contain no-repeat}
.f2-hero.lg{height:clamp(120px,19vh,165px)}
.f2-sug{display:flex;flex-direction:column;align-items:center;gap:8px}
.f2-sugt{display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:999px;font-size:var(--t-caption,.78rem);color:var(--f2-ink3);transition:color .2s,background-color .2s}
.f2-sugt:hover{color:var(--f2-ink);background:var(--f2-soft)}.f2-sugt svg{width:12px;height:12px;transition:transform .3s var(--ease)}.f2-sugt[aria-expanded=true] svg{transform:rotate(180deg)}
.f2-sug .f2-chips{justify-content:center;animation:f2In .3s var(--ease) both}
.f2-ask .tab{font-size:.68rem;color:var(--f2-ink3);border:1px solid var(--f2-line);border-radius:6px;padding:1px 6px;margin-right:4px;opacity:0;transition:opacity .2s;pointer-events:none}.f2-ask.hint .tab{opacity:1}
.f2-chat{display:flex;flex-direction:column;gap:8px}.f2-chat:empty{display:none}
.f2-b{max-width:88%;padding:10px 14px;border-radius:18px;font-size:var(--t-small,.94rem);line-height:1.5;animation:f2In .35s var(--ease) both}
.f2-b.me{align-self:flex-end;background:var(--f2-ink);color:var(--f2-bg);border-bottom-right-radius:6px}
.f2-b.bot{align-self:flex-start;background:var(--f2-soft);border-bottom-left-radius:6px}
.f2-b a{color:var(--action,#07697c);text-decoration:underline;text-underline-offset:2px}
html[data-theme=dark] .f2-b a{color:var(--accent-hi,#07d6e7)}
.f2-hits{display:flex;flex-direction:column;gap:6px}
.f2-hit{display:flex;justify-content:space-between;gap:10px;align-items:center;padding:10px 14px;border-radius:14px;background:var(--f2-soft);font-size:var(--t-small,.94rem);line-height:1.35;transition:background .2s}
.f2-hit:hover{background:var(--f2-fill)}.f2-hit small{display:block;color:var(--f2-ink2);font-size:var(--t-caption,.78rem)}.f2-hit svg{width:14px;height:14px;flex:none}
.f2-typing{display:flex;gap:4px;padding:12px 14px}.f2-typing i{width:6px;height:6px;border-radius:50%;background:var(--f2-ink3);animation:blink 1.2s infinite}.f2-typing i:nth-child(2){animation-delay:.15s}.f2-typing i:nth-child(3){animation-delay:.3s}
.f2-flow{text-align:center;display:flex;flex-direction:column;gap:4px}.f2-flow b{font-weight:400;font-size:1.2rem}.f2-flow p{color:var(--f2-ink2);font-size:var(--t-small,.94rem);text-wrap:balance}
.f2-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
.f2-steps span{display:flex;flex-direction:column;gap:6px;font-size:.72rem;color:var(--f2-ink3)}
.f2-steps span::before{content:"";height:3px;border-radius:2px;background:var(--f2-fill)}
.f2-steps span.done::before{background:var(--f2-ink3)}.f2-steps span.on{color:var(--f2-ink)}.f2-steps span.on::before{background:var(--f2-grad)}
.f2-seg{display:grid;grid-template-columns:1fr 1fr;padding:4px;border-radius:999px;background:var(--f2-soft)}
.f2-seg button{min-height:38px;border-radius:999px;color:var(--f2-ink2);font-size:var(--t-small,.94rem);transition:background .25s,color .25s,box-shadow .25s}
.f2-seg button.on{background:var(--f2-bg);color:var(--f2-ink);box-shadow:0 2px 8px rgba(0,34,49,.08)}
html[data-theme=dark] .f2-seg button.on{background:var(--f2-fill)}
.f2-acts{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding-top:4px}
.f2-btn{min-height:42px;border-radius:999px;font-size:var(--t-meta,1rem);display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:0 18px;transition:background .2s,transform .2s var(--ease)}
.f2-btn:active{transform:scale(.98)}
.f2-btn.f2-sec{background:var(--f2-soft);color:var(--f2-ink)}.f2-btn.f2-sec:hover{background:var(--f2-fill)}
.f2-btn.f2-pri{background:var(--f2-ink);color:var(--f2-bg)}.f2-btn.f2-pri:hover{opacity:.9}
.f2-btn.f2-out{border:1px solid var(--f2-line);color:var(--f2-ink);min-height:44px;width:100%}.f2-btn.f2-out:hover{background:var(--f2-soft)}
.f2-lbl{font-size:var(--t-caption,.78rem);color:var(--f2-ink2);margin:0 0 -10px 4px}
.f2-field{width:100%;border:1px solid var(--f2-line);border-radius:14px;background:var(--f2-bg);color:var(--f2-ink);font:inherit;font-size:var(--t-small,.94rem);line-height:1.55;padding:12px 14px;outline:none;resize:none}
.f2-field:focus{border-color:var(--accent,#099aae)}
textarea.f2-field{height:clamp(130px,26vh,220px)}
.f2-prev{background:var(--f2-soft);border-radius:16px;padding:18px;font-size:var(--t-small,.94rem);line-height:1.6;white-space:pre-line;max-height:34vh;overflow:auto}
.f2-prev b{display:block;font-weight:400;font-size:var(--t-meta,1rem);margin-bottom:10px}
.f2-outs{display:flex;flex-direction:column;gap:8px}
.f2-minbar{position:fixed;right:max(24px,env(safe-area-inset-right,0px));bottom:calc(24px + env(safe-area-inset-bottom,0px));z-index:86;display:flex;align-items:center;gap:12px;height:64px;padding:0 10px 0 8px;border-radius:999px;background:var(--f2-bg);color:var(--f2-ink);box-shadow:var(--f2-shadow);text-align:left;transition:opacity .3s var(--ease),transform .45s var(--ease)}
.f2-minbar[hidden]{display:flex!important;opacity:0;transform:translateY(12px) scale(.94);pointer-events:none}
.f2-minbar .f2-orb{width:48px;height:48px;border-radius:50%;position:relative;flex:none;background:var(--f2-soft)}
.f2-ring{position:absolute;inset:-3px;width:calc(100% + 6px);height:calc(100% + 6px);transform:rotate(-90deg);pointer-events:none;opacity:0;transition:opacity .3s}.f2-minbar.flow .f2-ring{opacity:1}
.f2-ring circle{fill:none;stroke-width:2;stroke-linecap:round}.f2-ring .trk{stroke:var(--f2-line)}.f2-ring .val{stroke:url(#f2r);stroke-dasharray:100;stroke-dashoffset:100;transition:stroke-dashoffset .6s var(--ease)}
.f2-minbar .t{line-height:1.25;min-width:0;max-width:220px}.f2-minbar .t b{display:block;font-weight:400;font-size:var(--t-small,.94rem)}.f2-minbar .t small{display:block;color:var(--f2-ink2);font-size:var(--t-caption,.78rem);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.f2-minbar .up{width:40px;height:40px;border-radius:50%;background:var(--f2-soft);display:grid;place-items:center;flex:none}.f2-minbar .up svg{width:16px;height:16px}

.finn-scrim{position:fixed;inset:0;z-index:84;background:rgba(0,34,49,.3);opacity:0;pointer-events:none;transition:opacity .3s var(--ease)}
.finn-scrim.show{opacity:1;pointer-events:auto}
@media (min-width:900px){.finn-scrim{display:none}}
.finn-hej{display:inline-flex;align-items:center;gap:8px;min-height:32px;padding:0 14px 0 10px;border:1px solid var(--line);border-radius:999px;background:var(--page,#fff);color:var(--ink);font:inherit;font-size:var(--t-small);cursor:pointer;transition:border-color .2s var(--ease),background-color .2s var(--ease)}
.finn-hej:hover{border-color:var(--ink-3)}
.finn-hej .fsp{display:none}
.finn-hej::before{content:"";width:13px;height:15px;flex:none;background:var(--f2-grad);-webkit-mask:var(--f2-mask) center/contain no-repeat;mask:var(--f2-mask) center/contain no-repeat}
@media (max-width:899px){
 .f2-launch{bottom:calc(92px + env(safe-area-inset-bottom,0px));right:16px}.f2-launch .f2-orb{width:56px;height:56px}
 .f2-launch .fl{display:none}
 .f2{right:8px;left:8px;width:auto;bottom:calc(8px + env(safe-area-inset-bottom,0px));max-height:calc(100dvh - 24px)}
 .f2-minbar{right:16px;left:16px;bottom:calc(92px + env(safe-area-inset-bottom,0px))}.f2-minbar .t{flex:1;max-width:none}
 .f2-hero{height:clamp(96px,16vh,140px)}.f2-hero.sm{height:72px}
}
@media (max-width:699px){body:has(#sheet.show) .f2-launch,body:has(.msgr.open) .f2-launch{opacity:0;visibility:hidden;pointer-events:none}}
@media (prefers-reduced-motion:reduce){.f2-view,.f2-b{animation:none}}
/* Finn 3: Feder als Figur */
.f2-launch.f3{right:max(40px,calc(env(safe-area-inset-right,0px) + 24px));bottom:calc(14px + env(safe-area-inset-bottom,0px));gap:6px;align-items:flex-end;-webkit-tap-highlight-color:transparent}
.f2-launch.f3:focus-visible{outline:none}.f2-launch.f3:focus-visible .f3-fig{outline:2px solid var(--accent,#099aae);outline-offset:2px;border-radius:14px}
.f2-launch.f3 .fl{margin-bottom:30px}
.f3-fig{position:relative;width:84px;height:92px;flex:none;display:block}
.f3-fig svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.f3-sh{position:absolute;left:10px;bottom:2px;width:34px;height:8px;border-radius:50%;background:radial-gradient(closest-side,rgba(0,34,49,.22),transparent);transform-origin:50% 50%}
html[data-theme=dark] .f3-sh{background:radial-gradient(closest-side,rgba(0,0,0,.6),transparent)}
.f2-launch.f3 .f2-dot{top:12px;right:16px;border-color:var(--page,#fff)}
.f3-ink{fill:none;stroke:url(#f3g);stroke-width:1.1;stroke-linejoin:round;stroke-linecap:round;opacity:0}
.f3-mini{position:absolute;inset:0;display:grid;place-items:center;pointer-events:none}
.f3-mini svg{height:78%;width:auto;overflow:visible}
.f2-minbar .f3-mini svg{height:86%}.f2-hero .f3-mini svg{height:80%!important;max-height:120px!important;width:auto!important;min-width:0!important}
.f3-defs{position:absolute;width:0;height:0;overflow:hidden}
.f3-bub{position:fixed;right:max(124px,calc(env(safe-area-inset-right,0px) + 108px));bottom:calc(44px + env(safe-area-inset-bottom,0px));z-index:86;max-width:260px;padding:12px 16px;border-radius:18px 18px 6px 18px;background:var(--f2-bg);color:var(--f2-ink);box-shadow:var(--f2-shadow);font-size:var(--t-small,.94rem);line-height:1.4;opacity:0;transform:translateY(8px) scale(.96);transform-origin:100% 100%;pointer-events:none;transition:opacity .3s var(--ease),transform .45s var(--ease)}
.f3-bub.show{opacity:1;transform:none;pointer-events:auto}.f3-bub.show.up{transform:translateY(-36px)}
.f3-bub button{display:block;margin-top:8px;font:inherit;font-size:.86rem;color:#fff;background:var(--f3-btn,var(--f2-grad));border:0;border-radius:999px;padding:6px 14px;cursor:pointer}
.f3-card{position:fixed;right:max(124px,calc(env(safe-area-inset-right,0px) + 108px));bottom:calc(32px + env(safe-area-inset-bottom,0px));z-index:86;width:min(320px,calc(100vw - 150px));padding:16px 16px 14px;border-radius:20px 20px 6px 20px;background:var(--f2-bg);color:var(--f2-ink);box-shadow:var(--f2-shadow);opacity:0;visibility:hidden;transform:translateY(10px) scale(.96);transform-origin:100% 100%;pointer-events:none;transition:opacity .3s var(--ease),transform .45s var(--ease),visibility 0s .45s}
.f3-card.show{opacity:1;visibility:visible;transform:none;pointer-events:auto;transition:opacity .3s var(--ease),transform .45s var(--ease),visibility 0s}
.f3-ck{font-size:var(--t-eyebrow,.82rem);letter-spacing:.1em;text-transform:uppercase;margin:0 28px 6px 0;background:var(--f2-grad);-webkit-background-clip:text;background-clip:text;color:transparent}
html[data-f3cat] .f3-ck{background:none;-webkit-background-clip:border-box;background-clip:border-box;color:var(--f3-btn);transition:color .5s}
.f3-cb{font-size:var(--t-small,.94rem);line-height:1.45}.f3-cb small{display:block;color:var(--f2-ink3);font-size:var(--t-caption,.78rem);margin-top:6px}
.f3-cb q{display:block;quotes:none;color:var(--f2-ink2);border-left:2px solid var(--f2-fill);padding-left:10px;margin:8px 0}
.f3-cx{position:absolute;top:8px;right:8px;width:30px;height:30px;border-radius:50%;color:var(--f2-ink3);font-size:18px;line-height:1;display:grid;place-items:center}.f3-cx:hover{background:var(--f2-soft);color:var(--f2-ink)}
.f3-acts{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}
.f3-acts button{font:inherit;font-size:.86rem;border-radius:999px;padding:7px 14px;background:var(--f2-soft);color:var(--f2-ink);transition:background-color .2s}
.f3-acts button:hover{background:var(--f2-fill)}
.f3-acts button.pri{color:#fff;background:var(--f3-btn,var(--f2-grad));transition:background .5s}
.f3-acts button:focus-visible,.f3-cx:focus-visible{outline:2px solid var(--accent,#099aae);outline-offset:2px}
.f3-meter{height:6px;border-radius:3px;background:var(--f2-fill);margin:10px 0 4px;overflow:hidden}.f3-meter i{display:block;height:100%;width:0;border-radius:3px;background:var(--f3-btn,var(--f2-grad));transition:width .8s var(--ease)}
.f3-menu{display:flex;flex-direction:column;gap:6px;margin-top:10px}.f3-menu button{display:flex;justify-content:space-between;align-items:center;gap:10px;text-align:left;font:inherit;font-size:.9rem;border-radius:12px;padding:10px 12px;background:var(--f2-soft);color:var(--f2-ink)}.f3-menu button:hover{background:var(--f2-fill)}
.f3-menu .ask{position:relative;color:var(--f2-ink2)}.f3-menu .ask::before{content:"";position:absolute;inset:0;border-radius:inherit;padding:1px;background:var(--f2-ring);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}
.f3-menu .n{font-size:.72rem;color:#fff;border-radius:999px;padding:1px 7px;background:var(--f3-btn,var(--f2-grad))}
.f3-steps{display:flex;gap:4px;margin-top:12px}.f3-steps i{flex:1;height:3px;border-radius:2px;background:var(--f2-fill)}.f3-steps i.on{background:var(--f3-btn,var(--f2-grad))}
.f3-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}.f3-chips button{font:inherit;font-size:.84rem;border:1px solid var(--f2-line);color:var(--f2-ink);border-radius:999px;padding:5px 12px}.f3-chips button[aria-pressed=true]{background:var(--f2-ink);color:var(--f2-bg);border-color:var(--f2-ink)}
@media (max-width:899px){
 .f2-launch.f3{bottom:calc(84px + env(safe-area-inset-bottom,0px));right:12px}
 .f3-fig{width:64px;height:70px}.f3-sh{left:8px;width:26px;height:6px}
 .f3-bub{right:84px;bottom:calc(108px + env(safe-area-inset-bottom,0px));max-width:calc(100vw - 100px)}
 .f3-card{left:12px;right:84px;width:auto;bottom:calc(88px + env(safe-area-inset-bottom,0px));padding:18px 14px 12px;touch-action:pan-x}
 .f3-card::before{content:"";position:absolute;left:50%;top:7px;width:36px;height:4px;margin-left:-18px;border-radius:2px;background:var(--f2-line)}
 .f3-card.clamp:not(.open) .f3-cb{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;cursor:pointer}
 .f3-card .f3-acts{margin-top:10px}.f3-card .f3-acts button{padding:7px 12px}
 .f3-card.drag{transition:none}
 .f2-launch.f3.duck{z-index:69}
 .f2-launch.f3.duck .fl{opacity:0}
}
/* Tablet hochkant: Tab-Leiste wie mobil, aber Karte und Panel schweben rechts statt über die volle Breite */
@media (min-width:600px) and (max-width:899px){
 .f3-fig{width:72px;height:79px}.f3-sh{left:9px;width:30px;height:7px}
 .f3-card{left:auto;right:92px;width:min(380px,calc(100vw - 120px))}
 .f3-bub{right:92px}
 .f2{left:auto;right:16px;width:min(400px,calc(100vw - 32px));bottom:calc(88px + env(safe-area-inset-bottom,0px));max-height:calc(100dvh - 176px)}
 .f2-minbar{left:auto;right:16px;width:min(400px,calc(100vw - 32px))}
}
/* Touch ohne Hover (Tablet quer, Smartphone): kein Hover-Label, das nach dem Tippen hängen bleibt */
@media (hover:none){.f2-launch .fl{display:none!important}.f3-card::before{content:"";position:absolute;left:50%;top:7px;width:36px;height:4px;margin-left:-18px;border-radius:2px;background:var(--f2-line)}.f3-card{padding-top:18px}}
@media (prefers-reduced-motion:reduce){.f3-card,.f3-bub{transition:opacity .2s}}
span.f3-info.f3-info{position:absolute!important;left:-2px;top:1px;width:22px!important;height:22px!important;min-width:0!important;max-width:22px!important;margin:0!important;padding:0!important;border:0!important;border-radius:50%!important;background:linear-gradient(160deg,var(--f3a,#FF4A4A),var(--f3m,#FF2F8E) 55%,var(--f3b,#C94CFF))!important;transition:opacity .25s,transform .35s cubic-bezier(.34,1.56,.64,1),background .6s;color:#fff!important;display:block!important;flex:none!important}
.f3-info{z-index:2;width:22px;height:22px;margin:0;padding:0;border:0;border-radius:50%;background:var(--action,#07697c);color:#fff;font:600 13px/22px "Public Sans",Arial,sans-serif;text-align:center;cursor:pointer;box-shadow:0 6px 14px -4px rgba(0,34,49,.35);opacity:0;transform:scale(.4);pointer-events:none;transition:opacity .25s,transform .35s cubic-bezier(.34,1.56,.64,1)}
.f3-info span{font-style:italic;font-family:Georgia,"Times New Roman",serif;font-weight:600}
.f3-info.show{opacity:1;transform:none;pointer-events:auto}
.f3-info.pop{animation:f3pop .6s cubic-bezier(.34,1.56,.64,1)}
@keyframes f3pop{0%{transform:scale(.4)}60%{transform:scale(1.18)}100%{transform:none}}
.f3-info[data-n]:not([data-n=""])::after{content:attr(data-n);position:absolute;left:14px;bottom:12px;min-width:14px;height:14px;padding:0 3px;border-radius:7px;background:var(--page,#fff);color:var(--f3m,#d0306f);font:600 9.5px/14px "Public Sans",Arial,sans-serif;box-shadow:0 1px 4px rgba(0,34,49,.25)}
.f3-info:focus-visible{outline:2px solid var(--accent,#099aae);outline-offset:3px}
.f2-launch.f3 .f3-fig{transition:transform .9s cubic-bezier(.22,.8,.24,1)}
html.f3-deep .f2-launch.f3 .f3-fig{transform:translateX(34px)}
@media (max-width:899px){html.f3-deep .f2-launch.f3 .f3-fig{transform:translateX(22px)}}
html.f3-deep .f2-launch.f3 .fl{display:none!important}
.f3-zz{position:fixed;z-index:86;pointer-events:none;display:none;color:var(--ink-2,#495b63);font:300 12px/1 "Public Sans",Arial,sans-serif}
.f3-zz i{position:absolute;font-style:normal;opacity:0;animation:f3zz 3.6s infinite}
.f3-zz i:nth-child(2){animation-delay:1.2s;font-size:14px}.f3-zz i:nth-child(3){animation-delay:2.4s;font-size:16px}
@keyframes f3zz{0%{opacity:0;transform:translate(0,0)}20%{opacity:.8}100%{opacity:0;transform:translate(10px,-22px)}}
html.f3-deep .f3-zz{display:block}
html.f3-deep .f2-launch.f3 .f3-fig{opacity:.7;filter:saturate(.55)}
.f2-launch.f3 .f3-sh{transition:transform .9s cubic-bezier(.22,.8,.24,1),opacity .6s}
html.f3-deep .f2-launch.f3 .f3-sh{opacity:0!important}
.f2-launch.f3 .f3-fig::after{content:"";position:absolute;left:-45%;top:91%;width:76%;height:8px;border-radius:50%;background:radial-gradient(closest-side,rgba(0,34,49,.22),rgba(0,34,49,0));opacity:0;transform:scaleX(.4);transition:opacity .6s .3s,transform .9s .2s cubic-bezier(.22,.8,.24,1);pointer-events:none}
html.f3-deep .f2-launch.f3 .f3-fig::after{opacity:1;transform:none}
@media (prefers-reduced-motion:reduce){.f3-zz i{animation:none;opacity:.6}.f3-zz i:nth-child(2){transform:translate(5px,-9px)}.f3-zz i:nth-child(3){transform:translate(10px,-18px)}}
`;
var maskSvg="url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 34 38'%3E%3Cpath d='"+FEATHER+"'/%3E%3C/svg%3E\")";
var st0=document.createElement('style');st0.textContent=css+':root{--f2-mask:'+maskSvg+'}';document.head.appendChild(st0);

/* ---------- Markup ---------- */
var LOGO='<svg class="lg" viewBox="0 0 34 38" aria-hidden="true"><defs><linearGradient id="f2g" x1="17" y1="0" x2="17" y2="38" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#FF4A4A"/><stop offset=".55" stop-color="#FF2F8E"/><stop offset="1" stop-color="#C94CFF"/></linearGradient></defs><path fill="url(#f3g)" d="'+FEATHER+'"/></svg>';
var I={x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
 min:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 12h12"/></svg>',
 arr:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
 send:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 18V6M6.5 11.5 12 6l5.5 5.5"/></svg>',
 up:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 15 6-6 6 6"/></svg>',
 chev:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9.5 6 6 6-6 6"/></svg>',
 doc:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3.5h8l4 4V20.5H6z"/><path d="M14 3.5v4h4"/></svg>'};
var wrap=document.createElement('div');
wrap.innerHTML='<svg class="f3-defs" aria-hidden="true" focusable="false"><defs><linearGradient id="f3g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FF4A4A"/><stop offset=".55" stop-color="#FF2F8E"/><stop offset="1" stop-color="#C94CFF"/></linearGradient><linearGradient id="f3gl" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></linearGradient></defs></svg><button class="f2-launch f3" id="finnFab" aria-label="Finn: Hilfe und Hinweise" aria-haspopup="dialog"><span class="fl">Hej Finn!</span><span class="f3-fig"><span class="f3-sh" id="f3sh"></span><svg viewBox="-6 -6 46 50" aria-hidden="true"><path class="f3-ink" id="f3ink" d=""/><g id="f3body"><g id="f3flip"><path fill="url(#f3g)" d="'+FEATHER+'"/><path fill="url(#f3gl)" d="'+FEATHER+'"/></g></g></svg></span></button>'+
 '<div class="finn-scrim" id="finnScrim"></div>'+
 '<section class="f2" id="finn" role="dialog" aria-label="Finn, Ihr KI-Assistent" aria-modal="false"><header class="f2-hd">'+LOGO+'<div class="nm"><b>Finn</b><small>KI-Assistent · profino</small></div><button class="f2-ib" id="finnMin" aria-label="Finn minimieren">'+I.min+'</button><button class="f2-ib" id="finnX" aria-label="Finn schließen">'+I.x+'</button></header><div class="f2-body" id="finnBody"></div><p class="f2-ki">KI · Finn kann Fehler machen. Texte vor dem Versand prüfen.</p></section>'+
 '<button class="f2-minbar" id="finnMinbar" hidden aria-label="Finn wieder öffnen"><span class="f2-orb"><svg class="f2-ring" viewBox="0 0 52 52" aria-hidden="true"><defs><linearGradient id="f2r" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FF4A4A"/><stop offset=".55" stop-color="#FF2F8E"/><stop offset="1" stop-color="#C94CFF"/></linearGradient></defs><circle class="trk" cx="26" cy="26" r="24.5" pathLength="100"/><circle class="val" id="finnMinP" cx="26" cy="26" r="24.5" pathLength="100"/></svg></span><span class="t"><b>Finn</b><small id="finnMinT">Bereit</small></span><span class="up">'+I.up+'</span></button>';
while(wrap.firstChild)document.body.appendChild(wrap.firstChild);
var $=function(s){return document.querySelector(s)};
var fab=$('#finnFab'),pan=$('#finn'),body=$('#finnBody'),minbar=$('#finnMinbar'),scrim=$('#finnScrim');
var hero=document.createElement('div');hero.className='f2-hero';hero.innerHTML='<span class="f2-state" aria-live="polite"></span>';

/* ---------- Feder (SVG) statt Punktwolke ---------- */
var views=[],vLaunch=null;
function fsvg(){return '<svg viewBox="-6 -6 46 50" aria-hidden="true"><path class="f3-ink" d=""/><g class="b"><g class="fp"><path fill="url(#f3g)" d="'+FEATHER+'"/><path fill="url(#f3gl)" d="'+FEATHER+'"/></g></g></svg>'}
function sm3(v){v=Math.max(0,Math.min(1,v));return v*v*(3-2*v)}
function View(el,opt){if(!el)return null;opt=opt||{};
 el.insertAdjacentHTML('beforeend','<span class="f3-mini">'+fsvg()+'</span>');
 var svg=el.querySelector('.f3-mini svg'),b=svg.querySelector('.b'),fp=svg.querySelector('.fp'),ink=svg.querySelector('.f3-ink');
 b.style.transformOrigin='13px 43px';b.style.transformBox='view-box';fp.style.transformOrigin='17px 19px';fp.style.transformBox='view-box';
 var self={tx:0,ty:0,lx:0,ly:0,kick:0,state:0,t0:0,pts:[],cyc:-1,ph:Math.random()*6};
 self.go=function(s){if(s===self.state)return;self.state=s;self.t0=performance.now();self.pts=[];self.cyc=-1;ink.setAttribute('d','');ink.style.opacity=0;fp.style.transform=''};
 self.set=self.go;self.resize=function(){};self.theme=function(){};
 self.frame=function(now){if(!el.offsetParent)return;var t=now/1000+self.ph;
  self.lx+=(self.tx-self.lx)*0.07;self.ly+=(self.ty-self.ly)*0.07;self.kick*=0.88;
  var a=Math.sin(t*0.9)*2.6+Math.sin(t*2.3)*0.6+self.lx*9,y=Math.sin(t*1.4)*1.1-self.kick*2.4+self.ly*1.2,x=0;
  if(reduce){a=0;y=0}
  if(self.state===1&&!reduce){var tt=((now-self.t0)/1000)%2.2,q=tt<0.6?0:tt<1.1?sm3((tt-0.6)/0.5):tt<1.7?1:1-sm3((tt-1.7)/0.5);fp.style.transform='scaleX('+Math.cos(Math.PI*q).toFixed(3)+')'}
  if(self.state===2&&!reduce){var wt=(now-self.t0)/1000,L=1.5,ci=Math.floor(wt/L),pp=(wt%L)/L;if(ci!==self.cyc){self.cyc=ci;self.pts=[]}
   x=-4+pp*13;y=Math.sin(wt*11.3)*1.1+Math.sin(wt*5)*0.4-2.5-(pp>0.92?(pp-0.92)*40:0);a=14+Math.sin(wt*11.3)*4;
   if(pp<0.92){self.pts.push((7+x).toFixed(2)+','+(37+y+0.6).toFixed(2));ink.setAttribute('d','M'+self.pts.join(' L'));ink.style.opacity=1}else ink.style.opacity=(1-(pp-0.92)/0.08).toFixed(2)}
  b.style.transform='translate('+x.toFixed(2)+'px,'+y.toFixed(2)+'px) rotate('+a.toFixed(2)+'deg)'};
 views.push(self);return self}
var vHero=View(hero);
var vMin=View(minbar.querySelector('.f2-orb'));
var clamp=function(v){return Math.max(-1,Math.min(1,v))},typing=false,mctx=document.createElement('canvas').getContext('2d');
function lookCaret(){var inp=$('#finnQ');if(!inp||!vHero||!hero.isConnected)return;var r=hero.getBoundingClientRect(),ir=inp.getBoundingClientRect(),cs=getComputedStyle(inp);mctx.font=cs.font;
 var txt=inp.value?inp.value.slice(0,inp.selectionStart||0):'';var x=ir.left+parseFloat(cs.paddingLeft||0)+mctx.measureText(txt).width-inp.scrollLeft;
 vHero.tx=clamp((x-(r.left+r.width/2))/(r.width*0.55));vHero.ty=clamp((ir.top-(r.top+r.height/2))/(r.height*1.6))}
addEventListener('pointermove',function(e){if(reduce)return;
 if(vHero&&!typing&&hero.isConnected&&pan.classList.contains('open')){var r=hero.getBoundingClientRect();vHero.tx=clamp((e.clientX-(r.left+r.width/2))/(r.width*0.9));vHero.ty=clamp((e.clientY-(r.top+r.height/2))/(r.height*1.5))}},{passive:true});
document.addEventListener('mouseleave',function(){if(vHero&&!typing){vHero.tx=0;vHero.ty=0}});
body.addEventListener('focusin',function(e){if(e.target.id==='finnQ'){var f=e.target.closest('.f2-ask');f&&f.classList.toggle('hint',!!cyc.cur)}});
body.addEventListener('focusout',function(e){if(e.target.id==='finnQ'){var f=e.target.closest('.f2-ask');f&&f.classList.remove('hint')}});
['input','keyup','click','select'].forEach(function(ev){body.addEventListener(ev,function(e){if(e.target.id==='finnQ'&&ev!=='click'){typing=true;clearTimeout(lookCaret.t);lookCaret.t=setTimeout(function(){typing=false},1600);lookCaret();if(ev==='input'&&vHero){vHero.kick=Math.min(1.4,vHero.kick+0.7);if(vMin)vMin.kick=1}}})});
body.addEventListener('keydown',function(e){if(e.target.id==='finnQ'&&(e.key==='Tab'||e.key==='ArrowRight')&&!e.target.value&&cyc.cur){e.preventDefault();e.target.value=cyc.cur;var fa=e.target.closest('.f2-ask');fa.classList.add('has');fa.classList.remove('hint');lookCaret();if(vHero)vHero.kick=1.2}});
function loop(now){views.forEach(function(v){v.frame(now)});requestAnimationFrame(loop)}
requestAnimationFrame(loop);

/* Zustaende: 0 Feder, 1 Denkt, 2 Anschreiben */
var NAMES=['','Finn denkt …','Finn schreibt …'];
var fstate=0;
function setState(s,label){fstate=s;vHero&&vHero.go(s);vMin&&vMin.go(s);var t=hero.querySelector('.f2-state');t.textContent=label!=null?label:NAMES[s];hero.classList.toggle('talk',!!t.textContent)}
vLaunch&&vLaunch.set(1);
fab.addEventListener('pointerenter',function(){vLaunch&&vLaunch.go(0)});
fab.addEventListener('pointerleave',function(){vLaunch&&vLaunch.go(1)});
fab.addEventListener('focus',function(){vLaunch&&vLaunch.go(0)});fab.addEventListener('blur',function(){vLaunch&&vLaunch.go(1)});

/* ---------- Logik ---------- */
var st={kind:null,step:0,o:{ton:'Formell',kunde:'Privatkunde',status:'Bestandskunde'},subj:'',text:''};
var esc=function(t){return String(t).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
function ctx(){if(MODE!=='portal')return null;var h=location.hash||'#home';var t=(document.querySelector('#app h1')||{}).textContent||'';
 if(/artikel|detail|video|webinar|tagungen|kongresse/.test(h)&&t)return{t:t.trim(),k:/artikel/.test(h)?'Artikel':/video/.test(h)?'Aufzeichnung':'Webinar'};return null}
function minLabel(){var m=$('#finnMinT'),p=$('#finnMinP');
 if(st.step){m.textContent=st.kind+' · Schritt '+st.step+' von 4';p.style.strokeDashoffset=100-st.step*25;minbar.classList.add('flow')}
 else if($('#finnChat')&&$('#finnChat').children.length){m.textContent='Gespräch läuft';minbar.classList.remove('flow')}
 else{m.textContent=MODE==='landing'?'Fragen zu profino':'Bereit für Ihre Kundenansprache';minbar.classList.remove('flow')}}
function open(){pan.classList.add('open');scrim.classList.add('show');fab.classList.add('hide');minbar.hidden=true;fab.setAttribute('aria-expanded','true');var d=fab.querySelector('.f2-dot');d&&d.remove();
 if(!body.innerHTML)start();else if(vHero)vHero.set(fstate);
 setTimeout(function(){var i=pan.querySelector('#finnQ')||pan.querySelector('.f2-btn.f2-pri,input,textarea');i&&i.focus({preventScroll:true})},350)}
function close(){pan.classList.remove('open');scrim.classList.remove('show');minbar.hidden=true;fab.classList.remove('hide');if(vLaunch){vLaunch.set(0);setTimeout(function(){if(!fab.matches(':hover'))vLaunch.go(1,500)},60)}fab.setAttribute('aria-expanded','false');fab.focus({preventScroll:true})}
function minimize(kb){minLabel();pan.classList.remove('open');scrim.classList.remove('show');minbar.hidden=false;if(vMin)vMin.set(fstate);if(kb===true)setTimeout(function(){minbar.focus({preventScroll:true})},50)}
/* Mobil: beim Runterscrollen taucht die Feder ab (kippt flach, sinkt halb hinter die Tab-Leiste), beim Hochscrollen richtet sie sich auf */
/* Abtauchen beim Scrollen entfernt (27.10.): Feder bleibt ruhig über der Tab-Leiste */fab.classList.remove('duck');
fab.onclick=open;minbar.onclick=open;scrim.onclick=close;$('#finnX').onclick=function(){close();st.step=0;setTimeout(function(){body.innerHTML=''},500)};$('#finnMin').onclick=function(){minimize()};
document.addEventListener('click',function(e){if(e.target.closest('[data-finn]')){e.preventDefault();open()}});
addEventListener('keydown',function(e){if(e.key==='Escape'&&pan.classList.contains('open'))minimize(true)});
function lbl(){var c=ctx();fab.querySelector('.fl').textContent=document.documentElement.classList.contains('f3-deep')?'Finn aufwecken':c&&c.k==='Artikel'?'Kundenanschreiben generieren':'Hej Finn!';
 if(c&&c.k==='Artikel'&&!pan.classList.contains('open')){fab.classList.add('nudge');vLaunch&&vLaunch.go(0);clearTimeout(lbl.t);lbl.t=setTimeout(function(){fab.classList.remove('nudge');if(!fab.matches(':hover'))vLaunch&&vLaunch.go(1)},5000)}}
addEventListener('hashchange',function(){setTimeout(lbl,400);if(!pan.classList.contains('open')&&minbar.hidden){body.innerHTML='';st.step=0}});setTimeout(lbl,800);

function view(h,heroSize){body.innerHTML='<div class="f2-view"><div class="f2-slot"></div>'+h+'</div>';var s=body.querySelector('.f2-slot');s.replaceWith(hero);hero.classList.toggle('sm',heroSize==='sm');hero.classList.toggle('lg',heroSize==='lg');body.scrollTop=0;if(vHero)vHero.resize()}
function steps(n){return '<div class="f2-steps" aria-label="Schritt '+n+' von 4">'+['Anpassen','Bearbeiten','Prüfen','Verwenden'].map(function(l,i){return '<span class="'+(i+1===n?'on':i+1<n?'done':'')+'">'+l+'</span>'}).join('')+'</div>'}
function askBox(ph,cyc){return '<form class="f2-ask" id="finnAsk"'+(cyc?' data-cyc="'+esc(cyc.join('|'))+'"':'')+'><input id="finnQ" placeholder="'+ph+'" aria-label="'+ph+'" autocomplete="off"><span class="tab" aria-hidden="true">Tab</span><button aria-label="Senden">'+I.send+'</button></form>'}
function sugg(list){return '<div class="f2-sug"><button class="f2-sugt" data-sugt aria-expanded="false">Vorschläge <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></button><div class="f2-chips" hidden>'+list.map(function(q){return '<button class="f2-chip" data-fq="'+esc(q)+'">'+esc(q)+'</button>'}).join('')+'</div></div>'}
var cyc={t:null,i:0,cur:''};
function cycStart(){clearTimeout(cyc.t);var f=$('#finnAsk');if(!f||!f.dataset.cyc)return;var L=f.dataset.cyc.split('|'),inp=$('#finnQ'),base=inp.getAttribute('aria-label');
 if(reduce){inp.placeholder=L[0];cyc.cur=L[0];return}
 var q=L[cyc.i%L.length],n=0,dir=1;
 (function step(){if(!document.body.contains(inp))return;if(inp.value){inp.placeholder=base;f.classList.remove('hint');cyc.cur='';cyc.t=setTimeout(step,600);return}
  n+=dir;inp.placeholder=q.slice(0,n)||base;cyc.cur=n>=q.length?q:'';f.classList.toggle('hint',n>=q.length&&document.activeElement===inp);
  if(n>=q.length){dir=-1;cyc.t=setTimeout(step,2600);return}
  if(n<=0){cyc.i++;q=L[cyc.i%L.length];dir=1;inp.placeholder=base;cyc.t=setTimeout(step,900);return}
  cyc.t=setTimeout(step,dir>0?45:18)})()}
function start(){st.step=0;st.kind=null;st.text='';setState(0,'');var c=ctx();
 if(MODE==='reg'){view('<div class="f2-hi"><h2>Hallo, ich bin Finn.</h2><p>Fragen zur Registrierung? Ich helfe Ihnen weiter.</p></div>'+
  '<div class="f2-chat" id="finnChat"></div>'+askBox('Ihre Frage',['Welche Angaben?','Wozu die Registernummer?','Sind meine Daten sicher?'])+sugg(['Welche Angaben brauche ich?','Warum die Registernummer?','Was passiert mit meinen Daten?']),'lg');cycStart();return}
 if(MODE==='landing'){view('<div class="f2-hi"><h2>Hallo, ich bin Finn.</h2><p>Fragen zu profino? Ich zeige Ihnen, wo Sie was finden.</p></div>'+
  '<div class="f2-chat" id="finnChat"></div>'+askBox('Ihre Frage an Finn',['Was kostet profino?','Wie sammle ich Bildungszeit?','Welche Versicherer?'])+sugg(['Was kostet profino?','Wie sammle ich Bildungszeit?','Welche Versicherer sind dabei?','Ich bin Aussteller']),'lg');cycStart();return}
 if(c){view('<div class="f2-hi"><h2>Hallo '+USER+'.</h2><p>Was machen wir aus diesem '+c.k+'?</p><span class="f2-ctx">'+I.doc+'<span>'+esc(c.t)+'</span></span></div>'+
  '<button class="f2-prim" data-fk="Kundenanschreiben"><span class="t"><span class="e">Empfohlen</span><b>Kundenanschreiben erstellen</b><small>Eine persönliche E-Mail zu diesem Thema, in vier Schritten.</small></span><span class="f2-go">'+I.arr+'</span></button>'+
  '<div class="f2-or">oder</div><div class="f2-chips"><button class="f2-chip" data-fk="Social Media">Social-Media-Post</button><button class="f2-chip" data-fk="Kunden-Mailing">Kunden-Mailing</button></div>'+
  '<div class="f2-chat" id="finnChat"></div>'+askBox('Ihre Frage dazu …'));return}
 view('<div class="f2-hi"><h2>Hallo '+USER+'.</h2><p>Ich finde Inhalte und mache daraus Texte für Ihre Kunden.</p></div>'+
  '<button class="f2-prim" data-fk="Kundenanschreiben"><span class="t"><span class="e">Empfohlen</span><b>Kundenanschreiben erstellen</b><small>Aus einem aktuellen Thema, in vier Schritten.</small></span><span class="f2-go">'+I.arr+'</span></button>'+
  '<div class="f2-chat" id="finnChat"></div>'+askBox('Thema oder Webinar',['Webinare zur bAV','Schreib Jonas: Kongress?','Ansprechpartner Allianz'])+sugg(['Nachricht schreiben','BU','bAV','Allianz']));cycStart()}
var FAQ=[[/angaben|brauche|unterlagen|was muss/i,'Für die Registrierung brauchen Sie nur Ihre Kontaktdaten, Ihre Firma und, wenn vorhanden, Ihre Registernummer nach §34d oder §34f GewO. Alles Weitere können Sie später im Profil ergänzen. Dauert etwa zwei Minuten.'],
 [/register|registernummer|34d|34f|zulassung|erlaubnis/i,'Mit Ihrer Registernummer aus dem Vermittlerregister können wir Ihre Bildungszeit eindeutig Ihnen zuordnen und Ihren Status im Profil als geprüft anzeigen. Haben Sie die Nummer gerade nicht zur Hand? Dann überspringen Sie den Schritt und tragen sie später nach.'],
 [/daten|datenschutz|dsgvo|sicher|weitergabe/i,'Ihre Daten werden nach DSGVO verarbeitet und nicht verkauft. Gesellschaften sehen Ihre Kontaktdaten nur, wenn Sie selbst Kontakt aufnehmen oder ein Webinar besuchen. Die Sichtbarkeit Ihres Profils steuern Sie jederzeit in den Einstellungen.'],
 [/passwort|kennwort/i,'Ihr Passwort braucht mindestens 8 Zeichen, eine Zahl und einen Großbuchstaben. Vergessen? Über „Einloggen“ können Sie es jederzeit zurücksetzen.'],
 [/kost|preis|geld|gratis|kostenlos/i,'profino ist für Vermittler kostenlos, ohne Abo. Sie registrieren sich in einer Minute und können sofort teilnehmen. <a href="#registrieren" data-close>Jetzt registrieren</a>'],
 [/bildung|idd|stunden|nachweis/i,'Jede Teilnahme an einem Webinar und jede vollständig gesehene Aufzeichnung wird automatisch als Bildungszeit erfasst. Den Nachweis nach IDD laden Sie mit einem Klick als PDF herunter.'],
 [/versicherer|gesellschaft|allianz|ergo|axa|dabei/i,'Über 60 Versicherer, Verbünde und Finanzdienstleister sind vertreten, darunter Allianz, ERGO, AXA, HDI, R+V und WWK. <a href="#aussteller-logos" data-close>Alle ansehen</a>'],
 [/aussteller|stand|profil|präsent/i,'Als Aussteller präsentieren Sie Produkte, Webinare und Ansprechpartner an einem Ort. <a href="#aussteller" data-close>Infos für Aussteller</a>'],
 [/webinar|termin|live/i,'Jeden Werktag laufen Live-Webinare mit Bildungszeit. <a href="#termine" data-close>Termine dieser Woche</a>']];
function say(q){var ch=$('#finnChat');if(!ch)return;hero.classList.add('sm');var vw=body.querySelector('.f2-view');vw&&vw.classList.add('chatting');
 ch.insertAdjacentHTML('beforeend','<div class="f2-b me">'+esc(q)+'</div><div class="f2-b bot f2-typing" id="finnT"><i></i><i></i><i></i></div>');body.scrollTop=body.scrollHeight;setState(1);
 setTimeout(function(){var t=$('#finnT');t&&t.remove();var html='';
  if(MODE==='portal'&&dmHandle(q,ch)){body.scrollTop=body.scrollHeight;return}
  if(MODE==='portal'&&typeof SIDX==='function'){var terms=q.toLowerCase().split(/\s+/).filter(Boolean);var hits=SIDX().filter(function(x){return terms.every(function(t){return x.k.toLowerCase().indexOf(t)>-1})}).slice(0,4);
   html=hits.length?'<div class="f2-b bot">Das habe ich zu „'+esc(q)+'“ gefunden:</div><div class="f2-hits">'+hits.map(function(x,i){return '<a class="f2-hit" href="'+x.h+'" data-hi="'+i+'"><span>'+esc(x.t)+'<small>'+esc(x.g)+', '+esc(x.s)+'</small></span>'+I.chev+'</a>'}).join('')+'</div>':'<div class="f2-b bot">Dazu habe ich nichts gefunden. Versuchen Sie es mit einem Thema wie „BU“, „bAV“ oder einer Gesellschaft.</div>';
   ch.insertAdjacentHTML('beforeend',html);ch.querySelectorAll('[data-hi]').forEach(function(a){a.onclick=function(){var x=hits[+a.dataset.hi];x&&x.go&&x.go();minimize()}})}
  else{var m=FAQ.filter(function(f){return f[0].test(q)})[0];ch.insertAdjacentHTML('beforeend','<div class="f2-b bot">'+(m?m[1]:'Gute Frage. Am schnellsten hilft Ihnen unser Team weiter, oder Sie registrieren sich kostenlos und schauen sich direkt um. <a href="#registrieren" data-close>Kostenlos registrieren</a>')+'</div>')}
  ch.querySelectorAll('[data-close]').forEach(function(a){a.onclick=minimize});body.scrollTop=body.scrollHeight;setState(0,'')},reduce?300:1400)}

/* ---------- Direktnachrichten ---------- */
function people(){try{return typeof CONTACTS!=='undefined'?CONTACTS:[]}catch(e){return []}}
var REQS=[['Petra Lange','Maklerin, München'],['Lukas Brandt','Vermittler, Leipzig']];
var DMRX=/\b(schreib\w*|nachricht\w*|send\w*|schick\w*|kontaktier\w*|frag\w*|antwort\w*|meld\w*)\b/i,WHORX=/\bwer\b|ansprechpartner|zuständig|kontakt bei/i;
function initials(n){return n.split(' ').map(function(x){return x[0]}).join('').slice(0,2)}
function hasWord(L,w){return w.length>2&&new RegExp('(^|[^a-zäöüß])'+w.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'([^a-zäöüß]|$)').test(L)}
function findP(q){var L=q.toLowerCase(),C=people();for(var k=0;k<C.length;k++){var n=C[k][0];if(L.indexOf(n.toLowerCase())>-1||n.split(' ').some(function(x){return x.length>3&&hasWord(L,x)}))return k}return -1}
function findR(q){var L=q.toLowerCase();for(var i=0;i<REQS.length;i++){var n=REQS[i][0];if(L.indexOf(n.toLowerCase())>-1||n.split(' ').some(function(x){return x.length>3&&hasWord(L,x)}))return REQS[i]}return null}
function pcard(k){var c=people()[k];return '<div class="f2-pc"><span class="f2-av">'+initials(c[0])+'</span><div><b>'+esc(c[0])+'</b><small>'+esc(c[1])+', '+esc(c[2])+(c[3]?', online':'')+'</small></div><button class="f2-chip" data-dm="'+k+'">Nachricht</button></div>'}
function dmText(k,q){var c=people()[k];var m=q&&q.match(/\b(dass|ob)\s+(.+)$/i),m2=q&&q.match(/:\s*(.+)$/);var core;
 if(m){var p=m[2].replace(/[.!?\s]+$/,'');core=m[1].toLowerCase()==='ob'?'ich wollte Sie kurz fragen, ob '+p+'?':'ich wollte Ihnen kurz Bescheid geben, dass '+p+'.'}
 else if(m2){var p2=m2[1].replace(/\s+$/,'');core=p2.charAt(0).toUpperCase()+p2.slice(1);if(!/[.!?]$/.test(core))core+='.'}
 else core='wir hatten zuletzt Kontakt zum Thema „'+c[4]+'“. Hätten Sie diese Woche Zeit für einen kurzen Austausch?';
 return 'Guten Tag '+c[0]+',\n\n'+core+'\n\nViele Grüße\n'+USER+' Hierholzer'}
function dmDraft(k,q,ch){var c=people()[k];setState(2,'');
 ch.insertAdjacentHTML('beforeend','<div class="f2-dm" data-k="'+k+'"><span class="e">Entwurf</span><div class="hd"><span class="f2-av">'+initials(c[0])+'</span><div><b>An '+esc(c[0])+'</b><small>'+esc(c[1])+', '+esc(c[2])+'</small></div></div><textarea class="f2-field" aria-label="Nachricht an '+esc(c[0])+'">'+esc(dmText(k,q))+'</textarea><p class="f2-note">Wird mit dem Vermerk „mit Finn formuliert“ gesendet, erst nach Ihrem Klick.</p><div class="f2-acts"><button class="f2-btn f2-sec" data-dmx>Verwerfen</button><button class="f2-btn f2-pri" data-dms>Senden</button></div></div>');
 body.scrollTop=body.scrollHeight}
function dmHandle(q,ch){var k=findP(q),r=findR(q);
 if(DMRX.test(q)){
  if(k>-1){dmDraft(k,q,ch);return true}
  if(r){ch.insertAdjacentHTML('beforeend','<div class="f2-b bot">'+esc(r[0])+' ist noch nicht in Ihren Kontakten, hat Ihnen aber eine Kontaktanfrage geschickt. Nehmen Sie sie an, dann formuliere ich die Nachricht. <a href="#profil" data-ptab="1" data-close>Zur Anfrage</a></div>');ch.querySelectorAll('[data-close]').forEach(function(a){a.onclick=minimize});setState(0,'');return true}
  if(/^(nachricht|schreib|send|schick)/i.test(q.trim())){ch.insertAdjacentHTML('beforeend','<div class="f2-b bot">An wen soll die Nachricht gehen? Sie können auch einfach schreiben: „Schreib Sandra Weber, ob …“</div><div class="f2-pcs">'+people().slice(0,4).map(function(c,i){return pcard(i)}).join('')+'</div>');setState(0,'');return true}
 }
 if(WHORX.test(q)){var L=q.toLowerCase(),C=people(),hits=[];C.forEach(function(c,i){if((c[1]+' '+c[2]).split(/[\s,]+/).some(function(w){return w.length>3&&!/^(senior|manager|sales)$/i.test(w)&&hasWord(L,w)}))hits.push(i)});
  if(hits.length){ch.insertAdjacentHTML('beforeend','<div class="f2-b bot">Dazu passt aus Ihrem Netzwerk:</div><div class="f2-pcs">'+hits.slice(0,4).map(pcard).join('')+'</div>');setState(0,'');return true}}
 return false}
function dmSend(card){var k=+card.dataset.k,c=people()[k],txt=card.querySelector('textarea').value.trim();if(!txt||!c)return;
 var ok=false;try{var cv=CONVS.find(function(x){return x.name===c[0]});
  if(!cv){cv={id:c[5]+'n',name:c[0],sub:c[1]+(c[2]?', '+c[2]:''),ini:initials(c[0]),img:(c[5]==='mk'&&typeof MARKUS!=='undefined')?MARKUS:null,on:c[3],t:'jetzt',pv:'',msgs:[]};CONVS.unshift(cv)}
  cv.msgs.push(['me',esc(txt).replace(/\n/g,'<br>')+'<span class="f2-tag">mit Finn formuliert</span>']);cv.pv='Sie: '+txt.replace(/\s+/g,' ').slice(0,60);cv.t='jetzt';curConv=cv.id;ok=true}catch(e){}
 card.outerHTML='<div class="f2-b bot">'+(ok?'Gesendet an '+esc(c[0])+'. <a href="#nachrichten" data-openconv>Unterhaltung öffnen</a>':'Senden hat nicht geklappt. Bitte versuchen Sie es im Bereich Nachrichten.')+'</div>';
 setState(0,'');T(ok?'Nachricht an '+c[0]+' gesendet':'Nicht gesendet')}
function gen(){var c=ctx()||{t:'Altersvorsorge auf dem Prüfstand: Welche Argumente überzeugen?'};var o=st.o,du=o.ton==='Persönlich',neu=o.status==='Neukunde',gew=o.kunde==='Gewerbekunde';
 var an=du?(gew?'Hallo zusammen,':'Hallo,'):(gew?'Sehr geehrte Damen und Herren,':'Guten Tag,');var sie=du?['du','dich','dir','deine']:['Sie','Sie','Ihnen','Ihre'];
 st.subj=st.kind==='Social Media'?c.t:(neu?c.t.split(':')[0]+': Was das für '+(du?'dich':'Sie')+' bedeutet':'Kurz notiert: '+c.t.split(':')[0]);
 var intro=neu?'mein Name ist '+USER+' Hierholzer, ich berate '+(gew?'Unternehmen':'Privatpersonen')+' rund um Vorsorge und Absicherung.':'ich möchte '+sie[2]+' heute ein Thema ans Herz legen, das gerade viele meiner '+(gew?'Firmenkunden':'Kundinnen und Kunden')+' beschäftigt.';
 if(st.kind==='Social Media'){st.text=c.t+'\n\nWie viel Sicherheit braucht '+(du?'deine':'Ihre')+' Vorsorge, und wo liegen Chancen? Die wichtigsten Punkte kompakt:\n\n1. Garantien kosten Rendite, schützen aber vor bösen Überraschungen.\n2. Neue Wege wie das Altersvorsorgedepot schaffen mehr Flexibilität.\n3. Entscheidend ist der persönliche Bedarf, nicht das Produkt.\n\n'+(du?'Lass uns':'Lassen Sie uns')+' darüber sprechen.\n\n#Altersvorsorge #Beratung';return}
 st.text=an+'\n\n'+intro+'\n\nIn der aktuellen Diskussion um „'+c.t+'“ wird deutlich: Sicherheit und Rendite schließen sich nicht aus, wenn die Lösung zur eigenen Situation passt. '+(gew?'Gerade für Ihren Betrieb und Ihre Mitarbeitenden':'Gerade für '+(du?'deine':'Ihre')+' persönliche Planung')+' lohnt sich ein genauer Blick.\n\n'+(du?'Hast du':'Haben Sie')+' Lust auf ein kurzes Gespräch? '+(du?'Melde dich':'Melden Sie sich')+' gern, ich nehme mir Zeit für '+(du?'dich':'Sie')+'.\n\n'+(du?'Viele Grüße':'Mit freundlichen Grüßen')+'\n'+USER+' Hierholzer'}
function seg(k,a,b){return '<div class="f2-seg" role="radiogroup">'+[a,b].map(function(v){return '<button role="radio" aria-checked="'+(st.o[k]===v)+'" class="'+(st.o[k]===v?'on':'')+'" data-seg="'+k+'" data-v="'+v+'">'+v+'</button>'}).join('')+'</div>'}
var docState=function(){return st.kind==='Social Media'?0:2};
function s1(){st.step=1;setState(docState(),'');view('<div class="f2-flow"><b>'+st.kind+'</b><p>Kein Kunde ist wie der andere. Passen Sie den Text an, damit eine individuelle Nachricht entsteht.</p></div>'+steps(1)+seg('ton','Persönlich','Formell')+seg('kunde','Privatkunde','Gewerbekunde')+seg('status','Bestandskunde','Neukunde')+
 '<div class="f2-acts"><button class="f2-btn f2-sec" data-fgo="0">Zurück</button><button class="f2-btn f2-pri" data-fgo="2">Text erstellen</button></div>','sm')}
function s2(){st.step=2;var fresh=!st.text;if(fresh)gen();
 view('<div class="f2-flow"><p>Optimieren Sie Text und '+(st.kind==='Social Media'?'Überschrift':'Betreff')+' nach Ihren Wünschen.</p></div>'+steps(2)+
 '<label class="f2-lbl" for="finnS">'+(st.kind==='Social Media'?'Überschrift':'Betreff')+'</label><input class="f2-field" id="finnS" value="'+esc(st.subj)+'">'+
 '<label class="f2-lbl" for="finnT2">Inhalt</label><textarea class="f2-field" id="finnT2">'+esc(st.text)+'</textarea>'+
 '<div class="f2-acts"><button class="f2-btn f2-sec" data-fgo="1">Zurück</button><button class="f2-btn f2-pri" data-fgo="3">Weiter</button></div>','sm');
 if(fresh&&!reduce){var ta=$('#finnT2'),full=st.text;setState(1,'Finn schreibt …');ta.value='';var i=0;var tk=setInterval(function(){if(!document.body.contains(ta)){clearInterval(tk);return}i+=Math.max(6,Math.round(full.length/70));ta.value=full.slice(0,i);ta.scrollTop=ta.scrollHeight;if(i>=full.length){clearInterval(tk);ta.value=full;ta.scrollTop=0;setState(docState(),'')}},28)}
 else setState(docState(),'')}
function save(){var a=$('#finnS'),b=$('#finnT2');if(a)st.subj=a.value;if(b&&b.value)st.text=b.value}
function s3(){st.step=3;setState(docState(),'');view('<div class="f2-flow"><p>Das ist Ihr finaler Text. Prüfen Sie ihn in der Gesamtansicht.</p></div>'+steps(3)+'<div class="f2-prev"><b>'+esc(st.subj)+'</b>'+esc(st.text)+'</div>'+
 '<div class="f2-acts"><button class="f2-btn f2-sec" data-fgo="2">Zurück</button><button class="f2-btn f2-pri" data-fgo="4">Weiter</button></div>','sm')}
function s4(){st.step=4;setState(docState(),'');view('<div class="f2-flow"><b>Fast geschafft.</b><p>Wie möchten Sie '+(st.kind==='Social Media'?'den Beitrag':'das Anschreiben')+' verwenden?</p></div>'+steps(4)+
 '<div class="f2-outs"><button class="f2-btn f2-out" data-fout="mail">Als E-Mail öffnen</button><button class="f2-btn f2-out" data-fout="dl">Textdokument herunterladen</button><button class="f2-btn f2-out" data-fout="copy">In die Zwischenablage kopieren</button></div>'+
 '<div class="f2-acts"><button class="f2-btn f2-sec" data-fgo="restart">Neu starten</button><button class="f2-btn f2-pri" data-fgo="close">Fertig</button></div>')}
var T=function(m){if(typeof toast==='function')toast(m);else{var t=$('#toast'),tt=$('#toastT');if(t){(tt||t).textContent=m;t.classList.add('show');setTimeout(function(){t.classList.remove('show')},2200)}}};
body.addEventListener('click',function(e){var sg0=e.target.closest('[data-sugt]');if(sg0){var ex=sg0.getAttribute('aria-expanded')!=='true';sg0.setAttribute('aria-expanded',ex);sg0.firstChild.textContent=ex?'Weniger ':'Vorschläge ';sg0.nextElementSibling.hidden=!ex;return}
 var dk=e.target.closest('[data-dm]');if(dk){var ch0=$('#finnChat');if(ch0){var pcs=dk.closest('.f2-pcs');dmDraft(+dk.dataset.dm,'',ch0)}return}
 var ds=e.target.closest('[data-dms]');if(ds){dmSend(ds.closest('.f2-dm'));return}
 var dx=e.target.closest('[data-dmx]');if(dx){var cd=dx.closest('.f2-dm');cd.outerHTML='<div class="f2-b bot">Entwurf verworfen.</div>';setState(0,'');return}
 var oc=e.target.closest('[data-openconv]');if(oc){e.preventDefault();minimize();if(location.hash==='#nachrichten'){try{renderConvs();renderThread();var mg=document.getElementById('msgr');mg&&mg.classList.add('open')}catch(er){}}else location.hash='#nachrichten';return}
 var k=e.target.closest('[data-fk]');if(k){st.kind=k.dataset.fk;st.text='';s1();return}
 var q=e.target.closest('[data-fq]');if(q){say(q.dataset.fq);return}
 var sg=e.target.closest('[data-seg]');if(sg){st.o[sg.dataset.seg]=sg.dataset.v;st.text='';sg.parentElement.querySelectorAll('button').forEach(function(b){var on=b===sg;b.classList.toggle('on',on);b.setAttribute('aria-checked',on)});return}
 var g=e.target.closest('[data-fgo]');if(g){save();var v=g.dataset.fgo;if(v==='close'){close();setTimeout(start,500);return}if(v==='restart'||v==='0'){start();return}({1:s1,2:s2,3:s3,4:s4})[v]();return}
 var o=e.target.closest('[data-fout]');if(o){var full=st.subj+'\n\n'+st.text;
  if(o.dataset.fout==='copy'){navigator.clipboard&&navigator.clipboard.writeText(full).catch(function(){});T('Text in die Zwischenablage kopiert')}
  else if(o.dataset.fout==='dl'){var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([full],{type:'text/plain'}));a.download='profino-'+(st.kind||'text').toLowerCase().replace(/\s+/g,'-')+'.txt';a.click();T('Textdokument heruntergeladen')}
  else{location.href='mailto:?subject='+encodeURIComponent(st.subj)+'&body='+encodeURIComponent(st.text)}}});
body.addEventListener('input',function(e){if(e.target.id==='finnQ')e.target.closest('.f2-ask').classList.toggle('has',!!e.target.value.trim())});
body.addEventListener('submit',function(e){e.preventDefault();var i=$('#finnQ');var v=i.value.trim();if(!v)return;i.value='';i.closest('.f2-ask').classList.remove('has');say(v)});
/* ---------- Finn 3: Feder als Figur, Begleiter, Themenfarbe ---------- */
(function(){
var root=document.documentElement,fig=fab.querySelector('.f3-fig'),fb=$('#f3body'),flip=$('#f3flip'),sh=$('#f3sh'),fink=$('#f3ink');
var bub=document.createElement('div');bub.className='f3-bub';bub.setAttribute('role','status');bub.setAttribute('aria-live','polite');bub.innerHTML='<span></span><button type="button" aria-label="Hinweis schließen"></button>';document.body.appendChild(bub);
var btxt=bub.querySelector('span'),bgo=bub.querySelector('button'),bcb=null;
fb.style.transformOrigin='13px 43px';fb.style.transformBox='view-box';flip.style.transformOrigin='23px 25px';flip.style.transformBox='view-box';
var lastSc=0,dk=0,touchMode=false,tapUntil=0,thinkT=0,mir=1,writeT=0,wpts=[],wcyc=-1,fallT=0,sv=0,a=0,va=0,y=0,vy=0,lean=0,mode='idle',mx=-1e4,my=-1e4,lastScroll=scrollY,t0=performance.now();
addEventListener('scroll',function(){var d=scrollY-lastScroll;lastScroll=scrollY;if(!reduce)sv+=Math.max(-30,Math.min(30,d))*0.015;lastSc=performance.now()},{passive:true});
addEventListener('pointermove',function(e){if(e.pointerType==='touch')return;touchMode=false;mx=e.clientX;my=e.clientY},{passive:true});
document.addEventListener('mouseleave',function(){mx=my=-1e4});
/* Touch: Feder neigt sich kurz zur Tippstelle */
addEventListener('pointerdown',function(e){if(e.pointerType!=='touch')return;touchMode=true;mx=e.clientX;my=e.clientY;tapUntil=performance.now()+1400},{passive:true});
function frame(now){if(touchMode&&now>tapUntil){mx=my=-1e4}var t=(now-t0)/1000,r=fig.getBoundingClientRect(),dx=mx-(r.left+r.width*0.45),dy=my-(r.top+r.height*0.4),d=Math.hypot(dx,dy),R=touchMode?900:300;
 var near=d<R?1-d/R:0;if(touchMode&&near>0)near=Math.max(near,0.7);var tgt=Math.sin(t*0.9)*2.4+Math.sin(t*2.3)*0.6;
 lean+=((near>0?Math.max(-12,Math.min(12,dx*0.06)):0)*near-lean)*0.05;tgt+=lean;
 sv*=0.9;tgt+=Math.max(-2,Math.min(2,-sv*0.2));if(mode==='sleep')tgt=deep?(window.F3LA!=null?F3LA:-90)+Math.sin(t*0.5)*1:-14+Math.sin(t*0.6)*1.5;
 va+=(tgt-a)*0.015-va*0.25;a+=va;
 var ty=(mode==='sleep'&&deep)?(window.F3LY!=null?F3LY:-8)+Math.sin(t*0.5)*0.6:Math.sin(t*1.4)*1.3-near*1.5;vy+=(ty-y)*0.06-vy*0.15;y+=vy;
 var skew=Math.max(-1.5,Math.min(1.5,-va*0.6)),sq=1+Math.max(-0.02,Math.min(0.02,vy*0.015));
 if(reduce){a=0;y=0;skew=0;sq=1}
 dk+=((fab.classList.contains('duck')&&mode==='idle'?1:0)-dk)*0.07;if(dk>0.002&&!reduce){a=a*(1-dk)-62*dk;y+=dk*30}
 var fx=0,lie=0;mir=1;
 if(mode==='think'){var tt=((now-thinkT)/1000)%2.2,q=tt<0.6?0:tt<1.1?sm3((tt-0.6)/0.5):tt<1.7?1:1-sm3((tt-1.7)/0.5);mir=Math.cos(Math.PI*q);flip.style.transform='scaleX('+mir.toFixed(3)+')'}
 if(mode==='write'){var wt=(now-writeT)/1000,L=1.5,ci=Math.floor(wt/L),pp=(wt%L)/L;if(ci!==wcyc){wcyc=ci;wpts=[]}
  fx=-4+pp*13;y=Math.sin(wt*11.3)*1.1+Math.sin(wt*5)*0.4-2.5-(pp>0.92?(pp-0.92)*40:0);a=14+Math.sin(wt*11.3)*4;skew=0;sq=1;va=0;vy=0;
  if(pp<0.92){wpts.push((7+fx).toFixed(2)+','+(37+y+0.6).toFixed(2));fink.setAttribute('d','M'+wpts.join(' L'));fink.style.opacity=1}else fink.style.opacity=(1-(pp-0.92)/0.08).toFixed(2)}
 if(mode==='fall'){var ft=(now-fallT)/1000,cl=function(v){return Math.max(0,Math.min(1,v))};var up=cl(ft/0.16),fp=cl((ft-0.16)/0.82),st2=cl((ft-0.98)/0.3);var w=fp*Math.PI*2.6,amp=1-fp*0.6;fx=Math.sin(w)*11*amp*(1-sm3((fp-0.7)/0.3));var sway=-Math.cos(w)*30*amp,land=sm3((fp-0.62)/0.38);a=up*(sway*(1-land)-84*land)-Math.sin(st2*Math.PI)*5;y=-22*Math.sin(up*Math.PI/2)*(1-Math.pow(fp,1.7))-9*Math.pow(fp,1.7)-Math.sin(st2*Math.PI)*1.5;skew=Math.sin(w)*4*amp*(1-land);sq=1;va=0;vy=0;lie=land}
 fb.style.transform='translate('+fx.toFixed(2)+'px,'+y.toFixed(2)+'px) rotate('+a.toFixed(2)+'deg) skewX('+skew.toFixed(2)+'deg) scale('+(1/sq).toFixed(3)+','+sq.toFixed(3)+')';
 sh.style.transform='translateX('+(fx*(mode==='write'?1.8:1)+(mode==='write'?26:0)-lie*30+(1-mir)*18+(mode==='idle'?a*0.7:0)).toFixed(1)+'px) scale('+((1-Math.max(-20,Math.min(20,y))*0.02*(1-lie)+lie*1.1)*(0.35+0.65*Math.abs(mir))).toFixed(3)+','+(1+lie*0.2).toFixed(2)+')';sh.style.opacity=((mode==='write'?0.28:Math.max(0.2,0.9-Math.abs(Math.min(0,y))*0.03))*(1-dk)).toFixed(2);
 requestAnimationFrame(frame)}
requestAnimationFrame(frame);
var anims=[];
function stop(){flip.style.transform='';if(mode==='fall'){va=3;vy=-2}anims.forEach(function(x){x.cancel()});anims=[];fink.style.opacity=0;fink.setAttribute('d','');bub.classList.remove('show','up');mode='idle'}
function fsay(txt,cta,cb){btxt.textContent=txt;bgo.style.display=cta?'block':'none';bgo.textContent=cta||'';bcb=cb||null;bub.classList.add('show')}
function hop(n){return flip.animate([{transform:'translateY(0) rotate(0)'},{transform:'translateY(-'+n+'px) rotate(-6deg)',offset:.3},{transform:'translateY(0) rotate(0)',offset:.55},{transform:'translateY(-'+(n/2)+'px) rotate(3deg)',offset:.75},{transform:'translateY(0) rotate(0)'}],{duration:850,easing:'cubic-bezier(.3,.7,.4,1)'})}
function act(n,txt,cta,cb){if(n==='nudge'&&mode!=='idle')return;stop();
 if(reduce&&/think|write|error/.test(n)){fsay(n==='think'?'Finn denkt …':n==='write'?'Finn schreibt …':'Das hat nicht geklappt. Nochmal?');return}
 if(n==='hallo'){anims.push(flip.animate([{transform:'rotate(0)'},{transform:'rotate(-16deg)'},{transform:'rotate(12deg)'},{transform:'rotate(-12deg)'},{transform:'rotate(8deg)'},{transform:'rotate(0)'}],{duration:1300,easing:'ease-in-out'}))}
 if(n==='nudge'){va-=4;if(!reduce)anims.push(hop(9))}
 if(n==='attention'){va-=6;if(!reduce)anims.push(hop(10));setTimeout(function(){fsay(txt,cta,cb)},450)}
 if(n==='think'){mode='think';thinkT=performance.now();fsay('Finn denkt …')}
 if(n==='write'){mode='write';writeT=performance.now();wpts=[];wcyc=-1;fink.setAttribute('d','');fink.style.opacity=1;fsay('Finn schreibt …')}
 if(n==='error'){mode='fall';fallT=performance.now();setTimeout(function(){if(mode==='fall'){fsay('Das hat nicht geklappt. Versuchen wir es noch einmal?','Nochmal',stop);bub.classList.add('up')}},1150)}}
bgo.onclick=function(){var f=bcb;stop();f&&f()};
fab.addEventListener('pointerenter',function(){if(mode==='idle'&&!reduce)anims.push(flip.animate([{transform:'rotate(0) scale(1)'},{transform:'rotate(-10deg) scale(1.06)'},{transform:'rotate(0) scale(1)'}],{duration:600,easing:'ease-out'}))});

/* Themenfarbe: profino-Kategorien, Farbton aus den Portal-Auren, leuchtend abgeleitet */
var CAT={all:{s:['#FF4A4A','#FF2F8E','#C94CFF']},live:{c:'#d0605c',au:'#f5cac5'},kon:{c:'#c9783a',au:'#f5dec5'},tag:{c:'#a0508c',au:'#fcd1f9'},med:{c:'#3a78c9',au:'#c5daf6'},mes:{c:'#3d8f68',au:'#c5f7e0',k:{s:.55,l:[.62,.5,.4]}},net:{c:'#7666bd',au:'#d1c7f5'}};
function hx(h){h=h.replace('#','');return [0,2,4].map(function(i){return parseInt(h.substr(i,2),16)})}
function mix(p,q,t){return p.map(function(v,i){return Math.round(v+(q[i]-v)*t)})}
function rgb(p){return 'rgb('+p.join(',')+')'}
function toHsl(c){var r=c[0]/255,g=c[1]/255,b=c[2]/255,M=Math.max(r,g,b),m=Math.min(r,g,b),l=(M+m)/2,h=0,s=0,d=M-m;if(d){s=d/(1-Math.abs(2*l-1));h=M===r?((g-b)/d)%6:M===g?(b-r)/d+2:(r-g)/d+4;h*=60;if(h<0)h+=360}return [h,s,l]}
function fromHsl(h,s,l){h=(h%360+360)%360;var C=(1-Math.abs(2*l-1))*s,X=C*(1-Math.abs((h/60)%2-1)),m=l-C/2,r=[[C,X,0],[X,C,0],[0,C,X],[0,X,C],[X,0,C],[C,0,X]][Math.floor(h/60)%6];return r.map(function(v){return Math.round((v+m)*255)})}
/* Grün wirkt bei gleicher Sättigung grell: je Kategorie eigene Sättigung und Helligkeit möglich */
function glow(hex,k){var q=toHsl(hx(hex)),S=k&&k.s||.92,L=k&&k.l||[.74,.65,.58];return [fromHsl(q[0]-7,S,L[0]),fromHsl(q[0],S,L[1]),fromHsl(q[0]+8,S,L[2])]}
function stopsFor(k){var c=CAT[k];return c.s?c.s.map(hx):glow(c.au,c.k)}
var stopEls=[].slice.call(document.querySelectorAll('#f3g stop')),curS=stopsFor('all'),catNow='all',raf=0;
function paint(s){stopEls.forEach(function(el,i){el.setAttribute('stop-color',rgb(s[i]))});var R=document.documentElement.style;R.setProperty('--f3a',rgb(s[0]));R.setProperty('--f3m',rgb(s[Math.floor(s.length/2)]));R.setProperty('--f3b',rgb(s[s.length-1]))}
function tint(k){if(!CAT[k])k='all';if(k===catNow)return false;catNow=k;var from=curS.map(function(p){return p.slice()}),to=stopsFor(k),T0=performance.now(),D=reduce?1:700;cancelAnimationFrame(raf);
 if(k==='all'){root.removeAttribute('data-f3cat');root.style.removeProperty('--f3-btn')}else{root.setAttribute('data-f3cat',k);root.style.setProperty('--f3-btn',rgb(mix(hx(CAT[k].c),[0,34,49],.2)))}
 (function step(n){var p=Math.min(1,(n-T0)/D),e=1-Math.pow(1-p,3);curS=from.map(function(c,i){return mix(c,to[i],e)});paint(curS);if(p<1)raf=requestAnimationFrame(step)})(T0);return true}
var IK={'c-live':'live','c-kongresse':'kon','c-tagungen':'tag','c-mediathek':'med','c-messehalle':'mes','c-netzwerk':'net'};

/* ---------- Begleiter ---------- */
var card=document.createElement('div');card.className='f3-card';card.setAttribute('role','dialog');card.setAttribute('aria-label','Finn');card.innerHTML='<button class="f3-cx" type="button" aria-label="Hinweis schließen">×</button><div class="f3-ck"></div><div class="f3-cb" aria-live="polite"></div><div class="f3-acts"></div>';document.body.appendChild(card);
var ck=card.querySelector('.f3-ck'),cb=card.querySelector('.f3-cb'),ca=card.querySelector('.f3-acts');
var REG=MODE==='reg',LAND=MODE==='landing'||REG,store={get:function(k){try{return JSON.parse(localStorage.getItem('finn3-'+k))}catch(e){return null}},set:function(k,v){try{localStorage.setItem('finn3-'+k,JSON.stringify(v))}catch(e){}}};
var GAP=LAND?25000:40000,quiet=false,seen={},queue=[],cur=null,lastNudge=0,asleep=false,idleT=null,interests=store.get('interests')||[];
/* 30.10.: Finn drängt sich nicht mehr vor. Hinweise sammeln sich hinter einem kleinen i an der Feder, ein Klick öffnet die Sprechblase. Finn lässt sich schlafen legen (bleibt liegen, keine Hinweise), ein Klick weckt ihn. */
var deep=!!store.get('deep'),pend=[];/* altes „leiser stellen“ (quiet) blockierte Hinweise dauerhaft, ersetzt durch Hinlegen */store.set('quiet',false);
/* i hängt direkt an der Figur, bewegt sich also immer mit der Feder (auch mobil beim Scrollen) */var info=document.createElement('span');info.className='f3-info';info.setAttribute('aria-hidden','true');info.innerHTML='<span>i</span>';fab.querySelector('.f3-fig').appendChild(info);
var zz=document.createElement('span');zz.className='f3-zz';zz.setAttribute('aria-hidden','true');zz.innerHTML='<i>z</i><i>z</i><i>z</i>';document.body.appendChild(zz);
function place(){var r=fab.querySelector('.f3-fig').getBoundingClientRect();if(!r.width)return;zz.style.left=(r.left-(window.F3ZX!=null?F3ZX:4))+'px';zz.style.top=(r.top+(window.F3ZY!=null?F3ZY:24))+'px'}
function badge(){var on=pend.length>0&&!deep;info.classList.toggle('show',on);info.dataset.n=pend.length>1?pend.length:'';fab.setAttribute('aria-label',deep?'Finn aufwecken':pend.length?(pend.length>1?'Finn: '+pend.length+' neue Hinweise':'Finn: ein neuer Hinweis'):'Finn: Hilfe und Hinweise');place()}
function notify(id,fn){if(seen[id]||pend.some(function(p){return p[0]===id}))return;pend.push([id,fn]);badge();if(!deep&&mode==='idle'&&!reduce){info.classList.remove('pop');void info.offsetWidth;info.classList.add('pop')}}
function openHint(){var p=pend.shift();badge();if(p){if(cur)card.classList.remove('show'),cur=null;p[1]()}}

function deepLabel(){var l=fab.querySelector('.fl');if(l)l.textContent=deep?'Finn aufwecken':'Hej Finn!';if(deep)fab.setAttribute('aria-label','Finn aufwecken')}
function setDeep(on){deep=on;store.set('deep',on);document.documentElement.classList.toggle('f3-deep',on);deepLabel();
 if(on){if(cur)hideCard();bub.classList.remove('show');asleep=true;stop();mode='sleep';T('Finn schläft. Ein Klick auf die Feder weckt ihn.')}else{asleep=false;mode='idle';act('hallo');T(pend.length?'Finn ist wach und hat '+(pend.length>1?pend.length+' Hinweise':'einen Hinweis')+' für Sie.':'Finn ist wieder wach.')}badge()}
addEventListener('resize',place);addEventListener('scroll',place,{passive:true});setInterval(place,1000);setTimeout(place,300);
function hideCard(){card.classList.remove('show');cur=null;setTimeout(next,600)}
function show(id,kicker,html,actions,opt){opt=opt||{};bub.classList.remove('show');if(mode==='fall'||mode==='sleep')stop();fab.classList.remove('duck');
 card.classList.toggle('clamp',!/<(div|q|ul|textarea)/.test(html));card.classList.remove('open');card.style.transform='';
 cur=id;ck.textContent=kicker;cb.innerHTML=html;ca.innerHTML='';
 (actions||[]).forEach(function(b){var el=document.createElement('button');el.type='button';el.textContent=b[0];if(b[2])el.className='pri';el.onclick=b[1];ca.appendChild(el)});
 card.classList.add('show');if(!opt.silent)act('nudge');lastNudge=Date.now();seen[id]=1;
 if(opt.focus)setTimeout(function(){var f=card.querySelector(opt.focus||'.f3-acts .pri');f&&f.focus({preventScroll:true})},350)}
function want(id,fn){if(seen[id]||quiet)return;queue.push([id,fn]);next()}
function next(){if(!queue.length)return;var q=queue.shift();if(seen[q[0]]){next();return}notify(q[0],q[1]);next()}
card.querySelector('.f3-cx').onclick=hideCard;
cb.addEventListener('click',function(){if(card.classList.contains('clamp'))card.classList.toggle('open')});
var sy=null,sdy=0;card.addEventListener('touchstart',function(e){if(e.target.closest('button,textarea,input'))return;sy=e.touches[0].clientY;sdy=0;card.classList.add('drag')},{passive:true});
card.addEventListener('touchmove',function(e){if(sy===null)return;sdy=Math.max(0,e.touches[0].clientY-sy);card.style.transform='translateY('+sdy+'px)';card.style.opacity=Math.max(0.3,1-sdy/160)},{passive:true});
card.addEventListener('touchend',function(){if(sy===null)return;sy=null;card.classList.remove('drag');card.style.opacity='';if(sdy>48){card.style.transform='';hideCard()}else card.style.transform=''});
addEventListener('keydown',function(e){if(e.key==='Escape'){if(cur)hideCard();stop()}});
function talk(q){hideCard();open();if(q)setTimeout(function(){say(q)},380)}
function go(h){hideCard();if(h.charAt(0)==='#'&&document.querySelector(h)&&LAND){document.querySelector(h).scrollIntoView({behavior:reduce?'auto':'smooth'})}else location.hash=h}
function steps(n,of){var s='';for(var i=0;i<of;i++)s+='<i class="'+(i<=n?'on':'')+'"></i>';return '<div class="f3-steps">'+s+'</div>'}
function later(){hideCard()}

/* Abholen */
var TOUR=LAND?[
 ['Hallo, ich bin Finn','Neu bei profino? Ich zeige Ihnen in drei Schritten, was Sie hier erwartet.'],
 ['1 · Live und mit Bildungszeit','Jeden Werktag laufen Webinare mit Versicherern und Fachleuten. Jede Teilnahme zählt automatisch als Bildungszeit.'],
 ['2 · Direkter Draht','Über 60 Gesellschaften mit echten Ansprechpartnern. Nachrichten formuliere ich Ihnen auf Wunsch vor.'],
 ['3 · Kostenlos','Für Vermittler ohne Abo. In einer Minute registriert.']]:[
 ['Ich bin Finn','Hallo '+USER+'. Ich begleite Sie auf profino und melde mich, wenn etwas für Sie wichtig ist. Darf ich Ihnen in drei Schritten zeigen, wobei ich helfe?'],
 ['1 · Nachrichten','Schreibt Ihnen jemand, schlage ich eine Antwort vor. Sie prüfen sie, gesendet wird erst nach Ihrem Klick.'],
 ['2 · Neu und live','Startet ein Webinar zu Ihren Themen oder gibt es etwas Neues, sage ich kurz Bescheid. Nicht öfter als nötig.'],
 ['3 · Ihr Ziel','Ich behalte Ihre Bildungszeit im Blick und färbe mich passend zum Bereich, in dem Sie gerade sind.']];
function welcome(i){i=i||0;var t=TOUR[i],last=i===TOUR.length-1;
 if(i===0){show('welcome',LAND?'Willkommen':'Willkommen',esc(t[1])+steps(0,4),[['Zeig mal',function(){welcome(1)},1],['Später',function(){store.set('welcomed',1);hideCard();T('Klicken Sie jederzeit auf die Feder.')}]]);return}
 show('welcome'+i,t[0],esc(t[1])+steps(i,4),[[last?(LAND?'Kostenlos registrieren':'Weiter zu Ihren Themen'):'Weiter',function(){if(!last){welcome(i+1);return}store.set('welcomed',1);if(LAND)go('#registrieren');else pickInterests()},1],['Überspringen',function(){store.set('welcomed',1);if(LAND)hideCard();else pickInterests()}]],{silent:true})}
function pickInterests(){var L=['bAV','BU','Altersvorsorge','Krankenversicherung','Sachversicherung','Gewerbe'];
 show('interests','Ihre Themen','Wofür soll ich Augen und Ohren offen halten?<div class="f3-chips">'+L.map(function(x){return '<button type="button" aria-pressed="'+(interests.indexOf(x)>-1)+'">'+x+'</button>'}).join('')+'</div><small>Ich merke mir das nur in diesem Browser.</small>',
  [['Fertig',function(){interests=[].slice.call(cb.querySelectorAll('.f3-chips [aria-pressed=true]')).map(function(b){return b.textContent});store.set('interests',interests);hideCard();act('hallo');T(interests.length?'Notiert: '+interests.join(', '):'Alles klar, ich halte mich zurück.')},1]],{silent:true,focus:'.f3-chips button'});
 cb.querySelector('.f3-chips').onclick=function(e){var b=e.target.closest('button');if(b)b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true')}}

/* Portal: Nachricht, Neu, Live, Ziel */
function message(){show('message','Nachricht von Sandra Weber','Sandra Weber fragt: „Hast du die Unterlagen zum BU-Schutz für junge Leute noch? Ich hätte morgen einen Termin.“ Soll ich eine Antwort vorschlagen?',
 [['Antwort vorschlagen',function(){talk('Antworte Sandra Weber, dass ich Ihnen die Unterlagen zum BU-Schutz für junge Leute heute noch schicke und viel Erfolg für den Termin wünsche')},1],['Selbst antworten',function(){go('#nachrichten')}],['Später',later]])}
function news(){var bu=interests.indexOf('BU')>-1;show('news','Wussten Sie schon?',(bu?'Weil Sie sich für BU interessieren: ':'')+'In der Mediathek ist die Aufzeichnung „BU-Schutz für junge Leute“ jetzt online. Gut als Vorbereitung für Kundengespräche mit Berufseinsteigern.',
 [['Ansehen',function(){go('#mediathek')},1],['Später',later],['Weniger davon',function(){hideCard();GAP=90000;T('Verstanden, weniger Neuigkeiten.')}]])}
function live(){show('live','Gerade live','„Die Zukunft der Krebsmedizin“ mit Markus Kurz läuft seit 12:00 Uhr. Noch 38 Minuten, das gibt 1 h Bildungszeit.',[['Jetzt teilnehmen',function(){go('#webinar')},1],['Nein danke',later]])}
function goal(){var h=6.5;show('goal','Ihr Jahresziel','Sie haben 6,5 von 15 h Bildungszeit.<div class="f3-meter"><i></i></div>Mit dem laufenden Webinar und dem Kongress kämen Sie schon auf 13,5 h.',[['Bildungszeit ansehen',function(){go('#profil')},1],['Ok',later]]);setTimeout(function(){var m=cb.querySelector('.f3-meter i');m&&(m.style.width=(h/15*100)+'%')},120)}
/* Startseite */
function lreg(){show('reg','Kostenlos dabei','In einer Minute registriert, ohne Abo. Danach sehen Sie alle Webinare, sammeln Bildungszeit und erreichen die Ansprechpartner direkt.',[['Jetzt registrieren',function(){go('#registrieren')},1],['Erst umschauen',later]])}
function menu(){var items=REG?[['ask','Frag Finn …'],['regq','Welche Angaben brauche ich?'],['regz','Warum die Registernummer?'],['regd','Was passiert mit meinen Daten?']]:LAND?[['ask','Frag Finn …'],['tour','Kurze Tour'],['termine','Webinare dieser Woche'],['reg','Kostenlos registrieren']]:[['ask','Frag Finn …'],['message','Nachricht beantworten','1 neu'],['news','Was ist neu?'],['live','Gerade live'],['goal','Mein Jahresziel']];
 if(pend.length)items.unshift(['hint',pend.length>1?pend.length+' Hinweise ansehen':'Hinweis ansehen','neu']);items.push(['sleep','Finn schlafen legen']);
 show('menu','Finn','Wobei kann ich helfen?<div class="f3-menu">'+items.map(function(x){return '<button type="button" data-m="'+x[0]+'"'+(x[0]==='ask'?' class="ask"':'')+'>'+esc(x[1])+(x[2]?' <span class="n">'+x[2]+'</span>':'')+'</button>'}).join('')+'</div>',[],{silent:true,focus:'.f3-menu button'});
 cb.querySelector('.f3-menu').onclick=function(e){var b=e.target.closest('[data-m]');if(!b)return;var m=b.dataset.m;
  if(m==='regq'){talk('Welche Angaben brauche ich?');return}if(m==='regz'){talk('Warum die Registernummer?');return}if(m==='regd'){talk('Was passiert mit meinen Daten?');return}if(m==='ask'){talk();return}if(m==='hint'){openHint();return}if(m==='sleep'){setDeep(true);return}if(m==='quiet'){quiet=!quiet;store.set('quiet',quiet);hideCard();T(quiet?'Finn meldet sich nur noch, wenn Sie ihn fragen.':'Finn meldet sich wieder.');return}
  if(m==='tour'){welcome(0);return}if(m==='termine'){go('#termine');return}if(m==='reg'){go('#registrieren');return}
  ({message:message,news:news,live:live,goal:goal})[m]()}}
fab.onclick=function(){if(deep){setDeep(false);return}if(cur==='menu'){hideCard();return}if(pend.length&&!cur){openHint();return}menu()};

/* Thementipps je Bereich */
var TIPS=LAND?{
 live:['Diese Woche live','Jeden Werktag laufen Live-Webinare. Jede Teilnahme wird automatisch als Bildungszeit erfasst.','Kostenlos registrieren',function(){go('#registrieren')}],
 net:['Netzwerk','Hier haben Sie einen direkten Draht zu Maklerbetreuern und Kollegen. Nachrichten formuliere ich Ihnen auf Wunsch vor.','Finn fragen',function(){talk()}],
 mes:['Gesellschaften','Über 60 Versicherer sind dabei, von Allianz bis WWK. Fragen Sie mich, wer zu Ihrem Thema passt.','Finn fragen',function(){talk('Welche Versicherer sind dabei?')}]}:{
 live:['Liveakademie','Gerade live: „Die Zukunft der Krebsmedizin“ mit Markus Kurz. Noch 38 Minuten, 1 h Bildungszeit.','Jetzt teilnehmen',function(){go('#webinar')}],
 kon:['Kongresse','Spannend gerade: der Altersvorsorge-Kongress „Sicherheit? Rendite? Warum nicht beides?“ mit ERGO, WWK und Allianz.','Vormerken',function(){hideCard();T('Vorgemerkt: Altersvorsorge-Kongress')}],
 tag:['Tagungen','Am 11. November läuft die Tagung „Vom Papierstapel zur KI: Das Maklerbüro 2027“ mit HDI und AXA. Ein Vormittag, sofort umsetzbar.','Anmelden',function(){hideCard();T('Für die Tagung angemeldet')}],
 med:['Mediathek','Neu in der Mediathek: „Zu Lebzeiten alles geregelt“ mit Jana Hoffmann von ERGO. Jede vollständig gesehene Aufzeichnung zählt als Bildungszeit.','Ansehen',function(){go('#video')}],
 mes:['Gesellschaften','Jana Hoffmann von ERGO ist gerade online, um 14:00 Uhr gibt es eine Live-Sprechstunde. Soll ich eine kurze Nachricht an sie vorschlagen?','Nachricht vorschlagen',function(){talk('Schreib Jana Hoffmann, ob Sie mir die neue Tarifübersicht Sterbevorsorge vor der Sprechstunde schicken kann')}],
 net:['Netzwerk','Sie haben zwei Kontaktanfragen, von Petra Lange und Lukas Brandt. Petra Lange ist Maklerin in München.','Anfragen ansehen',function(){go('#profil')}]};
var catT=null,BUSY=/^(welcome|interests|menu)/;
function topic(k,from){var changed=tint(k);if(!changed)return;
 if(cur&&!BUSY.test(cur)&&cur.indexOf('t-')===0)hideCard();
 if(mode==='idle'&&from==='hash')act('nudge');
 clearTimeout(catT);if(k==='all'||from==='hover'||!TIPS[k])return;
 catT=setTimeout(function(){if(catNow!==k||quiet||seen['t-'+k]||pan.classList.contains('open')||(cur&&BUSY.test(cur)))return;var x=TIPS[k];pend=pend.filter(function(p){return p[0].indexOf('t-')!==0});notify('t-'+k,function(){show('t-'+k,x[0],esc(x[1]),[[x[2],x[3],1],['Später',later]],{focus:false})})},LAND?600:900)}
var HASH={'#live':'live','#webinar':'live','#kongresse':'kon','#tagungen':'tag','#tprog':'tag','#mediathek':'med','#video':'med','#archiv':'med','#messehalle':'mes','#stand':'mes','#nachrichten':'net'};
var base='all';
if(!LAND){var fromHash=function(){base=HASH[(location.hash||'#home').split('?')[0]]||'all';topic(base,'hash')};addEventListener('hashchange',function(){setTimeout(fromHash,250)});setTimeout(fromHash,900)}
else if('IntersectionObserver' in window){var SEC={termine:'live',netzwerk:'net','aussteller-logos':'mes',registrieren:'all',start:'all'},vis={};
 var io=new IntersectionObserver(function(es){es.forEach(function(e){vis[e.target.id]=e.isIntersecting?e.intersectionRatio:0});var best='all',bv=0.35;Object.keys(vis).forEach(function(id){if(vis[id]>bv){bv=vis[id];best=SEC[id]||'all'}});if(best!==base){base=best;topic(best)}},{threshold:[0,.35,.6,.9]});
 Object.keys(SEC).forEach(function(id){var el=document.getElementById(id);el&&io.observe(el)})}
/* Hover über Bereichskacheln färbt Finn kurz ein */
document.addEventListener('pointerover',function(e){if(performance.now()-lastSc<400)return;var el=e.target.closest&&e.target.closest('.area,.row,.arch,.ex,.livecard,.nextcard');if(!el||el.contains(e.relatedTarget))return;var ik=el.querySelector('.ik[class*="c-"]');if(!ik)return;var k=null;Object.keys(IK).forEach(function(c){if(ik.classList.contains(c))k=IK[c]});if(k)topic(k,'hover')});
document.addEventListener('pointerout',function(e){var el=e.target.closest&&e.target.closest('.area,.row,.arch,.ex,.livecard,.nextcard');if(!el||el.contains(e.relatedTarget))return;clearTimeout(topic.r);topic.r=setTimeout(function(){topic(base,'hover')},250)});

/* Abwesend: Finn döst, begrüßt bei Rückkehr */
function sleep(){if(cur||pan.classList.contains('open')||deep)return;asleep=true;stop();mode='sleep'}
function wake(){if(!asleep||deep)return;asleep=false;mode='idle';act('hallo')}
function poke(){wake();clearTimeout(idleT);idleT=setTimeout(sleep,60000)}
['pointermove','keydown','scroll','touchstart'].forEach(function(ev){addEventListener(ev,poke,{passive:true})});poke();

/* Panel und Figur zusammen */
new MutationObserver(function(){if(pan.classList.contains('open')){if(cur)hideCard();bub.classList.remove('show')}else setTimeout(next,1200)}).observe(pan,{attributes:true,attributeFilter:['class']});
var _set=setState;setState=function(s,l){_set(s,l);if(!pan.classList.contains('open')){if(s===1)act('think');else if(s===2)act('write');else if(mode==='think'||mode==='write')stop()}};

/* Auslöser */
var welcomed=store.get('welcomed');
if(LAND&&!REG){setTimeout(function(){if(!welcomed&&!quiet)notify('welcome',function(){welcome(0)})},3500);setTimeout(function(){want('reg',lreg)},60000)}
else{setTimeout(function(){if(!welcomed&&!quiet)notify('welcome',function(){welcome(0)});else want('message',message)},1600);if(!welcomed)setTimeout(function(){want('message',message)},30000);
 setTimeout(function(){want('live',live)},75000);
 var sd={};addEventListener('scroll',function(){var p=scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight);
  if(p>0.3&&!sd.n){sd.n=1;want('news',news)}
  if(p>0.6&&!sd.g){sd.g=1;want('goal',goal)}
  if(p>0.85&&/artikel/.test(location.hash)&&!seen['art'+location.hash]&&!quiet&&!pan.classList.contains('open')){var ah='art'+location.hash;seen[ah]=1;notify('x-'+ah,function(){show('x-'+ah,'Artikel','Soll ich daraus ein Kundenanschreiben entwerfen?',[['Ja, gern',function(){talk('Entwirf aus diesem Artikel ein kurzes Kundenanschreiben')},1],['Später',later]])})}},{passive:true})}
if(deep){document.documentElement.classList.add('f3-deep');asleep=true;mode='sleep'}badge();deepLabel();
window.FINN3={talk:talk,sleep:function(){setDeep(true)},wake:function(){setDeep(false)},act:act,stop:stop,tint:tint,menu:menu,show:show,hide:hideCard,welcome:welcome,message:message,mode:function(){return mode}};
})();
window.FINN2={open:open,close:close,minimize:minimize,say:say};
})();
