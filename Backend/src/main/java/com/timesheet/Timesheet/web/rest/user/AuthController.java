package com.timesheet.Timesheet.web.rest.user;

import com.timesheet.Timesheet.security.ApplicationProperties;
import com.timesheet.Timesheet.security.TokenUtils;
import com.timesheet.Timesheet.service.user.UserService;
import com.timesheet.Timesheet.web.config.ApiError;
import com.timesheet.Timesheet.web.dto.user.UserLoginDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final UserService userService;

    private final TokenUtils tokenUtils;

    private final ApplicationProperties properties;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserService userService,
                          TokenUtils tokenUtils, ApplicationProperties properties) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.tokenUtils = tokenUtils;
        this.properties = properties;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody final UserLoginDTO user) {
        try {
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                    user.username, user.password);
            authenticationManager.authenticate(token);

            UserDetails details = userService.loadUserByUsername(user.username);

            HttpHeaders headers = new HttpHeaders();
            headers.set(properties.JWT_HEADER, tokenUtils.generateToken(details));

            return ResponseEntity.ok().headers(headers).build();
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(new ApiError(400, "ERRORS.ERROR", "ERRORS.INVALID_LOGIN", "/api/login"));
        }
    }

    @GetMapping("/refresh")
    public ResponseEntity<?> refresh(Principal principal) {
        UserDetails details = userService.loadUserByUsername(principal.getName());

        HttpHeaders headers = new HttpHeaders();
        headers.set(properties.JWT_HEADER, tokenUtils.generateToken(details));

        return ResponseEntity.ok().headers(headers).build();
    }
}
