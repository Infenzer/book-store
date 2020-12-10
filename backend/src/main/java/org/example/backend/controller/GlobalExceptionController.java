package org.example.backend.controller;

import org.example.backend.dto.messages.ErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class GlobalExceptionController {
    private static final String ERROR_VALID_MESSAGE = "Ошибка валидации";

    private ResponseEntity<ErrorMessage> error(String message, List<String> details, HttpStatus httpStatus) {
        ErrorMessage errorMessage = new ErrorMessage(message, details);
        return new ResponseEntity<>(errorMessage, httpStatus);
    }

    private List<String> getErrorsDetails(MethodArgumentNotValidException exception) {
        List<String> errors = new ArrayList<>();
        exception.getBindingResult().getAllErrors().forEach(objectError -> errors.add(objectError.getDefaultMessage()));

        return errors;
    }

    @ExceptionHandler(value = {MethodArgumentNotValidException.class})
    public ResponseEntity<ErrorMessage> notValidException(MethodArgumentNotValidException exception) {
        List<String> errors = getErrorsDetails(exception);
        return error(ERROR_VALID_MESSAGE, errors, HttpStatus.BAD_REQUEST);
    }
}
