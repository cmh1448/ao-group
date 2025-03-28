package org.ao.group.domain.application.entity

import jakarta.persistence.*

enum class ApplicatorType {
    Mentor,
    Mentee
}

@Entity
class ApplicationForm(
    @Id
    val studentId: String? = null,
    val name: String,
    @Enumerated(EnumType.STRING)
    val applicatorType: ApplicatorType,
    @OneToMany(mappedBy = "applicationForm", cascade = [CascadeType.ALL])
    val surveyResponses: List<SurveyResponse> = emptyList()
) {
}