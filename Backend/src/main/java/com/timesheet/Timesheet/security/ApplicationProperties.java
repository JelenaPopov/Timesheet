package com.timesheet.Timesheet.security;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ApplicationProperties {

    @Value("${jwt.header}")
    public String JWT_HEADER;

}

