import { useEffect, useState } from 'react';
import './App.css';

const salas = [
  { id: 1, nome: 'Sala Ipê', capacidade: 4 },
  { id: 2, nome: 'Sala Araucária', capacidade: 6 },
  { id: 3, nome: 'Sala Pinhão', capacidade: 2 },
];

const horarios = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
];

const chaveReservas = 'reserva-salas-reservas';

function dataLocal(diasAdicionais = 0) {
  const data = new Date();
  data.setDate(data.getDate() + diasAdicionais);

  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');

  return `${ano}-${mes}-${dia}`;
}

function carregarReservas() {
  try {
    const reservasSalvas = localStorage.getItem(chaveReservas);
    return reservasSalvas ? JSON.parse(reservasSalvas) : [];
  } catch {
    return [];
  }
}

function horarioJaPassou(data, horario) {
  return new Date(`${data}T${horario}:00`) <= new Date();
}

function formatarData(data) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'long',
  }).format(new Date(`${data}T12:00:00`));
}
function calcularHorarioFinal(horario) {
  const horaInicial = Number(horario.slice(0, 2));
  const horaFinal = String(horaInicial + 1).padStart(2, '0');

  return `${horaFinal}:00`;
}

function App() {
  const [pagina, setPagina] = useState('disponibilidade');
  const [dataReserva, setDataReserva] = useState(() => dataLocal(1));
  const [reservas, setReservas] = useState(carregarReservas);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(chaveReservas, JSON.stringify(reservas));
    } catch {
      setMensagem('Não foi possível salvar as reservas neste navegador.');
    }
  }, [reservas]);

  const reservasFuturas = reservas.filter(
    (reserva) => new Date(`${reserva.data}T${reserva.horario}:00`) > new Date()
  );

  function reservar(sala, horario) {
    if (!dataReserva) {
      setMensagem('Escolha uma data antes de reservar.');
      return;
    }

    if (dataReserva < dataLocal()) {
      setMensagem('Escolha hoje ou uma data futura.');
      return;
    }

    if (horarioJaPassou(dataReserva, horario)) {
      setMensagem('Esse horário já passou. Escolha outro.');
      return;
    }

    if (reservasFuturas.length >= 2) {
      setMensagem('Você já tem o limite de duas reservas futuras.');
      return;
    }

    const horarioOcupado = reservas.some(
      (reserva) =>
        reserva.salaId === sala.id &&
        reserva.data === dataReserva &&
        reserva.horario === horario
    );

    if (horarioOcupado) {
      setMensagem('Esse horário já está ocupado. Escolha outro.');
      return;
    }

    const novaReserva = {
      id: Date.now(),
      salaId: sala.id,
      nomeSala: sala.nome,
      data: dataReserva,
      horario,
    };

    setReservas((reservasAtuais) => [...reservasAtuais, novaReserva]);
    setMensagem(`${sala.nome} reservada para as ${horario}.`);
  }

  function cancelarReserva(id) {
    setReservas((reservasAtuais) =>
      reservasAtuais.filter((reserva) => reserva.id !== id)
    );
    setMensagem('Reserva cancelada. O horário está livre novamente.');
  }

  function alterarData(evento) {
    setDataReserva(evento.target.value);
    setMensagem('');
  }

  return (
    <div>
      <header>
        <h1>Reserva Salas</h1>

        <nav aria-label="Navegação principal">
          <button
            type="button"
            aria-pressed={pagina === 'disponibilidade'}
            onClick={() => setPagina('disponibilidade')}
          >
            Disponibilidade
          </button>

          <button
            type="button"
            aria-pressed={pagina === 'reservas'}
            onClick={() => setPagina('reservas')}
          >
            Minhas reservas ({reservas.length})
          </button>

          <button
            type="button"
            aria-pressed={pagina === 'sobre'}
            onClick={() => setPagina('sobre')}
          >
            Sobre
          </button>
        </nav>
      </header>

      <main>
        {pagina === 'disponibilidade' && (
          <section>
            <h2>Encontre uma sala</h2>
            <p>Escolha uma data e veja os horários disponíveis.</p>

            <label htmlFor="data-reserva">Data da reserva</label>
            <input
              id="data-reserva"
              type="date"
              min={dataLocal()}
              value={dataReserva}
              onChange={alterarData}
            />

            {mensagem && <p role="status">{mensagem}</p>}

            <div className="lista-salas">
              {salas.map((sala) => (
                <article key={sala.id}>
                  <h3>{sala.nome}</h3>
                  <p>Capacidade: {sala.capacidade} pessoas</p>

                  <h4>Horários disponíveis</h4>

                  <div className="lista-horarios">
                    {horarios.map((horario) => {
                      const ocupado = reservas.some(
                        (reserva) =>
                          reserva.salaId === sala.id &&
                          reserva.data === dataReserva &&
                          reserva.horario === horario
                      );

                      const passou =
                        dataReserva === dataLocal() &&
                        horarioJaPassou(dataReserva, horario);

                      return (
                        <button
                          key={horario}
                          type="button"
                          disabled={ocupado || passou}
                          onClick={() => reservar(sala, horario)}
                        >
                          {horario} —{' '}
                          {ocupado
                            ? 'Ocupado'
                            : passou
                              ? 'Encerrado'
                              : 'Reservar'}
                        </button>
                      );
                    })}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {pagina === 'reservas' && (
          <section>
            <h2>Minhas reservas</h2>

            {reservas.length === 0 ? (
              <p>Você ainda não tem reservas.</p>
            ) : (
              <ul>
                {reservas.map((reserva) => (
                  <li key={reserva.id}>
                    <strong>{reserva.nomeSala}</strong>
                    {' — '}
                    {formatarData(reserva.data)}
                    {' — '}
                    {reserva.horario} às{' '}
                    {calcularHorarioFinal(reserva.horario)}


                    <button
                      type="button"
                      onClick={() => cancelarReserva(reserva.id)}
                    >
                      Cancelar
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {mensagem && <p role="status">{mensagem}</p>}
          </section>
        )}

        {pagina === 'sobre' && (
          <section>
            <h2>Sobre o Reserva Salas</h2>
            <p>
              O projeto ajuda estudantes a encontrar e reservar salas para
              estudar individualmente ou em grupo.
            </p>
            <p>
              Esta versão é uma demonstração: as reservas ficam salvas somente
              neste navegador.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;