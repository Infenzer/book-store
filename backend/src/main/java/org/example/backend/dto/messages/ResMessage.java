package org.example.backend.dto.messages;

import lombok.Data;

@Data
public class ResMessage {
    private final String message;

    public ResMessage(String message) {
        this.message = message;
    }
}
