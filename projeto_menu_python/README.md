# Projeto Menu Hospitalar em Python

Este projeto é um sistema de menu para um hospital, permitindo que usuários se cadastrem, façam login e acessem informações relacionadas a resultados, receitas e agendas. O menu muda dinamicamente após o login, oferecendo uma experiência mais fluida e intuitiva.

## Estrutura do Projeto

```
projeto_menu_hospitalar_python
├── src
│   ├── __init__.py
│   ├── main.py
│   ├── auth.py
│   ├── menu_handler.py
│   ├── services.py
│   └── data.py
└── README.md
```

## Descrição dos Arquivos

- **src/__init__.py**: Marca o diretório como um pacote Python. Pode estar vazio ou conter inicializações de pacote.

- **src/main.py**: Ponto de entrada da aplicação. Gerencia o fluxo principal do programa, chamando funções de autenticação e manipulando o menu com base no estado do usuário (logado ou não).

- **src/auth.py**: Contém funções relacionadas à autenticação, como cadastro e login de usuários. Gerencia a lista de usuários e verifica se um usuário está cadastrado.

- **src/menu_handler.py**: Responsável por exibir os menus. Contém funções que mostram o menu principal e o menu do usuário logado, removendo as opções de cadastro e login e adicionando a opção de sair.

- **src/services.py**: Contém funções que lidam com a lógica de negócios, como manipulação de resultados, receitas e agendas. Pode ser chamado a partir do menu para exibir informações relevantes ao usuário.

- **src/data.py**: Contém dados fictícios para os usuários, resultados, receitas e agendas. Estruturado como dicionários ou listas para facilitar o acesso e a manipulação dos dados.

## Instruções de Instalação

1. Clone o repositório:
   ```
   git clone <URL_DO_REPOSITORIO>
   ```

2. Navegue até o diretório do projeto:
   ```
   cd projeto_menu_hospitalar_python
   ```

3. Instale as dependências necessárias (se houver):
   ```
   pip install -r requirements.txt
   ```

## Uso

1. Execute o programa:
   ```
   python src/main.py
   ```

2. Siga as instruções no menu para se cadastrar, fazer login e acessar suas informações.

## Funcionalidades

- Cadastro de usuários
- Login de usuários
- Visualização de resultados, receitas e agendas
- Teleconsulta
- Ajuda para utilização do sistema

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.