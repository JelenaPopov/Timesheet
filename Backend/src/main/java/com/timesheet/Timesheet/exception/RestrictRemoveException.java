package com.timesheet.Timesheet.exception;

import lombok.Getter;

@Getter
public class RestrictRemoveException extends Exception {

    private String fieldName;

    public RestrictRemoveException(String fieldName) {
        this.fieldName = fieldName;
    }
}
