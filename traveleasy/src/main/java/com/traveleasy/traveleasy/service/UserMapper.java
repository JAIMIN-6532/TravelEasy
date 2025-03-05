package com.traveleasy.traveleasy.service;

import com.traveleasy.traveleasy.dto.UserDto;
import com.traveleasy.traveleasy.model.User;
import org.springframework.stereotype.Service;

@Service
public class UserMapper {

    public UserDto getUserResponse (User user){
        return new UserDto(user.getId());
    }
}
