package com.traveleasy.traveleasy.service;

import com.traveleasy.traveleasy.exception.AuthException;
import com.traveleasy.traveleasy.model.User;
import com.traveleasy.traveleasy.repository.UserRepo;
import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    private final UserRepo userRepo;

    @Autowired
    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }


    public User signUp(User user) {

        userRepo.findOneByEmail(user.getEmail()).ifPresent(euser -> {
            throw new AuthException("User with this email address %s is already exists...".formatted(euser.getEmail()));
        });

        return userRepo.save(user);
    }

    public User signIn(User user){
        var existingUser = userRepo.findOneByEmail(user.getEmail()).orElseThrow(() -> new EntityNotFoundException("User with this email %s not found.".formatted(user.getEmail())));

        if(!existingUser.getPassword().equals(user.getPassword()) ){
            throw  new AuthException("Password Not Matching..");
        }

        return existingUser;
    }


}