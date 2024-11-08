import { auth } from '../firebase';
import { userAtom } from '../atoms/userAtom';
import store from '@/lib/atoms/atomsStore';
import { toast } from 'sonner';

class TokenManager {
  constructor() {
    this.tokenRefreshPromise = null;
  }

  async getValidToken() {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('No user is currently signed in');
      }

      // Check if token is about to expire (within 5 minutes)
      const tokenResult = await currentUser.getIdTokenResult();
      const expirationTime = new Date(tokenResult.expirationTime).getTime();
      const currentTime = Date.now();
      const fiveMinutes = 5 * 60 * 1000;

      if (expirationTime - currentTime < fiveMinutes) {
        // Token is about to expire, force refresh
        if (!this.tokenRefreshPromise) {
          this.tokenRefreshPromise = currentUser
            .getIdToken(true)
            .then((newToken) => {
              // Update the stored user object with the new token
              const currentStoredUser = store.get(userAtom);
              if (currentStoredUser) {
                store.set(userAtom, {
                  ...currentStoredUser,
                  accessToken: newToken,
                });
              }
              return newToken;
            })
            .finally(() => {
              this.tokenRefreshPromise = null;
            });
        }
        return this.tokenRefreshPromise;
      }

      return currentUser.getIdToken();
    } catch (error) {
      console.error('Error getting valid token:', error);
      toast.error('Authentication error. Please sign in again.');
      throw error;
    }
  }

  async getAuthHeaders() {
    try {
      const token = await this.getValidToken();
      return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
    } catch (error) {
      console.error('Error getting auth headers:', error);
      return {};
    }
  }
}

export const tokenManager = new TokenManager();
