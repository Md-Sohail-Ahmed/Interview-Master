import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import LoadingScreen from '../../../components/LoadingScreen'
import NavBar from '../../../components/NavBar'

const Register = () => {
    const navigate = useNavigate()
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const { loading, handleRegister } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({ username, email, password })
        navigate("/")
    }

    if (loading) {
        return <LoadingScreen title="Creating your account" message="We're setting up your interview workspace." />
    }

    return (
        <div className="min-h-screen">
            <NavBar />
            <main className="relative flex min-h-[calc(100vh-81px)] items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(147,197,253,0.18),transparent_35%)]" />

                <div className="relative grid w-full max-w-6xl overflow-hidden rounded-[36px] border border-white/80 bg-white/85 shadow-[0_32px_90px_-42px_rgba(59,130,246,0.55)] backdrop-blur lg:grid-cols-[1.05fr_0.95fr]">
                    <section className="hidden bg-gradient-to-br from-sky-500 via-sky-400 to-cyan-300 p-10 text-white lg:flex lg:flex-col lg:justify-between">
                        <div>
                            <h1 className="mt-6 text-5xl font-bold leading-tight">
                                Build a tailored interview report before you apply.
                            </h1>
                            <p className="mt-5 max-w-xl text-lg leading-8 text-sky-50/90">
                                Create your account to upload your resume, align with the role, and review focused practice plans in one clean workspace.
                            </p>
                        </div>

                        <div className="grid gap-4">
                            {[
                                "Resume-backed answers and skill gap insights",
                                "A structured roadmap for your next interview"
                            ].map((item) => (
                                <div key={item} className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur">
                                    <p className="text-base font-medium leading-7">{item}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="p-6 sm:p-10">
                        <div className="mx-auto max-w-md">
                            <p className="inline-flex rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700">
                                Get started
                            </p>
                            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-800">
                                Create your account.
                            </h1>
                            <p className="mt-4 text-base leading-7 text-slate-500">
                                Set up your workspace to save reports, preparation roadmaps, and tailored question banks.
                            </p>

                            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-600" htmlFor="username">Username</label>
                                    <input
                                        className="w-full rounded-2xl border border-sky-100 bg-slate-50/80 px-4 py-3.5 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                                        onChange={(e) => { setUsername(e.target.value) }}
                                        type="text"
                                        id="username"
                                        name='username'
                                        placeholder='Enter username'
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-600" htmlFor="email">Email</label>
                                    <input
                                        className="w-full rounded-2xl border border-sky-100 bg-slate-50/80 px-4 py-3.5 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                                        onChange={(e) => { setEmail(e.target.value) }}
                                        type="email"
                                        id="email"
                                        name='email'
                                        placeholder='Enter email address'
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-600" htmlFor="password">Password</label>
                                    <input
                                        className="w-full rounded-2xl border border-sky-100 bg-slate-50/80 px-4 py-3.5 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                                        onChange={(e) => { setPassword(e.target.value) }}
                                        type="password"
                                        id="password"
                                        name='password'
                                        placeholder='Enter password'
                                    />
                                </div>

                                <button className='inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-5 py-3.5 text-base font-semibold text-white shadow-[0_18px_35px_-18px_rgba(14,116,255,0.8)] transition hover:-translate-y-0.5'>
                                    Register
                                </button>
                            </form>

                            <p className="mt-6 text-sm text-slate-500">
                                Already have an account?{" "}
                                <Link className="font-semibold text-sky-700 hover:text-sky-800" to={"/login"}>Login</Link>
                            </p>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}

export default Register
