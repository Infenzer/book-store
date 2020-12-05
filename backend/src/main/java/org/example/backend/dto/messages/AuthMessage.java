package org.example.backend.dto.messages;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthMessage {
    private String id;
    private String username;
    private String jwtToken;
}
