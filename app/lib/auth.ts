import Cookies from 'js-cookie';
import { client } from './apollo-client';
import { REFRESH_TOKENS } from '../graphql/mutations';

export const setTokens = (accessToken: string, refreshToken: string) => {
  // Сохраняем токены в куках с настройками безопасности
  Cookies.set('accessToken', accessToken, {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: 1 / 96 // 15 минут (access token)
  });
  
  Cookies.set('refreshToken', refreshToken, {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: 7 // 7 дней (refresh token)
  });
};

export const removeTokens = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
};

export const getAccessToken = () => {
  return Cookies.get('accessToken');
};

export const getRefreshToken = () => {
  return Cookies.get('refreshToken');
};

export const refreshTokens = async () => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const { data } = await client.mutate({
      mutation: REFRESH_TOKENS,
      variables: {
        refreshToken,
      },
    });

    if (data?.refreshTokens) {
      const { accessToken, refreshToken: newRefreshToken } = data.refreshTokens;
      setTokens(accessToken, newRefreshToken);
      return { accessToken, refreshToken: newRefreshToken };
    }

    throw new Error('Failed to refresh tokens');
  } catch (error) {
    console.error('Error refreshing tokens:', error);
    removeTokens();
    throw error;
  }
}; 