// Фильтры проектов
document.querySelectorAll('.btn-filter').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const tag = btn.dataset.filter;
    document.querySelectorAll('#projects-grid .card').forEach(card=>{
      const tags = card.dataset.tags || '';
      card.style.display = (tag==='all' || tags.includes(tag)) ? '' : 'none';
    });
  });
});

// Модалки
document.querySelectorAll('[data-open-modal]').forEach(trigger=>{
  const target = document.querySelector(trigger.dataset.openModal);
  if (!target) return;
  trigger.addEventListener('click', ()=> target.showModal());
  target.querySelector('[data-close]')?.addEventListener('click', ()=> target.close());
});

// Валидация формы контактов
const form = document.getElementById('contact-form');
if(form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = new FormData(form);
    let ok = true;
    for(const [name, value] of data.entries()){
      const field = form.querySelector(`[name="${name}"]`);
      const err = form.querySelector(`.error[data-for="${name}"]`);
      if(!value.trim() || (name==='email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value))){
        ok = false;
        if(err) err.textContent = 'Проверьте поле';
        field?.setAttribute('aria-invalid','true');
      }else{
        if(err) err.textContent = '';
        field?.removeAttribute('aria-invalid');
      }
    }
    if(ok){
      alert('Сообщение отправлено (демо)!');
      form.reset();
    }
  });
}
// Burger menu (mobile)
(() => {
  const burger = document.querySelector('.burger');
  const menu = document.getElementById('site-menu');
  if (!burger || !menu) return;

  const closeMenu = () => {
    burger.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
    document.body.classList.remove('noscroll');
  };

  burger.addEventListener('click', () => {
    const isOpen = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!isOpen));
    menu.classList.toggle('open', !isOpen);
    document.body.classList.toggle('noscroll', !isOpen);
  });

  
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  
  // Автозакрытие при возврате к десктопу
  const mq = window.matchMedia('(min-width: 769px)');
  mq.addEventListener('change', (ev) => { if (ev.matches) closeMenu(); });
})();


