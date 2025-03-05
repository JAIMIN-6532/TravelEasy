package com.traveleasy.traveleasy.repository;

import com.traveleasy.traveleasy.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserRepo extends JpaRepository<User, Long> {

    public Optional<User> findOneByEmail(String email);
}
