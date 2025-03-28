package org.ao.group.domain.application.dto

import org.ao.group.domain.application.entity.ApplicationForm
import org.ao.group.domain.application.entity.ApplicatorType

class ApplicationFormDto {
    data class Request(
        val name: String,
        val studentId: String,
        val applicatorType: ApplicatorType,
        val surveyResponses: List<SurveyResponseDto.Request>
    ) {
        fun toEntity() = ApplicationForm(
            name = name,
            studentId = studentId,
            applicatorType = applicatorType,
        )
    }

    data class Response(
        val name: String,
        val studentId: String?,
        val applicatorType: ApplicatorType
    ) {
        constructor(applicationForm: ApplicationForm) : this(
            name = applicationForm.name,
            studentId = applicationForm.studentId,
            applicatorType = applicationForm.applicatorType
        )
    }

    data class DetailResponse(
        val name: String,
        val studentId: String?,
        val applicatorType: ApplicatorType,
        val surveyResponses: List<SurveyResponseDto.Response>
    ) {
        constructor(applicationForm: ApplicationForm) : this(
            name = applicationForm.name,
            studentId = applicationForm.studentId,
            applicatorType = applicationForm.applicatorType,
            surveyResponses = applicationForm.surveyResponses.map { SurveyResponseDto.Response(it) }
        )
    }
}