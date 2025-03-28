package org.ao.group.domain.application.entity

import jakarta.persistence.*

@Entity
class SurveyResponse (
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    var applicationForm: ApplicationForm? = null,
    val question: String,
    val answer: Int,
) {
}