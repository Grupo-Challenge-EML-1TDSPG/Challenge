import validacoes
from dados import _dados_de_usuarios, _dados_usuarios_servicos

# Lista para armazenar os dados dos usuários
# Cada item da lista será um dicionário com os dados do usuário
lista_de_usuarios = _dados_de_usuarios

#Cadastro Usuário
def cadastrar_usuario():
    print("\n╔════════════════════════════════╗")
    print("║    CADASTRO DE NOVO USUÁRIO    ║")
    print("╚════════════════════════════════╝\n")
    
    nome = input("Nome Completo: ")

    while True:
        cpf = input("CPF (apenas 11 números): ")
        if validacoes.validar_cpf(cpf):
            break
        else:
            print("CPF inválido. Deve conter 11 números.")

    # Verifica se o CPF já existe na lista de usuários
    for usuario in lista_de_usuarios:
        if usuario["cpf"] == cpf:
            print("\nUsuário com este CPF já cadastrado.")
            return

    #Verifica se o Email está escrito corretamente
    while True:
        email = input("Email: ")
        if validacoes.validar_email(email):
            break
        else:
            print("Email inválido. Formato esperado: nome@dominio.com")
    
    while True:
        celular = input("Número de Celular (com DDD, apenas números): ")
        if validacoes.validar_celular(celular):
            break
        else:
            print("Número de celular inválido. Deve conter 10 ou 11 números.")
    
    while True:
        senha = input("Crie uma senha: ")
        confirmar_senha = input("Confirme a senha: ")
        if senha == confirmar_senha:
            break
        else:
            print("As senhas não coincidem. Tente novamente.")
    
    novo_usuario = {"cpf": cpf, "nome": nome, "email": email, "celular": celular, "senha": senha}
    lista_de_usuarios.append(novo_usuario)
    # Adiciona uma entrada vazia para o novo usuário em _dados_usuarios_servicos
    _dados_usuarios_servicos[email] = {"resultados": [], "receitas": [], "agendas": []}
    print(f"\nUsuário {nome} cadastrado com sucesso!")

# Login Usuário
def fazer_login():
    print("\n╔════════════════════════════════╗")
    print("║          LOGIN USUÁRIO         ║")
    print("╚════════════════════════════════╝\n")
    cpf_login = input("Digite seu CPF para login: ")
    senha_login = input("Digite sua senha: ")
    
    usuario_encontrado = None
    for usuario in lista_de_usuarios:
        if usuario["cpf"] == cpf_login:
            usuario_encontrado = usuario
            break
            
    if usuario_encontrado:
        if usuario_encontrado["senha"] == senha_login:
            print(f"\nLogin bem-sucedido! Bem-vindo(a), {usuario_encontrado['nome']}!")
            return usuario_encontrado # Apenas retorna o usuário
        else:
            print("\nSenha incorreta.")
            return None
    else:
        print("\nUsuário não encontrado. Verifique o CPF ou cadastre-se.")
        return None # Retorna None se o login falhar