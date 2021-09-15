package com.codegym.service.user;

import com.codegym.model.User;
import org.springframework.beans.factory.annotation.Autowired;

import com.codegym.repository.*;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class UserService implements IUserService{
    @Autowired IUserRepository userRepository;
    @Override
    public Iterable<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public void remove(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public Boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public Iterable<User> findUsersByNameContaining(String user_name) {
        return userRepository.findByUsernameContaining(user_name);
    }

    @Override
    public Iterable<User> findByTopUser() {
        return userRepository.findByTopUser();
    }


}
