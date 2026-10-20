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
- Limitar cada perfil a duas reservas futuras.
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