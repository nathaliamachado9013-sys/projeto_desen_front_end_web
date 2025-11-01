export const onlyDigits = v => (v || '').replace(/\D/g, '');

export function maskCPF(v) {
  v = onlyDigits(v).slice(0,11);
  return v.replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}
export function maskCEP(v) {
  v = onlyDigits(v).slice(0,8);
  return v.replace(/(\d{5})(\d{1,3})$/, '$1-$2');
}
export function maskTel(v) {
  v = onlyDigits(v).slice(0,11);
  if (v.length <= 10) {
    return v.replace(/(\d{2})(\d)/,'($1) $2')
            .replace(/(\d{4})(\d{1,4})$/,'$1-$2');
  }
  return v.replace(/(\d{2})(\d)/,'($1) $2')
          .replace(/(\d{5})(\d{1,4})$/,'$1-$2');
}

// Validações
export function isValidEmail(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((e||'').trim());
}
export function isValidCEP(cep) {
  return /^\d{5}-\d{3}$/.test(cep || '');
}
export function isRequired(v) {
  return (v ?? '').toString().trim().length > 0;
}

// Validação CPF (checksum)
export function isValidCPF(cpf) {
  cpf = onlyDigits(cpf);
  if (!cpf || cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let soma = 0, resto;
  for (let i=1;i<=9;i++) soma += parseInt(cpf.substring(i-1,i))*(11-i);
  resto = (soma*10)%11; if (resto===10||resto===11) resto=0;
  if (resto !== parseInt(cpf.substring(9,10))) return false;
  soma = 0;
  for (let i=1;i<=10;i++) soma += parseInt(cpf.substring(i-1,i))*(12-i);
  resto = (soma*10)%11; if (resto===10||resto===11) resto=0;
  return resto === parseInt(cpf.substring(10,11));
}

// Erros de campo (acessível)
export function showFieldError(input, msg) {
  let el = input.parentElement.querySelector('.field-error');
  if (!el) {
    el = document.createElement('div');
    el.className = 'field-error';
    el.setAttribute('role','alert');
    el.style.color = '#a12';
    el.style.fontSize = '.9rem';
    el.style.marginTop = '4px';
    input.parentElement.appendChild(el);
  }
  el.textContent = msg;
  input.setAttribute('aria-invalid','true');
  return false;
}
export function clearFieldError(input) {
  const el = input.parentElement.querySelector('.field-error');
  if (el) el.textContent = '';
  input.removeAttribute('aria-invalid');
  return true;
}

// Helper para ligar máscara a um input
export function attachMask(input, masker) {
  if (!input) return;
  const apply = () => { input.value = masker(input.value); };
  input.addEventListener('input', apply);
  input.addEventListener('blur', apply);
  apply(); // normaliza no carregamento
}