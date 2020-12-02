package org.example.backend.security;

import org.example.backend.model.Client;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class ClientDetailsImpl implements UserDetails {
    private final List<GrantedAuthority> authorities;
    private final String login;
    private final String password;
    private final boolean active = true;

    public ClientDetailsImpl(List<GrantedAuthority> authorities, String login, String password) {
        this.authorities = authorities;
        this.login = login;
        this.password = password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return login;
    }

    @Override
    public boolean isAccountNonExpired() {
        return active;
    }

    @Override
    public boolean isAccountNonLocked() {
        return active;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return active;
    }

    @Override
    public boolean isEnabled() {
        return active;
    }

    public static ClientDetailsImpl builder(Client client) {
        List<GrantedAuthority> authorities = client.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());

        return new ClientDetailsImpl(
                authorities,
                client.getLogin(),
                client.getPassword()
        );
    }
}
