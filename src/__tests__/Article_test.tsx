import React from 'react';
import renderer from 'react-test-renderer';
import { ArticleCard } from '../components/Article';
import { MemoryRouter } from 'react-router-dom';

describe('ArticleCard', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <MemoryRouter>
        <ArticleCard
          id="johnnie-walker"
          title="article.johnnie_walker.title"
          date="14 января 2021"
          image="/images/a7svkjdjilymj8d3gbw4syso5w1k9vcb.jpg"
          description="article.johnnie_walker.desc"
        />
      </MemoryRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
}); 