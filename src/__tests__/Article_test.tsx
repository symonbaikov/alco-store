import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ArticleList from '../components/Article/Article';

describe('ArticleList', () => {
  it('renders correctly with all props', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <ArticleList
          id="johnnie-walker"
          title="article.johnnie_walker.title"
          date="14 января 2021"
          image="/images/a7svkjdjilymj8d3gbw4syso5w1k9vcb.jpg"
          description="article.johnnie_walker.desc"
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with another article', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <ArticleList
          id="kvint"
          title="article.kvint.title"
          date="22 сентября 2020"
          image="/images/5cv4mhwhzjwq02m6449mgqlu05g65e0p.jpg"
          description="article.kvint.desc"
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
}); 