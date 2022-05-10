import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o Pokemon.js', () => {
  test('Verifica se é renderizado um card com as informações de determinado pokémon',
    () => {
      renderWithRouter(<App />);
      const name = screen.getByTestId('pokemon-name');
      const type = screen.getByTestId('pokemon-type');
      const weight = screen.getByTestId('pokemon-weight');
      const img = screen.getByAltText('Pikachu sprite');
      const src = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
      expect(name).toHaveTextContent('Pikachu');
      expect(type).toHaveTextContent('Electric');
      expect(weight).toHaveTextContent('Average weight: 6.0 kg');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', src);
    });
  test('Verifica se o card indicado na Pokédex contém um link de navegação',
    () => {
      renderWithRouter(<App />);
      const link = screen.getByRole('link', { name: /More details/i });
      const href = '/pokemons/25';
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', href);
    });
  test('Verifica se ao clicar no link é feito o redirecionamento da aplicação',
    () => {
      renderWithRouter(<App />);
      const link = screen.getByRole('link', { name: /More details/i });
      userEvent.click(link);
      const title = screen.queryByText('Pikachu Details');
      expect(title).toBeInTheDocument();
    });
  test('Verifica também se a URL exibida no navegador muda para /pokemon/<id>', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  test('Verifica se existe um ícone de estrela nos pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);
    const check = screen.getByRole('checkbox');
    userEvent.click(check);
    const src = '/star-icon.svg';
    const icon = screen.getByAltText('Pikachu is marked as favorite');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', src);
  });
});
