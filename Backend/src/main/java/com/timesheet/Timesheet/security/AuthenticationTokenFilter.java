package com.timesheet.Timesheet.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.BadRequestException;
import java.io.IOException;

public class AuthenticationTokenFilter extends UsernamePasswordAuthenticationFilter {

    private final TokenUtils tokenUtils;

    private final UserDetailsService userDetailsService;

    private final String header;

    @Autowired
    public AuthenticationTokenFilter(TokenUtils tokenUtils, UserDetailsService userDetailsService, String header) {
        this.tokenUtils = tokenUtils;
        this.userDetailsService = userDetailsService;
        this.header = header;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String authToken = httpRequest.getHeader(header);
        String username = tokenUtils.getUsernameFromToken(authToken);

        if (username != null
                && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService
                    .loadUserByUsername(username);
            if (tokenUtils.validateToken(authToken, userDetails, ((HttpServletRequest) request).getServletPath())) {
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource()
                        .buildDetails(httpRequest));
                SecurityContextHolder.getContext().setAuthentication(
                        authentication);
            }
        }
        try {
            chain.doFilter(request, response);
        } catch (ServletException e) {
            throw new BadRequestException(e);
        }
    }

}
