/ js/form-validacao.js
// Validação acessível + máscaras leves (CPF, CEP, telefone) para Voluntariado e Contato

(function(){
  const SELECTORS = [
    'form[action="#"]',              // seus formulários atuais
    'form[data-validate="on"]'       // opcional: ativa em futuros forms marcados
  ].join(',');

  // ===== helpers =====
  const byId = (id) => document.getElementById(id);
  const createMsg = (text) => {
    const m = document.createElement('div');
    m.className = 'error-msg';
    m.setAttribute('role', 'alert');
    m.setAttribute('aria-live', 'polite');
    m.textContent = text;
    return m;
  };
  const clearError = (input) => {
    input.setAttribute('aria-invalid', 'false');
    const wrap = input.closest('.field') || input.parentElement;
    if (!wrap) return;
    const old = wrap.querySelector('.error-msg');
    if (old) old.remove();
  };
  const addError = (input, msg) => {
    clearError(input);
    input.setAttribute('aria-invalid', 'true');
    const wrap = input.closest('.field') || input.parentElement;
    if (!wrap) return;
    wrap.appendChild(createMsg(msg));
  };
  const scrollToEl = (el) => {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.focus({ preventScroll: true });
  };

  // ===== máscaras leves =====
  const onlyDigits = (v) => v.replace(/\D+/g, '');
  const maskCPF = (v) => {
    v = onlyDigits(v).slice(0,11);
    if (v.length > 9) return v.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2}).*$/, '$1.$2.$3-$4');
    if (v.length > 6) return v.replace(/^(\d{3})(\d{3})(\d{0,3}).*$/, '$1.$2.$3');
    if (v.length > 3) return v.replace(/^(\d{3})(\d{0,3}).*$/, '$1.$2');
    return v;
  };
  const maskCEP = (v) => {
    v = onlyDigits(v).slice(0,8);
    if (v.length > 5) return v.replace(/^(\d{5})(\d{0,3}).*$/, '$1-$2');
    return v;
  };
  const maskTelefone = (v) => {
    v = onlyDigits(v).slice(0,11);
    if (v.length > 10) return v.replace(/^(\d{2})(\d{5})(\d{0,4}).*$/, '($1) $2-$3');
    if (v.length > 6)  return v.replace(/^(\d{2})(\d{0,5})(\d{0,4}).*$/, '($1) $2-$3');
    if (v.length > 2)  return v.replace(/^(\d{2})(\d{0,5}).*$/, '($1) $2');
    return v.replace(/^(\d{0,2}).*$/, '($1');
  };

  // ===== mensagens customizadas =====
  const customMessage = (input) => {
    if (input.validity.valueMissing) return 'Preencha este campo.';
    if (input.validity.typeMismatch) {
      if (input.type === 'email') return 'Informe um e-mail válido (ex.: nome@dominio.com).';
      return 'Valor inválido.';
    }
    if (input.validity.patternMismatch) {
      if (input.id === 'v-cpf') return 'CPF no formato 000.000.000-00.';
      if (input.id === 'v-cep') return 'CEP no formato 00000-000.';
      if (input.id === 'v-tel' || input.id === 'c-tel') return 'Telefone no formato (11) 99999-9999.';
      return 'Formato inválido.';
    }
    if (input.validity.tooShort) return `Use pelo menos ${input.minLength} caracteres.`;
    return 'Verifique este campo.';
  };

  // ===== validação de um campo =====
  const validateField = (input) => {
    // ignora campos desabilitados/ocultos
    if (input.disabled || input.type === 'hidden') return true;

    // aplica máscaras onde fizer sentido
    if (input.id === 'v-cpf') input.value = maskCPF(input.value);
    if (input.id === 'v-cep') input.value = maskCEP(input.value);
    if (input.id === 'v-tel' || input.id === 'c-tel') input.value = maskTelefone(input.value);

    // usa HTML5 para validar
    if (input.checkValidity()) {
      clearError(input);
      return true;
    } else {
      addError(input, customMessage(input));
      return false;
    }
  };

  // ===== validação do formulário =====
  const validateForm = (form) => {
    const fields = form.querySelectorAll('input, select, textarea');
    let firstInvalid = null;
    let ok = true;
    fields.forEach((f) => {
      const good = validateField(f);
      if (!good && !firstInvalid) firstInvalid = f;
      ok = ok && good;
    });
    if (!ok && firstInvalid) scrollToEl(firstInvalid);
    return ok;
  };

  // ===== inicialização =====
  const init = () => {
    const forms = document.querySelectorAll(SELECTORS);
    if (!forms.length) return;

    forms.forEach((form) => {
      // wrap simples: adiciona .field ao redor de inputs se não existir (melhor para erro-msg)
      form.querySelectorAll('label + input, label + select, label + textarea').forEach((ctrl) => {
        const lbl = ctrl.previousElementSibling;
        const container = document.createElement('div');
        container.className = 'field';
        if (lbl && lbl.tagName === 'LABEL') {
          const parent = lbl.parentElement;
          parent.insertBefore(container, lbl);
          container.appendChild(lbl);
          container.appendChild(ctrl);
        }
      });

      // eventos
      form.addEventListener('submit', (e) => {
        if (!validateForm(form)) e.preventDefault();
      });
      form.addEventListener('input', (e) => {
        const t = e.target;
        if (!(t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t instanceof HTMLSelectElement)) return;
        // valida enquanto digita (suave)
        if (t.id === 'v-cpf' || t.id === 'v-cep' || t.id === 'v-tel' || t.id === 'c-tel') {
          validateField(t);
        } else if (t.required) {
          // só limpa erro quando estiver válido
          if (t.checkValidity()) clearError(t);
        }
      });
      form.addEventListener('blur', (e) => {
        const t = e.target;
        if (t && t.tagName && (t.matches('input, select, textarea'))) validateField(t);
      }, true);
    });
  };

  document.addEventListener('DOMContentLoaded', init);
})();

const mask = (el, fn) => el && el.addEventListener('input', e => { e.target.value = fn(e.target.value) })

const onlyDigits = v => v.replace(/\D/g, '')

const maskCPF = v => {
  v = onlyDigits(v).slice(0, 11)
  return v
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

const maskCEP = v => {
  v = onlyDigits(v).slice(0, 8)
  return v.replace(/(\d{5})(\d{1,3})$/, '$1-$2')
}

const maskTel = v => {
  v = onlyDigits(v).slice(0, 11)
  if (v.length <= 10) {
    return v
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d{1,4})$/, '$1-$2')
  }
  return v
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{1,4})$/, '$1-$2')
}

// aplica nas páginas
mask(document.querySelector('#v-cpf'), maskCPF)
mask(document.querySelector('#v-cep'), maskCEP)
mask(document.querySelector('#v-tel'), maskTel)
mask(document.querySelector('#c-tel'), maskTel)