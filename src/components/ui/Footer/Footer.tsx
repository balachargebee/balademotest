export default function Footer() {
  return (
    <footer className="mx-auto max-w-[1920px] px-6">
      <div className="flex flex-col items-center justify-center space-y-4 py-10 md:flex-row">
        <div className="flex items-center">
          <span className="text-white">Crafted by</span>&nbsp;
          <a
            className="text-primary"
            href="https://github.com/balachargebee"
            target="_blank"
            rel="noreferrer"
            aria-label="Bala's GitHub"
          >
            Bala Adhethan
          </a>
        </div>
      </div>
    </footer>
  );
}
