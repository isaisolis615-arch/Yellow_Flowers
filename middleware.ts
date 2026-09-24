const PASSWORD = '1820Ñ2';
const COOKIE_NAME = 'yellow-flowers-auth';

const passwordPage = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🌻 Ramos de Sol</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Caveat:wght@400;700&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --crema:#FFF8E7;--amarillo-suave:#FFE8A0;--amarillo-medio:#FFD66B;--amarillo-fuerte:#F5C04A;
      --rosa-palido:#FFE4EC;--rosa-suave:#FADADD;--verde-hoja:#C8E6C9;--verde-oscuro:#8FBC8F;
      --negro-suave:#2D2D2D;--gris-calido:#6B6B6B;--blanco-hueso:#FAF9F6;--sombra:rgba(0,0,0,0.06);
      --font-display:'Cormorant Garamond',Georgia,serif;--font-handwriting:'Caveat',cursive;--font-ui:'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif;
      --fs-xl:clamp(1.4rem,1.2rem+1vw,1.8rem);--fs-2xl:clamp(1.8rem,1.5rem+1.5vw,2.5rem);
      --fs-3xl:clamp(2.5rem,2rem+2.5vw,3.5rem);--space-xl:2rem;--space-2xl:3rem;--radius-full:9999px;
      --shadow-medium:0 8px 24px rgba(0,0,0,0.12);--transition-base:250ms ease-out;
    }
    @media(prefers-reduced-motion:reduce){*{animation-duration:0.01ms!important;transition-duration:0.01ms!important}}
    body{min-height:100vh;background:linear-gradient(180deg,var(--crema) 0%,var(--blanco-hueso) 100%);
      font-family:var(--font-ui);color:var(--negro-suave);display:flex;align-items:center;justify-content:center;
      padding:var(--space-xl);position:relative;overflow:hidden}
    body::before{content:'';position:fixed;inset:0;background:radial-gradient(circle at 20% 20%,var(--amarillo-suave) 0%,transparent 50%),
      radial-gradient(circle at 80% 80%,var(--rosa-palido) 0%,transparent 50%);opacity:0.6;pointer-events:none;z-index:0}
    .container{position:relative;z-index:1;max-width:420px;width:100%;text-align:center}
    .flower{font-size:4rem;animation:float 3s ease-in-out infinite;margin-bottom:var(--space-xl);filter:drop-shadow(0 4px 8px var(--sombra))}
    @keyframes float{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-12px) rotate(2deg)}}
    h1{font-family:var(--font-display);font-size:var(--fs-3xl);font-weight:700;color:var(--negro-suave);margin-bottom:var(--space-xl);
      text-shadow:0 2px 4px var(--sombra);line-height:1.2}
    .subtitle{font-family:var(--font-handwriting);font-size:var(--fs-xl);color:var(--gris-calido);margin-bottom:var(--space-2xl);line-height:1.5}
    .lock-icon{width:64px;height:64px;margin:0 auto var(--space-xl);opacity:0.8;animation:pulse 2s ease-in-out infinite}
    @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
    form{display:flex;flex-direction:column;gap:var(--space-lg)}
    .input-group{position:relative}
    input[type="password"]{width:100%;padding:1rem 3rem 1rem 1.5rem;font-family:var(--font-ui);font-size:1.1rem;
      border:2px solid var(--amarillo-medio);border-radius:var(--radius-full);background:var(--blanco-hueso);
      color:var(--negro-suave);box-shadow:var(--shadow-medium);transition:border-color var(--transition-base),box-shadow var(--transition-base)}
    input[type="password"]:focus{outline:none;border-color:var(--amarillo-fuerte);box-shadow:0 0 0 4px rgba(245,192,74,0.3)}
    input[type="password"]::placeholder{color:var(--gris-calido);font-family:var(--font-handwriting)}
    .toggle-visibility{position:absolute;right:1rem;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;
      color:var(--gris-calido);padding:0.5rem;display:flex;align-items:center;justify-content:center}
    .toggle-visibility:hover{color:var(--negro-suave)}
    .toggle-visibility svg{width:20px;height:20px}
    button[type="submit"]{padding:1rem 2rem;font-family:var(--font-display);font-size:1.2rem;font-weight:600;
      background:linear-gradient(135deg,var(--amarillo-medio),var(--amarillo-fuerte));color:var(--negro-suave);
      border:none;border-radius:var(--radius-full);cursor:pointer;box-shadow:var(--shadow-medium);
      transition:transform var(--transition-base),box-shadow var(--transition-base);position:relative;overflow:hidden}
    button[type="submit"]::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,var(--amarillo-fuerte),var(--amarillo-medio));
      opacity:0;transition:opacity var(--transition-base)}
    button[type="submit"]:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(245,192,74,0.4)}
    button[type="submit"]:hover::before{opacity:1}
    button[type="submit"]:active{transform:translateY(0)}
    button[type="submit"] span{position:relative;z-index:1}
    .hint{font-family:var(--font-handwriting);font-size:1rem;color:var(--gris-calido);margin-top:var(--space-lg);opacity:0.7}
    .error{color:#c0392b;font-family:var(--font-handwriting);font-size:1.1rem;margin-top:var(--space-md);min-height:1.5em;opacity:0;
      animation:shakeIn 0.4s ease-out forwards}
    @keyframes shakeIn{0%{opacity:0;transform:translateX(-10px)}20%{transform:translateX(5px)}40%{transform:translateX(-5px)}60%{transform:translateX(3px)}100%{opacity:1;transform:translateX(0)}}
    .petals{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden}
    .petal{position:absolute;width:12px;height:12px;background:var(--amarillo-medio);clip-path:ellipse(50% 50% at 50% 50%);
      opacity:0.7;animation:fall linear infinite}
    .petal:nth-child(odd){background:var(--rosa-suave);border-radius:50% 0 50% 50%}
    @keyframes fall{0%{transform:translateY(-10vh) rotate(0deg);opacity:0}10%{opacity:0.7}90%{opacity:0.7}100%{transform:translateY(110vh) rotate(360deg);opacity:0}}
    @media(max-width:480px){.container{padding:var(--space-lg)}h1{font-size:var(--fs-2xl)}.flower{font-size:3rem}}
  </style>
