import React, { useState, useEffect } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useParams } from 'react-router'
import AppShell from '../../../components/AppShell'
import LoadingScreen from '../../../components/LoadingScreen'

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
]

const QuestionCard = ({ item, index }) => {
    const [ open, setOpen ] = useState(false)

    return (
        <div className='rounded-[28px] border border-sky-100 bg-white p-5 shadow-[0_20px_40px_-34px_rgba(59,130,246,0.45)]'>
            <button type="button" className='flex w-full items-center gap-4 text-left' onClick={() => setOpen((value) => !value)}>
                <span className='inline-flex h-10 min-w-10 items-center justify-center rounded-2xl bg-sky-50 px-3 text-sm font-semibold text-sky-700'>Q{index + 1}</span>
                <p className='flex-1 text-base font-semibold leading-7 text-slate-800'>{item.question}</p>
                <span className={`flex h-10 w-10 items-center justify-center rounded-2xl border border-sky-100 text-slate-400 transition ${open ? 'rotate-180 bg-sky-50 text-sky-700' : 'bg-white'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </button>
            {open && (
                <div className='mt-5 space-y-4 rounded-3xl border border-sky-100 bg-slate-50/80 p-5'>
                    <div className='space-y-2'>
                        <span className='inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-sky-700'>Intention</span>
                        <p className="text-sm leading-7 text-slate-500">{item.intention}</p>
                    </div>
                    <div className='space-y-2'>
                        <span className='inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700'>Model Answer</span>
                        <p className="text-sm leading-7 text-slate-500">{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className='rounded-[28px] border border-sky-100 bg-white p-5 shadow-[0_20px_40px_-34px_rgba(59,130,246,0.45)]'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
            <span className='inline-flex rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700'>Day {day.day}</span>
            <h3 className='text-lg font-semibold text-slate-800'>{day.focus}</h3>
        </div>
        <ul className='mt-5 space-y-3'>
            {day.tasks.map((task, i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-7 text-slate-500">
                    <span className='mt-2 h-2.5 w-2.5 rounded-full bg-cyan-400' />
                    <span>{task}</span>
                </li>
            ))}
        </ul>
    </div>
)

const Interview = () => {
    const [ activeNav, setActiveNav ] = useState('technical')
    const [ isDownloadingResume, setIsDownloadingResume ] = useState(false)
    const { report, getReportById, loading, getResumePdf } = useInterview()
    const { interviewId } = useParams()

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        }
    }, [ interviewId ])

    if (loading || !report) {
        if (isDownloadingResume) {
            return <LoadingScreen title="Downloading resume" message="Preparing your resume file for download." />
        }

        return <LoadingScreen title="Loading your interview plan" message="Pulling your report, questions, and preparation roadmap into view." />
    }

    const scoreTone =
        report.matchScore >= 80 ? 'emerald' :
            report.matchScore >= 60 ? 'amber' : 'rose'

    const handleResumeDownload = async () => {
        setIsDownloadingResume(true)
        try {
            await getResumePdf(interviewId)
        } finally {
            setIsDownloadingResume(false)
        }
    }

    return (
        <AppShell
            title={report.title || "Interview Report"}
            subtitle="Review tailored questions, understand your match score, and work through a focused roadmap for the role."
        >
            <div className='grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)_320px]'>
                <nav className='rounded-4xl border border-white/80 bg-white/85 p-5 shadow-[0_24px_70px_-34px_rgba(59,130,246,0.42)] backdrop-blur'>
                    <p className='text-xs font-semibold uppercase tracking-[0.22em] text-sky-600'>Sections</p>
                    <div className="mt-5 space-y-3">
                        {NAV_ITEMS.map(item => (
                            <button
                                key={item.id}
                                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                                    activeNav === item.id
                                        ? 'bg-linear-to-r from-sky-500 to-cyan-400 text-white shadow-[0_18px_35px_-22px_rgba(14,116,255,0.9)]'
                                        : 'bg-slate-50 text-slate-600 hover:bg-sky-50 hover:text-sky-700'
                                }`}
                                onClick={() => setActiveNav(item.id)}
                            >
                                <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-white/15'>{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={handleResumeDownload}
                        className='mt-6 inline-flex w-full items-center justify-center rounded-2xl border border-sky-100 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700'>
                        Download Resume
                    </button>
                </nav>

                <main className='rounded-4xl border border-white/80 bg-white/85 p-6 shadow-[0_24px_70px_-34px_rgba(59,130,246,0.42)] backdrop-blur'>
                    {activeNav === 'technical' && (
                        <section>
                            <div className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Interview Prep</p>
                                    <h2 className='mt-2 text-3xl font-bold text-slate-800'>Technical Questions</h2>
                                </div>
                                <span className='inline-flex rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700'>{report.technicalQuestions.length} questions</span>
                            </div>
                            <div className='mt-6 space-y-4'>
                                {report.technicalQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section>
                            <div className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Interview Prep</p>
                                    <h2 className='mt-2 text-3xl font-bold text-slate-800'>Behavioral Questions</h2>
                                </div>
                                <span className='inline-flex rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700'>{report.behavioralQuestions.length} questions</span>
                            </div>
                            <div className='mt-6 space-y-4'>
                                {report.behavioralQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section>
                            <div className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Study Plan</p>
                                    <h2 className='mt-2 text-3xl font-bold text-slate-800'>Preparation Road Map</h2>
                                </div>
                                <span className='inline-flex rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700'>{report.preparationPlan.length}-day plan</span>
                            </div>
                            <div className='mt-6 space-y-4'>
                                {report.preparationPlan.map((day) => (
                                    <RoadMapDay key={day.day} day={day} />
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                <aside className='space-y-6'>
                    <div className='rounded-4xl border border-white/80 bg-white/85 p-6 shadow-[0_24px_70px_-34px_rgba(59,130,246,0.42)] backdrop-blur'>
                        <p className='text-xs font-semibold uppercase tracking-[0.22em] text-sky-600'>Match Score</p>
                        <div className={`mx-auto mt-6 flex h-40 w-40 items-center justify-center rounded-full border-[14px] ${
                            scoreTone === 'emerald'
                                ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                                : scoreTone === 'amber'
                                    ? 'border-amber-300 bg-amber-50 text-amber-700'
                                    : 'border-rose-300 bg-rose-50 text-rose-700'
                        }`}>
                            <span className='text-5xl font-bold'>{report.matchScore}<span className="text-2xl">%</span></span>
                        </div>
                        <p className='mt-5 text-center text-sm leading-7 text-slate-500'>Strong match for this role based on your current materials and stated experience.</p>
                    </div>

                    <div className='rounded-4xl border border-white/80 bg-white/85 p-6 shadow-[0_24px_70px_-34px_rgba(59,130,246,0.42)] backdrop-blur'>
                        <p className='text-xs font-semibold uppercase tracking-[0.22em] text-sky-600'>Skill Gaps</p>
                        <div className='mt-5 flex flex-wrap gap-3'>
                            {report.skillGaps.map((gap, i) => (
                                <span key={i} className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                                    gap.severity === 'high'
                                        ? 'bg-rose-50 text-rose-700'
                                        : gap.severity === 'medium'
                                            ? 'bg-amber-50 text-amber-700'
                                            : 'bg-sky-50 text-sky-700'
                                }`}>
                                    {gap.skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </AppShell>
    )
}

export default Interview
