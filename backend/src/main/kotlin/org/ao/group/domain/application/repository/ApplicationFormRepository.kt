package org.ao.group.domain.application.repository

import org.ao.group.domain.application.entity.ApplicationForm
import org.springframework.data.jpa.repository.JpaRepository

interface ApplicationFormRepository: JpaRepository<ApplicationForm, String> {
    fun findByStudentId(studentId: String): MutableList<ApplicationForm>
}