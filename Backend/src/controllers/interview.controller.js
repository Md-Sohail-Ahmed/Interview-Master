const pdfParse = require("pdf-parse")
const { generateInterviewReport, generateResumePdf, AIServiceError } = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")

async function extractResumeText(file) {
    if (!file?.buffer) {
        return ""
    }

    const parsedResume = await (new pdfParse.PDFParse(Uint8Array.from(file.buffer))).getText()
    return parsedResume.text || ""
}

function handleControllerError(res, error) {
    console.log(error)

    if (error instanceof AIServiceError) {
        return res.status(error.statusCode).json({
            message: error.message
        })
    }

    return res.status(500).json({
        message: "Something went wrong. Please try again."
    })
}

/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */
async function generateInterViewReportController(req, res) {
    try {
        const { selfDescription = "", jobDescription = "" } = req.body
        const resumeText = await extractResumeText(req.file)

        if (!jobDescription.trim()) {
            return res.status(400).json({
                message: "Job description is required."
            })
        }

        if (!resumeText.trim() && !selfDescription.trim()) {
            return res.status(400).json({
                message: "Please upload a resume or add a self description."
            })
        }

        const interViewReportByAi = await generateInterviewReport({
            resume: resumeText,
            selfDescription,
            jobDescription
        })

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeText,
            selfDescription,
            jobDescription,
            ...interViewReportByAi
        })

        return res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport
        })
    } catch (error) {
        return handleControllerError(res, error)
    }
}

/**
 * @description Controller to get interview report by interviewId.
 */
async function getInterviewReportByIdController(req, res) {
    try {
        const { interviewId } = req.params

        const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            })
        }

        return res.status(200).json({
            message: "Interview report fetched successfully.",
            interviewReport
        })
    } catch (error) {
        return handleControllerError(res, error)
    }
}

/** 
 * @description Controller to get all interview reports of logged in user.
 */
async function getAllInterviewReportsController(req, res) {
    try {
        const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

        return res.status(200).json({
            message: "Interview reports fetched successfully.",
            interviewReports
        })
    } catch (error) {
        return handleControllerError(res, error)
    }
}

/**
 * @description Controller to generate resume PDF based on user self description, resume and job description.
 */
async function generateResumePdfController(req, res) {
    try {
        const { interviewReportId } = req.params

        const interviewReport = await interviewReportModel.findOne({ _id: interviewReportId, user: req.user.id })

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            })
        }

        const { resume, jobDescription, selfDescription } = interviewReport
        const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
        })

        return res.send(pdfBuffer)
    } catch (error) {
        return handleControllerError(res, error)
    }
}

module.exports = { generateInterViewReportController, getInterviewReportByIdController, getAllInterviewReportsController, generateResumePdfController }
