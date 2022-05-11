package com.timesheet.Timesheet.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class DeleteUserException extends Exception {
    private static final long serialVersionUID = 1L;

    public DeleteUserException(String message) {
        super(message);
    }

    public DeleteUserException(String message, Throwable cause) {
        super(message, cause);
    }

    public DeleteUserException(Throwable cause) {
        super(cause);
    }
}
