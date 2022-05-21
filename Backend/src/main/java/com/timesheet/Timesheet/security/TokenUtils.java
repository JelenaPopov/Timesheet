package com.timesheet.Timesheet.security;

import com.timesheet.Timesheet.domain.user.User;
import com.timesheet.Timesheet.domain.user.UserRole;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class TokenUtils {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expires_in}")
    private Long expiration;

    public String getUsernameFromToken(String token) {
        String username;
        try {
            Claims claims = this.getClaimsFromToken(token);
            username = claims.getSubject();
        } catch (Exception e) {
            username = null;
        }
        return username;
    }

    private Claims getClaimsFromToken(String token) {
        Claims claims;
        try {
            claims = Jwts.parser().setSigningKey(this.secret)
                    .parseClaimsJws(token).getBody();
        } catch (Exception e) {
            claims = null;
        }
        return claims;
    }

    private Date getExpirationDateFromToken(String token) {
        Date expiration;
        try {
            final Claims claims = this.getClaimsFromToken(token);
            expiration = claims.getExpiration();
        } catch (Exception e) {
            expiration = null;
        }
        return expiration;
    }

    private boolean isTokenExpired(String token) {
        final Date expiration = this.getExpirationDateFromToken(token);
        return expiration.before(new Date(System.currentTimeMillis()));
    }

    public boolean validateToken(String token, UserDetails userDetails, String path) {
        final String username = getUsernameFromToken(token);
        final Claims claims = getClaimsFromToken(token);
        @SuppressWarnings("unchecked")
        List<String> rolesFromToken = claims.get("roles", List.class);
        List<String> rolesFromAuthority = userDetails.getAuthorities()
                .stream()
                .map(a -> (a.getAuthority().substring(5).toLowerCase()))
                .collect(Collectors.toList());
        return username.equals(userDetails.getUsername())
                && !isTokenExpired(token) && (rolesFromToken.equals(rolesFromAuthority) || path.equals("/api/refresh"));
    }

    public String generateToken(User user) {
        Map<String, Object> claims = new HashMap<String, Object>();
        claims.put("sub", user.getUsername());
        claims.put("created", new Date(System.currentTimeMillis()));
        List<GrantedAuthority> grantedAuthorities = user.getUserRoles().stream().map(UserRole::getRole)
                .map(authority -> new SimpleGrantedAuthority(authority.getName()))
                .collect(Collectors.toList());

        claims.put("roles", grantedAuthorities
                .stream()
                .map(a -> (a.getAuthority().substring(5).toLowerCase()))
                .collect(Collectors.toList()));
        claims.put("name", user.getUsername());
        claims.put("weeklyWorkingHours", user.getWeeklyWorkingHours());

        return Jwts.builder().setClaims(claims)
                .setExpiration(generateExpirationDate())
                .signWith(SignatureAlgorithm.HS512, secret).compact();
    }

    private Date generateExpirationDate() {
        return new Date(getCurrentTimeMillis() + this.expiration * 60 * 60 * 1000);
    }

    private long getCurrentTimeMillis() {
        return new Date().getTime();
    }

}
