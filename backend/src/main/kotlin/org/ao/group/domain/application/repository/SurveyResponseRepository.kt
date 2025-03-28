package org.ao.group.domain.application.repository

import org.ao.group.domain.application.entity.SurveyResponse
import org.springframework.data.jpa.repository.JpaRepository

interface SurveyResponseRepository: JpaRepository<SurveyResponse, Long> {
}