</head>
<body>
  <div class="petals" id="petals" aria-hidden="true"></div>
  <div class="container">
    <div class="flower" aria-hidden="true">🌻</div>
    <h1>Ramos de Sol</h1>
    <p class="subtitle">Un regalo especial para mi mejor amiga.<br>Ingresa la contraseña para abrir la caja 🗝️</p>
    <svg class="lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
    <form id="pwd-form" action="/?pwd=" method="GET">
      <div class="input-group">
        <input type="password" id="password" name="pwd" placeholder="Contraseña" autocomplete="off" required aria-label="Contraseña para acceder">
        <button type="button" class="toggle-visibility" id="toggle-vis" aria-label="Mostrar/ocultar contraseña">
          <svg id="eye-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          <svg id="eye-closed" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
        </button>
      </div>
      <button type="submit"><span>Abrir regalo 🌻</span></button>
      <p class="error" id="error" aria-live="polite"></p>
    </form>
    <p class="hint">La contraseña es nuestro número especial 💛</p>
  </div>
  <script>
    (function(){
      const form=document.getElementById('pwd-form');
      const input=document.getElementById('password');
      const toggle=document.getElementById('toggle-vis');
      const eyeOpen=document.getElementById('eye-open');
      const eyeClosed=document.getElementById('eye-closed');
      const error=document.getElementById('error');
      const urlParams=new URLSearchParams(window.location.search);
      if(urlParams.get('pwd')){input.value=urlParams.get('pwd');error.textContent='Contraseña incorrecta 🌻 Intenta de nuevo';}
      toggle.addEventListener('click',function(){const isHidden=input.type==='password';input.type=isHidden?'text':'password';
        eyeOpen.style.display=isHidden?'none':'block';eyeClosed.style.display=isHidden?'block':'none';toggle.setAttribute('aria-label',isHidden?'Ocultar contraseña':'Mostrar contraseña');});
      form.addEventListener('submit',function(e){const val=input.value.trim();if(!val){e.preventDefault();error.textContent='Escribe la contraseña primero 🌻';input.focus();}});
      input.addEventListener('input',function(){if(error.textContent)error.textContent='';});
      const petalsContainer=document.getElementById('petals');const petalCount=18;
      for(let i=0;i<petalCount;i++){const petal=document.createElement('div');petal.className='petal';
        const size=Math.random()*8+8;petal.style.width=size+'px';petal.style.height=size+'px';
        petal.style.left=Math.random()*100+'vw';petal.style.animationDuration=(Math.random()*10+15)+'s';
        petal.style.animationDelay=Math.random()*-20+'s';petal.style.opacity=0.4+Math.random()*0.4;
        petalsContainer.appendChild(petal);}
    })();
  </script>
</body>
</html>`;

function parseCookies(cookieHeader: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(';').forEach(c => {
    const [key, ...val] = c.trim().split('=');
    if (key) cookies[key] = val.join('=');
  });
  return cookies;
}

function serializeCookie(name: string, value: string, options: {
  maxAge?: number;
  path?: string;
  secure?: boolean;
  sameSite?: 'lax' | 'strict' | 'none';
  httpOnly?: boolean;
} = {}): string {
  const parts = [`${name}=${value}`];
  if (options.maxAge) parts.push(`Max-Age=${options.maxAge}`);
  if (options.path) parts.push(`Path=${options.path}`);
  if (options.secure) parts.push('Secure');
  if (options.sameSite) parts.push(`SameSite=${options.sameSite}`);
  if (options.httpOnly) parts.push('HttpOnly');
  return parts.join('; ');
}

export default async function middleware(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = parseCookies(cookieHeader);
  const queryPwd = url.searchParams.get('pwd');

  // Password correcto en query -> set cookie + redirect limpio
  if (queryPwd === PASSWORD) {
    const cleanUrl = new URL(url.origin + url.pathname);
    const response = Response.redirect(cleanUrl.toString(), 302);
    response.headers.set('Set-Cookie', serializeCookie(COOKIE_NAME, PASSWORD, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
      secure: true,
      sameSite: 'lax',
      httpOnly: true
    }));
    return response;
  }

  // Cookie válida -> pasar
  if (cookies[COOKIE_NAME] === PASSWORD) {
    return new Response(null, { status: 200, headers: { 'x-middleware-next': '1' } });
  }

  // Mostrar página de password
  return new Response(passwordPage, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}

export const config = { matcher: '/:path*' };