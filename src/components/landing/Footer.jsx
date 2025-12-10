export default function Footer() {
  return (
    <footer className="py-12 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="text-2xl font-black text-white tracking-tighter">
          ALPHA<span className="text-gray-500">WASH</span>
        </div>

        <p className="text-zinc-600 text-sm">
          © {new Date().getFullYear()} AlphaWash. All rights reserved.
        </p>

        <div className="flex gap-6 text-sm">
          <a className="text-zinc-500 hover:text-white" href="https://www.instagram.com/alpha_wsh/">
            Instagram
          </a>
          <a className="text-zinc-500 hover:text-white" href="https://www.tiktok.com/@alpha_wash?_r=1&_t=ZP-925nzrqWHMd">
            TikTok
          </a>
        </div>
      </div>
    </footer>
  );
}
