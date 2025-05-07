from dados import _dados_de_usuarios, _dados_usuarios_servicos # Adicionada importação de _dados_usuarios_servicos
from cadastro_e_login import cadastrar_usuario, fazer_login
import validacoes

# Lista para armazenar os dados dos usuários
# Cada item da lista será um dicionário com os dados do usuário
lista_de_usuarios = _dados_de_usuarios

#Menu Principal
def mostrar_menu_principal():
    print("\n" + "="*30)
    print("      MENU PRINCIPAL HC      ")
    print("="*30)
    print("1. Cadastro do Usuário")
    print("2. Login do Usuário")
    print("3. Ajuda")
    print("0. Sair do Sistema")
    print("="*30)
    return input("Escolha uma opção: ")

#Menu Usuário
def menu_usuario_logado(usuario_logado): # Recebe o dicionário do usuário
    nome_usuario = usuario_logado["nome"]
    email_usuario = usuario_logado["email"]

    while True:
        print("\n╔══════════════════════════════════════════════╗")
        print(f"║         MENU DO USUÁRIO: {nome_usuario[:20]:<20}║")
        print("╚══════════════════════════════════════════════╝\n")

        print("3. Meus Resultados")
        print("4. Minhas Receitas")
        print("5. Minhas Agendas")
        print("6. Teleconsulta")
        print("7. Meus Dados")
        print("8. Ajuda")
        print("9. Sair (Logout)")
        print("=" * 30)
        opcao_login = input("Escolha uma opção: ")

        if opcao_login == '3':
            print(f"\n--- Meus Resultados: {nome_usuario} ---")
            if email_usuario in _dados_usuarios_servicos and _dados_usuarios_servicos[email_usuario]["resultados"]:
                for resultado in _dados_usuarios_servicos[email_usuario]["resultados"]:
                    print(f"- {resultado}")
                    
            else:
                print("Você não possui resultados cadastrados.")

            input("\nPressione Enter para voltar ao menu do usuário...")

        elif opcao_login == '4':
            print(f"\n--- Minhas Receitas: {nome_usuario} ---")

            if email_usuario in _dados_usuarios_servicos and _dados_usuarios_servicos[email_usuario]["receitas"]:
                for receita in _dados_usuarios_servicos[email_usuario]["receitas"]:
                    print(f"- {receita}")
            else:
                print("Você não possui receitas cadastradas.")

            input("\nPressione Enter para voltar ao menu do usuário...")


        elif opcao_login == '5':
            print(f"\n--- Minhas Agendas: {nome_usuario} ---")

            if email_usuario in _dados_usuarios_servicos and _dados_usuarios_servicos[email_usuario]["agendas"]:
                for agenda in _dados_usuarios_servicos[email_usuario]["agendas"]:
                    print(f"- {agenda}")
            else:
                print("Você não possui agendamentos cadastrados.")
            
            input("\nPressione Enter para voltar ao menu...")

        elif opcao_login == '6':
            print(f"\nNenhuma Teleconsulta agendada para {nome_usuario}.")

            input("\nPressione Enter para voltar ao menu do usuário...")


        elif opcao_login == '7':
            while True:
                print("\n╔══════════════════════════════════════════════╗")
                print(f"║           MEUS DADOS: {nome_usuario[:20]:<20}   ║")
                print("╚══════════════════════════════════════════════╝")
                print(f"1. Nome: {usuario_logado['nome']}")
                print(f"2. CPF: {usuario_logado['cpf']} (Não pode ser alterado)")
                print(f"3. Email: {usuario_logado['email']}")
                print(f"4. Celular: {usuario_logado['celular']}")
                print("5. Senha: ********")
                print("0. Voltar ao menu do usuário")
                print("="*30)
                
                escolha_dado = input("Digite o número do dado que deseja alterar ou 0 para voltar: ")

                if escolha_dado == '1':
                    novo_nome = input("Digite o novo nome completo: ")
                    # Atualiza o nome no dicionário do usuário logado
                    usuario_logado['nome'] = novo_nome
                    # Atualiza o nome na lista_de_usuarios (que é _dados_de_usuarios)
                    for usr in lista_de_usuarios:
                        if usr['cpf'] == usuario_logado['cpf']:
                            usr['nome'] = novo_nome
                            break
                    nome_usuario = novo_nome # Atualiza a variável local para exibição no menu
                    print("Nome alterado com sucesso!")
                
                elif escolha_dado == '3':
                    novo_email = input("Digite o novo email: ")
                    if validacoes.validar_email(novo_email):
                        email_existente = False
                        for usr in lista_de_usuarios:
                            if usr['email'] == novo_email and usr['cpf'] != usuario_logado['cpf']:
                                email_existente = True
                                break
                        if email_existente:
                            print("Este email já está cadastrado por outro usuário.")
                        else:
                            # Atualiza o email em _dados_usuarios_servicos
                            if usuario_logado['email'] in _dados_usuarios_servicos:
                                dados_servicos_antigos = _dados_usuarios_servicos.pop(usuario_logado['email'])
                                _dados_usuarios_servicos[novo_email] = dados_servicos_antigos
                            
                            # Atualiza o email no dicionário do usuário logado
                            usuario_logado['email'] = novo_email
                            # Atualiza o email na lista_de_usuarios
                            for usr in lista_de_usuarios:
                                if usr['cpf'] == usuario_logado['cpf']:
                                    usr['email'] = novo_email
                                    break
                            email_usuario = novo_email # Atualiza a variável local
                            print("Email alterado com sucesso!")
                    else:
                        print("Email inválido.")

                elif escolha_dado == '4':
                    novo_celular = input("Digite o novo número de celular (com DDD): ")
                    if validacoes.validar_celular(novo_celular):
                        usuario_logado['celular'] = novo_celular
                        for usr in lista_de_usuarios:
                            if usr['cpf'] == usuario_logado['cpf']:
                                usr['celular'] = novo_celular
                                break
                        print("Celular alterado com sucesso!")
                    else:
                        print("Número de celular inválido.")

                elif escolha_dado == '5':
                    while True:
                        nova_senha = input("Digite a nova senha: ")
                        confirmar_nova_senha = input("Confirme a nova senha: ")
                        if nova_senha == confirmar_nova_senha:
                            usuario_logado['senha'] = nova_senha
                            for usr in lista_de_usuarios:
                                if usr['cpf'] == usuario_logado['cpf']:
                                    usr['senha'] = nova_senha
                                    break
                            print("Senha alterada com sucesso!")
                            break
                        else:
                            print("As senhas não coincidem. Tente novamente.")
                
                elif escolha_dado == '0':
                    break
                else:
                    print("Opção inválida.")
                
                input("\nPressione Enter para continuar...")

        elif opcao_login == '8':
            print("\n╔═════════════════════════════════╗")
            print("║         AJUDA DO USUÁRIO        ║")
            print("╚═════════════════════════════════╝\n")
            print("- 'Meus Resultados': exames e laudos disponíveis.")
            print("- 'Minhas Receitas': prescrições médicas vinculadas ao seu e-mail.")
            print("- 'Minhas Agendas': consultas e exames futuros.")
            print("- 'Teleconsulta': opção para Teleconsulta online.")
            print("- 'Meus Dados': visualize as informações do seu cadastro.")
            print("\nCaso tenha dúvidas, entre em contato com a unidade de saúde.")

            input("Pressione Enter para voltar ao menu do usuário...")

        elif opcao_login == '9':
            print(f"\nLogout realizado com sucesso, {nome_usuario}.")
            break 
        else:
            print("\nOpção inválida. Tente novamente.")

