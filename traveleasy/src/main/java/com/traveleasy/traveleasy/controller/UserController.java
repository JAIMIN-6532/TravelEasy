package com.traveleasy.traveleasy.controller;

import com.traveleasy.traveleasy.model.User;
import com.traveleasy.traveleasy.service.UserService;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService userService;
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signUp")
    public ResponseEntity<User> signUp(@RequestBody User user) {
        System.out.println(user);
        return ResponseEntity.ok(userService.signUp(user));
    }

    @PostMapping("/signIn")
    public ResponseEntity<User> signIn(@RequestBody User user) {
        return ResponseEntity.ok( userService.signIn(user));
    }

}
