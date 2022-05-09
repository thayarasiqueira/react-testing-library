import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testando o NotFound.js', () => {
  test('Verifica se a página contém um heading h2 com o texto Page requested not found 😭',
    () => {
      renderWithRouter(<NotFound />);
      const h2text = screen.getByRole('heading',
        { name: 'Page requested not found Crying emoji' });
      expect(h2text).toBeInTheDocument();
    });
  test('Verifica se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(img.src).toContain(src);
    expect(img).toHaveAttribute('src', src);
  });
});
