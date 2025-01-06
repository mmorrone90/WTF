import { User, Session } from '@supabase/supabase-js';
import { UserProfile } from '../../types/auth';

export interface AuthResult {
  session: Session | null;
  user: User;
  profile: UserProfile;
}

export interface ProfileFetchOptions {
  maxAttempts?: number;
  delayMs?: number;
}
