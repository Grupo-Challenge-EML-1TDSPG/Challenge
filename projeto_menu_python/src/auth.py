def cadastrar_usuario(usuarios, nome):
    if nome in usuarios:
        return False
    usuarios.append(nome)
    return True

def login_usuario(usuarios, nome):
    return nome if nome in usuarios else None

def verificar_usuario(usuarios, nome):
    return nome in usuarios