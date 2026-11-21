import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Reserva Salas', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('mostra a tela de disponibilidade ao abrir', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: 'Encontre uma sala' })
    ).toBeInTheDocument();

    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(3);
  });

  it('permite navegar até a seção Sobre', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Sobre' }));

    expect(
      screen.getByRole('heading', { name: 'Sobre o Reserva Salas' })
    ).toBeInTheDocument();
  });

  it('permite reservar e cancelar um horário', async () => {
    const user = userEvent.setup();
    render(<App />);

    const horariosDasOito = screen.getAllByRole('button', {
      name: /08:00.*Reservar/,
    });

    await user.click(horariosDasOito[0]);

    await user.click(
      screen.getByRole('button', { name: /Minhas reservas/ })
    );

    expect(screen.getByRole('listitem')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Cancelar' }));

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});