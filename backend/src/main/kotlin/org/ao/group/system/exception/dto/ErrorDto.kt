package org.ao.group.system.exception.dto

import org.ao.group.system.exception.model.ErrorCode

class ErrorDto {

    class ErrorResponse(
        val statusCode: Number,
        val message: String,
        val codeName: String,
    ) {
        constructor(errorCode: ErrorCode) : this(
            errorCode.statusCode,
            errorCode.message,
            errorCode.name
        )

        constructor(statusCode: Number, message: String) : this(
            statusCode,
            message,
            "UNKNOWN"
        )

    }
}