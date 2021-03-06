package org.example.backend.security.jwt;

import org.example.backend.security.ClientDetailsServiceImpl;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Optional;

@Component
public class JwtTokenFilter extends GenericFilterBean {
    private final JwtProvider jwtProvider;
    private final ClientDetailsServiceImpl clientDetailsService;

    public JwtTokenFilter(JwtProvider jwtProvider, ClientDetailsServiceImpl clientDetailsService) {
        this.jwtProvider = jwtProvider;
        this.clientDetailsService = clientDetailsService;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        Optional<String> jwt = parseJwt((HttpServletRequest) request);

        if (jwt.isPresent() && jwtProvider.validateToken(jwt.get())) {
            String username = jwtProvider.getLoginFromToken(jwt.get());
            UserDetails userDetails = clientDetailsService.loadUserByUsername(username);

            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities()
            );

            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }

        chain.doFilter(request, response);
    }

    private Optional<String> parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");

        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return Optional.of(headerAuth.substring(7, headerAuth.length()));
        }

        return Optional.empty();
    }
}

