import Link from "next/link";
export default function NotFound() {
  return (
    <main className="not-found">
      <p className="tag"><span>404</span> Page not found</p>
      <h1>This page has <em>moved on.</em></h1>
      <p>The address you followed does not exist. The front desk is still open.</p>
      <Link className="btn btn--dark" href="/">Return to VITALIS</Link>
    </main>
  );
}
