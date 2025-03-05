package com.traveleasy.traveleasy.model;


import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "\"user\"")  // Note the double quotes around the word 'user'
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
     Long id;

     String username;

     String password;

     String email;
}