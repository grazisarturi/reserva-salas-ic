# Reserva Salas

## Sobre o projeto

Reserva Salas é uma aplicação web de página única (SPA) para consultar salas de estudo e organizar reservas. Esta versão é um protótipo acadêmico: usa dados fictícios e salva as reservas no navegador.

## Problema que o serviço pretende resolver

Encontrar um espaço livre para estudar pode gerar dúvidas sobre a disponibilidade e conflitos de horário. O Reserva Salas reúne as salas e os horários em uma única interface, facilitando a consulta e a reserva.

## Público-alvo

Estudantes que procuram um espaço para estudar individualmente ou em grupo.

## Funcionalidades

- Consultar salas e horários por data.
- Reservar um horário disponível de uma hora.
- Impedir reservas em horários passados e conflitos de horário.
- Limitar a duas as reservas futuras salvas neste navegador.
- Consultar e cancelar reservas.
- Salvar as reservas no navegador usando `localStorage`.
- Navegar entre as seções Disponibilidade, Minhas reservas e Sobre.

## Tecnologias utilizadas

- React
- Vite
- JavaScript
- CSS
- `localStorage`

## Possibilidades de monetização

Como possibilidade futura, a aplicação poderia exibir anúncios ou conteúdos patrocinados por cafeterias, papelarias e outros estabelecimentos próximos à universidade. A monetização não está implementada nesta versão.

## Como executar o projeto localmente

É necessário ter Node.js e npm instalados.

1. Abra um terminal na pasta do projeto.
2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Acesse no navegador o endereço exibido pelo Vite, geralmente `http://localhost:5173/`.

## Integração Contínua

### Ferramenta utilizada

O pipeline de Integração Contínua é executado pelo GitHub Actions.

### Quando o pipeline é executado

O workflow é executado automaticamente quando há um `push` para a branch `main` ou um pull request direcionado a ela.

### Etapas do pipeline

1. Baixa o código do repositório.
2. Configura o Node.js 24.
3. Instala as dependências com `npm ci`.
4. Executa `npm run build` para verificar se a aplicação pode ser compilada.

### Como verificar uma execução

Acesse a aba **Actions** do repositório e selecione uma execução do workflow **CI**. Uma execução concluída com sucesso aparece como verde; se falhar, os detalhes do erro ficam disponíveis nos logs.