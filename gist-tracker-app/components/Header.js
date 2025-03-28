import Link from "next/link";
export default function Header() {
  return (
    <header className="bg-blue-600 text-white w-full fixed top-0 left-0 z-10 border-b border-grey p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gist Tracker</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <Link href="/auth/register">Register</Link>
            </li>
            <li>
              <Link href="/auth/login">Login</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
