
export default function Footer() {
  return (
    <footer className="mt-auto border-t">
      <div className="container py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Info Central. All rights reserved.
      </div>
    </footer>
  );
}
