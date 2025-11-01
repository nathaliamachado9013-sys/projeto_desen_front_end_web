import { maskCPF, maskCEP, maskTel, isValidCPF, showFieldError, clearFieldError } from './utils.js';
import { saveDraft, loadDraft, clearDraft } from './form-storage.js';

// aplica máscaras
function bindMasks(root=document) {
  const cpf = root.querySelector('#v-cpf');
  const cep = root.querySelector('#v-cep');
  const tel1 = root.querySelector('#v-tel');
  const tel2 = root.querySelector('#c-tel');

  const on = (el, fn) => el && el.addEventListener('input', e => e.target.value = fn(e.target.value));
  on(cpf, maskCPF);
  on(cep, maskCEP);
  on(tel1, maskTel);
  on(tel2, maskTel);
}

// valida consistência dos formulários
function bindValidation(root=document) {
  [...root.querySelectorAll('form')].forEach(form => {
    loadDraft(form);
    form.addEventListener('input', () => saveDraft(form));

    form.addEventListener('submit', e => {
      let ok = true;
      [...form.elements].forEach(clearFieldError);

      const cpf = form.querySelector('#v-cpf');
      if (cpf && cpf.value && !isValidCPF(cpf.value)) {
        showFieldError(cpf, 'CPF inválido. Confira os dígitos.');
        ok = false;
      }

      const nasc = form.querySelector('#v-nasc');
      if (nasc && nasc.value) {
        const birth = new Date(nasc.value);
        if (birth > new Date()) {
          showFieldError(nasc, 'Data de nascimento não pode ser futura.');
          ok = false;
        }
      }

      const email = form.querySelector('#v-email, #c-email');
      if (email && !email.checkValidity()) {
        showFieldError(email, 'Informe um e-mail válido (ex: nome@dominio.com).');
        ok = false;
      }

      const lgpd = form.querySelector('input[name="lgpd"]');
      if (lgpd && !lgpd.checked) {
        showFieldError(lgpd, 'É necessário autorizar o tratamento de dados (LGPD).');
        ok = false;
      }

      const areas = form.querySelectorAll('input[name="area"]');
      if (areas.length && ![...areas].some(a => a.checked)) {
        showFieldError(areas[areas.length - 1], 'Selecione ao menos uma área de interesse.');
        ok = false;
      }

      if (!ok) {
        e.preventDefault();
        const firstInvalid = form.querySelector('[aria-invalid="true"]') || form.querySelector(':invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      clearDraft();
      alert('✅ Formulário enviado com sucesso! Obrigada por participar 🌿');
    });
  });
}

export function initForms(root=document) {
  bindMasks(root);
  bindValidation(root);
}

document.addEventListener('view:loaded', () => initForms(document));