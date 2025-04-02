import { ApolloClient, InMemoryCache, createHttpLink, from, Observable, FetchResult } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { getAccessToken, refreshTokens } from './auth';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'include',
});

// Создаем ссылку для обработки ошибок
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      // Если токен истек
      if (err.extensions?.code === 'TOKEN_EXPIRED') {
        return new Observable<FetchResult>((observer) => {
          refreshTokens()
            .then(({ accessToken }) => {
              // Повторяем запрос с новым токеном
              const oldHeaders = operation.getContext().headers;
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: `Bearer ${accessToken}`,
                },
              });
              forward(operation).subscribe({
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
              });
            })
            .catch((error) => {
              // Если не удалось обновить токен, перенаправляем на страницу входа
              window.location.href = '/auth/login';
              observer.error(error);
            });
        });
      }
    }
  }

  if (networkError) {
    console.error('Network error:', networkError);
  }
});

// Создаем ссылку для добавления заголовка авторизации
const authLink = setContext((_, { headers }) => {
  const token = getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
  },
}); 