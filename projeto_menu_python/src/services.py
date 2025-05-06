def exibir_resultados(resultados, usuario):
    if usuario in resultados:
        print("Seus resultados:")
        for resultado in resultados[usuario]:
            print(f"- {resultado}")
    else:
        print("Nenhum resultado encontrado.")

def exibir_receitas(receitas, usuario):
    if usuario in receitas:
        print("Suas receitas:")
        for receita in receitas[usuario]:
            print(f"- {receita}")
    else:
        print("Nenhuma receita encontrada.")

def exibir_agendas(agendas, usuario):
    if usuario in agendas:
        print("Suas agendas:")
        for agenda in agendas[usuario]:
            print(f"- {agenda}")
    else:
        print("Nenhuma agenda encontrada.")

def agendar_teleconsulta(usuario):
    print(f"Teleconsulta agendada para {usuario}!")