import { usePrivy } from "@privy-io/react-auth";

export function LoginButton({ className }: { className?: string }) {
  const { ready, authenticated, login, logout } = usePrivy();
  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = ready && authenticated;

  return (
    <button onClick={ready && authenticated ? logout : login} className={className}>
      {disableLogin ? "Signed in" : "Sign in"}
    </button>
  );
}
