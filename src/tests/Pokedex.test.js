import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando a Pokedex.js', () => {
  test('Verifica se a página contém um heading h2 com o texto Encountered pokémons',
    () => {
      renderWithRouter(<App />);
      const h2text = screen.getByRole('heading', { name: 'Encountered pokémons' });
      expect(h2text).toBeInTheDocument();
    });
  test('Verifica se é exibido o próximo pokémon da lista quando o botão é clicado.',
    () => {
      renderWithRouter(<App />);
      const btn = screen.getByTestId('next-pokemon');
      userEvent.click(btn);
      const pokemon = screen.getByText('Charmander');
      expect(btn).toBeInTheDocument();
      expect(btn).toHaveTextContent('Próximo pokémon');
      expect(pokemon).toBeInTheDocument();
    });
  test('Verifica se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    const charmander = screen.queryByText('Charmander');
    expect(charmander).not.toBeInTheDocument();
  });
  test('Verifica se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByTestId('all');
    const lengthBtns = 7;
    const btnsFilter = screen.getAllByTestId('pokemon-type-button');
    const types = ['Electric', 'Fire', 'Bug', 'Poison',
      'Psychic', 'Normal', 'Dragon'];
    types.forEach((e) => {
      const type = screen.getByRole('button', { name: e });
      expect(type).toBeInTheDocument();
    });
    expect(btnsFilter).toHaveLength(lengthBtns);
    userEvent.click(btnsFilter[4]);
    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toHaveTextContent('Alakazam');
    expect(btnAll).toBeInTheDocument();
  });
  test('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const btnFilter = screen.getByTestId('all');
    expect(btnFilter).toBeInTheDocument();
    const pikachu = screen.queryByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    const charmander = screen.queryByText('Charmander');
    expect(charmander).not.toBeInTheDocument();
    const btnBug = screen.getByRole('button', { name: 'Bug' });
    userEvent.click(btnBug);
    const pikachu2 = screen.queryByText('Pikachu');
    const caterpie = screen.getByText('Caterpie');
    expect(caterpie).toBeInTheDocument();
    expect(pikachu2).not.toBeInTheDocument();
    userEvent.click(btnFilter);
    const caterpie2 = screen.queryByText('Caterpie');
    expect(pikachu).toBeInTheDocument();
    expect(caterpie2).not.toBeInTheDocument();
  });
});
