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
          <a className="text-zinc-500 hover:text-white" href="https://www.gofundme.com/f/bringing-alpha-wash-to-life-a-bold-mens-laundry-brand?attribution_id=sl:e1a1cb92-2c8f-488e-a898-358a7c8f021d&lang=en_US&ts=1763939188&utm_campaign=fp_sharesheet&utm_content=amp17_tc&utm_medium=customer&utm_source=copy_link">
            GoFundMe
          </a>
        </div>
      </div>
    </footer>
  );
}
