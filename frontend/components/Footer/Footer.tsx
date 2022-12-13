import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { footerLinks } from './footerLinks'

const Footer = () => {
  return (
    <div>
      <div className="container py-10 border-t border-dashed">
        <div className="max-w-[1080px] mx-auto">
          <div className="grid grid-cols-12 gap-4 sm:gap-10">
            <div className="col-span-6 sm:col-span-3">
              <div className="w-fit mx-auto">
                {/* footer logo */}
                <div className="mb-3">
                  <div className="relative w-24 sm:w-36 h-10">
                    <Image
                      src="/logo.svg"
                      alt="logo"
                      fill
                      sizes="(max-width: 640px) 100vw,"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* footer description */}
                <p className="text-[10px] sm:text-xs text-slate-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam quod voluptas quia quae voluptate quas dolorum,
                  quibusdam, voluptates...
                </p>

                <div className="mt-5">
                  <div>
                    <span className="text-sm text-slate-500 font-medium">
                      Download App
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1 flex-wrap mt-2">
                    <Link
                      href="/"
                      className="col-span-4 lg:col-span-2 px-2 py-1 bg-white/80 backdrop-blur-md flex items-center text-black/70 border border-black/10 border-dashed space-x-1 w-fit hover:border-blue-300 transition-all ease-linear duration-200"
                    >
                      <div className="relative w-6 h-6">
                        <Image
                          src="/apple.svg"
                          alt="apple"
                          fill
                          sizes="100vw, 25px"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] leading-[8px]">
                          Download on
                        </span>
                        <span className="text-xs font-medium">App Store</span>
                      </div>
                    </Link>

                    {/* google play store */}
                    <Link
                      href="/"
                      className="col-span-4 lg:col-span-2 px-2 py-1 bg-white/80 backdrop-blur-md flex items-center text-black/70 border border-black/10 border-dashed space-x-1 w-fit hover:border-blue-300 transition-all ease-linear duration-200"
                    >
                      <div className="relative w-6 h-6">
                        <Image
                          src="/play-store.svg"
                          alt="playStore"
                          fill
                          sizes="100vw, 25px"
                          loading="lazy"
                        />
                      </div>

                      <div className="flex flex-col">
                        <span className="text-[8px] leading-[8px]">
                          Download on
                        </span>
                        <span className="text-xs font-medium">Play Store</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {
              // footer links
              footerLinks.map((item, index) => (
                <div key={index} className="col-span-6 sm:col-span-3 pt-4">
                  <div className="w-fit mx-auto">
                    <h3 className="mb-3 text-sm font-semibold text-slate-500">
                      {item.title}
                    </h3>
                    <ul className="sm:space-y-0.5">
                      {item.links.map((link, index) => (
                        <li key={index}>
                          <Link
                            href={link.url}
                            className="text-[12px] md:text-sm text-gray-500 hover:text-blue-500 transition-colors ease-linear duration-200"
                          >
                            {link.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div>
        <div className="container py-5 border-t border-dashed">
          <div className="max-w-[1080px] mx-auto">
            {/* copywrite text */}
            <div className="flex items-center justify-center">
              <div className="text-xs text-slate-500">
                © 2022 All rights reserved
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
