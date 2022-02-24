import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Home } from '.';

const handlers = [
  rest.get('*jsonplaceholder.typicode.com*', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title1',
          body: 'body1',
          url: 'img1.png',
        },
        {
          userId: 2,
          id: 2,
          title: 'title2',
          body: 'body2',
          url: 'img2.png',
        },
        {
          userId: 3,
          id: 3,
          title: 'title3',
          body: 'body3',
          url: 'img3.png',
        },
        {
          userId: 4,
          id: 4,
          title: 'title4',
          body: 'body4',
          url: 'img4.png',
        },
        {
          userId: 5,
          id: 5,
          title: 'title5',
          body: 'body5',
          url: 'img5.png',
        },
        {
          userId: 6,
          id: 6,
          title: 'title6',
          body: 'body6',
          url: 'img6.png',
        },
        {
          userId: 7,
          id: 7,
          title: 'title7',
          body: 'body7',
          url: 'img7.png',
        },
        {
          userId: 8,
          id: 8,
          title: 'title8',
          body: 'body8',
          url: 'img8.png',
        },
        {
          userId: 9,
          id: 9,
          title: 'title9',
          body: 'body9',
          url: 'img9.png',
        },
        {
          userId: 10,
          id: 10,
          title: 'title10',
          body: 'body10',
          url: 'img10.png',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => {
    server.close();
  });

  it('should render search, posts and load more', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts =(');

    expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/type your search/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img', { name: /title/i });
    expect(images.length).toBe(9);

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDocument();
  });

  it('should search for more posts', async () => {
    render(<Home />);

    await waitForElementToBeRemoved(screen.getByText('Não existem posts =('));

    const search = screen.getByPlaceholderText(/type your search/i);

    expect.assertions(33);

    // checking if all 9 posts are on the screen

    expect(screen.getByRole('heading', { name: 'title1 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title2 2' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title3 3' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title4 4' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title5 5' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title6 6' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title7 7' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title8 8' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title9 9' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title10 10' })).not.toBeInTheDocument();

    //  typing title1 on the input
    userEvent.type(search, 'title1');

    // checking if only post 1 and post 10 are on the screen
    expect(screen.getByRole('heading', { name: 'title1 1' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title2 2' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title3 3' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title4 4' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title5 5' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title6 6' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title7 7' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title8 8' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title9 9' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title10 10' })).toBeInTheDocument();

    // check if h1 have the same value as typed on the input above

    expect(screen.getByRole('heading', { name: 'Search value: title1' })).toBeInTheDocument();

    // clearing the input
    userEvent.clear(search);

    // checking if both posts are on the screen

    expect(screen.getByRole('heading', { name: 'title1 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title2 2' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title1 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title2 2' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title3 3' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title4 4' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title5 5' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title6 6' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title7 7' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title8 8' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title10 10' })).not.toBeInTheDocument();

    // checking if post does not exist

    userEvent.type(search, 'potato');
    expect(screen.getByText('Não existem posts =(')).toBeInTheDocument();
  });

  it('should render more posts when button named "load more posts" is clicked ', async () => {
    render(<Home />);

    // expect.assertions(0)

    await waitForElementToBeRemoved(screen.getByText('Não existem posts =('));

    const button = screen.getByRole('button', { name: /load more posts/i });

    userEvent.click(button);
    expect(screen.queryByRole('heading', { name: 'title3 3' })).toBeInTheDocument();
    expect(button).toBeDisabled;
  });
});
