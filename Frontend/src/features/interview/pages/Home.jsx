import React, { useState, useRef } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import AppShell from '../../../components/AppShell'
import LoadingScreen from '../../../components/LoadingScreen'

const featureCards = [
    {
        title: "Role Context",
        text: "Paste the job description so your interview report is aligned with the company's expectations."
    },
    {
        title: "Resume Match",
        text: "Upload a PDF or DOCX resume so the experience section stays clean and ready for parsing later."
    },
    {
        title: "Personal Story",
        text: "Add a short self-description to highlight your strengths, goals, and interview positioning."
    }
]

const Home = () => {
    const { loading, generateReport, reports } = useInterview()
    const [ jobDescription, setJobDescription ] = useState("")
    const [ selfDescription, setSelfDescription ] = useState("")
    const [ selectedFileName, setSelectedFileName ] = useState("")
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[ 0 ]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        navigate(`/interview/${data._id}`)
    }

    const handleFileChange = (e) => {
        const file = e.target.files?.[ 0 ]
        setSelectedFileName(file ? file.name : "")
    }

    if (loading) {
        return <LoadingScreen title="Building your dashboard" message="Loading interview reports and preparing the workspace." />
    }

    return (
        <AppShell
            title="Build a tailored interview report before you apply."
            subtitle="Share the role you want, upload your resume, and describe your background so you can prepare with more focus and confidence."
            actions={
                <div className="grid gap-4 sm:grid-cols-3">
                    {featureCards.map((item) => (
                        <div key={item.title} className="rounded-[28px] border border-sky-100 bg-slate-50/75 p-5 shadow-[0_18px_45px_-38px_rgba(59,130,246,0.45)]">
                            <p className="text-sm font-semibold text-slate-600">{item.title}</p>
                            <p className="mt-3 text-sm leading-7 text-slate-500">{item.text}</p>
                        </div>
                    ))}
                </div>
            }
        >
            <section className="rounded-4xl border border-white/80 bg-white/85 p-4 shadow-[0_24px_70px_-34px_rgba(59,130,246,0.42)] backdrop-blur sm:p-6">
                <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                    <div className="rounded-[28px] border border-sky-100 bg-slate-50/70 p-6">
                        <div className="flex flex-wrap items-center gap-3">
                            <p className="text-lg font-semibold text-slate-800">Job Description</p>
                            <span className="rounded-full border border-sky-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                                Required
                            </span>
                        </div>
                        <textarea
                            onChange={(e) => { setJobDescription(e.target.value) }}
                            value={jobDescription}
                            className="mt-5 min-h-80 w-full resize-none rounded-3xl border border-sky-100 bg-white px-5 py-4 text-base leading-8 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                            placeholder="Paste the full job description here..."
                            maxLength={5000}
                        />
                        <div className="mt-3 text-right text-sm text-slate-400">
                            {jobDescription.length} / 5000 chars
                        </div>
                    </div>

                    <div className="space-y-6 rounded-[28px] border border-sky-100 bg-slate-50/70 p-6">
                        <div>
                            <div className="flex flex-wrap items-center gap-3">
                                <p className="text-lg font-semibold text-slate-800">Resume Upload</p>
                                <span className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
                                    Best Results
                                </span>
                            </div>
                            <label htmlFor='resume' className="mt-5 block cursor-pointer rounded-3xl border border-dashed border-sky-200 bg-white px-5 py-6 transition hover:border-sky-300 hover:bg-sky-50/50">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <span className="inline-flex rounded-2xl bg-linear-to-r from-sky-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_30px_-18px_rgba(14,116,255,0.8)]">
                                            Choose File
                                        </span>
                                        <p className="mt-4 text-sm text-slate-400">Only `.pdf` and `.docx` files are accepted.</p>
                                    </div>
                                    <p className="text-sm font-medium text-slate-500">
                                        {selectedFileName || "No file chosen"}
                                    </p>
                                </div>
                                <input ref={resumeInputRef} onChange={handleFileChange} hidden type='file' id='resume' name='resume' accept='.pdf,.docx' />
                            </label>
                        </div>

                        <div className="relative py-2 text-center">
                            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-sky-100" />
                            <span className="relative inline-flex rounded-full border border-sky-100 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Or
                            </span>
                        </div>

                        <div>
                            <label className="text-lg font-semibold text-slate-800" htmlFor='selfDescription'>Quick Self-Description</label>
                            <textarea
                                onChange={(e) => { setSelfDescription(e.target.value) }}
                                value={selfDescription}
                                id='selfDescription'
                                name='selfDescription'
                                className="mt-5 min-h-47.5 w-full resize-none rounded-3xl border border-sky-100 bg-white px-5 py-4 text-base leading-8 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                            />
                        </div>

                        <div className="rounded-3xl border border-sky-100 bg-white px-5 py-4 text-sm leading-7 text-slate-500">
                            Either a <span className="font-semibold text-slate-700">resume</span> or a <span className="font-semibold text-slate-700">self-description</span> is required to generate a personalized plan.
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex flex-col gap-4 rounded-[28px] border border-sky-100 bg-slate-50/70 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-medium text-slate-500">AI-powered strategy generation. Typical turnaround: about 30 seconds.</p>
                    <button
                        onClick={handleGenerateReport}
                        className='inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-sky-500 to-cyan-400 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_18px_35px_-18px_rgba(14,116,255,0.8)] transition hover:-translate-y-0.5 sm:text-base'>
                        Generate My Interview Strategy
                    </button>
                </div>
            </section>

            {reports.length > 0 && (
                <section className='rounded-4xl border border-white/80 bg-white/85 p-6 shadow-[0_24px_70px_-34px_rgba(59,130,246,0.42)] backdrop-blur mt-4'>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Recent reports</p>
                            <h2 className='mt-2 text-3xl font-bold text-slate-800'>My Interview Plans</h2>
                        </div>
                        <p className="text-sm text-slate-400">Open any saved plan to continue practicing.</p>
                    </div>
                    <ul className='mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
                        {reports.map(report => (
                            <li key={report._id}>
                                <button
                                    type="button"
                                    className='w-full rounded-[28px] border border-sky-100 bg-slate-50/75 p-5 text-left transition hover:-translate-y-1 hover:border-sky-200 hover:bg-white hover:shadow-[0_18px_45px_-30px_rgba(59,130,246,0.35)]'
                                    onClick={() => navigate(`/interview/${report._id}`)}>
                                    <h3 className="text-lg font-semibold text-slate-800">{report.title || 'Untitled Position'}</h3>
                                    <p className='mt-2 text-sm text-slate-400'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                    <p className={`mt-5 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                                        report.matchScore >= 80
                                            ? 'bg-emerald-50 text-emerald-700'
                                            : report.matchScore >= 60
                                                ? 'bg-amber-50 text-amber-700'
                                                : 'bg-rose-50 text-rose-700'
                                    }`}>
                                        Match Score: {report.matchScore}%
                                    </p>
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </AppShell>
    )
}

export default Home
