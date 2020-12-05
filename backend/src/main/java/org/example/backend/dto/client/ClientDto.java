package org.example.backend.dto.client;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.example.backend.dto.BaseDto;

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
