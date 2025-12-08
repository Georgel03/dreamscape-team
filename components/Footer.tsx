import { Twitter, Github, Disc } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-xs">
            <span className="text-white font-medium tracking-tight text-lg block mb-6">Oneiric</span>
            <p className="text-sm text-slate-500 font-light leading-relaxed">
              Pioneering the intersection of artificial intelligence and human subconsciousness. Designed in the void.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 sm:gap-24 w-full md:w-auto">
            <div>
              <h4 className="text-white text-sm font-medium mb-4">Platform</h4>
              <ul className="space-y-3 text-sm text-slate-500 font-light">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Roadmap</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-medium mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-slate-500 font-light">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-medium mb-4">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="text-slate-500 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="text-slate-500 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                <a href="#" className="text-slate-500 hover:text-white transition-colors"><Disc className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-600 font-light">© 2024 Oneiric AI Inc. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-slate-600 font-light">
            <a href="#" className="hover:text-slate-400">Privacy</a>
            <a href="#" className="hover:text-slate-400">Terms</a>
            <a href="#" className="hover:text-slate-400">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}