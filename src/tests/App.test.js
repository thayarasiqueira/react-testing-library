import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o App.js', () => {
  test(
    'Verificando se o topo da aplicação contém um conjuntofixo de links de navegação',
    () => {
      renderWithRouter(<App />);
      const links = screen.getAllByRole('link');

      expect(links[0]).toHaveTextContent('Home');
      expect(links[1]).toHaveTextContent('About');
      expect(links[2]).toHaveTextContent('Favorite Pokémons');
    },
  );
  test(
    'Verificando se a aplicação é redirecionada para a página inicial, na URL /',
    () => {
      const { history } = renderWithRouter(<App />);

      const homeLink = screen.getByRole('link', { name: 'Home' });
      expect(homeLink).toBeInTheDocument();
      userEvent.click(homeLink);
      const { pathname } = history.location;
      expect(pathname).toBe('/');
    },
  );
  test(
    'Verificando se a aplicação é redirecionada para a página de About, na URL /about',
    () => {
      const { history } = renderWithRouter(<App />);
      const aboutLink = screen.getByRole('link', { name: 'About' });
      expect(aboutLink).toBeInTheDocument();
      userEvent.click(aboutLink);
      const { pathname } = history.location;
      expect(pathname).toBe('/about');
    },
  );
  test(
    'Verificando se a aplicação é redirecionada para Favoritados, na URL /favorites.',
    () => {
      const { history } = renderWithRouter(<App />);
      const favoritesLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
      expect(favoritesLink).toBeInTheDocument();
      userEvent.click(favoritesLink);
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    },
  );
  test(
    'Verificando se é redirecionada para a página Not Found com uma URL desconhecida.',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/not-found/');
      const notFoundTitle = screen.getByText('Page requested not found');
      expect(notFoundTitle).toBeInTheDocument();
    },
  );
});
