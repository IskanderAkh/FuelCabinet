import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="py-16 text-center">
      <h2 className="text-2xl font-semibold">Page not found</h2>
      <Link to="/" className="mt-3 inline-block text-sm text-primary underline">
        Back to dashboard
      </Link>
    </div>
  );
}
