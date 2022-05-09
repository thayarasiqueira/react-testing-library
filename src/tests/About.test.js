import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testando o App.js', () => {
  test('Verifica se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const h2text = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(h2text).toBeInTheDocument();
  });

  test('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const p1 = screen.getByText('This application simulates a Pokédex, '
    + 'a digital encyclopedia containing all Pokémons');
    const p2 = screen.getByText('One can filter Pokémons by type, '
    + 'and see more details for each one of them');
    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });
  test('Verifica se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    renderWithRouter(<About />);
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByAltText('Pokédex');
    expect(img.src).toContain(src);
    expect(img).toHaveAttribute('src', src);
  });
});
