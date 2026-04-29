export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-[#1F1F1F]">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[#737373] text-sm">
          © 2026 Khushaan Virk
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/khushaan-virk/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#737373] hover:text-[#F5F5F5] text-sm transition-colors duration-200"
          >
            LinkedIn
          </a>
          <a
            href="/resume.pdf"
            download
            className="text-[#737373] hover:text-[#F5F5F5] text-sm transition-colors duration-200"
          >
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
}
