def main():
    from auth import login_usuario, cadastrar_usuario
    from data import usuarios, resultados, receitas, agendas
    from services import exibir_resultados, exibir_receitas, exibir_agendas, agendar_teleconsulta
    from menu_handler import mostrar_menu_principal, mostrar_menu_usuario

    usuario_atual = None

    while True:
        if usuario_atual is None:
            mostrar_menu_principal()
            opcao = input("Escolha uma opção: ")
            print() # Adiciona espaço

            if opcao == '0':
                print("Saindo do sistema. Até logo!")
                print("="*30 + "\n")
                break
            elif opcao == '1':
                nome_cadastro = input("Digite seu nome para cadastro: ")
                if cadastrar_usuario(usuarios, nome_cadastro):
                    print(f"Usuário {nome_cadastro} cadastrado com sucesso!")
                    resultados[nome_cadastro] = []
                    receitas[nome_cadastro] = []
                    agendas[nome_cadastro] = []
                else:
                    print("Usuário já cadastrado.")
                print() # Adiciona espaço
            elif opcao == '2':
                nome_login = input("Digite seu nome para login: ")
                usuario_atual = login_usuario(usuarios, nome_login)
                if not usuario_atual:
                    print("Login falhou. Usuário não encontrado.")
                else:
                    print(f"\nBem-vindo(a), {usuario_atual}!") # Mensagem de boas-vindas
                print() # Adiciona espaço
            else:
                print("Opção inválida. Tente novamente.")
                print() # Adiciona espaço
        else:
            mostrar_menu_usuario()
            opcao_usuario = input("Escolha uma opção: ")
            print() # Adiciona espaço

            if opcao_usuario == '9':
                print("Saindo do login.")
                print("="*30 + "\n")
                usuario_atual = None
            elif opcao_usuario == '3':
                exibir_resultados(resultados, usuario_atual)
                print() # Adiciona espaço
            elif opcao_usuario == '4':
                exibir_receitas(receitas, usuario_atual)
                print() # Adiciona espaço
            elif opcao_usuario == '5':
                exibir_agendas(agendas, usuario_atual)
                print() # Adiciona espaço
            elif opcao_usuario == '6':
                agendar_teleconsulta(usuario_atual)
                print() # Adiciona espaço
            elif opcao_usuario == '7':
                print(f"Dados do usuário: {usuario_atual}")
                # Aqui você pode adicionar uma função mais elaborada de services.py
                print() # Adiciona espaço
            elif opcao_usuario == '8':
                print("Ajuda: Navegue pelas opções digitando o número correspondente.")
                print("Se precisar de mais assistência, contate o suporte.")
                print() # Adiciona espaço
            else:
                print("Opção inválida. Tente novamente.")
                print() # Adiciona espaço

if __name__ == "__main__":
    main()