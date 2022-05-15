package com.timesheet.Timesheet.web.config;

import com.fasterxml.jackson.databind.exc.MismatchedInputException;
import com.timesheet.Timesheet.exception.DeleteUserException;
import com.timesheet.Timesheet.exception.RestrictRemoveException;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.transaction.TransactionSystemException;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpClientErrorException;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;
import java.sql.SQLException;

@RestControllerAdvice
public class ExceptionHandlerConfig {

    @ExceptionHandler(value = {TransactionSystemException.class, ConstraintViolationException.class})
    public ResponseEntity<ApiError> unknownException(Exception ex, HttpServletRequest req) {
        ex.printStackTrace();
        return ResponseEntity.badRequest()
                .body(new ApiError(400, "ERRORS.ERROR", "ERRORS.BAD_REQUEST", req.getServletPath()));
    }

    @ExceptionHandler(value = {DataIntegrityViolationException.class})
    public ResponseEntity<ApiError> conflict(Exception ex, HttpServletRequest req) {
        ex.printStackTrace();
        return ResponseEntity.status(409)
                .body(new ApiError(409, "ERRORS.ERROR", "ERRORS.DATA_INTEGRITY", req.getServletPath()));
    }

    @ExceptionHandler(value = {SQLException.class, DataAccessException.class})
    public ResponseEntity<ApiError> databaseError(Exception ex, HttpServletRequest req) {
        ex.printStackTrace();
        return ResponseEntity.status(503) //SERVICE UNAVAILABLE
                .body(new ApiError(503, "ERRORS.ERROR", "ERRORS.DATABASE_PROBLEM", req.getServletPath()));
    }

    @ExceptionHandler(value = {MismatchedInputException.class, HttpMessageNotReadableException.class})
    public ResponseEntity<ApiError> notReadable(Exception ex, HttpServletRequest req) {
        ex.printStackTrace();
        return ResponseEntity.status(409) // AUTOCOMPLETE ERROR
                .body(new ApiError(409, "ERRORS.ERROR", "ERRORS.DATA_INTEGRITY", req.getServletPath()));
    }

    @ExceptionHandler(value = {EntityNotFoundException.class})
    public ResponseEntity<ApiError> notFound(Exception ex, HttpServletRequest req) {
        ex.printStackTrace();
        return ResponseEntity.status(404)
                .body(new ApiError(404, "ERRORS.ERROR", "ERRORS.NOT_FOUND", req.getServletPath()));
    }


    @ExceptionHandler(value = {NoSuchFieldException.class, RestrictRemoveException.class})
    public ResponseEntity<ApiError> delete(Exception ex, HttpServletRequest req) {
        ex.printStackTrace();
        return ResponseEntity.status(409)
                .body(new ApiError(409, "ERRORS.ERROR", "ERRORS.DELETE_FORBIDDEN", req.getServletPath()));
    }


    @ExceptionHandler(value = {DeleteUserException.class})
    public ResponseEntity<ApiError> deleteCode(Exception ex, HttpServletRequest req) {
        ex.printStackTrace();
        return ResponseEntity.status(409)
                .body(new ApiError(409, "ERRORS.ERROR", "ERRORS.DELETE_MANDATORY", req.getServletPath()));
    }

    @ExceptionHandler(value = HttpClientErrorException.Unauthorized.class)
    public ResponseEntity<ApiError> unauthorized(Exception ex, HttpServletRequest req) {
        ex.printStackTrace();
        return ResponseEntity.status(401)
                .body(new ApiError(401, "ERRORS.ERROR", "ERRORS.ACCESS_DENIED", req.getServletPath()));
    }

    @ExceptionHandler(value = AccessDeniedException.class)
    public ResponseEntity<ApiError> accessDenied(Exception ex, HttpServletRequest req) {
        ex.printStackTrace();
        return ResponseEntity.status(403)
                .body(new ApiError(403, "ERRORS.ERROR", "ERRORS.ACCESS_DENIED", req.getServletPath()));
    }

    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<ApiError> error(Exception ex, HttpServletRequest req) {
        ex.printStackTrace();
        return ResponseEntity.status(500)
                .body(new ApiError(500, "ERRORS.ERROR", "ERRORS.SERVER", req.getServletPath()));
    }
}
