package org.ao.group.domain.application.dto

import org.ao.group.domain.application.entity.SurveyResponse

class SurveyResponseDto {
    data class Request(
        val question: String,
        val answer: Int
    ) {
        fun toEntity() = SurveyResponse(
            question = question,
            answer = answer
        )
    }

    data class Response(
        val id: Long?,
        val question: String,
        val answer: Int
    ) {
        constructor(surveyResponse: SurveyResponse) : this(
            id = surveyResponse.id,
            question = surveyResponse.question,
            answer = surveyResponse.answer
        )
    }
}