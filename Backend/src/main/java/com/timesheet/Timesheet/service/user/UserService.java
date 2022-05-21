package com.timesheet.Timesheet.service.user;

import com.timesheet.Timesheet.domain.user.User;
import com.timesheet.Timesheet.domain.user.UserRole;
import com.timesheet.Timesheet.repository.user.UserRepository;
import com.timesheet.Timesheet.security.TokenUtils;
import com.timesheet.Timesheet.service.GenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService implements GenericService<User,Long>, UserDetailsService {

    private final UserRepository userRepository;

    public TokenUtils tokenUtils;

    @Autowired
    public UserService(UserRepository userRepository, TokenUtils tokenUtils) {
        this.userRepository = userRepository;
        this.tokenUtils = tokenUtils;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(
                String.format("No user found with username '%s'.", username)));
        List<GrantedAuthority> grantedAuthorities = user.getUserRoles().stream().map(UserRole::getRole)
                .map(authority -> new SimpleGrantedAuthority(authority.getName()))
                .collect(Collectors.toList());

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                grantedAuthorities);
    }

    public User findByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(
                String.format("No user found with username '%s'.", username)));
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public User findById(Long id) {
        return userRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    @Override
    public Page<User> findAll(Integer pageNo, Integer pageSize) {
        return userRepository.findAll(PageRequest.of(pageNo, pageSize));
    }

    @Override
    public void delete(User user) {
        user.setDeleted(true);
        userRepository.save(user);
    }

    public User getLoggedInUser() {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        if (currentUser == null) {
            return null;
        }
        return userRepository.findByUsername(currentUser.getName()).orElseThrow(EntityNotFoundException::new);
    }

    public List<User> findAll(){
        return userRepository.findAll();
    }
}

