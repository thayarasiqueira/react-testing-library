import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o PokemonDetails.js', () => {
  test('Verifica se as informações detalhadas do pokémon selecionado são mostradas',
    () => {
      renderWithRouter(<App />);
      const link = screen.getByRole('link', { name: /More details/i });
      userEvent.click(link);
      const name = screen.queryByText('Pikachu Details');
      const h2Summary = screen.getByRole('heading', { name: 'Summary' });
      const text = screen.getByText('This intelligent Pokémon roasts hard berries'
      + ' with electricity to make them tender enough to eat.');
      expect(name).toBeInTheDocument();
      expect(link).not.toBeInTheDocument();
      expect(h2Summary).toBeInTheDocument();
      expect(text).toBeInTheDocument();
    });
  test('Verifica se existe na página uma seção com as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /More details/i });
    userEvent.click(link);
    const h2Location = screen.getByRole('heading', { name: 'Game Locations of Pikachu' });
    const locations = screen.getAllByAltText('Pikachu location');
    const nameLocations = screen.getByText('Kanto Viridian Forest');
    const nameLocations2 = screen.getByText('Kanto Power Plant');
    const src1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const src2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    expect(h2Location).toBeInTheDocument();
    expect(locations).toBeDefined();
    expect(nameLocations).toBeDefined();
    expect(nameLocations2).toBeDefined();
    expect(locations[0]).toHaveAttribute('src', src1);
    expect(locations[1]).toHaveAttribute('src', src2);
  });
  test('Verifica se o usuário pode favoritar um pokémon através da página de detalhes',
    () => {
      renderWithRouter(<App />);
      const moreDetails = screen.getByRole('link', { name: /More details/i });
      userEvent.click(moreDetails);
      const check = screen.getByRole('checkbox');
      const label = screen.getByLabelText('Pokémon favoritado?');
      expect(check).toBeInTheDocument();
      expect(label).toBeInTheDocument();
      userEvent.click(check);
      const favoriteText = screen.getByAltText('Pikachu is marked as favorite');
      expect(check).toBeInTheDocument();
      expect(favoriteText).toBeInTheDocument();
      userEvent.click(check);
      expect(favoriteText).not.toBeInTheDocument();
      expect(label).toBeInTheDocument();
    });
});
