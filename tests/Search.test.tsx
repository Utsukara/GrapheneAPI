import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import SearchComponent from '../src/components/Search';
import { SEARCH_QUERY } from '../src/queries/search';
import { expect } from '@jest/globals'; // Add this import statement

const mocks = [
  {
    request: {
      query: SEARCH_QUERY,
      variables: {
        query: 'test',
      },
    },
    result: {
      data: {
        search: {
          edges: [
            {
              node: {
                id: '1',
                name: 'test',
                description: 'test',
                owner: {
                  login: 'test',
                },
              },
            },
          ],
        },
      },
    },
  },
];

//test 1
it('should render search component', () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <SearchComponent />
    </MockedProvider>,
  );
  expect(screen.getByText('Search for a repository')).toBeInTheDocument();
});

//test 2
it('should render search results', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <SearchComponent />
    </MockedProvider>,
  );

  const input = screen.getByPlaceholderText('Search for a repository');
  fireEvent.change(input, { target: { value: 'test' } });

  await waitFor(() => {
    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
