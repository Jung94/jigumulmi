import { login, signUp } from './actions'

export default function LoginPage() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={login}>Log in</button>
      <button formAction={signUp}>Sign up</button>
    </form>
  )
}
// https://supabase.com/docs/guides/auth/server-side/nextjs