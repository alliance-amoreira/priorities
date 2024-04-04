'use client'
// pages/TriagemHospitalar.js

import { useEffect, useState } from 'react';

class Atendimento {
  constructor(nomePaciente, prioridade) {
    this.nomePaciente = nomePaciente;
    this.prioridade = prioridade;
    this.tempoChegada = new Date();
    this.tempoAtendimento = 0;
    this.tempoTerminoAtendimento = 5;
    // this.tempoTerminoAtendimento = Math.floor(Math.random() * (15 - 5 + 1)) + 5; // Tempo aleatório entre 5 e 15 segundos
    this.atendido = true;
  }
}
export default function TriagemHospitalar() {
    const [nomePaciente, setNomePaciente] = useState('');
    const [prioridade, setPrioridade] = useState('Normal');
    const [atendimentos, setAtendimentos] = useState([]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const novaPrioridade = prioridade === 'Normal' ? 3 : prioridade === 'Prioritário' ? 2 : 1;
      const novoAtendimento = new Atendimento(nomePaciente, novaPrioridade);
      novoAtendimento.atendido = true; // O paciente é considerado como atendido ao ser adicionado
      setAtendimentos([...atendimentos, novoAtendimento]);
      setNomePaciente('');
      setPrioridade('Normal');
    };
  
    return (
      <div className='m-5 h-[100vh]'>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Triagem Hospitalar</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nomePaciente" className="block text-sm font-medium text-gray-700">Nome do Paciente:</label>
            <input type="text" id="nomePaciente" value={nomePaciente} onChange={(e) => setNomePaciente(e.target.value)} required className="mt-1 p-2 rounded-md border-gray-300 focus:border-blue-500 focus:outline-none" />
          </div>
          <div className="mb-4">
            <label htmlFor="prioridade" className="block text-sm font-medium text-gray-700">Prioridade:</label>
            <select id="prioridade" value={prioridade} onChange={(e) => setPrioridade(e.target.value)} required className="mt-1 p-2 rounded-md border-gray-300 focus:border-blue-500 focus:outline-none">
              <option value="Normal">Normal</option>
              <option value="Prioritário">Prioritário</option>
              <option value="Urgente">Urgente</option>
            </select>
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Adicionar Paciente</button>
        </form>
        <h2 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Lista de Pacientes:</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-4 bg-gray-100 font-semibold border-b border-gray-300 text-center">Nome do Paciente</th>
              <th className="p-4 bg-gray-100 font-semibold border-b border-gray-300 text-center">Prioridade</th>
              <th className="p-4 bg-gray-100 font-semibold border-b border-gray-300 text-center">Hora de Chegada</th>
            </tr>
          </thead>
          <tbody>
            {atendimentos.map((atendimento, index) => (
              <tr key={index} className={`
                ${atendimento.atendido ? 'bg-green-100' : 'bg-yellow-100'}
                hover:bg-gray-200
              `}>
                <td className="p-4 border-b border-gray-300 text-center">{atendimento.nomePaciente}</td>
                <td className="p-4 border-b border-gray-300 text-center">{atendimento.prioridade === 1 ? 'Urgente' : atendimento.prioridade === 2 ? 'Prioritário' : 'Normal'}</td>
                <td className="p-4 border-b border-gray-300 text-center">{new Date(atendimento.tempoChegada).toLocaleTimeString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  