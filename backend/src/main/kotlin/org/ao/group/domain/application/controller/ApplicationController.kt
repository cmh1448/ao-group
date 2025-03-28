package org.ao.group.domain.application.controller

import org.ao.group.domain.application.dto.ApplicationFormDto
import org.ao.group.domain.application.service.ApplicationFormService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/applications")
class ApplicationController(
    val applicationFormService: ApplicationFormService
) {
    @PostMapping
    fun submit(
        @RequestBody
        request: ApplicationFormDto.Request
    ): ApplicationFormDto.Response {
        return applicationFormService.submitApplicationForm(request)
    }
}