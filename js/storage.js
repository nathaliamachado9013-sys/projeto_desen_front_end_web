const KEY = 'flordapele:form-draft';

export function saveDraft(form) {
  const data = {};
  [...form.elements].forEach(el => {
    if (!el.name) return;
    if (el.type === 'checkbox') {
      data[el.name] = form.querySelectorAll(`input[name="${el.name}"]:checked`).length
        ? [...form.querySelectorAll(`input[name="${el.name}"]:checked`)].map(i => i.value)
        : [];
    } else {
      data[el.name] = el.value;
    }
  });
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function loadDraft(form) {
  const raw = localStorage.getItem(KEY);
  if (!raw) return;
  const data = JSON.parse(raw);
  Object.entries(data).forEach(([name, val]) => {
    const el = form.elements[name];
    if (!el) return;
    if (Array.isArray(val)) {
      val.forEach(v => {
        const cb = form.querySelector(`input[name="${name}"][value="${v}"]`);
        if (cb) cb.checked = true;
      });
    } else {
      el.value = val;
    }
  });
}

export function clearDraft() {
  localStorage.removeItem(KEY);
}