# Função para o Menu de Ajuda Principal
def mostrar_menu_ajuda_principal():
    while True:
        print("\n╔═════════════════════════════════╗")
        print("║      AJUDA DO LOGIN/CADASTRO    ║")
        print("╚═════════════════════════════════╝\n")
        print("A. Como me cadastrar?")
        print("B. Como fazer login?")
        print("C. Como funciona o sistema?")
        print("V. Voltar ao Menu Principal")
        print("="*30)
        opcao_ajuda = input("Escolha uma opção de ajuda: ").upper()

        if opcao_ajuda == 'A':
            print("\nPara se cadastrar, escolha a opção '1. Cadastro do Usuário' no Menu Principal.")
            print("Você precisará fornecer nome completo, CPF, e-mail, celular e uma senha.")
            input("\nPressione Enter para continuar...")

        elif opcao_ajuda == 'B':
            print("\nPara fazer login, escolha a opção '2. Login do Usuário' no Menu Principal.")
            print("Informe seu cpf e senha cadastrados.")
            input("\nPressione Enter para continuar...")

        elif opcao_ajuda == 'C':
            print("\nEste sistema permite que você veja seus exames, receitas, agendamentos e muito mais.")
            print("Após o login, você terá acesso a diversas funcionalidades relacionadas à sua saúde.")
            input("\nPressione Enter para continuar...")

        elif opcao_ajuda == 'V':
            break
        else:
            print("\nOpção inválida. Tente novamente.")

#Loop principal do sistema
while True:
    opcao_principal = mostrar_menu_principal()
    
    if opcao_principal == '1':
        cadastrar_usuario()

    elif opcao_principal == '2':
        usuario_logado = fazer_login() # Captura o usuário retornado
        if usuario_logado: # Se o login for bem-sucedido
            menu_usuario_logado(usuario_logado) # Chama o menu do usuário

    elif opcao_principal == '3': #Condição para chamar o menu de ajuda principal
        mostrar_menu_ajuda_principal()
        
    elif opcao_principal == '0':
        print("\nSaindo do sistema... Até logo!")
        break
    else:
        print("\nOpção inválida. Por favor, escolha uma opção do menu.")


