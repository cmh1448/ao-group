package org.ao.group.system.exception.model

class RestException(
    errorCode: ErrorCode,
    trace: Exception,
) : RuntimeException(
    errorCode.message,
    trace
)