import { Link } from "react-router";

import { Button } from "@/components/ui/button";

const Unauthorized = () => {
  return (
    <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center gap-3 px-4 text-center">
      <span className="text-primary text-sm font-semibold">403</span>
      <h1 className="text-3xl font-bold tracking-tight">Access denied</h1>
      <p className="text-muted-foreground max-w-md">
        You don&apos;t have permission to view this page. If you think this
        is a mistake, contact an administrator.
      </p>

      <div className="mt-4 flex items-center gap-3">
        <Button variant="outline" render={() => <Link to="/">Go home</Link>} />
        <Button render={() => <Link to="/login">Switch account</Link>} />
      </div>
    </div>
  );
};

export default Unauthorized;
