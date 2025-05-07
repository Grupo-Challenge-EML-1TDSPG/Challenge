import re

def validar_cpf(cpf):
    """Verifica se o CPF contém apenas números e tem 11 dígitos."""
    if cpf.isdigit() and len(cpf) == 11:
        return True
    return False

def validar_email(email):
    """Verifica um formato básico de email."""
    # Regex simples para validação de email
    padrao = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    if re.match(padrao, email):
        return True
    return False

def validar_celular(celular):
    """Verifica se o celular contém apenas números e tem entre 10 e 11 dígitos (considerando DDD)."""
    if celular.isdigit() and 10 <= len(celular) <= 11:
        return True
    return False