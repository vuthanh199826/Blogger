package com.codegym.service.user;

import com.codegym.model.User;
import com.codegym.service.IGeneralService;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

public interface IUserService extends IGeneralService<User>{
    Optional<User> findByUsername(String username);
    Boolean existsByEmail(String email);
    Boolean existsByUsername(String username);
    Iterable<User> findUsersByNameContaining(String user_name);
    Iterable<User> findByTopUser();


}