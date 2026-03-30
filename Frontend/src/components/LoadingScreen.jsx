import React from "react"

const LoadingScreen = ({ title = "Loading...", message = "Please wait while we prepare your workspace." }) => {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-4xl border border-white/80 bg-white/85 p-10 text-center shadow-[0_24px_70px_-36px_rgba(59,130,246,0.45)] backdrop-blur">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sky-100">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-200 border-t-sky-500" />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-slate-800">{title}</h1>
        <p className="mt-3 text-base leading-7 text-slate-500">{message}</p>
      </div>
    </main>
  )
}

export default LoadingScreen
