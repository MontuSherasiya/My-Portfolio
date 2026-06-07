// CURSOR
const cur = document.getElementById('cur');
const ring = document.getElementById('ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cur.style.left = mx + 'px'; cur.style.top = my + 'px' });
function animRing() { rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(animRing) }
animRing();
document.querySelectorAll('a,button,.btn,.proj-card,.skill-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cur.style.width = '16px'; cur.style.height = '16px'; ring.style.width = '50px'; ring.style.height = '50px' });
    el.addEventListener('mouseleave', () => { cur.style.width = '10px'; cur.style.height = '10px'; ring.style.width = '36px'; ring.style.height = '36px' });
});

// SCROLL REVEAL
const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('show'), 50);
            obs.unobserve(e.target);
        }
    });
}, { threshold: 0.07 });
document.querySelectorAll('.reveal').forEach((el, i) => {
    obs.observe(el);
});

// Stagger grid children
document.querySelectorAll('.skills-grid,.projects-grid,.c-links').forEach(grid => {
    grid.querySelectorAll('.reveal').forEach((c, i) => { c.style.transitionDelay = i * 70 + 'ms' });
});

// SKILL BARS
const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const fill = e.target.querySelector('.bar-fill');
            if (fill) {
                const w = fill.dataset.w;
                fill.style.width = (parseFloat(w) * 100) + '%';
                setTimeout(() => fill.classList.add('animate'), 100);
            }
            barObs.unobserve(e.target);
        }
    });
}, { threshold: 0.3 });
document.querySelectorAll('.bar-row').forEach(r => barObs.observe(r));

// ACTIVE NAV on scroll
const sections = document.querySelectorAll('[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let cur2 = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) cur2 = s.id;
    });
    navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + cur2 ? 'var(--cyan)' : '';
    });
});