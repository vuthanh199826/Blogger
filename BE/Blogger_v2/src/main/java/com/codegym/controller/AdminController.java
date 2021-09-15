package com.codegym.controller;
import com.codegym.service.user.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.codegym.model.*;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/auth/admin/users")
public class AdminController {
    @Autowired
    private UserService userService;
    @GetMapping("")
    public ResponseEntity<Iterable<User>> listUser(){
        Iterable<User> users = userService.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>>findById(@PathVariable Long id){
        Optional<User> user = userService.findById(id);
        return new ResponseEntity<>(user,HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> edit(@PathVariable Long id, @RequestBody User user){
        Optional<User>currentUser = userService.findById(id);
        if (!currentUser.isPresent()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        user.setId(id);
        userService.save(user);
        return new ResponseEntity<>(user,HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Optional<User>>delete(@PathVariable Long id){
        Optional<User>user = userService.findById(id);
        if (!user.isPresent()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        userService.remove(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping ("/search/{name}")
    public ResponseEntity<Iterable<User>>searchByUsername(@PathVariable String name){
        Iterable<User> user = userService.findUsersByNameContaining(name);
        return new ResponseEntity<>(user,HttpStatus.OK);
    }
    @GetMapping("/top")
    public ResponseEntity<Iterable<User>>findByTopUserByPost(){
        Iterable<User> users = userService.findByTopUser();
        return new ResponseEntity<>(users,HttpStatus.OK);
    }
}
