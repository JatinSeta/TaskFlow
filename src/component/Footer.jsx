
import logo from "../../public/Image/Logo.png"
import { CopyrightIcon } from '@mui/icons-material/Copyright';
export default function Footer() {
  return (
     <div className="bg-gray-900 text-white px-6 py-10 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-12">
          
          <div>
            <img
              src={logo}
              alt="TaskFlow Logo"
              className="w-40 sm:w-44"
            />
            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-400">
              Simplify tasks. Improve collaboration. Get work done.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold">Navigation</h2>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="/" className="transition hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/features" className="transition hover:text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="/about" className="transition hover:text-white">
                  About
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold">Account</h2>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="/login" className="transition hover:text-white">
                  Login
                </a>
              </li>
              <li>
                <a href="/signup" className="transition hover:text-white">
                  Sign Up
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6">
          <p className="flex flex-wrap items-center justify-center gap-2 text-center text-sm text-gray-400 sm:justify-start">
            <CopyrightIcon size={16} />
            <span>2026 TaskFlow. All rights reserved.</span>
          </p>
        </div>
      </div>
    </div>
  )
}
