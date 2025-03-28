package org.ao.group.domain.application.service

import org.ao.group.domain.application.dto.ApplicationFormDto
import org.ao.group.domain.application.entity.ApplicatorType
import org.ao.group.domain.application.repository.ApplicationFormRepository
import org.ao.group.domain.application.repository.SurveyResponseRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class ApplicationFormService(
    val applicationFormRepository: ApplicationFormRepository,
    val surveyResponseRepository: SurveyResponseRepository
) {

    @Transactional
    fun submitApplicationForm(request: ApplicationFormDto.Request): ApplicationFormDto.Response {
        val duplicated = applicationFormRepository.findByStudentId(request.studentId)
        if(duplicated.isNotEmpty()) {
            applicationFormRepository.deleteAll();
        }

        val toSave = request.toEntity()
        val saved = applicationFormRepository.save(toSave)

        request.surveyResponses.map {
            it.toEntity().apply {
                applicationForm = saved
            }
        }.let {
            surveyResponseRepository.saveAll(it)
        }

        return ApplicationFormDto.Response(saved);
    }

}