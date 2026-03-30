import React from "react"
import NavBar from "./NavBar"

const AppShell = ({ children, title, subtitle, actions, contentClassName = "" }) => {
  return (
    <div className="min-h-screen bg-transparent text-slate-700">
      <NavBar />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        {(title || subtitle || actions) && (
          <section className="rounded-4xl border border-white/70 bg-white/75 p-6 shadow-[0_22px_60px_-30px_rgba(59,130,246,0.35)] backdrop-blur sm:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                {title && (
                  <h1 className="text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="mt-4 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
                    {subtitle}
                  </p>
                )}
              </div>
              {actions ? <div className="w-full max-w-xl lg:w-auto">{actions}</div> : null}
            </div>
          </section>
        )}

        <main className={contentClassName}>{children}</main>
      </div>
    </div>
  )
}

export default AppShell
