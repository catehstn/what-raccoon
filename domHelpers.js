const DOM = {
    show: (id) => document.getElementById(id).classList.remove('hidden'),
    hide: (id) => document.getElementById(id).classList.add('hidden'),
    get: (id) => document.getElementById(id),
    setText: (id, text) => document.getElementById(id).textContent = text,
    setHTML: (id, html) => document.getElementById(id).innerHTML = html
};
