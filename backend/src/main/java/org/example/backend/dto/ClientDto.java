package org.example.backend.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.NotNull;

@EqualsAndHashCode(callSuper = true)
@Data
public class ClientDto extends BaseDto {

    private String email;

    @NotNull(message = "Password required")
    private String password;

    @NotNull(message = "Login required")
    private String login;
}
